//backend/prisma/migrations/20250510172209_init/migration.sql

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'TEACHER', 'PUBLIC');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'PUBLIC',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subscription" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "plan" TEXT NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Subscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Note" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "fileUrl" TEXT,
    "qdrantId" TEXT,
    "qdrantCollection" TEXT,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "classLevel" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "institution" TEXT,
    "department" TEXT,
    "courseCode" TEXT,
    "isVectorized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreviousYearQuestion" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "fileUrl" TEXT,
    "qdrantId" TEXT,
    "qdrantCollection" TEXT,
    "userId" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "classLevel" TEXT NOT NULL,
    "board" TEXT NOT NULL,
    "language" TEXT NOT NULL DEFAULT 'en',
    "semester" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "institution" TEXT,
    "department" TEXT,
    "courseCode" TEXT,
    "isVectorized" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PreviousYearQuestion_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UploadedFile" (
    "id" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileType" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "uploadedById" TEXT NOT NULL,
    "processed" BOOLEAN NOT NULL DEFAULT false,
    "isVectorized" BOOLEAN NOT NULL DEFAULT false,
    "qdrantIds" JSONB,
    "qdrantCollection" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "institution" TEXT,
    "department" TEXT,
    "courseCode" TEXT,
    "subject" TEXT,
    "classLevel" TEXT,
    "chapter" TEXT,

    CONSTRAINT "UploadedFile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChatHistory" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "chapter" TEXT NOT NULL,
    "messages" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "usedDocuments" JSONB,
    "generatedQuestions" JSONB,

    CONSTRAINT "ChatHistory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionPaper" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "classLevel" TEXT NOT NULL,
    "questions" JSONB NOT NULL,
    "bloomStructure" JSONB NOT NULL,
    "createdBy" TEXT NOT NULL,
    "totalMarks" INTEGER NOT NULL,
    "duration" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "institution" TEXT,
    "department" TEXT,
    "courseCode" TEXT,

    CONSTRAINT "QuestionPaper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Note" ADD CONSTRAINT "Note_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PreviousYearQuestion" ADD CONSTRAINT "PreviousYearQuestion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UploadedFile" ADD CONSTRAINT "UploadedFile_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ChatHistory" ADD CONSTRAINT "ChatHistory_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;



this schema.prisma file 

// This is your Prisma schema file for the Question Paper Generator
// Modified to support RAG implementation with notes/PYQ storage and processing

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}

model User {
  id            String                 @id @default(uuid())
  clerkId       String                 @unique
  email         String
  name          String
  role          Role                   @default(PUBLIC) // ENUM Teacher or Admin as per diagram
  createdAt     DateTime               @default(now())
  updatedAt     DateTime               @updatedAt
  subscriptions Subscription[]
  chatHistory   ChatHistory[]
  notes         Note[] // Added as per diagram
  pyqs          PreviousYearQuestion[] // Added as per diagram
  uploadedFiles UploadedFile[] // For tracking all file uploads
}

model Subscription {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  plan      String
  startDate DateTime @default(now())
  endDate   DateTime
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
}

// Added as per diagram showing Notes[] in the Prisma model
model Note {
  id               String   @id @default(uuid())
  title            String
  content          String? // Optional content if stored directly
  fileUrl          String? // URL to the stored file if applicable
  qdrantId         String? // Reference ID for the vector in Qdrant database
  qdrantCollection String? // Collection name in Qdrant where this note's vectors are stored
  user             User     @relation(fields: [userId], references: [id])
  userId           String
  subject          String
  classLevel       String
  chapter          String
  board            String
  language         String   @default("en")
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  // UG-BCA-DD style classification from diagram
  institution      String? // e.g., "UG"
  department       String? // e.g., "BCA"
  courseCode       String? // e.g., "DD"
  isVectorized     Boolean  @default(false) // Flag to track if this note has been vectorized in Qdrant
}

// Added as per diagram showing PYQ[] in the Prisma model
model PreviousYearQuestion {
  id               String   @id @default(uuid())
  title            String
  year             Int
  fileUrl          String? // URL to the stored file
  qdrantId         String? // Reference ID for the vector in Qdrant database
  qdrantCollection String? // Collection name in Qdrant where this PYQ's vectors are stored
  user             User     @relation(fields: [userId], references: [id])
  userId           String
  subject          String
  classLevel       String
  board            String
  language         String   @default("en")
  semester         String? // Optional semester information
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  // UG-BCA-DD style classification from diagram
  institution      String? // e.g., "UG"
  department       String? // e.g., "BCA"
  courseCode       String? // e.g., "DD"
  isVectorized     Boolean  @default(false) // Flag to track if this PYQ has been vectorized in Qdrant
}

// Generic model for tracking uploaded files (could be notes, PYQs, etc.)
model UploadedFile {
  id               String   @id @default(uuid())
  fileName         String
  fileType         String // PDF, DOCX, etc.
  fileUrl          String
  fileSize         Int // Size in bytes
  uploadedBy       User     @relation(fields: [uploadedById], references: [id])
  uploadedById     String
  processed        Boolean  @default(false) // Whether the file has been processed for RAG
  isVectorized     Boolean  @default(false) // Whether the file has been vectorized
  qdrantIds        Json? // Array of vector IDs in Qdrant if this file was chunked into multiple vectors
  qdrantCollection String? // Collection name in Qdrant where this file's vectors are stored
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
  // Classification metadata
  institution      String? // e.g., "UG"
  department       String? // e.g., "BCA"
  courseCode       String? // e.g., "DD"
  subject          String?
  classLevel       String?
  chapter          String?
}

model ChatHistory {
  id        String   @id @default(uuid())
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  class     String
  subject   String
  chapter   String
  messages  Json // [{role: "user", content: "..."}, {role: "assistant", content: "..."}]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  // Additional fields for RAG context
  usedDocuments      Json? // IDs or references to documents used in responses
  generatedQuestions Json? // Store generated questions separately if needed
}

// We no longer need the VectorStore model as vectors are stored directly in Qdrant

// Added to store generated question papers
model QuestionPaper {
  id             String   @id @default(uuid())
  title          String
  subject        String
  classLevel     String
  questions      Json // Array of generated questions with bloom's taxonomy levels
  bloomStructure Json // Distribution of questions across bloom's taxonomy levels
  createdBy      String // User ID who created it
  totalMarks     Int
  duration       Int // Duration in minutes
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  // Classification metadata
  institution String? // e.g., "UG"
  department  String? // e.g., "BCA"
  courseCode  String? // e.g., "DD"
}

enum Role {
  ADMIN
  TEACHER
  PUBLIC
}



this is .env
i knowthis is not a recommended approach but plese ignore my security things i share with u . 

# Connect to Supabase via connection pooling
DATABASE_URL="postgresql://postgres.uvnvuqouficjnxvyyjob:785670@Prisma@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true"

# Direct connection to the database. Used for migrations
DIRECT_URL="postgresql://postgres.uvnvuqouficjnxvyyjob:785670@Prisma@aws-0-ap-south-1.pooler.supabase.com:5432/postgres"


WEBHOOK_SECRET=whsec_4fdVgSseUdanBf2ph2FXjDS6R1n6fyFh

this is server.js

import express from 'express';
import cors from 'cors';
import { Webhook } from 'svix';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post("/api/user/webhook", async (req, res) => {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    console.error("Missing WEBHOOK_SECRET");
    return res.status(500).send("Server misconfiguration");
  }
  
  const svix_id = req.headers["svix-id"];
  const svix_timestamp = req.headers["svix-timestamp"];
  const svix_signature = req.headers["svix-signature"];
  
  if (!svix_id || !svix_timestamp || !svix_signature) {
    console.error("Missing Svix headers");
    return res.status(400).send("Missing Svix headers");
  }
  
  const payload = req.body;
  const body = JSON.stringify(payload);
  
  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;
  
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return res.status(400).send("Webhook verification failed");
  }
  
  const { id } = evt.data;
  const eventType = evt.type;
  
  const { email_addresses, primary_email_address_id, first_name, last_name } = evt.data;
  const primaryEmail = email_addresses.find(
    (email) => email.id === primary_email_address_id
  );
  const fullName = [first_name, last_name].filter(Boolean).join(" ");
  
  if (eventType === "user.created") {
    await prisma.user.create({
      data: {
        clerkId: id,
        email: primaryEmail?.email_address || "no-email@example.com",
        name: fullName || "Unknown User",
      },
    });
    
    console.log("✅ Clerk user created");
  }
  
  if (eventType === "user.updated") {
    await prisma.user.update({
      where: { clerkId: id },
      data: {
        email: primaryEmail?.email_address || "no-email@example.com",
        name: fullName || "Unknown User",
      },
    });
    
    console.log("✏️ Clerk user updated");
  }
  
  return res.status(200).send("Webhook received successfully");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});