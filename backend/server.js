// backend/server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// LangChain and AI imports
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { DocxLoader } from "@langchain/community/document_loaders/fs/docx";
import { TextLoader } from "langchain/document_loaders/fs/text";
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

// --- Global Middleware ---
app.use(cors()); // Enable CORS for all routes

// Note: Specific body parsers are applied per route or before the main router
// to handle Svix webhook raw body requirement correctly.

// --- Request Logging Middleware (runs after body parsing for most routes) ---
app.use((req, res, next) => {
  console.log(`\n--- Incoming Request ---`);
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  if (req.query && typeof req.query === 'object' && Object.keys(req.query).length > 0) {
    console.log("Request Query:", req.query);
  }
  // For routes NOT using express.raw(), req.body will be parsed if express.json() ran
  if (req.path !== '/webhook/user' && req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    try {
      console.log("Request Body (parsed json):", JSON.stringify(req.body, null, 2).substring(0, 500) + "...");
    } catch (e) {
      console.log("Request Body: (Could not stringify)");
    }
  } else if (req.path !== '/webhook/user' && ['POST', 'PUT', 'PATCH'].includes(req.method.toUpperCase())) {
    console.log(`Request Body for ${req.method} ${req.path}: (empty or not parsed as object by global express.json)`);
  }
  console.log("--- End Incoming Request ---");
  next();
});


// --- File Upload Setup ---
const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads/';
const ensureUploadDirExists = async () => {
  try { await fs.mkdir(path.join(__dirname, UPLOAD_DIR), { recursive: true }); console.log(`Upload dir '${UPLOAD_DIR}' ensured.`); }
  catch (error) { console.error(`Error creating upload dir '${UPLOAD_DIR}':`, error); }
};
ensureUploadDirExists();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, UPLOAD_DIR)),
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
    else { console.log(`User found in DB for clerkId ${clerkId}: User DB ID ${user.id}`); }
    return user;
  } catch (error) { console.error(`DB error fetching user by clerkId ${clerkId}:`, error); return null; }
}

// --- RAG Ingestion Logic with Extensive Logging ---
async function processAndVectorizeFile(filePathFromMulter, fileRecord, internalUserId) {
  const logPrefix = `[VECTORIZE FileID: ${fileRecord.id}, UserDBID: ${internalUserId}]`;
  console.log(`${logPrefix} START Processing: ${fileRecord.fileName}`);
  console.log(`${logPrefix} Expected file at path: ${filePathFromMulter}`);

  let documents = [];
  const collectionName = `teacher_${internalUserId}_materials`;

  try {
    try {
      await fs.access(filePathFromMulter);
      console.log(`${logPrefix} File system access VERIFIED for: ${filePathFromMulter}`);
    } catch (accessError) {
      console.error(`${logPrefix} ERROR: File not accessible at ${filePathFromMulter} for record ${fileRecord.id}:`, accessError.message);
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false, notes: `File not found at path for vectorization: ${filePathFromMulter}` },
      });
      return;
    }

    const lowerCaseFileType = fileRecord.fileType.toLowerCase();
    console.log(`${logPrefix} Determined file type: ${lowerCaseFileType}`);
    if (lowerCaseFileType === 'application/pdf') {
      console.log(`${logPrefix} Using PDFLoader.`);
      const loader = new PDFLoader(filePathFromMulter); documents = await loader.load();
    } else if (lowerCaseFileType.includes('officedocument.wordprocessingml.document') || lowerCaseFileType === 'application/msword') {
      console.log(`${logPrefix} Using DocxLoader.`);
      const loader = new DocxLoader(filePathFromMulter); documents = await loader.load();
    } else if (lowerCaseFileType === 'text/plain') {
      console.log(`${logPrefix} Using TextLoader.`);
      const loader = new TextLoader(filePathFromMulter); documents = await loader.load();
    } else {
      console.warn(`${logPrefix} Unsupported file type: ${fileRecord.fileType}`);
      await prisma.uploadedFile.update({ where: { id: fileRecord.id }, data: { processed: true, isVectorized: false, notes: `Unsupported: ${fileRecord.fileType}` } });
      return;
    }

    if (!documents || documents.length === 0) {
      console.log(`${logPrefix} No content extracted from file.`);
      await prisma.uploadedFile.update({ where: { id: fileRecord.id }, data: { processed: true, isVectorized: false, notes: 'No content extracted' } });
      return;
    }
    console.log(`${logPrefix} Loaded ${documents.length} raw document(s)/page(s). First page content preview: ${(documents[0]?.pageContent || '').substring(0, 100)}...`);

    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200, addStartIndex: true });
    console.log(`${logPrefix} Initialized RecursiveCharacterTextSplitter.`);
    const splitDocs = await textSplitter.splitDocuments(documents);
    console.log(`${logPrefix} Split into ${splitDocs.length} chunks.`);

    if (splitDocs.length === 0) {
      console.log(`${logPrefix} No text chunks to vectorize after splitting.`);
      await prisma.uploadedFile.update({ where: { id: fileRecord.id }, data: { processed: true, isVectorized: false, notes: 'No text chunks after split' } });
      return;
    }
    if (splitDocs.length > 0) {
      console.log(`${logPrefix} First chunk preview: ${splitDocs[0].pageContent.substring(0, 100)}... Metadata:`, splitDocs[0].metadata);
    }

    const chunksWithMetadata = splitDocs.map((doc, index) => ({
      ...doc,
      metadata: {
        ...doc.metadata, source_filename: fileRecord.fileName, file_id_db: fileRecord.id, user_id_db: internalUserId,
        subject: fileRecord.subject || 'general', class_level: fileRecord.classLevel || 'general',
        chapter: fileRecord.chapter || 'general', category: fileRecord.category || 'general_upload',
        year: fileRecord.year?.toString() || undefined, exam_type: fileRecord.examType || undefined,
        doc_type: 'uploaded_file', chunk_index: index,
      }
    }));
    console.log(`${logPrefix} Enriched ${chunksWithMetadata.length} chunks with metadata. First chunk metadata:`, chunksWithMetadata[0].metadata);

    console.log(`${logPrefix} Checking/Creating Qdrant collection: ${collectionName}`);
    try {
      await qdrantClient.getCollection(collectionName);
      console.log(`${logPrefix} Qdrant collection '${collectionName}' already exists.`);
    } catch (error) {
      const qdrantError = error;
      if (qdrantError.status === 404 || (qdrantError.code && qdrantError.code === 5)) {
        console.log(`${logPrefix} Qdrant collection '${collectionName}' not found, creating...`);
        await qdrantClient.createCollection(collectionName, { vectors: { size: 768, distance: 'Cosine' } });
        console.log(`${logPrefix} Qdrant collection '${collectionName}' created.`);
      } else { console.error(`${logPrefix} Error checking/creating Qdrant collection '${collectionName}':`, qdrantError); throw qdrantError; }
    }

    console.log(`${logPrefix} Initializing QdrantVectorStore for collection: ${collectionName}`);
    const qdrantStore = new QdrantVectorStore(embeddings, { client: qdrantClient, collectionName });

    if (chunksWithMetadata.length > 0) {
      console.log(`${logPrefix} Sample chunk being sent to Qdrant:`, JSON.stringify(chunksWithMetadata[0], null, 2));
    }
    console.log(`${logPrefix} Attempting to add ${chunksWithMetadata.length} document chunks to Qdrant...`);
    let addedIds;
    try {
      addedIds = await qdrantStore.addDocuments(chunksWithMetadata);
      // NEW LOG: Log the raw result immediately
      console.log(`${logPrefix} Raw result from qdrantStore.addDocuments:`, addedIds);
    } catch (qdrantAddError) {
      console.error(`${logPrefix} ERROR during qdrantStore.addDocuments:`, qdrantAddError);
      // Update Prisma record to reflect this specific failure
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false, notes: `Qdrant addDocuments error: ${String(qdrantAddError.message || qdrantAddError).substring(0, 200)}` },
      });
      // We should probably re-throw or return here to stop further processing if adding documents fails
      throw qdrantAddError; // Or handle more gracefully depending on desired behavior
    }

    // MODIFIED: Check if addedIds is defined and an array
    if (addedIds && Array.isArray(addedIds)) {
      console.log(`${logPrefix} Added ${addedIds.length} vectors to Qdrant. Sample Qdrant IDs:`, addedIds.slice(0, 3));
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: true, qdrantIds: addedIds, qdrantCollection: collectionName, notes: 'Successfully vectorized.' },
      });
      console.log(`${logPrefix} SUCCESS: File processed and vectorized.`);
    } else {
      console.error(`${logPrefix} ERROR: qdrantStore.addDocuments did not return the expected array of IDs. Result:`, addedIds);
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false, notes: 'Qdrant addDocuments returned unexpected result.' },
      });
    }

  } catch (error) {
    console.error(`${logPrefix} OVERALL ERROR during vectorization:`, error);
    await prisma.uploadedFile.update({
      where: { id: fileRecord.id },
      data: { processed: true, isVectorized: false, notes: `Vectorization error: ${String(error.message || error).substring(0, 250)}` },
    }).catch(dbErr => console.error(`${logPrefix} DB update error on failure:`, dbErr));
  } finally {
    try {
      await fs.access(filePathFromMulter);
      await fs.unlink(filePathFromMulter);
      console.log(`${logPrefix} CLEANUP: Deleted temporary file: ${filePathFromMulter}`);
    } catch (unlinkError) {
      if (unlinkError.code !== 'ENOENT') {
        console.warn(`${logPrefix} CLEANUP WARNING during unlink of ${filePathFromMulter}:`, unlinkError.message);
      } else {
        console.log(`${logPrefix} CLEANUP: Temporary file ${filePathFromMulter} already gone.`);
      }
    }
  }
}

// --- CLERK WEBHOOK HANDLER ---
// Defined directly on app, with express.raw() for this specific route
app.post("/webhook/user", express.raw({ type: 'application/json' }), async (req, res) => {
  console.log("--- Webhook /webhook/user hit ---");
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) { console.error("CRITICAL: Missing WEBHOOK_SECRET"); return res.status(500).send("Server misconfig: WEBHOOK_SECRET"); }

  const svix_id = req.headers["svix-id"], svix_timestamp = req.headers["svix-timestamp"], svix_signature = req.headers["svix-signature"];
  if (!svix_id || !svix_timestamp || !svix_signature) { console.error("Webhook Error: Missing Svix headers."); return res.status(400).send("Missing Svix headers"); }

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  try {
    // req.body is a Buffer here because of express.raw()
    console.log("Webhook raw body for verification:", req.body.toString('utf8').substring(0, 500) + "...");
    evt = wh.verify(req.body.toString('utf8'), { "svix-id": svix_id, "svix-timestamp": svix_timestamp, "svix-signature": svix_signature });
    console.log("Webhook verified successfully. Event type:", evt.type);
  } catch (err) {
    console.error("!!! Svix verification failed:", err.message);
    console.error("Headers for verification:", { "svix-id": svix_id, "svix-timestamp": svix_timestamp, "svix-signature": svix_signature });
    return res.status(400).send("Webhook verification failed");
  }

  const eventType = evt.type;
  const eventData = evt.data;

  try {
    if (eventType === "user.created" || eventType === "user.updated") {
      const { id: clerkUserId, email_addresses, primary_email_address_id, first_name, last_name } = eventData;
      const primaryEmailObj = Array.isArray(email_addresses) ? email_addresses.find(e => e.id === primary_email_address_id) : null;
      const email = primaryEmailObj?.email_address || `no-email-${Date.now()}@example.com`; // Ensure unique fallback
      const name = [first_name, last_name].filter(Boolean).join(" ") || "Unnamed User";
      console.log(`Processing ${eventType} for Clerk ID: ${clerkUserId} (Email: ${email})`);

      if (eventType === "user.created") {
        const existingUser = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
        if (existingUser) {
          console.log(`User ${clerkUserId} already exists. Updating.`);
          await prisma.user.update({ where: { clerkId: clerkUserId }, data: { email, name, department: existingUser.department, institution: existingUser.institution } }); // Preserve existing profile fields
        } else {
          await prisma.user.create({ data: { clerkId: clerkUserId, email, name, role: 'TEACHER', department: null, institution: null } });
          console.log(`✅ User created in DB: ${clerkUserId}`);
        }
      } else { // user.updated
        await prisma.user.upsert({
          where: { clerkId: clerkUserId },
          update: { email, name },
          create: { clerkId: clerkUserId, email, name, role: 'TEACHER', department: null, institution: null },
        });
        console.log(`✏️ User updated/ensured in DB: ${clerkUserId}`);
      }
    } else if (eventType === "user.deleted") {
      const { id: clerkUserId, deleted } = eventData;
      if (deleted && clerkUserId) {
        console.log(`Processing user.deleted for Clerk ID: ${clerkUserId}`);
        const userRecord = await prisma.user.findUnique({ where: { clerkId: clerkUserId } });
        if (userRecord) {
          const collectionName = `teacher_${userRecord.id}_materials`;
          try {
            console.log(`Attempting to delete Qdrant collection: ${collectionName}`);
            await qdrantClient.deleteCollection(collectionName);
            console.log(`Qdrant collection ${collectionName} deleted for user ${userRecord.id}`);
          } catch (qError) {
            if (qError.status !== 404 && !(qError.message && qError.message.includes("doesn't exist"))) { // Qdrant client might throw different error types
              console.error(`Error deleting Qdrant collection ${collectionName}:`, qError);
            } else {
              console.log(`Qdrant collection ${collectionName} not found or error indicates non-existence, skipping deletion.`);
            }
          }
        }
        const numDeleted = await prisma.user.deleteMany({ where: { clerkId: clerkUserId } });
        if (numDeleted.count > 0) console.log(`🗑️ User deleted from DB: ${clerkUserId}`);
        else console.log(`User ${clerkUserId} not found in DB for deletion.`);
      }
    } else { console.log(`Webhook: Received (and ignored) event: ${eventType}`); }
    res.status(200).json({ message: "Webhook processed" });
  } catch (dbError) { console.error(`!!! DB error for webhook ${eventType} (ClerkID: ${eventData?.id || 'N/A'}):`, dbError); res.status(500).json({ error: `DB error on ${eventType}` }); }
});

// --- Main API Router (mounted at /api) ---
const apiRouter = express.Router();
app.use(express.json({ limit: '50mb' })); // Ensure this is before apiRouter if not globally first for non-webhook routes
app.use(express.urlencoded({ extended: true, limit: '50mb' }));


// POST /api/teacher/upload-material
apiRouter.post("/teacher/upload-material", upload.single('file'), async (req, res) => {
  const { clerkId, subject, classLevel, chapter, institution, department, courseCode, category, year, examType } = req.body;
  console.log(`[POST /api/teacher/upload-material] clerkId: '${clerkId}', file: '${req.file?.originalname}', category: '${category}'`);
  if (!req.file) return res.status(400).json({ error: "No file uploaded." });
  if (!clerkId) { if (req.file?.path) await fs.unlink(req.file.path).catch(console.error); return res.status(400).json({ error: "Clerk ID required." }); }
  const user = await getUserByClerkId(clerkId);
  if (!user) { if (req.file?.path) await fs.unlink(req.file.path).catch(console.error); return res.status(404).json({ error: "User not found." }); }
  try {
    const fileRecord = await prisma.uploadedFile.create({
      data: {
        fileName: req.file.originalname, fileType: req.file.mimetype, fileUrl: req.file.path, fileSize: req.file.size,
        uploadedById: user.id, subject: subject || null, classLevel: classLevel || null, chapter: chapter || null,
        institution: institution || null, department: department || null, courseCode: courseCode || null,
        category: category || 'general_upload', year: year ? parseInt(year) : null, examType: examType || null,
        processed: false, isVectorized: false,
      },
    });
    console.log(`File record created (ID: ${fileRecord.id}). Path: ${fileRecord.fileUrl}. Triggering async vectorization.`);
    processAndVectorizeFile(req.file.path, fileRecord, user.id) // Fire and forget
      .then(() => console.log(`[ASYNC] Vectorization completed for ${fileRecord.fileName}`))
      .catch(err => console.error(`[ASYNC] Vectorization FAILED for ${fileRecord.fileName}:`, err));
    res.status(201).json({ message: "File uploaded. Processing in background.", file: { id: fileRecord.id, name: fileRecord.fileName } });
  } catch (error) {
    console.error("DB error saving file record:", error);
    if (req.file?.path) await fs.unlink(req.file.path).catch(e => console.error("Error unlinking orphaned upload on DB error:", e.message));
    res.status(500).json({ error: "Failed to save file information." });
  }
});

// GET /api/teacher/uploaded-files
apiRouter.get("/teacher/uploaded-files", async (req, res) => {
  const { clerkId, category } = req.query;
  console.log(`[GET /api/teacher/uploaded-files] clerkId: '${clerkId}', category: '${category}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const whereClause = { uploadedById: user.id };
    if (category) { whereClause.category = String(category); }
    const files = await prisma.uploadedFile.findMany({
      where: whereClause, orderBy: { createdAt: 'desc' },
      select: {
        id: true, fileName: true, createdAt: true, subject: true, classLevel: true,
        year: true, examType: true, fileUrl: true, category: true,
        isVectorized: true, processed: true, notes: true
      }
    });
    console.log(`Found ${files.length} files for user ${user.id}, category '${category}'.`);
    res.json(files);
  } catch (error) { console.error("Error fetching uploaded files:", error); res.status(500).json({ error: "Failed to fetch files.", details: error.message }); }
});

// DELETE /api/teacher/uploaded-files/:fileId
apiRouter.delete("/teacher/uploaded-files/:fileId", async (req, res) => {
  const { fileId } = req.params; const { clerkId } = req.body;
  console.log(`[DELETE /api/teacher/uploaded-files/${fileId}] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(401).json({ error: "Auth required." });
  if (!fileId) return res.status(400).json({ error: "File ID required." });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found." });
  try {
    const fileToDelete = await prisma.uploadedFile.findFirst({ where: { id: fileId, uploadedById: user.id } });
    if (!fileToDelete) return res.status(404).json({ error: "File not found or not owned by user." });

    if (fileToDelete.isVectorized && fileToDelete.qdrantCollection && Array.isArray(fileToDelete.qdrantIds) && fileToDelete.qdrantIds.length > 0) {
      try {
        console.log(`Attempting to delete Qdrant points for file ${fileId}:`, fileToDelete.qdrantIds);
        await qdrantClient.deletePoints(fileToDelete.qdrantCollection, { points: fileToDelete.qdrantIds });
        console.log(`Qdrant points deleted for file ${fileId}`);
      }
      catch (qError) { console.error(`Error deleting Qdrant points for file ${fileId}:`, qError); }
    }
    if (fileToDelete.fileUrl && !fileToDelete.fileUrl.startsWith('http') && fileToDelete.fileUrl.includes(UPLOAD_DIR.replace(/\/$/, ''))) {
      try { await fs.unlink(fileToDelete.fileUrl); console.log(`Physical file deleted: ${fileToDelete.fileUrl}`); }
      catch (fsError) { if (fsError.code !== 'ENOENT') console.error(`Error deleting physical file ${fileToDelete.fileUrl}:`, fsError); }
    }
    await prisma.uploadedFile.delete({ where: { id: fileId } });
    console.log(`DB record for file ${fileId} deleted.`);
    res.status(204).send();
  } catch (error) { console.error(`Error deleting file ${fileId}:`, error); res.status(500).json({ error: "Failed to delete file." }); }
});

// GET /api/teacher/notes
apiRouter.get("/teacher/notes", async (req, res) => {
  const { clerkId } = req.query;
  console.log(`[GET /api/teacher/notes] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const notes = await prisma.note.findMany({ where: { userId: user.id }, orderBy: { createdAt: 'desc' } });
    console.log(`Found ${notes.length} notes for user ${user.id}.`);
    res.json(notes);
  } catch (error) { console.error("Error fetching notes:", error); res.status(500).json({ error: "Failed to fetch notes" }); }
});

// POST /api/teacher/notes
apiRouter.post("/teacher/notes", async (req, res) => {
  const { clerkId, title, content, subject, classLevel, chapter, board, language, institution, department, courseCode } = req.body;
  console.log(`[POST /api/teacher/notes] clerkId: '${clerkId}', title: '${title}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!title || !subject || !classLevel || !chapter || !board) return res.status(400).json({ error: "Missing required fields for note" });
  try {
    const newNote = await prisma.note.create({
      data: { userId: user.id, title, content: content || null, subject, classLevel, chapter, board, language: language || 'en', institution, department, courseCode },
    });
    console.log(`Note created (ID: ${newNote.id}) for user ${user.id}.`);
    res.status(201).json(newNote);
  } catch (error) { console.error("Error creating note:", error); res.status(500).json({ error: "Failed to create note" }); }
});

// DELETE /api/teacher/notes/:noteId
apiRouter.delete("/teacher/notes/:noteId", async (req, res) => {
  const { noteId } = req.params; const { clerkId } = req.body;
  console.log(`[DELETE /api/teacher/notes/${noteId}] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(401).json({ error: "Auth required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const note = await prisma.note.findFirst({ where: { id: noteId, userId: user.id } });
    if (!note) return res.status(404).json({ error: "Note not found or not owned by user" });
    await prisma.note.delete({ where: { id: noteId } });
    console.log(`Note (ID: ${noteId}) deleted for user ${user.id}.`);
    res.status(204).send();
  } catch (error) { console.error(`Error deleting note ${noteId}:`, error); res.status(500).json({ error: "Failed to delete note" }); }
});

// GET /api/teacher/preferences/custom-prompt
apiRouter.get("/teacher/preferences/custom-prompt", async (req, res) => {
  const { clerkId } = req.query;
  console.log(`[GET /api/teacher/preferences/custom-prompt] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const preferences = await prisma.teacherPreference.findUnique({ where: { userId: user.id } });
    if (!preferences) { console.log(`No custom prompt prefs found for user ${user.id}`); return res.status(404).json({ message: "No preferences found." }); }
    console.log(`Custom prompt prefs found for user ${user.id}.`);
    res.json(preferences);
  } catch (error) { console.error("Error fetching custom prompt prefs:", error); res.status(500).json({ error: "Failed to fetch prefs" }); }
});

// POST /api/teacher/preferences/custom-prompt
apiRouter.post("/teacher/preferences/custom-prompt", async (req, res) => {
  const { clerkId, promptText, quickPreferences } = req.body;
  console.log(`[POST /api/teacher/preferences/custom-prompt] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const pref = await prisma.teacherPreference.upsert({
      where: { userId: user.id },
      update: { promptText: promptText || "", quickPreferences: quickPreferences || {} },
      create: { userId: user.id, promptText: promptText || "", quickPreferences: quickPreferences || {} },
    });
    console.log(`Custom prompt prefs saved for user ${user.id}.`);
    res.status(200).json({ message: "Preferences saved", preference: pref });
  } catch (error) { console.error("Error saving custom prompt prefs:", error); res.status(500).json({ error: "Failed to save prefs" }); }
});

// GET /api/teacher/profile
apiRouter.get("/teacher/profile", async (req, res) => {
  const { clerkId } = req.query;
  console.log(`[GET /api/teacher/profile] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    console.log(`Profile data found for user ${user.id}:`, { name: user.name, email: user.email, dep: user.department, inst: user.institution });
    res.json({ name: user.name, email: user.email, department: user.department || null, institution: user.institution || null });
  } catch (error) { console.error("Error fetching teacher profile:", error); res.status(500).json({ error: "Failed to fetch profile" }); }
});

// POST /api/teacher/profile
apiRouter.post("/teacher/profile", async (req, res) => {
  const { clerkId, name, email, department, institution } = req.body;
  console.log(`[POST /api/teacher/profile] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const updatedUser = await prisma.user.update({
      where: { id: user.id }, // Use internal user.id for update
      data: { name: name || user.name, email: email || user.email, department, institution },
    });
    console.log(`Profile updated for user ${user.id}.`);
    res.status(200).json({ message: "Profile updated", profile: updatedUser });
  } catch (error) { console.error("Error updating teacher profile:", error); res.status(500).json({ error: "Failed to update profile" }); }
});

// GET /api/teacher/chat-history
apiRouter.get("/teacher/chat-history", async (req, res) => {
  const { clerkId } = req.query;
  console.log(`[GET /api/teacher/chat-history] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const histories = await prisma.chatHistory.findMany({
      where: { userId: user.id }, orderBy: { updatedAt: 'desc' },
      select: { id: true, subject: true, class: true, updatedAt: true, chapter: true }
    });
    console.log(`Found ${histories.length} chat histories for user ${user.id}.`);
    res.json(histories);
  } catch (error) { console.error("Error fetching chat histories:", error); res.status(500).json({ error: "Failed to fetch chat histories" }); }
});

// GET /api/teacher/chat-history/:historyId
apiRouter.get("/teacher/chat-history/:historyId", async (req, res) => {
  const { historyId } = req.params; const { clerkId } = req.query;
  console.log(`[GET /api/teacher/chat-history/${historyId}] clerkId: '${clerkId}'`);
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });
  try {
    const chatHistory = await prisma.chatHistory.findFirst({ where: { id: historyId, userId: user.id } });
    if (!chatHistory) { console.log(`Chat history ${historyId} not found for user ${user.id}.`); return res.status(404).json({ error: "Chat history not found or access denied." }); }
    console.log(`Chat history ${historyId} found for user ${user.id}.`);
    res.json(chatHistory);
  } catch (error) { console.error("Error fetching chat history:", error); res.status(500).json({ error: "Failed to fetch chat history." }); }
});

// POST /api/chat/generate-questions
apiRouter.post("/chat/generate-questions", async (req, res) => {
  const { clerkId, userQuery, questionPreferences, customPromptText, chatHistoryId } = req.body;
  console.log(`[POST /api/chat/generate-questions] clerkId: '${clerkId}' Query: '${userQuery.substring(0, 30)}...'`);
  if (!clerkId || !userQuery || !questionPreferences) return res.status(400).json({ error: "Missing required fields." });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found." });

  const collectionName = `teacher_${user.id}_materials`;
  console.log(`Using Qdrant collection: ${collectionName}`);

  try {
    const qdrantStore = new QdrantVectorStore(embeddings, { client: qdrantClient, collectionName });
    let retrievedDocs = [];
    try {
      console.log(`Searching Qdrant with query: "${userQuery.substring(0, 50)}..."`);
      retrievedDocs = await qdrantStore.similaritySearch(userQuery, 5); // k=5, adjust as needed
      console.log(`Retrieved ${retrievedDocs.length} docs from Qdrant.`);
    }
    catch (qError) { console.warn(`Qdrant search failed (collection may not exist/be empty for user ${user.id}):`, qError.message); }

    const context = retrievedDocs.map(doc => doc.pageContent).join("\n---\n");
    const usedDocumentSources = [...new Set(retrievedDocs.map(doc => doc.metadata?.source_filename || 'Unknown Source'))];

    const bloomLevelsInfo = `Bloom's Taxonomy Definitions: Remember (recall facts), Understand (explain concepts), Apply (use info new ways), Analyze (draw connections), Evaluate (justify decisions), Create (produce new work).`;
    let targetBloomLevel = "Understand";
    const queryLower = userQuery.toLowerCase();
    // Basic keyword matching for Bloom's level from query
    if (queryLower.includes("remember") || queryLower.includes("recall")) targetBloomLevel = "Remember";
    else if (queryLower.includes("understand") || queryLower.includes("explain")) targetBloomLevel = "Understand";
    else if (queryLower.includes("apply") || queryLower.includes("solve")) targetBloomLevel = "Apply";
    else if (queryLower.includes("analyze") || queryLower.includes("compare")) targetBloomLevel = "Analyze";
    else if (queryLower.includes("evaluate") || queryLower.includes("justify")) targetBloomLevel = "Evaluate";
    else if (queryLower.includes("create") || queryLower.includes("design")) targetBloomLevel = "Create";
    console.log(`Determined target Bloom's level: ${targetBloomLevel} for query: "${userQuery}"`);

    const systemPrompt = `You are an AI that generates educational questions based on Bloom's Taxonomy.
Teacher's General Preferences for question paper style: ${customPromptText || "None specified."}
Current Request Preferences: Question Pattern: ${questionPreferences.pattern}, Subject/Stream: ${questionPreferences.stream}, Marks Distribution: ${questionPreferences.marksDistribution}.
${questionPreferences.marksDistribution === 'custom' ? `Custom Marks Breakdown: MCQ ${questionPreferences.customMarks.mcq}%, Short Answer ${questionPreferences.customMarks.shortAnswer}%, Long Answer ${questionPreferences.customMarks.longAnswer}%, Practical ${questionPreferences.customMarks.practical}%` : ''}
${bloomLevelsInfo}
Teacher's Specific Query: "${userQuery}"
The targeted Bloom's Taxonomy level for the questions you generate should be: '${targetBloomLevel}'.
For each question generated, you MUST specify its "bloomLevel" as '${targetBloomLevel}' and provide a brief "justification" explaining how the question aligns with this specific Bloom's level definition.
Respond ONLY with a valid JSON array of objects. Each object MUST have three keys: "question" (string), "bloomLevel" (string, which must be '${targetBloomLevel}'), and "justification" (string). Do not include any introductory text, concluding text, or markdown formatting like \`\`\`json ... \`\`\` outside the JSON array itself.
Example: [{"question": "What is the main function of the mitochondria?", "bloomLevel": "Remember", "justification": "This requires recalling a basic fact about cell organelles."}]`;

    const fullPrompt = `${systemPrompt}\n\nContext from Teacher's Uploaded Materials (use this to ground your questions if relevant, otherwise use general knowledge for the subject and level):\n---\n${context || "No specific context from uploaded materials was retrieved for this query."}\n---\n\nGenerate the questions now in the specified JSON array format:`;

    console.log(`Sending prompt to Gemini (approx ${fullPrompt.length} chars). Preview: ${fullPrompt.substring(0, 250)}...`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();
    console.log(`Gemini response received (raw). Length: ${responseText.length}. Preview: ${responseText.substring(0, 250)}...`);

    let generatedQuestions;
    try {
      const cleaned = responseText.trim().replace(/^```json\s*|```\s*$/g, '').replace(/,\s*\]$/, ']'); // Remove trailing comma if any before closing bracket
      generatedQuestions = JSON.parse(cleaned);
      if (!Array.isArray(generatedQuestions) || !generatedQuestions.every(q => typeof q.question === 'string' && typeof q.bloomLevel === 'string' && typeof q.justification === 'string')) {
        console.warn("LLM response JSON structure validation failed AFTER cleaning:", JSON.stringify(generatedQuestions, null, 2).substring(0, 300));
        throw new Error("LLM response is not a valid array of correctly structured question objects.");
      }
      console.log(`Successfully parsed ${generatedQuestions.length} questions from LLM response.`);
    } catch (parseError) {
      console.error("LLM JSON parse error. Cleaned text was:", responseText.trim().replace(/^```json\s*|```\s*$/g, '').substring(0, 500), "Error:", parseError);
      generatedQuestions = [{ question: "AI experienced an issue formatting the response. Please try again or rephrase. Technical detail: " + parseError.message, bloomLevel: "N/A", justification: "Error parsing LLM output." }];
    }

    const messagesToStore = [
      { role: "user", content: userQuery, preferences: questionPreferences, customPrompt: customPromptText, timestamp: new Date().toISOString() },
      { role: "assistant", content: generatedQuestions, timestamp: new Date().toISOString(), usedSources: usedDocumentSources }
    ];

    let finalChatHistoryId = chatHistoryId;
    if (finalChatHistoryId) {
      const existingChat = await prisma.chatHistory.findFirst({ where: { id: finalChatHistoryId, userId: user.id } });
      if (existingChat) {
        const prevMsgs = Array.isArray(existingChat.messages) ? existingChat.messages : []; // Handle if messages is null
        await prisma.chatHistory.update({
          where: { id: finalChatHistoryId },
          data: { messages: [...prevMsgs, ...messagesToStore], usedDocuments: { sources: usedDocumentSources }, generatedQuestions: { items: generatedQuestions }, updatedAt: new Date() },
        });
        console.log(`Appended to existing chat history ID: ${finalChatHistoryId}`);
      } else { finalChatHistoryId = null; console.log(`Chat history ID ${chatHistoryId} not found for user, creating new.`); }
    }
    if (!finalChatHistoryId) {
      const newChat = await prisma.chatHistory.create({
        data: { userId: user.id, class: questionPreferences.stream || 'Gen', subject: questionPreferences.stream || 'Gen', chapter: 'Gen', messages: messagesToStore, usedDocuments: { sources: usedDocumentSources }, generatedQuestions: { items: generatedQuestions } },
      });
      finalChatHistoryId = newChat.id;
      console.log(`Created new chat history ID: ${finalChatHistoryId}`);
    }
    res.status(200).json({ answer: generatedQuestions, chatHistoryId: finalChatHistoryId, usedSources: usedDocumentSources });
  } catch (error) { console.error("RAG chat error:", error); res.status(500).json({ error: "Failed to generate questions. " + error.message }); }
});

// --- Mount API Router ---
app.use('/api', apiRouter); // All API routes will be prefixed with /api

// --- Root Route ---
app.get('/', (req, res) => {
  res.send('QuestionGenius API is Live and Well!');
});

// --- Start Server ---
app.listen(PORT, () => {
  console.log(`Backend server fully initialized and running on http://localhost:${PORT}`);
});