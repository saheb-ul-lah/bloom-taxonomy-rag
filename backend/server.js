// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises'; // Using promises version of fs
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// LangChain and AI imports
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { TextLoader as LangchainTextLoader } from "langchain/document_loaders/fs/text";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { QdrantVectorStore } from "@langchain/community/vectorstores/qdrant";
import { QdrantClient } from "@qdrant/js-client-rest";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads/';
const UPLOAD_DIR_FULL_PATH = path.join(__dirname, UPLOAD_DIR);

const pedagogicalFrameworksConfig = [
  { id: 'blooms_architect', label: "Bloom's Architect" },
  { id: 'dok_navigator', label: "DOK Navigator" },
  { id: 'udl_enhancer', label: "UDL Enhancer" },
  { id: 'constructivist_spark', label: "Constructivist Spark" },
  { id: 'combine_conquer', label: "Combine & Conquer" },
];

// --- Global Middleware ---
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// --- Request Logging Middleware ---
app.use((req, res, next) => {
  console.log(`\n--- Incoming Request ---`);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  if (req.query && Object.keys(req.query).length > 0) {
    console.log("Request Query:", req.query);
  }
  if (req.path !== '/webhook/user' && req.body && Object.keys(req.body).length > 0) {
    try {
      console.log("Request Body (parsed):", JSON.stringify(req.body, null, 2).substring(0, 500) + (JSON.stringify(req.body).length > 500 ? "..." : ""));
    } catch (e) {
      console.log("Request Body: (Could not stringify JSON body)");
    }
  } else if (req.path !== '/webhook/user' && ['POST', 'PUT', 'PATCH'].includes(req.method.toUpperCase())) {
    console.log(`Request Body for ${req.method} ${req.path}: (empty or not parsed as JSON object)`);
  }
  console.log("--- End Incoming Request ---");
  next();
});

// --- File Upload Setup ---
const ensureUploadDirExists = async () => {
  try { await fs.mkdir(UPLOAD_DIR_FULL_PATH, { recursive: true }); console.log(`Upload dir '${UPLOAD_DIR_FULL_PATH}' ensured.`); }
  catch (error) { console.error(`Error creating upload dir '${UPLOAD_DIR_FULL_PATH}':`, error); }
};
ensureUploadDirExists();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR_FULL_PATH),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const cleanOriginalName = file.originalname.replace(/[^a-zA-Z0-9._-]/g, '_');
    cb(null, `${uniqueSuffix}-${cleanOriginalName.substring(0, 100)}`);
  }
});
const upload = multer({ storage, limits: { fileSize: 50 * 1024 * 1024 } });

// --- AI and Vector DB Clients ---
if (!process.env.GOOGLE_GEMINI_API_KEY) { console.error("CRITICAL: GOOGLE_GEMINI_API_KEY not set!"); process.exit(1); }
if (!process.env.QDRANT_URL) { console.error("CRITICAL: QDRANT_URL not set!"); process.exit(1); }

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const embeddings = new GoogleGenerativeAIEmbeddings({ apiKey: process.env.GOOGLE_GEMINI_API_KEY, model: "embedding-001" });
const qdrantClient = new QdrantClient({ url: process.env.QDRANT_URL, apiKey: process.env.QDRANT_API_KEY || undefined });

// --- Helper Functions ---
async function getUserByClerkId(clerkId) {
  if (!clerkId || typeof clerkId !== 'string') { console.warn("getUserByClerkId: invalid clerkId:", clerkId); return null; }
  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) { console.warn(`User not found in DB for clerkId: ${clerkId}`); }
    return user;
  } catch (error) { console.error(`DB error fetching user by clerkId ${clerkId}:`, error); return null; }
}

async function loadFileContentForRAG(filePathOnServer, fileType) {
    console.log(`Attempting to load content from: ${filePathOnServer} (type: ${fileType})`);
    try {
        await fs.access(filePathOnServer); // Check if file exists before attempting to load
        const lowerCaseFileType = fileType.toLowerCase();
        let documents;
        if (lowerCaseFileType === 'application/pdf') {
            const loader = new PDFLoader(filePathOnServer);
            documents = await loader.load();
        } else if (lowerCaseFileType.includes('officedocument.wordprocessingml.document') || lowerCaseFileType === 'application/msword') {
            const loader = new DocxLoader(filePathOnServer);
            documents = await loader.load();
        } else if (lowerCaseFileType === 'text/plain') {
            const loader = new LangchainTextLoader(filePathOnServer);
            documents = await loader.load();
        } else {
            console.warn(`Unsupported file type for RAG content loading: ${fileType} at ${filePathOnServer}`);
            return null;
        }
        return documents.map(doc => doc.pageContent).join("\n\n");
    } catch (error) {
        console.error(`Error loading file content from ${filePathOnServer}:`, error);
        return null;
    }
}

// --- RAG Ingestion Logic (processAndVectorizeFile) ---
async function processAndVectorizeFile(filePathFromMulter, fileRecord, internalUserId) {
  const logPrefix = `[VECTORIZE FileID: ${fileRecord.id}, UserDBID: ${internalUserId}]`;
  console.log(`${logPrefix} START Processing: ${fileRecord.fileName} at ${filePathFromMulter}`);

  let documents = [];
  const collectionName = `teacher_${internalUserId}_materials`; // User-specific collection
  let qdrantOperationSuccessful = false;

  try {
    await fs.access(filePathFromMulter);
    console.log(`${logPrefix} File system access VERIFIED for: ${filePathFromMulter}`);

    const lowerCaseFileType = fileRecord.fileType.toLowerCase();
    if (lowerCaseFileType === 'application/pdf') {
      const loader = new PDFLoader(filePathFromMulter); documents = await loader.load();
    } else if (lowerCaseFileType.includes('officedocument.wordprocessingml.document') || lowerCaseFileType === 'application/msword') {
      const loader = new DocxLoader(filePathFromMulter); documents = await loader.load();
    } else if (lowerCaseFileType === 'text/plain') {
      const loader = new LangchainTextLoader(filePathFromMulter); documents = await loader.load();
    } else {
      console.warn(`${logPrefix} Unsupported file type: ${fileRecord.fileType}`);
      await prisma.uploadedFile.update({ where: { id: fileRecord.id }, data: { processed: true, isVectorized: false, notes: `Unsupported file type: ${fileRecord.fileType}` } });
      return;
    }

    if (!documents || documents.length === 0) {
      console.warn(`${logPrefix} No content loaded from file: ${fileRecord.fileName}`);
      await prisma.uploadedFile.update({ where: { id: fileRecord.id }, data: { processed: true, isVectorized: false, notes: 'File loaded but no content found.' } });
      return;
    }
    console.log(`${logPrefix} Loaded ${documents.length} raw document sections.`);

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200, addStartIndex: true });
    const splitDocs = await textSplitter.splitDocuments(documents);

    if (splitDocs.length === 0) {
      console.warn(`${logPrefix} No chunks generated after splitting: ${fileRecord.fileName}`);
      await prisma.uploadedFile.update({ where: { id: fileRecord.id }, data: { processed: true, isVectorized: false, notes: 'File split but no text chunks generated.' } });
      return;
    }
    console.log(`${logPrefix} Split into ${splitDocs.length} chunks.`);

    const chunksWithMetadata = splitDocs.map((doc, index) => ({
      ...doc,
      metadata: {
        ...doc.metadata, 
        source_filename: fileRecord.fileName, 
        file_id_db: fileRecord.id, 
        user_id_db: internalUserId, // Internal DB user ID
        subject: fileRecord.subject || 'general', 
        class_level: fileRecord.classLevel || 'general',
        chapter: fileRecord.chapter || 'general', 
        category: fileRecord.category || 'general_upload',
        year: fileRecord.year?.toString() || undefined, 
        exam_type: fileRecord.examType || undefined,
        doc_type: 'uploaded_file', // Differentiate from 'note' type if you vectorize notes
        chunk_index: index,
      }
    }));
    
    console.log(`${logPrefix} Metadata added to ${chunksWithMetadata.length} chunks.`);

    // Ensure Qdrant collection exists
    try {
      await qdrantClient.getCollection(collectionName);
      console.log(`${logPrefix} Qdrant collection '${collectionName}' already exists.`);
    } catch (error) {
      const qdrantError = error;
      if (qdrantError.status === 404 || (qdrantError.code && qdrantError.code === 5)) { // Qdrant's typical "not found" status/code
        console.log(`${logPrefix} Qdrant collection '${collectionName}' not found, creating...`);
        await qdrantClient.createCollection(collectionName, { 
            vectors: { size: 768, distance: 'Cosine' } // Match GoogleGenerativeAIEmbeddings size
        });
        console.log(`${logPrefix} Qdrant collection '${collectionName}' created.`);
      } else { 
        console.error(`${logPrefix} Error checking/creating Qdrant collection '${collectionName}':`, qdrantError);
        throw qdrantError; // Propagate other Qdrant errors
      }
    }

    // Add documents to Qdrant
    const qdrantStore = new QdrantVectorStore(embeddings, { client: qdrantClient, collectionName });
    console.log(`${logPrefix} Attempting to add ${chunksWithMetadata.length} document chunks to Qdrant...`);
    const addedIdsFromStore = await qdrantStore.addDocuments(chunksWithMetadata);
    qdrantOperationSuccessful = true; 
    console.log(`${logPrefix} Documents added to Qdrant. Response (IDs):`, addedIdsFromStore);


    const finalQdrantIds = (Array.isArray(addedIdsFromStore) && addedIdsFromStore.length > 0) ? addedIdsFromStore : null;
    const successNote = finalQdrantIds ? 'Successfully vectorized and stored.' : 'Vectorized (Qdrant IDs not returned by lib, but op presumed success).';

    await prisma.uploadedFile.update({
      where: { id: fileRecord.id },
      data: { 
        processed: true, 
        isVectorized: true, 
        qdrantIds: finalQdrantIds, // Store the Qdrant point IDs if returned
        qdrantCollection: collectionName,
        notes: successNote 
      },
    });
    console.log(`${logPrefix} SUCCESS: File processing marked as complete in DB for ${fileRecord.fileName}.`);

  } catch (error) {
    console.error(`${logPrefix} OVERALL ERROR during vectorization pipeline for ${fileRecord.fileName}:`, error);
    try {
        const existingRecord = await prisma.uploadedFile.findUnique({ where: { id: fileRecord.id } });
        if (existingRecord && !existingRecord.isVectorized) { // Only update if not already marked successful
            await prisma.uploadedFile.update({
                where: { id: fileRecord.id },
                data: { processed: true, isVectorized: false, notes: `Vectorization pipeline error: ${String(error.message || error).substring(0, 250)}` },
            });
        }
    } catch (dbUpdateError) {
        console.error(`${logPrefix} FATAL: Could not update DB record on vectorization error:`, dbUpdateError);
    }
  } finally {
    try {
      await fs.access(filePathFromMulter); // Check if it still exists
      await fs.unlink(filePathFromMulter);
      console.log(`${logPrefix} CLEANUP: Deleted temporary file: ${filePathFromMulter}`);
    } catch (unlinkError) {
      if (unlinkError.code !== 'ENOENT') { 
        console.warn(`${logPrefix} CLEANUP WARNING during unlink of ${filePathFromMulter}:`, unlinkError.message);
      }
    }
  }
}


// --- CLERK WEBHOOK HANDLER ---
app.post("/webhook/user", express.raw({ type: 'application/json' }), async (req, res) => {
    console.log("--- Webhook /webhook/user hit ---");
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) { console.error("CRITICAL: Missing WEBHOOK_SECRET from .env file!"); return res.status(500).send("Server misconfig: WEBHOOK_SECRET not configured."); }

    const svix_id = req.headers["svix-id"], svix_timestamp = req.headers["svix-timestamp"], svix_signature = req.headers["svix-signature"];
    if (!svix_id || !svix_timestamp || !svix_signature) { console.error("Webhook Error: Missing Svix headers from incoming request."); return res.status(400).send("Missing Svix headers"); }

    const wh = new Webhook(WEBHOOK_SECRET);
    let evt;
    try {
        const payloadString = req.body.toString('utf8');
        evt = wh.verify(payloadString, { "svix-id": svix_id, "svix-timestamp": svix_timestamp, "svix-signature": svix_signature });
        console.log("Webhook verified successfully. Event type:", evt.type);
    } catch (err) {
        console.error("!!! Svix verification failed:", err.message);
        console.error("WEBHOOK_SECRET used (first 5 chars for check):", WEBHOOK_SECRET.substring(0,5) + "...");
        return res.status(400).send("Webhook signature verification failed");
    }

    const eventType = evt.type;
    const eventData = evt.data;

    try {
        if (eventType === "user.created" || eventType === "user.updated") {
            const { id: clerkUserId, email_addresses, primary_email_address_id, first_name, last_name, image_url } = eventData;
            const primaryEmailObj = Array.isArray(email_addresses) ? email_addresses.find(e => e.id === primary_email_address_id) : null;
            const email = primaryEmailObj?.email_address || `no-email-${clerkUserId}@example.com`;
            const name = [first_name, last_name].filter(Boolean).join(" ") || "Unnamed User";
            
            console.log(`Webhook: Processing ${eventType} for Clerk ID: ${clerkUserId} (Email: ${email}, Name: ${name})`);

            const userData = {
                email,
                name,
                // imageUrl: image_url, // You can store this if you have an imageUrl field in your User model
            };

            if (eventType === "user.created") {
                const existingUser = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
                if (existingUser) {
                    console.log(`Webhook: User ${clerkUserId} already exists. Updating details.`);
                    await prisma.user.update({ where: { clerkId: clerkUserId }, data: userData });
                } else {
                    console.log(`Webhook: Attempting to create user ${clerkUserId} in DB.`);
                    await prisma.user.create({ data: { clerkId: clerkUserId, ...userData, role: 'TEACHER' } }); // department/institution are optional & nullable
                    console.log(`✅ Webhook: User created in DB: ${clerkUserId}`);
                }
            } else { // user.updated
                console.log(`Webhook: Attempting to upsert user ${clerkUserId} in DB.`);
                await prisma.user.upsert({
                    where: { clerkId: clerkUserId },
                    update: userData,
                    create: { clerkId: clerkUserId, ...userData, role: 'TEACHER' },
                });
                console.log(`✏️ Webhook: User updated/ensured in DB: ${clerkUserId}`);
            }
        } else if (eventType === "user.deleted") {
             const { id: clerkUserId, deleted } = eventData; // `deleted` boolean might be present
            if (clerkUserId) { // Check if id exists, even if deleted might be false
                console.log(`Webhook: Processing user.deleted for Clerk ID: ${clerkUserId}`);
                const userRecord = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
                if (userRecord) {
                    const collectionName = `teacher_${userRecord.id}_materials`;
                    try {
                        console.log(`Webhook: Attempting to delete Qdrant collection: ${collectionName}`);
                        await qdrantClient.deleteCollection(collectionName);
                        console.log(`Webhook: Qdrant collection ${collectionName} deleted for user ${userRecord.id}`);
                    } catch (qError) {
                        if (qError.status !== 404 && !(qError.message && qError.message.includes("doesn't exist"))) {
                            console.error(`Webhook: Error deleting Qdrant collection ${collectionName}:`, qError);
                        } else {
                            console.log(`Webhook: Qdrant collection ${collectionName} not found or indicates non-existence, skipping deletion.`);
                        }
                    }
                    // Cascade delete related records or handle them as per your app's logic
                    // For example, delete chat history, notes, uploaded files, preferences
                    await prisma.chatHistory.deleteMany({ where: { userId: userRecord.id } });
                    await prisma.note.deleteMany({ where: { userId: userRecord.id } });
                    await prisma.uploadedFile.deleteMany({ where: { uploadedById: userRecord.id } }); // Ensure field name matches
                    await prisma.teacherPreference.deleteMany({ where: { userId: userRecord.id } });
                    // Add other related data deletions here
                }
                const numDeleted = await prisma.user.deleteMany({ where: { clerkId: clerkUserId } });
                if (numDeleted.count > 0) console.log(`🗑️ Webhook: User and related data deleted from DB: ${clerkUserId}`);
                else console.log(`Webhook: User ${clerkUserId} not found in DB for deletion, or already deleted.`);
            } else {
                 console.warn(`Webhook: Received user.deleted event without a clerkUserId in data.id.`);
            }
        } else { 
            console.log(`Webhook: Received (and ignored) event type: ${eventType}`); 
        }
        res.status(200).json({ message: "Webhook processed successfully" });
    } catch (dbError) { 
        console.error(`!!! Webhook DB Error during ${eventType} for ClerkID ${eventData?.id || 'N/A'}:`, dbError); 
        res.status(500).json({ error: `Database error processing webhook event: ${dbError.message}` }); 
    }
});


// --- Main API Router Definition ---
const apiRouter = express.Router();

// --- /api/teacher/* Routes ---
apiRouter.post("/teacher/upload-material", upload.single('file'), async (req, res) => {
  const { clerkId, subject, classLevel, chapter, institution, department, courseCode, category, year, examType } = req.body;
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });
  if (!clerkId) { if (req.file?.path) await fs.unlink(req.file.path).catch(console.error); return res.status(400).json({ error: "Clerk ID required." }); }
  const user = await getUserByClerkId(clerkId);
  if (!user) { if (req.file?.path) await fs.unlink(req.file.path).catch(console.error); return res.status(404).json({ error: "User not found." }); }
  
  try {
    const fileRecord = await prisma.uploadedFile.create({
      data: {
        fileName: req.file.originalname, fileType: req.file.mimetype, 
        fileUrl: req.file.path, // Storing the server path from multer
        fileSize: req.file.size,
        uploadedById: user.id, 
        subject: subject || null, classLevel: classLevel || null, chapter: chapter || null, 
        institution: institution || null, department: department || null, courseCode: courseCode || null,
        category: category || 'general_upload', 
        year: year ? parseInt(year) : null, examType: examType || null,
        processed: false, isVectorized: false,
      },
    });
    console.log(`File record created (ID: ${fileRecord.id}). Path: ${fileRecord.fileUrl}. Triggering async vectorization.`);
    processAndVectorizeFile(req.file.path, fileRecord, user.id)
      .then(() => console.log(`[ASYNC] Vectorization background task completed for ${fileRecord.fileName}`))
      .catch(err => console.error(`[ASYNC] Vectorization background task FAILED for ${fileRecord.fileName}:`, err));
    res.status(201).json({ message: "File uploaded. Processing will begin shortly.", file: { id: fileRecord.id, name: fileRecord.fileName } });
  } catch (error) {
    console.error("DB error saving file record:", error);
    if (req.file?.path) await fs.unlink(req.file.path).catch(e => console.error("Error unlinking orphaned upload on DB error:", e.message));
    res.status(500).json({ error: "Failed to save file information." });
  }
});

apiRouter.get("/teacher/uploaded-files", async (req, res) => {
  const { clerkId, category } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const whereClause = { uploadedById: user.id };
    if (category) { whereClause.category = String(category); }
    const files = await prisma.uploadedFile.findMany({
      where: whereClause, orderBy: { createdAt: 'desc' },
      select: { // Select only fields needed by client
        id: true, fileName: true, createdAt: true, subject: true, classLevel: true,
        year: true, examType: true, category: true,
        isVectorized: true, processed: true, notes: true, fileType: true, fileSize: true
        // Avoid sending fileUrl (server path) to client unless explicitly needed for download via another route
      }
    });
    res.json(files);
  } catch (error) { console.error("Error fetching uploaded files:", error); res.status(500).json({ error: "Failed to fetch files." }); }
});

apiRouter.delete("/teacher/uploaded-files/:fileId", async (req, res) => {
  const { fileId } = req.params; 
  const { clerkId } = req.body; // Expect clerkId in body for DELETE auth
  if (!clerkId) return res.status(401).json({ error: "Authentication required." });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found." });
  if (!fileId) return res.status(400).json({ error: "File ID required." });

  try {
    const fileToDelete = await prisma.uploadedFile.findFirst({ where: { id: fileId, uploadedById: user.id } });
    if (!fileToDelete) return res.status(404).json({ error: "File not found or you do not have permission to delete it." });

    if (fileToDelete.isVectorized && fileToDelete.qdrantCollection && Array.isArray(fileToDelete.qdrantIds) && fileToDelete.qdrantIds.length > 0) {
      try {
        await qdrantClient.deletePoints(fileToDelete.qdrantCollection, { points: fileToDelete.qdrantIds });
        console.log(`Qdrant points deleted for file ${fileId}`);
      } catch (qError) { console.error(`Error deleting Qdrant points for file ${fileId}:`, qError); /* Continue with DB deletion */ }
    }
    
    if (fileToDelete.fileUrl && !fileToDelete.fileUrl.startsWith('http')) { // Check if it's a local path
        const filePathToDelete = path.isAbsolute(fileToDelete.fileUrl) ? fileToDelete.fileUrl : path.join(UPLOAD_DIR_FULL_PATH, path.basename(fileToDelete.fileUrl));
        try { 
            await fs.access(filePathToDelete); 
            await fs.unlink(filePathToDelete); console.log(`Physical file deleted: ${filePathToDelete}`); 
        }
        catch (fsError) { if (fsError.code !== 'ENOENT') console.error(`Error deleting physical file ${filePathToDelete}:`, fsError); }
    }
    await prisma.uploadedFile.delete({ where: { id: fileId } });
    res.status(204).send();
  } catch (error) { console.error(`Error deleting file ${fileId}:`, error); res.status(500).json({ error: "Failed to delete file." }); }
});

apiRouter.get("/teacher/notes", async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const notes = await prisma.note.findMany({ 
        where: { userId: user.id }, 
        orderBy: { updatedAt: 'desc' } 
    });
    res.json(notes);
  } catch (error) { console.error("Error fetching notes:", error); res.status(500).json({ error: "Failed to fetch notes" }); }
});

apiRouter.post("/teacher/notes", async (req, res) => {
  const { clerkId, title, content, subject, classLevel, chapter, board, language, institution, department, courseCode } = req.body;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!title || !subject || !classLevel || !chapter || !board) return res.status(400).json({ error: "Missing required fields for note: Title, Subject, Class Level, Chapter, Board." });
  try {
    const newNote = await prisma.note.create({
      data: { 
          userId: user.id, title, content: content || null, subject, classLevel, chapter, board, 
          language: language || 'en', institution: institution || null, 
          department: department || null, courseCode: courseCode || null 
        },
    });
    res.status(201).json(newNote);
  } catch (error) { console.error("Error creating note:", error); res.status(500).json({ error: "Failed to create note" }); }
});

apiRouter.put("/teacher/notes/:noteId", async (req, res) => {
    const { noteId } = req.params;
    const { clerkId, title, content, subject, classLevel, chapter, board, language, institution, department, courseCode } = req.body;
    if (!clerkId) return res.status(401).json({ error: "Clerk ID required." });
    const user = await getUserByClerkId(clerkId);
    if (!user) return res.status(404).json({ error: "User not found." });

    try {
        const noteToUpdate = await prisma.note.findFirst({
            where: { id: noteId, userId: user.id }
        });
        if (!noteToUpdate) return res.status(404).json({ error: "Note not found or not owned by user." });

        const updatedNote = await prisma.note.update({
            where: { id: noteId },
            data: { 
                title: title || undefined, // Only update if provided
                content: content, // Allow setting content to empty string
                subject: subject || undefined, 
                classLevel: classLevel || undefined, 
                chapter: chapter || undefined, 
                board: board || undefined, 
                language: language || undefined, 
                institution: institution, 
                department: department, 
                courseCode: courseCode, 
                updatedAt: new Date() 
            }
        });
        res.json(updatedNote);
    } catch (error) {
        console.error(`Error updating note ${noteId}:`, error);
        res.status(500).json({ error: "Failed to update note." });
    }
});

apiRouter.delete("/teacher/notes/:noteId", async (req, res) => {
  const { noteId } = req.params; 
  const { clerkId } = req.body;
  if (!clerkId) return res.status(401).json({ error: "Auth required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const note = await prisma.note.findFirst({ where: { id: noteId, userId: user.id } });
    if (!note) return res.status(404).json({ error: "Note not found or not owned by user" });
    // TODO: If notes are vectorized, delete associated vectors from Qdrant here.
    await prisma.note.delete({ where: { id: noteId } });
    res.status(204).send();
  } catch (error) { console.error(`Error deleting note ${noteId}:`, error); res.status(500).json({ error: "Failed to delete note" }); }
});

apiRouter.get("/teacher/preferences/custom-prompt", async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const preferences = await prisma.teacherPreference.findUnique({ where: { userId: user.id } });
    if (!preferences) return res.status(404).json({ message: "No preferences found." }); // Normal if user hasn't set any
    res.json(preferences);
  } catch (error) { console.error("Error fetching custom prompt prefs:", error); res.status(500).json({ error: "Failed to fetch prefs" }); }
});

apiRouter.post("/teacher/preferences/custom-prompt", async (req, res) => {
  const { clerkId, promptText, quickPreferences } = req.body;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const pref = await prisma.teacherPreference.upsert({
      where: { userId: user.id },
      update: { promptText: promptText || "", quickPreferences: quickPreferences || {} },
      create: { userId: user.id, promptText: promptText || "", quickPreferences: quickPreferences || {} },
    });
    res.status(200).json({ message: "Preferences saved successfully.", preference: pref });
  } catch (error) { console.error("Error saving custom prompt prefs:", error); res.status(500).json({ error: "Failed to save preferences" }); }
});

apiRouter.get("/teacher/profile", async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  // Return only necessary, non-sensitive profile info
  res.json({ name: user.name, email: user.email, department: user.department || null, institution: user.institution || null });
});

apiRouter.post("/teacher/profile", async (req, res) => {
  const { clerkId, name, email, department, institution } = req.body;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id }, // Use internal DB ID for update
      data: { 
          name: name || user.name, // Allow partial updates
          // email: email || user.email, // Email usually managed by Clerk, avoid changing here unless explicitly intended
          department: department, // Allow setting to null or string
          institution: institution 
        },
    });
    res.status(200).json({ message: "Profile updated successfully.", profile: { name: updatedUser.name, email: updatedUser.email, department: updatedUser.department, institution: updatedUser.institution }});
  } catch (error) { console.error("Error updating teacher profile:", error); res.status(500).json({ error: "Failed to update profile" }); }
});

// Chat History Routes (now use new schema fields from prisma/schema.prisma)
apiRouter.get("/teacher/chat-history", async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const histories = await prisma.chatHistory.findMany({
      where: { userId: user.id }, 
      orderBy: { updatedAt: 'desc' },
      select: { 
        id: true, 
        customTitle: true, 
        frameworkId: true, 
        updatedAt: true,
        // For a preview, you might get the first user message or last AI summary
        // This is a bit more complex with JSONB messages array.
        // For now, keeping it simple. Frontend can fetch full details on selection.
        subject: true, // Fallback if customTitle is not always set
        class: true,   // Fallback
      }
    });
    const formattedHistories = histories.map(h => {
        const framework = pedagogicalFrameworksConfig.find(f => f.id === h.frameworkId);
        return {
            id: h.id,
            title: h.customTitle || `${framework?.label || h.subject || 'Chat'} (${new Date(h.updatedAt).toLocaleDateString()})`,
            date: new Date(h.updatedAt).toLocaleString(),
            frameworkId: h.frameworkId || pedagogicalFrameworksConfig[0].id, 
        };
    });
    res.json(formattedHistories);
  } catch (error) { console.error("Error fetching chat histories:", error); res.status(500).json({ error: "Failed to fetch chat histories" }); }
});

apiRouter.get("/teacher/chat-history/:historyId", async (req, res) => {
  const { historyId } = req.params; 
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const chatHistory = await prisma.chatHistory.findFirst({ 
        where: { id: historyId, userId: user.id } 
    });
    if (!chatHistory) return res.status(404).json({ error: "Chat history not found or access denied." });
    res.json(chatHistory); // Send the full chat history object
  } catch (error) { console.error("Error fetching chat history detail:", error); res.status(500).json({ error: "Failed to fetch chat history detail." }); }
});

// OLD /api/chat/generate-questions (Deprecated)
apiRouter.post("/chat/generate-questions", async (req, res) => {
  console.warn("[DEPRECATED] /api/chat/generate-questions called. Client should use /api/ai/pedagogy-assist.");
  return res.status(410).json({ 
      error: "This endpoint is deprecated.",
      message: "Please update your client application to use the new /api/ai/pedagogy-assist endpoint for all AI chat interactions."
  });
});


// *****************************************************************************
// ******************* ADVANCED AI PEDAGOGY CO-PILOT ROUTE *********************
// *****************************************************************************
apiRouter.post("/ai/pedagogy-assist", async (req, res) => {
  const {
    clerkId, userQuery, activeFrameworkId, aiTask, preferences,
    customPromptText, chatHistoryId, activeContextItemIds,
  } = req.body;

  console.log(`\n[POST /api/ai/pedagogy-assist] Received Request`);
  console.log(`  Clerk ID: ${clerkId}, Framework: ${activeFrameworkId}, Task: ${aiTask}`);

  if (!clerkId) return res.status(401).json({ error: "Authentication required." });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found in database." });
  if (!activeFrameworkId || !aiTask) return res.status(400).json({ error: "Framework and AI task are required." });

  try {
    let ragContextString = "";
    const usedSourceDetails = [];

    if (activeContextItemIds && activeContextItemIds.length > 0) {
    console.log("  Processing RAG context for item IDs:", activeContextItemIds);
    const contextFetchPromises = activeContextItemIds.map(async (itemId) => {
        // Try to find it as a document
        let docFile = await prisma.uploadedFile.findFirst({
            where: { id: itemId, uploadedById: user.id },
        });
        if (docFile) {
            console.log(`RAG: Found docFile for ID ${itemId}:`, {id: docFile.id, fileName: docFile.fileName, isVectorized: docFile.isVectorized, fileUrl: docFile.fileUrl});
            if (docFile.fileUrl && docFile.isVectorized) {
                const filePathOnServer = path.isAbsolute(docFile.fileUrl) 
                                           ? docFile.fileUrl 
                                           : path.join(UPLOAD_DIR_FULL_PATH, path.basename(docFile.fileUrl));
                console.log(`RAG: Attempting to load document content from: ${filePathOnServer}`);
                try {
                    const content = await loadFileContentForRAG(filePathOnServer, docFile.fileType);
                    if (content) {
                        usedSourceDetails.push({ id: docFile.id, name: docFile.fileName, type: 'document' });
                        return `CONTEXT SOURCE (Document: ${docFile.fileName}):\n${content}\nEND CONTEXT SOURCE (Document: ${docFile.fileName})\n\n`;
                    } else { console.warn(`RAG: loadFileContentForRAG returned null/empty for ${docFile.fileName}`); }
                } catch (err) { console.warn(`RAG: Error in loadFileContentForRAG for ${docFile.fileName}:`, err.message); }
            } else {
                console.warn(`RAG: Document ${docFile.fileName} (ID: ${itemId}) not used. Has URL: ${!!docFile.fileUrl}, Is Vectorized: ${!!docFile.isVectorized}`);
            }
            return null; // Processed as doc, even if not used.
        }

        // If not a document, try to find it as a note
        let note = await prisma.note.findFirst({
            where: { id: itemId, userId: user.id },
        });
        if (note) {
            console.log(`RAG: Found note for ID ${itemId}:`, {id: note.id, title: note.title, hasContent: !!note.content});
            if (note.content) {
                // TODO: Check note.isVectorized if you implement vectorization for notes
                usedSourceDetails.push({ id: note.id, name: note.title, type: 'note' });
                return `CONTEXT SOURCE (Note: ${note.title}):\n${note.content}\nEND CONTEXT SOURCE (Note: ${note.title})\n\n`;
            } else {
                console.warn(`RAG: Note ${note.title} (ID: ${itemId}) has no content.`);
            }
            return null; // Processed as note
        }
        
        console.warn(`RAG: Context Item ID ${itemId} not found as document or note for user ${user.id}`);
        return null;
    });
    const resolvedContexts = (await Promise.all(contextFetchPromises)).filter(Boolean);
    ragContextString = resolvedContexts.join("");
      if (ragContextString) console.log(`  Assembled RAG Context from ${usedSourceDetails.length} items.`);
      else console.log("  No usable RAG context content found from selected items.");
    }

    let systemInstruction = `You are "EduCraft AI", an expert pedagogical co-pilot for educators. Your responses should be helpful, clear, and directly address the user's request. Adhere to the specified pedagogical framework.`;
    let taskSpecificInstructions = "";
    // THE CRITICAL OUTPUT FORMAT INSTRUCTION BLOCK:
    let outputFormatInstructions = `
CRITICAL: Respond ONLY with a valid JSON object. This JSON object MUST have two top-level keys: "summaryText" (a brief, natural language summary of your response or action taken, keep it concise) and "structuredOutput" (this will contain the main detailed content). 
Ensure mathematical or chemical equations are ALWAYS in LaTeX notation: inline math with $...$ (e.g., $E=mc^2$), block/display math with $$...$$ (e.g., $$\\sum_{i=0}^n i = \\frac{n(n+1)}{2}$$).
If generating a table, "structuredOutput" should be: {"type": "table", "data": {"headers": ["Header1", ...], "rows": [["r1c1", ...], ["r2c1", ...]]}}.
If generating a list of questions, "structuredOutput" should be: {"type": "question_list", "data": [{"questionText": "...", "bloomLevel": "(if applicable, e.g., 'Apply')", "dokLevel": "(if applicable, e.g., 'DOK 2')", "justification": "...", "options": ["opt1", ...], "correctAnswerIndex": 0 (for MCQs), "rubricHints": "..."}]}.
If suggesting activities, "structuredOutput" should be: {"type": "activity_suggestion_list", "data": [{"title": "...", "description": "...", "pedagogicalRationale": "...", "materialsNeeded": ["..."], "udlConnections": ["..."], "frameworkTags": ["Bloom:Analyze", "DOK:3"]}]}.
If providing simple text/explanation, "structuredOutput" should be: {"type": "simple_text", "data": {"text": "Your detailed textual response here, which can include Markdown for formatting and LaTeX for equations."}}.
If generating a list of learning objectives, "structuredOutput" should be: {"type": "objectives_list", "data": [{"objective": "...", "rationale": "...", "frameworkAlignment": "e.g., Bloom's Understand"}]}.
If providing UDL analysis/suggestions, "structuredOutput" should be: {"type": "udl_analysis", "data": {"principle": "Representation/Action/Engagement", "checkpoint": "e.g., 1.1 Offer ways of customizing the display", "suggestions": ["suggestion1", "suggestion2"], "rationale": "..."}}.
Do not include any text outside this JSON object. Do not use markdown backticks like \`\`\`json ... \`\`\` to wrap the JSON.
    `;


    const currentFrameworkConfig = pedagogicalFrameworksConfig.find(f => f.id === activeFrameworkId);
    if (currentFrameworkConfig) systemInstruction += ` The educator is currently focusing on the "${currentFrameworkConfig.label}" pedagogical framework.`;
    if (customPromptText) systemInstruction += `\nTeacher's General AI Instructions (Follow these closely):\n${customPromptText}`;

    if (aiTask === 'generate_questions') {
        taskSpecificInstructions = `Task: Generate educational questions. User Query: "${userQuery}". Preferences for questions: ${JSON.stringify(preferences || {})}. Ensure "structuredOutput" is "question_list".`;
    } else if (aiTask === 'suggest_activities') {
        taskSpecificInstructions = `Task: Suggest educational activities. User Query: "${userQuery}". Preferences for activities: ${JSON.stringify(preferences || {})}. Ensure "structuredOutput" is "activity_suggestion_list".`;
    } 
    // ... (MORE else if blocks for ALL your AI TASKS defined in frontend aiTasks constant) ...
    else { // Fallback for unhandled tasks
        taskSpecificInstructions = `Task: General Assistance for task type "${aiTask}". User Query: "${userQuery}". Preferences: ${JSON.stringify(preferences || {})}. Provide a helpful and relevant response.`;
    }

    const fullPromptForLLM = `${systemInstruction}\n\n${taskSpecificInstructions}\n\n${ragContextString ? `Relevant Context from Teacher's Uploaded Materials (Prioritize this information):\n${ragContextString}\nEND OF TEACHER'S MATERIALS\n\n` : ""}${outputFormatInstructions}`;
    
    console.log("  Full Prompt for LLM (First 600 chars):", fullPromptForLLM.substring(0,600) + (fullPromptForLLM.length > 600 ? "..." : ""));

    let llmApiResponseText;
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
        const result = await model.generateContent(fullPromptForLLM);
        llmApiResponseText = result.response.text();
        console.log("  LLM Raw Response (First 600 chars):", llmApiResponseText.substring(0,600) + (llmApiResponseText.length > 600 ? "..." : ""));
    } catch (llmError) {
        console.error("!!!! LLM API Call Error:", llmError);
        throw new Error(`AI model communication failed: ${llmError.message || String(llmError)}`);
    }

    let parsedAiResponse;
    try {
        let jsonString = llmApiResponseText.trim();
        
        // Attempt to remove markdown code fences if present
        // Handles ```json ... ``` or just ``` ... ```
        const fenceMatch = jsonString.match(/^```(?:json)?\s*([\s\S]*?)\s*```$/);
        if (fenceMatch && fenceMatch[1]) {
            jsonString = fenceMatch[1].trim();
            console.log("  Successfully stripped markdown fences from LLM response.");
        } else {
            console.log("  No markdown fences found or regex didn't match, attempting to parse as is.");
        }
        
        parsedAiResponse = JSON.parse(jsonString);

        if (typeof parsedAiResponse.summaryText !== 'string' || typeof parsedAiResponse.structuredOutput === 'undefined') {
            console.warn("LLM response parsed but missing required keys (summaryText or structuredOutput). Raw JSON:", jsonString.substring(0, 300) + "...");
            // Provide a more graceful fallback if keys are missing but it's still valid JSON
            parsedAiResponse = { 
                summaryText: parsedAiResponse.summaryText || "AI response structure was incomplete. Full content in details.",
                structuredOutput: parsedAiResponse.structuredOutput || { type: "simple_text", data: { text: "Structured output was missing. Raw JSON: " + jsonString } }
            };
        }
    } catch (parseError) {
      console.error("!!!! LLM JSON Parse Error:", parseError, "\nRaw LLM Response (after initial trim) was:\n", llmApiResponseText.trim().substring(0, 1000) + "...");
      parsedAiResponse = {
        summaryText: "AI response format error. Displaying raw output.",
        structuredOutput: { type: "simple_text", data: { text: `Raw AI Output (JSON parse failed: ${parseError.message}):\n\n${llmApiResponseText}` }}
      };
    }

    const messagesToStoreEntry = [
      { role: "user", content: userQuery, preferences: preferences, aiTaskType: aiTask, timestamp: new Date().toISOString() },
      { 
        role: "assistant", 
        summaryText: parsedAiResponse.summaryText,
        structuredContent: parsedAiResponse.structuredOutput,
        usedSources: usedSourceDetails, 
        aiTaskType: aiTask,
        timestamp: new Date().toISOString() 
      }
    ];
    
    let finalChatHistoryId = chatHistoryId;
    let finalChatTitle = ""; 

    const querySnippetForTitle = userQuery ? userQuery.substring(0, 30) + (userQuery.length > 30 ? "..." : "") : aiTask.replace(/_/g, ' ');
    const currentFrameworkLabelForTitle = pedagogicalFrameworksConfig.find(f => f.id === activeFrameworkId)?.label || activeFrameworkId.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (finalChatHistoryId) {
        const existingChat = await prisma.chatHistory.findUnique({ where: { id: finalChatHistoryId, userId: user.id } });
        if (existingChat) {
            const updatedChat = await prisma.chatHistory.update({
                where: { id: finalChatHistoryId },
                data: {
                    messages: { push: messagesToStoreEntry },
                    lastPreferences: preferences, 
                    activeContextItems: activeContextItemIds ? activeContextItemIds.map(item => ({id: item.id, type: item.type, name: item.name})) : [], 
                    frameworkId: activeFrameworkId,
                    updatedAt: new Date()
                },
            });
            finalChatTitle = updatedChat.customTitle || currentFrameworkLabelForTitle + ": " + querySnippetForTitle;
        } else { finalChatHistoryId = null; } 
    }
    
    if (!finalChatHistoryId) {
        finalChatTitle = currentFrameworkLabelForTitle + ": " + querySnippetForTitle;
        const newChat = await prisma.chatHistory.create({
            data: {
                userId: user.id,
                messages: messagesToStoreEntry,
                customTitle: finalChatTitle,
                frameworkId: activeFrameworkId,
                subject: preferences?.subject || currentFrameworkLabelForTitle,
                class: preferences?.classLevel || "General",
                chapter: preferences?.chapter || querySnippetForTitle.substring(0,50),
                lastPreferences: preferences,
                activeContextItems: activeContextItemIds ? activeContextItemIds.map(item => ({id: item.id, type: item.type, name: item.name})) : [],
            }
        });
        finalChatHistoryId = newChat.id;
    }
    
    res.status(200).json({ 
      summaryText: parsedAiResponse.summaryText, 
      structuredOutput: parsedAiResponse.structuredOutput, 
      chatHistoryId: finalChatHistoryId, 
      usedSources: usedSourceDetails,
      chatTitle: finalChatTitle 
    });

  } catch (error) {
    console.error("!!!! AI Pedagogy Assist Endpoint Error Catch Block:", error);
    res.status(500).json({ error: "Failed to process AI co-pilot request. " + (error.message || "Unknown server error.") });
  }
});

// --- Mount API Router ---
app.use('/api', apiRouter); 

// --- Root Route & Start Server ---
app.get('/', (req, res) => {
  res.send('EduCraft AI Co-Pilot API is Live and Well!');
});

app.listen(PORT, () => {
  console.log(`Backend server (EduCraft Co-Pilot) fully initialized and running on http://localhost:${PORT}`);
});