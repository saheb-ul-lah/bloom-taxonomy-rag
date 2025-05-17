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

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  
  if (req.body && typeof req.body === 'object' && Object.keys(req.body).length > 0) {
    try {
      // This was the problematic line for GET requests (req.body is undefined)
      // Now it's inside a check, so it won't run for GET requests.
      console.log("Request Body:", JSON.stringify(req.body, null, 2).substring(0, 500));
    } catch (e) {
      console.log("Request Body: (Could not stringify - possibly binary or circular)");
    }
  } else if (req.method === 'POST' || req.method === 'PUT' || req.method === 'PATCH') {
    // This logs if body is expected but seems empty or not an object
    console.log("Request Body (for POST/PUT/PATCH):", req.body); 
  }

  if (req.query && typeof req.query === 'object' && Object.keys(req.query).length > 0) {
    console.log("Request Query:", req.query);
  }
  // Removed the unconditional console.log("Backend Received Request Body:...") as it's covered above.
  next();
});


const UPLOAD_DIR = process.env.UPLOAD_DIR || 'uploads/';
// ... (ensureUploadDirExists and multer setup as before) ...
const ensureUploadDirExists = async () => {
  try {
    await fs.mkdir(path.join(__dirname, UPLOAD_DIR), { recursive: true });
    console.log(`Upload directory '${UPLOAD_DIR}' ensured.`);
  } catch (error) {
    console.error(`Error creating upload directory '${UPLOAD_DIR}':`, error);
  }
};
ensureUploadDirExists();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, UPLOAD_DIR));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname.replace(/\s+/g, '_')}`);
  }
});
const upload = multer({ storage });


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GOOGLE_GEMINI_API_KEY,
  model: "embedding-001",
});
const qdrantClient = new QdrantClient({
  url: process.env.QDRANT_URL,
  apiKey: process.env.QDRANT_API_KEY || undefined,
});

async function getUserByClerkId(clerkId) {
  if (!clerkId || typeof clerkId !== 'string') {
    console.warn("getUserByClerkId called with invalid clerkId:", clerkId);
    return null;
  }
  try {
    const user = await prisma.user.findUnique({ where: { clerkId } });
    if (!user) {
      console.warn(`User not found for clerkId: ${clerkId}`);
    }
    return user;
  } catch (error) {
    console.error(`Error fetching user by clerkId ${clerkId}:`, error);
    return null;
  }
}

// --- RAG Ingestion Logic (processAndVectorizeFile - unchanged from previous correct version) ---
async function processAndVectorizeFile(filePath, fileRecord, userId) {
  console.log(`Processing file: ${fileRecord.fileName} for user: ${userId}`);
  let documents = [];
  const collectionName = `teacher_${userId}_materials`;

  try {
    if (fileRecord.fileType === 'application/pdf') {
      const loader = new PDFLoader(filePath);
      documents = await loader.load();
    } else if (fileRecord.fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const loader = new DocxLoader(filePath);
      documents = await loader.load();
    } else if (fileRecord.fileType === 'text/plain') {
      const loader = new TextLoader(filePath);
      documents = await loader.load();
    } else {
      console.warn(`Unsupported file type: ${fileRecord.fileType} for ${fileRecord.fileName}`);
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false },
      });
      return;
    }

    if (documents.length === 0) {
      console.log(`No content extracted from ${fileRecord.fileName}`);
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false },
      });
      return;
    }

    console.log(`Loaded ${documents.length} documents/pages from ${fileRecord.fileName}`);

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });
    const splitDocs = await textSplitter.splitDocuments(documents);
    console.log(`Split into ${splitDocs.length} chunks for ${fileRecord.fileName}`);

    if (splitDocs.length === 0) {
      console.log(`No text chunks to vectorize for ${fileRecord.fileName}`);
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false },
      });
      return;
    }

    const chunksWithMetadata = splitDocs.map(doc => ({
      ...doc,
      metadata: {
        ...doc.metadata,
        source: fileRecord.fileName,
        fileId: fileRecord.id,
        userId: userId, // Ensure this is the internal DB user ID, not clerkId
        subject: fileRecord.subject || 'general',
        classLevel: fileRecord.classLevel || 'general',
        chapter: fileRecord.chapter || 'general',
        type: 'uploaded_file',
      }
    }));

    try {
      await qdrantClient.getCollection(collectionName);
      console.log(`Collection '${collectionName}' already exists.`);
    } catch (error) {
      const qdrantError = error;
      if (qdrantError.status === 404 || (qdrantError.code && qdrantError.code === 5)) {
        console.log(`Collection '${collectionName}' not found, creating...`);
        await qdrantClient.createCollection(collectionName, {
          vectors: { size: 768, distance: 'Cosine' },
        });
        console.log(`Collection '${collectionName}' created.`);
      } else {
        throw error;
      }
    }

    const qdrantStore = new QdrantVectorStore(embeddings, {
      client: qdrantClient,
      collectionName: collectionName,
    });
    const addedIds = await qdrantStore.addDocuments(chunksWithMetadata);
    console.log(`Added ${addedIds.length} vectors to Qdrant for ${fileRecord.fileName}`);

    await prisma.uploadedFile.update({
      where: { id: fileRecord.id },
      data: {
        processed: true,
        isVectorized: true,
        qdrantIds: addedIds,
        qdrantCollection: collectionName,
      },
    });
    console.log(`Successfully processed and vectorized ${fileRecord.fileName}`);

  } catch (error) {
    console.error(`Error processing file ${fileRecord.fileName}:`, error);
    await prisma.uploadedFile.update({
      where: { id: fileRecord.id },
      data: { processed: true, isVectorized: false },
    }).catch(dbErr => console.error("Error updating file status on failure:", dbErr));
  } finally {
    try {
      await fs.unlink(filePath);
      console.log(`Deleted temporary file: ${filePath}`);
    } catch (unlinkError) {
      console.error(`Error deleting temporary file ${filePath}:`, unlinkError);
    }
  }
}

// --- API Router Setup ---
const apiRouter = express.Router();

// Clerk Webhook - this should NOT be under /api if VITE_API_BASE_URL is /api
// Or, if it is, ensure Clerk dashboard webhook URL is configured to /api/user/webhook
// For now, keeping it separate as originally, but usually webhook is at /webhook or /api/webhook
// backend/server.js

app.post("/webhook/user", async (req, res) => {
  console.log("--- Webhook /webhook/user hit ->");
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
  if (!WEBHOOK_SECRET) {
    console.error("!!! CRITICAL: Missing WEBHOOK_SECRET in .env for webhook verification !!!");
    return res.status(500).send("Server misconfiguration: WEBHOOK_SECRET missing");
  }
  
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];
  
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("!!! Webhook Error: Missing Svix headers.");
    return res.status(400).send("Missing Svix headers");
  }
  
  const payload = req.body;
  const bodyStringForVerification = JSON.stringify(payload);
  
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  
  try {
    console.log("Verifying webhook with Svix...");
    evt = wh.verify(bodyStringForVerification, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
    console.log("Webhook verified successfully. Event type:", evt.type);
    console.log("Full event data:", JSON.stringify(evt.data, null, 2).substring(0,1000)); // Log more of the event data
  } catch (err) {
    console.error("!!! Error verifying webhook with Svix:", err.message);
    return res.status(400).send("Webhook verification failed");
  }
  
  const eventType = evt.type;

  // MODIFICATION START: Only process user-related fields for user events
  if (eventType === "user.created" || eventType === "user.updated") {
    const { id } = evt.data; // This is the clerkId (user_...) for user.* events
    const { email_addresses, primary_email_address_id, first_name, last_name, image_url } = evt.data; // image_url might be useful later

    // It's possible for a user to have no email addresses initially, or for these fields to be null
    const primaryEmailObject = Array.isArray(email_addresses) ? email_addresses.find(
      (email) => email.id === primary_email_address_id
    ) : null;
    const primaryEmailAddress = primaryEmailObject?.email_address;
    const fullName = [first_name, last_name].filter(Boolean).join(" ") || "Unnamed User";

    try {
      console.log(`Processing event type: ${eventType} for Clerk User ID: ${id}`);
      if (eventType === "user.created") {
        const existingUser = await prisma.user.findUnique({ where: { clerkId: id } });
        if (existingUser) {
          console.log(`User ${id} already exists. Updating instead of creating.`);
          await prisma.user.update({
            where: { clerkId: id },
            data: {
              email: primaryEmailAddress || existingUser.email || "no-email@example.com", // Keep existing if new is null
              name: fullName,
            },
          });
          console.log(`☑️ Clerk user ${id} updated (found during create event).`);
        } else {
          await prisma.user.create({
            data: {
              clerkId: id,
              email: primaryEmailAddress || "no-email@example.com",
              name: fullName,
              role: 'TEACHER'
            },
          });
          console.log(`✅ Clerk user created in DB: ${id}`);
        }
      } else if (eventType === "user.updated") {
        // Ensure user exists before trying to update
        const userToUpdate = await prisma.user.findUnique({ where: { clerkId: id }});
        if (userToUpdate) {
            await prisma.user.update({
                where: { clerkId: id },
                data: {
                email: primaryEmailAddress || userToUpdate.email || "no-email@example.com",
                name: fullName,
                },
            });
            console.log(`✏️ Clerk user updated in DB: ${id}`);
        } else {
            console.warn(`User ${id} not found in DB for update. Consider creating if this is unexpected.`);
            // Optionally, create the user if they don't exist, similar to user.created logic
             await prisma.user.create({ // Create if not found during update (edge case)
                data: {
                    clerkId: id,
                    email: primaryEmailAddress || "no-email@example.com",
                    name: fullName,
                    role: 'TEACHER'
                },
            });
            console.log(`✅ Clerk user created in DB (during update event as user was not found): ${id}`);
        }
      }
    } catch (dbError) {
      console.error(`!!! Database error processing ${eventType} for ${id}:`, dbError);
      // Do not return 500 for webhook itself if possible, Clerk might retry.
      // Log it and let Clerk handle retry logic if appropriate.
      // For critical DB errors, a 500 might be okay to signal Clerk an issue.
      return res.status(500).send(`Internal server error during database operation for ${eventType}.`);
    }
  } else if (eventType === "user.deleted") {
    const { id, deleted } = evt.data; // user.deleted has id and deleted:true
    if (deleted && id) {
        try {
            const userToDelete = await prisma.user.findUnique({ where: {clerkId: id }});
            if (userToDelete) {
                console.log(`Attempting to delete user ${userToDelete.id} (Clerk ID: ${id})`);
                await prisma.user.delete({ where: { clerkId: id } });
                console.log(`🗑️ Clerk user deleted from DB: ${id}`);
            } else {
                console.log(`User with clerkId ${id} not found in DB for deletion.`);
            }
        } catch (dbError) {
            console.error(`!!! Database error processing user.deleted for ${id}:`, dbError);
            return res.status(500).send("Internal server error during database operation for user.deleted.");
        }
    } else {
        console.warn("Received user.deleted event without expected data:", evt.data);
    }
  } else if (eventType === "session.created" || eventType === "session.ended" || eventType === "session.removed" || eventType === "session.revoked") {
    // Handle session events if needed, e.g., logging, analytics
    // evt.data for session events contains user_id, client_id, status etc.
    // The user_id from a session event IS the clerkId (user_...)
    const clerkUserIdFromSession = evt.data.user_id;
    console.log(`Received session event: ${eventType} for User ID: ${clerkUserIdFromSession}`);
    // You typically don't create or update users based on session events alone,
    // but you might use them to update a 'last_active_at' field on your user record.
  } else {
    console.log(`Received unhandled or non-user-profile event type: ${eventType}`);
  }
  // MODIFICATION END

  return res.status(200).send("Webhook received and processed successfully");
});


// --- Teacher Specific Routes ---
apiRouter.post("/teacher/upload-material", upload.single('file'), async (req, res) => {
  // clerkId should come from an authenticated session in a real app (e.g., req.auth.userId from Clerk middleware)
  // For now, we'll expect it in the body, but this is less secure.
  const { clerkId, subject, classLevel, chapter, institution, department, courseCode } = req.body;
  console.log("Upload material request for clerkId:", clerkId);


  if (!req.file) return res.status(400).json({ error: "No file uploaded." });
  if (!clerkId) {
    await fs.unlink(req.file.path).catch(e => console.error("Failed to delete orphaned file (no clerkId):", e));
    return res.status(400).json({ error: "Clerk ID is required." });
  }

  const user = await getUserByClerkId(clerkId);
  if (!user) {
    await fs.unlink(req.file.path).catch(e => console.error("Failed to delete orphaned file (user not found):", e));
    return res.status(404).json({ error: "User not found." });
  }

  try {
    const fileRecord = await prisma.uploadedFile.create({
      data: {
        fileName: req.file.originalname,
        fileType: req.file.mimetype,
        fileUrl: req.file.path,
        fileSize: req.file.size,
        uploadedById: user.id, // Use internal DB user ID
        subject: subject || null,
        classLevel: classLevel || null,
        chapter: chapter || null,
        institution: institution || null,
        department: department || null,
        courseCode: courseCode || null,
      },
    });

    processAndVectorizeFile(req.file.path, fileRecord, user.id).catch(err => { // Pass user.id
      console.error("Background vectorization failed for", req.file.originalname, err);
    });

    res.status(201).json({
      message: "File uploaded successfully. Processing in background.",
      file: { id: fileRecord.id, name: fileRecord.fileName }
    });
  } catch (error) {
    console.error("Error saving file record to DB:", error);
    await fs.unlink(req.file.path).catch(e => console.error("Failed to delete orphaned file on DB error:", e));
    res.status(500).json({ error: "Failed to save file information." });
  }
});

apiRouter.get("/teacher/notes", async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    const notes = await prisma.note.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

apiRouter.post("/teacher/notes", async (req, res) => {
  const { clerkId, title, content, subject, classLevel, chapter, board, language, institution, department, courseCode } = req.body;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });
  if (!title || !subject || !classLevel || !chapter || !board) {
    return res.status(400).json({ error: "Missing required note fields (title, subject, classLevel, chapter, board)" });
  }

  try {
    const newNote = await prisma.note.create({
      data: {
        userId: user.id, // Use internal DB user ID
        title, content: content || null, subject, classLevel, chapter, board,
        language: language || 'en', institution: institution || null,
        department: department || null, courseCode: courseCode || null,
      },
    });
    res.status(201).json(newNote);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(500).json({ error: "Failed to create note" });
  }
});

apiRouter.delete("/teacher/notes/:noteId", async (req, res) => {
  const { noteId } = req.params;
  const { clerkId } = req.body;

  if (!clerkId) return res.status(401).json({ error: "Clerk ID required for authorization" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    const note = await prisma.note.findUnique({ where: { id: noteId } });
    if (!note) return res.status(404).json({ error: "Note not found" });
    if (note.userId !== user.id) return res.status(403).json({ error: "Forbidden: You do not own this note" });

    await prisma.note.delete({ where: { id: noteId } });
    res.status(204).send();
  } catch (error) {
    console.error(`Error deleting note ${noteId}:`, error);
    res.status(500).json({ error: "Failed to delete note" });
  }
});

apiRouter.get("/teacher/preferences/custom-prompt", async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    let preferences = await prisma.teacherPreference.findUnique({
      where: { userId: user.id },
    });
    if (!preferences) {
      return res.status(404).json({ message: "No preferences found for this user." });
    }
    res.json(preferences);
  } catch (error) {
    console.error("Error fetching custom prompt preferences:", error);
    res.status(500).json({ error: "Failed to fetch preferences" });
  }
});

apiRouter.post("/teacher/preferences/custom-prompt", async (req, res) => {
  const { clerkId, promptText, quickPreferences } = req.body;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });
  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    const savedPreference = await prisma.teacherPreference.upsert({
      where: { userId: user.id },
      update: { promptText, quickPreferences: quickPreferences || {} },
      create: { userId: user.id, promptText, quickPreferences: quickPreferences || {} },
    });
    res.status(200).json({ message: "Preferences saved successfully", preference: savedPreference });
  } catch (error) {
    console.error("Error saving custom prompt preferences:", error);
    res.status(500).json({ error: "Failed to save preferences" });
  }
});

apiRouter.get("/teacher/chat-history", async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID is required." });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found." });

  try {
    const histories = await prisma.chatHistory.findMany({
      where: { userId: user.id },
      orderBy: { updatedAt: 'desc' },
      select: { id: true, subject: true, class: true, updatedAt: true, chapter: true }
    });
    res.json(histories);
  } catch (error) {
    console.error("Error fetching chat histories:", error);
    res.status(500).json({ error: "Failed to fetch chat histories." });
  }
});

apiRouter.get("/teacher/chat-history/:historyId", async (req, res) => {
  const { historyId } = req.params;
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID is required." });
  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found." });

  try {
    const chatHistory = await prisma.chatHistory.findFirst({ // Use findFirst for more flexibility if needed
      where: { id: historyId, userId: user.id },
    });
    if (!chatHistory) return res.status(404).json({ error: "Chat history not found or access denied." });
    res.json(chatHistory);
  } catch (error) {
    console.error(`Error fetching chat history ${historyId}:`, error);
    res.status(500).json({ error: "Failed to fetch chat history." });
  }
});

// --- Chat Generation Route ---
apiRouter.post("/chat/generate-questions", async (req, res) => {
  const { clerkId, userQuery, questionPreferences, customPromptText, chatHistoryId } = req.body;
  console.log("Generate questions request for clerkId:", clerkId);
  console.log("Backend: /api/chat/generate-questions received clerkId:", clerkId); // ADD THIS LOG

  if (!clerkId || !userQuery || !questionPreferences) {
    return res.status(400).json({ error: "Missing required fields (clerkId, userQuery, questionPreferences)." });
  }

  const user = await getUserByClerkId(clerkId);
  console.log("Backend: User found by getUserByClerkId:", user);
  if (!user) {
    return res.status(404).json({ error: "User not found." }); // This is likely what you're seeing
  }

  const collectionName = `teacher_${user.id}_materials`; // Use internal DB user ID

  try {
    const qdrantStore = new QdrantVectorStore(embeddings, { client: qdrantClient, collectionName });
    let retrievedDocs = [];
    try {
      retrievedDocs = await qdrantStore.similaritySearch(userQuery, 5);
    } catch (qdrantSearchError) {
      console.warn(`Qdrant search error for collection ${collectionName} (might not exist or be empty):`, qdrantSearchError.message);
      // Proceed without retrieved docs if collection doesn't exist or search fails
    }

    const context = retrievedDocs.map(doc => doc.pageContent).join("\n\n---\n\n");
    const usedDocumentSources = [...new Set(retrievedDocs.map(doc => doc.metadata?.source || 'Unknown Source'))]; // Added optional chaining

    // ... (Bloom's levels info and targetBloomLevel extraction as before)
    const bloomLevelsInfo = `
      Bloom's Taxonomy Levels Definitions:
      - Remember: Recall facts and basic concepts. (Keywords: define, list, name, recall, repeat, state)
      - Understand: Explain ideas or concepts. (Keywords: classify, describe, discuss, explain, identify, summarize, paraphrase)
      - Apply: Use information in new situations. (Keywords: execute, implement, solve, use, demonstrate, interpret, schedule, sketch)
      - Analyze: Draw connections among ideas. (Keywords: differentiate, organize, relate, compare, contrast, distinguish, examine, experiment, question, test)
      - Evaluate: Justify a stand or decision. (Keywords: appraise, argue, defend, judge, select, support, value, critique, weigh)
      - Create: Produce new or original work. (Keywords: design, assemble, construct, conjecture, develop, formulate, author, investigate)
    `;

    let targetBloomLevel = "Understand"; // Default
    const queryLower = userQuery.toLowerCase();
    if (queryLower.includes("remember") || queryLower.includes("recall")) targetBloomLevel = "Remember";
    else if (queryLower.includes("understand") || queryLower.includes("explain")) targetBloomLevel = "Understand";
    else if (queryLower.includes("apply") || queryLower.includes("solve")) targetBloomLevel = "Apply";
    else if (queryLower.includes("analyze") || queryLower.includes("compare")) targetBloomLevel = "Analyze";
    else if (queryLower.includes("evaluate") || queryLower.includes("justify")) targetBloomLevel = "Evaluate";
    else if (queryLower.includes("create") || queryLower.includes("design")) targetBloomLevel = "Create";

    const systemPrompt = `
      You are an AI assistant specialized in generating educational questions based on Bloom's Taxonomy for a teacher.
      The teacher's general preferences for question paper generation are:
      ${customPromptText || "No custom prompt provided by the teacher."}

      Current specific question generation preferences for this request:
      - Pattern: ${questionPreferences.pattern}
      - Stream/Subject: ${questionPreferences.stream}
      - Marks Distribution: ${questionPreferences.marksDistribution}
      ${questionPreferences.marksDistribution === 'custom' ? `- Custom Marks: MCQ ${questionPreferences.customMarks.mcq}%, Short Answer ${questionPreferences.customMarks.shortAnswer}%, Long Answer ${questionPreferences.customMarks.longAnswer}%, Practical ${questionPreferences.customMarks.practical}%` : ''}
      
      ${bloomLevelsInfo}

      IMPORTANT: Based on the teacher's query and the provided context below, generate relevant questions.
      The teacher's query is: "${userQuery}"
      The targeted Bloom's Taxonomy level for the questions is: '${targetBloomLevel}'. Focus on this level.
      For each question, you MUST specify its Bloom's Taxonomy level (which should be '${targetBloomLevel}') and provide a brief justification explaining why it fits this level.
      
      Format your entire response strictly as a JSON array of objects. Each object in the array MUST have the following keys: "question" (string), "bloomLevel" (string - should be '${targetBloomLevel}'), and "justification" (string).
      Do not include any text outside of this JSON array.
      Example of the required JSON format:
      [
        {"question": "Define 'photosynthesis'.", "bloomLevel": "Remember", "justification": "This question requires recalling the definition of a key term."},
        {"question": "Explain the process of mitosis in your own words.", "bloomLevel": "Understand", "justification": "This question requires the student to explain a concept, demonstrating understanding rather than mere recall."}
      ]
    `;
    const fullPrompt = `
      ${systemPrompt}
      Provided Context from Teacher's Materials (if any):
      ---
      ${context || "No specific context was retrieved from the teacher's materials for this query. Generate questions based on the general query and targeted Bloom's level if possible, or state if context is absolutely necessary."}
      ---
      Generate the questions now in the specified JSON format:
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    const result = await model.generateContent(fullPrompt);
    const responseText = result.response.text();

    let generatedQuestions;
    try {
      const cleanedResponseText = responseText.trim().replace(/^```json\s*|```\s*$/g, '');
      generatedQuestions = JSON.parse(cleanedResponseText);
      if (!Array.isArray(generatedQuestions) || !generatedQuestions.every(q => q.question && q.bloomLevel && q.justification)) {
        console.warn("LLM response structure validation failed:", generatedQuestions);
        throw new Error("LLM response is not a valid array of question objects.");
      }
    } catch (parseError) {
      console.error("Failed to parse LLM response as JSON array of question objects. Raw response:", responseText, "Parse error:", parseError);
      generatedQuestions = [{ question: "I encountered an issue generating structured questions. Please try rephrasing your request. Raw AI Output: " + responseText.substring(0, 200) + "...", bloomLevel: "N/A", justification: "Error parsing or validating LLM output." }];
    }

    const messagesToStore = [
      { role: "user", content: userQuery, preferences: questionPreferences, customPrompt: customPromptText, timestamp: new Date().toISOString() },
      { role: "assistant", content: generatedQuestions, timestamp: new Date().toISOString() }
    ];

    let currentChatHistory;
    let finalChatHistoryId = chatHistoryId;

    if (finalChatHistoryId) {
      const existingChat = await prisma.chatHistory.findFirst({ where: { id: finalChatHistoryId, userId: user.id } });
      if (existingChat) {
        const previousMessages = Array.isArray(existingChat.messages) ? existingChat.messages : [];
        currentChatHistory = await prisma.chatHistory.update({
          where: { id: finalChatHistoryId },
          data: {
            messages: [...previousMessages, ...messagesToStore],
            usedDocuments: { sources: usedDocumentSources },
            generatedQuestions: { items: generatedQuestions }, // Assuming generatedQuestions is an array
            updatedAt: new Date(),
          },
        });
      } else {
        finalChatHistoryId = null;
      }
    }

    if (!finalChatHistoryId) {
      currentChatHistory = await prisma.chatHistory.create({
        data: {
          userId: user.id,
          class: questionPreferences.stream || 'General',
          subject: questionPreferences.stream || 'General',
          chapter: 'General',
          messages: messagesToStore,
          usedDocuments: { sources: usedDocumentSources },
          generatedQuestions: { items: generatedQuestions },
        },
      });
      finalChatHistoryId = currentChatHistory.id;
    }

    res.status(200).json({
      answer: generatedQuestions,
      chatHistoryId: finalChatHistoryId,
      usedSources: usedDocumentSources
    });

  } catch (error) {
    console.error("Error in RAG chat generation:", error);
    res.status(500).json({ error: "Failed to generate questions. " + error.message });
  }
});

// Get Teacher Profile (or create a basic one if non-existent from Clerk data)
apiRouter.get("/teacher/profile", async (req, res) => {
  const { clerkId } = req.query;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });

  const user = await getUserByClerkId(String(clerkId));
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    // Assuming you add a TeacherProfile model that has a one-to-one with User
    // Or you add profile fields directly to the User model
    // For this example, let's assume profile fields are on User model or a separate TeacherProfile
    // We'll check User model first, then try a hypothetical TeacherProfile model

    // For simplicity, let's assume fields 'department' and 'institution' could be on User
    // If you create TeacherProfile, query that instead:
    // let profile = await prisma.teacherProfile.findUnique({ where: { userId: user.id }});
    // if (!profile) return res.status(404).json({message: "Profile not created yet."});

    // Sending back relevant fields from User model. Adapt if you use TeacherProfile.
    res.json({
      name: user.name,
      email: user.email,
      department: user.department || null, // Assuming these optional fields exist on User model
      institution: user.institution || null, // Add these to your User model in schema.prisma
    });

  } catch (error) {
    console.error("Error fetching teacher profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

// Update/Create Teacher Profile
apiRouter.post("/teacher/profile", async (req, res) => {
  const { clerkId, name, email, department, institution } = req.body;
  if (!clerkId) return res.status(400).json({ error: "Clerk ID required" });

  const user = await getUserByClerkId(clerkId);
  if (!user) return res.status(404).json({ error: "User not found" });

  try {
    // Update the User model directly with these profile fields
    // Ensure 'department' and 'institution' are optional fields in your User model schema
    const updatedUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        name: name || user.name, // Keep existing if not provided
        email: email || user.email, // Clerk webhook should primarily handle email updates
        department: department,     // Allow null to clear
        institution: institution,   // Allow null to clear
      },
    });
    res.status(200).json({ message: "Profile updated successfully", profile: updatedUser });
  } catch (error) {
    console.error("Error updating teacher profile:", error);
    res.status(500).json({ error: "Failed to update profile" });
  }
});



// --- ADD THIS NEW ROUTE ---
apiRouter.get("/teacher/uploaded-files", async (req, res) => {
    const { clerkId, type, category } = req.query; // Get clerkId and optional type/category from query params

    console.log(`[GET /api/teacher/uploaded-files] Request for clerkId: '${clerkId}', type: '${type}', category: '${category}'`);

    if (!clerkId) {
        console.log("[GET /api/teacher/uploaded-files] Error: Clerk ID is required.");
        return res.status(400).json({ error: "Clerk ID is required" });
    }

    const user = await getUserByClerkId(String(clerkId));
    if (!user) {
        console.log(`[GET /api/teacher/uploaded-files] Error: User not found for clerkId: '${clerkId}'.`);
        return res.status(404).json({ error: "User not found" });
    }

    try {
        const whereClause = {
            uploadedById: user.id,
        };

        // Your frontend sends type=question_paper
        // You also added category='question_paper' during upload.
        // You need a 'category' field in your UploadedFile model to filter by this effectively.
        // Let's assume you add a 'category' field to your UploadedFile model.
        // If you used a different field name or no specific field for "question_paper", adjust this.

        if (category) { // Prefer using 'category' if you added it during upload
            whereClause.category = String(category);
        } else if (type) { // Fallback to 'type' if category isn't used, but 'type' is usually MIME type.
            // This 'type' filter might be too broad if it's just 'application/pdf'
            // It's better to have a dedicated 'category' or 'purpose' field in your UploadedFile model.
            console.warn("[GET /api/teacher/uploaded-files] Filtering by 'type' query param. Consider using a 'category' field for better specificity.");
            whereClause.fileType = { contains: String(type), mode: 'insensitive' }; // Example: 'pdf' or 'question_paper'
        }


        console.log(`[GET /api/teacher/uploaded-files] Prisma whereClause:`, whereClause);

        const files = await prisma.uploadedFile.findMany({
            where: whereClause,
            orderBy: { createdAt: 'desc' },
            // Select necessary fields for the QuestionPapers component
            select: {
                id: true,
                fileName: true,
                fileType: true,
                fileUrl: true, // For potential download links, though local paths won't work directly on client
                fileSize: true,
                createdAt: true,
                subject: true,
                classLevel: true,
                // Add other fields from UploadedFile that QuestionPapers.jsx expects, like:
                // year: true, (You'll need to add 'year' to UploadedFile model if it's specific to QPs)
                // examType: true, (You'll need to add 'examType' to UploadedFile model)
            }
        });

        console.log(`[GET /api/teacher/uploaded-files] Found ${files.length} files.`);
        res.json(files);
    } catch (error) {
        console.error("[GET /api/teacher/uploaded-files] !!! Internal Server Error:", error);
        res.status(500).json({ error: "Failed to fetch uploaded files", details: error.message });
    }
});

// --- ADD THIS NEW ROUTE FOR DELETING UPLOADED FILES ---
apiRouter.delete("/teacher/uploaded-files/:fileId", async (req, res) => {
    const { fileId } = req.params;
    const { clerkId } = req.body; // Clerk ID for authorization

    console.log(`[DELETE /api/teacher/uploaded-files/${fileId}] Request for clerkId: '${clerkId}'`);

    if (!clerkId) {
        return res.status(401).json({ error: "Clerk ID required for authorization" });
    }
    if (!fileId) {
        return res.status(400).json({ error: "File ID is required" });
    }

    const user = await getUserByClerkId(String(clerkId));
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    try {
        const fileToDelete = await prisma.uploadedFile.findUnique({
            where: { id: fileId },
        });

        if (!fileToDelete) {
            return res.status(404).json({ error: "File not found" });
        }

        if (fileToDelete.uploadedById !== user.id) {
            return res.status(403).json({ error: "Forbidden: You do not own this file" });
        }

        // 1. Delete from Qdrant (if vectorized)
        if (fileToDelete.isVectorized && fileToDelete.qdrantCollection && Array.isArray(fileToDelete.qdrantIds) && fileToDelete.qdrantIds.length > 0) {
            try {
                console.log(`[DELETE /api/teacher/uploaded-files] Deleting Qdrant points for file ${fileId}:`, fileToDelete.qdrantIds);
                await qdrantClient.deletePoints(fileToDelete.qdrantCollection, {
                    points: fileToDelete.qdrantIds,
                });
                console.log(`[DELETE /api/teacher/uploaded-files] Successfully deleted Qdrant points for file ${fileId}`);
            } catch (qdrantError) {
                console.error(`[DELETE /api/teacher/uploaded-files] Error deleting Qdrant points for file ${fileId}:`, qdrantError);
                // Decide if you want to proceed with DB deletion even if Qdrant deletion fails
            }
        }

        // 2. Delete physical file from UPLOAD_DIR (if stored locally)
        // Ensure fileUrl is a local path before attempting to unlink
        if (fileToDelete.fileUrl && fileToDelete.fileUrl.startsWith(path.join(__dirname, UPLOAD_DIR))) {
             try {
                await fs.unlink(fileToDelete.fileUrl);
                console.log(`[DELETE /api/teacher/uploaded-files] Successfully deleted physical file: ${fileToDelete.fileUrl}`);
            } catch (fileError) {
                console.error(`[DELETE /api/teacher/uploaded-files] Error deleting physical file ${fileToDelete.fileUrl}:`, fileError);
                // Decide if you want to proceed with DB deletion even if physical file deletion fails
            }
        }


        // 3. Delete from Prisma Database
        await prisma.uploadedFile.delete({
            where: { id: fileId },
        });

        console.log(`[DELETE /api/teacher/uploaded-files] Successfully deleted file record ${fileId} from database.`);
        res.status(204).send(); // No content, successful deletion
    } catch (error) {
        console.error(`[DELETE /api/teacher/uploaded-files] !!! Internal Server Error deleting file ${fileId}:`, error);
        res.status(500).json({ error: "Failed to delete file", details: error.message });
    }
});


// Mount the API router
app.use('/api', apiRouter);

// Root route (outside /api prefix)
app.get('/', (req, res) => {
  res.send('QuestionGenius API is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});