================================================
FILE: components.json
================================================
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  }
}


================================================
FILE: eslint.config.js
================================================
import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/no-unused-vars": "off",
    },
  }
);



================================================
FILE: index.html
================================================
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>chatter-up-upload-hub</title>
    <meta name="description" content="Lovable Generated Project" />
    <meta name="author" content="Lovable" />

    <meta property="og:title" content="chatter-up-upload-hub" />
    <meta property="og:description" content="Lovable Generated Project" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:site" content="@lovable_dev" />
    <meta name="twitter:image" content="https://lovable.dev/opengraph-image-p98pqg.png" />
  </head>

  <body>
    <div id="root"></div>
    <!-- IMPORTANT: DO NOT REMOVE THIS SCRIPT TAG OR THIS VERY COMMENT! -->
    <script src="https://cdn.gpteng.co/gptengineer.js" type="module"></script>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>



================================================
FILE: package.json
================================================
{
  "name": "vite_react_shadcn_ts",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "build:dev": "vite build --mode development",
    "lint": "eslint .",
    "preview": "vite preview"
  },
  "dependencies": {
    "@clerk/clerk-react": "^5.31.2",
    "@hookform/resolvers": "^3.9.0",
    "@radix-ui/react-accordion": "^1.2.0",
    "@radix-ui/react-alert-dialog": "^1.1.1",
    "@radix-ui/react-aspect-ratio": "^1.1.0",
    "@radix-ui/react-avatar": "^1.1.0",
    "@radix-ui/react-checkbox": "^1.1.1",
    "@radix-ui/react-collapsible": "^1.1.0",
    "@radix-ui/react-context-menu": "^2.2.1",
    "@radix-ui/react-dialog": "^1.1.2",
    "@radix-ui/react-dropdown-menu": "^2.1.1",
    "@radix-ui/react-hover-card": "^1.1.1",
    "@radix-ui/react-label": "^2.1.0",
    "@radix-ui/react-menubar": "^1.1.1",
    "@radix-ui/react-navigation-menu": "^1.2.0",
    "@radix-ui/react-popover": "^1.1.1",
    "@radix-ui/react-progress": "^1.1.0",
    "@radix-ui/react-radio-group": "^1.2.0",
    "@radix-ui/react-scroll-area": "^1.1.0",
    "@radix-ui/react-select": "^2.1.1",
    "@radix-ui/react-separator": "^1.1.0",
    "@radix-ui/react-slider": "^1.2.0",
    "@radix-ui/react-slot": "^1.1.0",
    "@radix-ui/react-switch": "^1.1.0",
    "@radix-ui/react-tabs": "^1.1.0",
    "@radix-ui/react-toast": "^1.2.1",
    "@radix-ui/react-toggle": "^1.1.0",
    "@radix-ui/react-toggle-group": "^1.1.0",
    "@radix-ui/react-tooltip": "^1.1.4",
    "@tanstack/react-query": "^5.56.2",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.0.0",
    "date-fns": "^3.6.0",
    "embla-carousel-react": "^8.3.0",
    "input-otp": "^1.2.4",
    "lucide-react": "^0.462.0",
    "motion": "^12.11.0",
    "next-themes": "^0.3.0",
    "react": "^18.3.1",
    "react-day-picker": "^8.10.1",
    "react-dom": "^18.3.1",
    "react-hook-form": "^7.53.0",
    "react-resizable-panels": "^2.1.3",
    "react-router-dom": "^6.26.2",
    "recharts": "^2.12.7",
    "sonner": "^1.5.0",
    "tailwind-merge": "^2.6.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^0.9.3",
    "zod": "^3.23.8"
  },
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "@tailwindcss/typography": "^0.5.15",
    "@types/node": "^22.5.5",
    "@types/react": "^18.3.3",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react-swc": "^3.5.0",
    "autoprefixer": "^10.4.20",
    "eslint": "^9.9.0",
    "eslint-plugin-react-hooks": "^5.1.0-rc.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "globals": "^15.9.0",
    "lovable-tagger": "^1.1.7",
    "postcss": "^8.4.47",
    "tailwindcss": "^3.4.11",
    "typescript": "^5.5.3",
    "typescript-eslint": "^8.0.1",
    "vite": "^5.4.1"
  }
}



================================================
FILE: postcss.config.js
================================================
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}



================================================
FILE: tailwind.config.ts
================================================

import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Custom theme colors based on provided palette
				theme: {
					primary: '#C70039',
					secondary: '#511849',
					tertiary: '#900C3F',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'fade-out': {
					'0%': { opacity: '1' },
					'100%': { opacity: '0' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(0)' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(10px)' }
				},
				'pulse-scale': {
					'0%, 100%': { transform: 'scale(1)' },
					'50%': { transform: 'scale(1.05)' }
				},
				'bounce-light': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.5s ease-out',
				'fade-out': 'fade-out 0.5s ease-out',
				'slide-in': 'slide-in 0.5s ease-out',
				'slide-right': 'slide-right 0.5s ease-out infinite',
				'pulse-scale': 'pulse-scale 2s ease-in-out infinite',
				'bounce-light': 'bounce-light 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;



================================================
FILE: tsconfig.app.json
================================================
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,
    "jsx": "react-jsx",

    /* Linting */
    "strict": false,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noImplicitAny": false,
    "noFallthroughCasesInSwitch": false,

    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src"]
}



================================================
FILE: tsconfig.json
================================================
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    },
    "noImplicitAny": false,
    "noUnusedParameters": false,
    "skipLibCheck": true,
    "allowJs": true,
    "noUnusedLocals": false,
    "strictNullChecks": false
  }
}



================================================
FILE: tsconfig.node.json
================================================
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2023"],
    "module": "ESNext",
    "skipLibCheck": true,

    /* Bundler mode */
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "isolatedModules": true,
    "moduleDetection": "force",
    "noEmit": true,

    /* Linting */
    "strict": true,
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["vite.config.ts"]
}



================================================
FILE: vite.config.ts
================================================
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));



================================================
FILE: backend/package.json
================================================
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "license": "ISC",
  "author": "",
  "type": "module",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node server.js"
  },
  "dependencies": {
    "@prisma/client": "^6.7.0",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "nodemon": "^3.1.10",
    "svix": "^1.65.0"
  }
}



================================================
FILE: backend/server.js
================================================
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


================================================
FILE: backend/.gitignore
================================================
# Dependency directories
node_modules/

# Environment variables
.env

# Logs
logs/
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS-specific files
.DS_Store
Thumbs.db

# Build output
dist/
build/

# Temporary files
*.tmp
*.temp

# Editor-specific files
.vscode/
.idea/
*.swp

# Test coverage
coverage/

# Package lock files (optional, if not using lock files)
package-lock.json
yarn.lock


================================================
FILE: backend/prisma/schema.prisma
================================================
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



================================================
FILE: backend/prisma/migrations/migration_lock.toml
================================================
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"



================================================
FILE: backend/prisma/migrations/20250510172209_init/migration.sql
================================================
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



================================================
FILE: prompts/backend_files.md
================================================
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


================================================
FILE: prompts/frontend_file.txt
================================================
// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import TeachersDashboard from "./pages/TeachersDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in/*" element={<Login />} />
            <Route path="/sign-up/*" element={<Signup />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/dashboard" element={<TeachersDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;


// src/components/dashboard/CustomPromptEditor.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";

const promptPlaceholder = `I teach Computer Science to 2nd year undergraduates. 
When creating question papers, I prefer:
- 40% easy questions, 40% medium difficulty, and 20% challenging questions
- Mix of theoretical and practical questions
- Include at least two programming problems for each paper
- Focus on fundamental concepts rather than memorization`;

const CustomPromptEditor: React.FC = () => {
  const [promptText, setPromptText] = useState<string>(promptPlaceholder);
  const [preferences, setPreferences] = useState({
    includeObjective: true,
    includeSubjective: true,
    includePractical: true,
    balancedDifficulty: true,
    focusOnConcepts: true,
    includeRealWorld: false,
    includeDiagrams: false
  });
  
  const handleSavePrompt = () => {
    // In a real application, this would save to a backend
    console.log("Saved prompt:", promptText);
    console.log("Preferences:", preferences);
    // Show success message or toast
  };
  
  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">AI Prompt Preferences</h2>
        <p className="text-white/70">
          Customize your preferences for AI-generated question papers. This information helps the AI understand your teaching style and requirements.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card className="glass-morphism border-theme-tertiary/20 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Custom AI Prompt</CardTitle>
              <p className="text-sm text-white/70">
                Describe your question paper style, preferences, and requirements in detail
              </p>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={promptText} 
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe your question paper preferences here..."
                className="h-80 bg-theme-secondary/20 border-theme-tertiary/30 text-white"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-theme-primary hover:bg-theme-primary/80"
                onClick={handleSavePrompt}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card className="glass-morphism border-theme-tertiary/20 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Quick Preferences</CardTitle>
              <p className="text-sm text-white/70">
                Select common preferences to incorporate
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="objective" 
                  checked={preferences.includeObjective}
                  onCheckedChange={() => togglePreference('includeObjective')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="objective"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Objective Questions
                  </label>
                  <p className="text-xs text-white/50">
                    MCQs, true/false, fill in the blanks
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="subjective" 
                  checked={preferences.includeSubjective}
                  onCheckedChange={() => togglePreference('includeSubjective')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="subjective"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Subjective Questions
                  </label>
                  <p className="text-xs text-white/50">
                    Short answer, essay questions
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="practical" 
                  checked={preferences.includePractical}
                  onCheckedChange={() => togglePreference('includePractical')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="practical"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Practical Problems
                  </label>
                  <p className="text-xs text-white/50">
                    Implementation, coding challenges
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="balanced" 
                  checked={preferences.balancedDifficulty}
                  onCheckedChange={() => togglePreference('balancedDifficulty')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="balanced"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Balanced Difficulty Level
                  </label>
                  <p className="text-xs text-white/50">
                    Mix of easy, medium, and challenging
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="concepts" 
                  checked={preferences.focusOnConcepts}
                  onCheckedChange={() => togglePreference('focusOnConcepts')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="concepts"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Focus on Concepts
                  </label>
                  <p className="text-xs text-white/50">
                    Testing understanding over memorization
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="realworld" 
                  checked={preferences.includeRealWorld}
                  onCheckedChange={() => togglePreference('includeRealWorld')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="realworld"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Real-World Applications
                  </label>
                  <p className="text-xs text-white/50">
                    Scenario-based questions with practical applications
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="diagrams" 
                  checked={preferences.includeDiagrams}
                  onCheckedChange={() => togglePreference('includeDiagrams')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="diagrams"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Diagrams/Visual Elements
                  </label>
                  <p className="text-xs text-white/50">
                    Questions requiring diagrams or visual interpretation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomPromptEditor;


//src/components/dashboard/QuestionPapers.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { FilePlus, Trash2, FileText, Download } from "lucide-react";

interface QuestionPaper {
  id: string;
  subject: string;
  year: string;
  examType: string;
  totalMarks: number;
  filename: string;
  uploadDate: string;
}

const QuestionPapers: React.FC = () => {
  const [papers, setPapers] = useState<QuestionPaper[]>([
    {
      id: '1',
      subject: 'Mathematics',
      year: '2024',
      examType: 'Mid Term',
      totalMarks: 50,
      filename: 'math_midterm_2024.pdf',
      uploadDate: '2025-05-01'
    },
    {
      id: '2',
      subject: 'Physics',
      year: '2024',
      examType: 'Final',
      totalMarks: 100,
      filename: 'physics_final_2024.pdf',
      uploadDate: '2025-05-03'
    },
    {
      id: '3',
      subject: 'Computer Science',
      year: '2024',
      examType: 'Mid Term',
      totalMarks: 60,
      filename: 'cs_midterm_2024.pdf',
      uploadDate: '2025-05-06'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaper, setNewPaper] = useState<Omit<QuestionPaper, 'id' | 'uploadDate'>>({
    subject: '',
    year: new Date().getFullYear().toString(),
    examType: '',
    totalMarks: 100,
    filename: ''
  });
  
  const handleAddPaper = () => {
    if (newPaper.subject && newPaper.examType && newPaper.filename) {
      const newId = Date.now().toString();
      const currentDate = new Date().toISOString().split('T')[0];
      
      setPapers([...papers, {
        id: newId,
        ...newPaper,
        uploadDate: currentDate
      }]);
      
      setNewPaper({
        subject: '',
        year: new Date().getFullYear().toString(),
        examType: '',
        totalMarks: 100,
        filename: ''
      });
      
      setShowAddForm(false);
    }
  };
  
  const handleDeletePaper = (id: string) => {
    setPapers(papers.filter(paper => paper.id !== id));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewPaper({...newPaper, filename: file.name});
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Question Papers</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Upload Question Paper
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Upload Question Paper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Subject</label>
                <Input 
                  value={newPaper.subject} 
                  onChange={(e) => setNewPaper({...newPaper, subject: e.target.value})}
                  placeholder="e.g. Mathematics"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Year</label>
                <Input 
                  value={newPaper.year} 
                  onChange={(e) => setNewPaper({...newPaper, year: e.target.value})}
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Exam Type</label>
                <Input 
                  value={newPaper.examType} 
                  onChange={(e) => setNewPaper({...newPaper, examType: e.target.value})}
                  placeholder="e.g. Mid Term, Final"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Total Marks</label>
                <Input 
                  type="number"
                  value={newPaper.totalMarks} 
                  onChange={(e) => setNewPaper({...newPaper, totalMarks: parseInt(e.target.value)})}
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Upload File</label>
              <Input 
                type="file" 
                onChange={handleFileChange}
                className="bg-theme-secondary/20 border-theme-tertiary/30"
                accept=".pdf,.doc,.docx"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
              className="border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddPaper}
              className="bg-theme-primary hover:bg-theme-primary/80"
              disabled={!newPaper.filename}
            >
              Upload Paper
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <Card className="glass-morphism border-theme-tertiary/20">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-theme-secondary/30">
              <TableRow className="border-b-theme-tertiary/30">
                <TableHead className="text-white">Subject</TableHead>
                <TableHead className="text-white">Year</TableHead>
                <TableHead className="text-white">Exam Type</TableHead>
                <TableHead className="text-white">Total Marks</TableHead>
                <TableHead className="text-white">Filename</TableHead>
                <TableHead className="text-white">Upload Date</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper) => (
                <TableRow key={paper.id} className="border-b-theme-tertiary/20">
                  <TableCell>{paper.subject}</TableCell>
                  <TableCell>{paper.year}</TableCell>
                  <TableCell>{paper.examType}</TableCell>
                  <TableCell>{paper.totalMarks}</TableCell>
                  <TableCell>{paper.filename}</TableCell>
                  <TableCell>{paper.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-theme-tertiary/20">
                        <Download size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeletePaper(paper.id)}
                        className="h-8 w-8 text-white/50 hover:text-white hover:bg-theme-tertiary/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPapers;


//src/components/dashboard/SubjectNotes.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Trash2, FileText } from "lucide-react";

interface Note {
  id: string;
  subject: string;
  title: string;
  content: string;
  date: string;
}

const SubjectNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Calculus Fundamentals',
      content: 'Key concepts in differential calculus including limits, derivatives and their applications.',
      date: '2025-05-02'
    },
    {
      id: '2',
      subject: 'Physics',
      title: 'Quantum Mechanics',
      content: 'An introduction to wave functions, Schrödinger equation and quantum states.',
      date: '2025-05-04'
    },
    {
      id: '3',
      subject: 'Computer Science',
      title: 'Data Structures',
      content: 'Overview of arrays, linked lists, stacks, queues, trees and graphs.',
      date: '2025-05-08'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState<Omit<Note, 'id' | 'date'>>({
    subject: '',
    title: '',
    content: ''
  });
  
  const handleAddNote = () => {
    if (newNote.subject && newNote.title && newNote.content) {
      const newId = Date.now().toString();
      const currentDate = new Date().toISOString().split('T')[0];
      
      setNotes([...notes, {
        id: newId,
        ...newNote,
        date: currentDate
      }]);
      
      setNewNote({
        subject: '',
        title: '',
        content: ''
      });
      
      setShowAddForm(false);
    }
  };
  
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Subject Notes</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Add New Note
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Add New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Subject</label>
                <Input 
                  value={newNote.subject} 
                  onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
                  placeholder="e.g. Mathematics"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Title</label>
                <Input 
                  value={newNote.title} 
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  placeholder="e.g. Calculus Fundamentals"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Content</label>
              <Textarea 
                value={newNote.content} 
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                placeholder="Enter your note content here..."
                className="h-32 bg-theme-secondary/20 border-theme-tertiary/30"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
              className="border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddNote}
              className="bg-theme-primary hover:bg-theme-primary/80"
            >
              Save Note
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="glass-morphism border-theme-tertiary/20 hover:border-theme-tertiary/40 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-theme-tertiary/70">{note.subject}</p>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteNote(note.id)}
                  className="h-8 w-8 text-white/50 hover:text-white hover:bg-theme-tertiary/20"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 line-clamp-4">{note.content}</p>
            </CardContent>
            <CardFooter className="pt-2 border-t border-white/10 flex justify-between">
              <p className="text-xs text-white/50">{note.date}</p>
              <div className="flex items-center text-xs text-white/50">
                <FileText size={12} className="mr-1" />
                Note
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectNotes;


//src/components/dashboard/TeachersInfo.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCircle, Edit2, Save } from "lucide-react";

interface TeacherInfoData {
  name: string;
  department: string;
  semester: string;
  email: string;
}

const TeacherInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState<TeacherInfoData>({
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    semester: "Fall 2025",
    email: "sarahjohnson@university.edu"
  });
  
  const [editForm, setEditForm] = useState<TeacherInfoData>({...teacherInfo});
  
  const handleSave = () => {
    setTeacherInfo(editForm);
    setIsEditing(false);
  };
  
  return (
    <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-white">Teacher Information</CardTitle>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="h-8 w-8 text-white/70 hover:text-white"
        >
          {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex justify-center items-center">
            <div className="bg-theme-secondary/30 rounded-full p-8 border-2 border-theme-tertiary/30">
              <UserCircle className="w-16 h-16 text-white/80" />
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Name</label>
                  <Input 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Department</label>
                  <Input 
                    value={editForm.department} 
                    onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Semester</label>
                  <Input 
                    value={editForm.semester} 
                    onChange={(e) => setEditForm({...editForm, semester: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <Input 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-white/70">Name</p>
                  <p className="font-semibold text-white">{teacherInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Department</p>
                  <p className="font-semibold text-white">{teacherInfo.department}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Semester</p>
                  <p className="font-semibold text-white">{teacherInfo.semester}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-semibold text-white">{teacherInfo.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherInfo;

// src/components/preferences/CustomMarksDistribution.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { QuestionPreferencesType } from '@/types/questionPreferences';

interface CustomMarksDistributionProps {
  customMarks: QuestionPreferencesType['customMarks'];
  onCustomMarksChange: (type: keyof QuestionPreferencesType['customMarks'], value: number) => void;
}

const CustomMarksDistribution: React.FC<CustomMarksDistributionProps> = ({
  customMarks,
  onCustomMarksChange
}) => {
  const totalMarks = customMarks.mcq + customMarks.shortAnswer + customMarks.longAnswer + customMarks.practical;
  
  return (
    <div className="space-y-3 mt-2">
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">MCQs: {customMarks.mcq}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.mcq]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('mcq', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Short Answer: {customMarks.shortAnswer}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.shortAnswer]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('shortAnswer', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Long Answer: {customMarks.longAnswer}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.longAnswer]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('longAnswer', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Practical: {customMarks.practical}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.practical]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('practical', value)}
        />
      </div>
      
      <div className="mt-4 py-3 px-4 rounded-lg bg-gray-700/50 border border-gray-600">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">Total:</span>
          <span className={`text-xl font-bold ${totalMarks !== 100 ? 'text-red-400' : 'text-green-400'}`}>
            {totalMarks}%
          </span>
        </div>
        {totalMarks !== 100 && 
          <p className="text-red-400 text-sm mt-1">Must equal 100%</p>
        }
      </div>
    </div>
  );
};

export default CustomMarksDistribution;



// src/components/preferences/MarksDistributionSelector.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { predefinedMarks, QuestionPreferencesType } from '@/types/questionPreferences';
import CustomMarksDistribution from './CustomMarksDistribution';

interface MarksDistributionSelectorProps {
  preferences: QuestionPreferencesType;
  onPreferenceChange: (key: keyof QuestionPreferencesType, value: any) => void;
  onCustomMarksChange: (type: keyof QuestionPreferencesType['customMarks'], value: number) => void;
}

const MarksDistributionSelector: React.FC<MarksDistributionSelectorProps> = ({
  preferences,
  onPreferenceChange,
  onCustomMarksChange
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-gray-300">Marks Distribution</Label>
      <RadioGroup 
        defaultValue="predefined"
        value={preferences.marksDistribution}
        onValueChange={(value: 'predefined' | 'custom') => onPreferenceChange('marksDistribution', value)}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="predefined" id="predefined" />
          <Label htmlFor="predefined" className="text-sm text-gray-300">Predefined Distribution</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom" className="text-sm text-gray-300">Custom Distribution</Label>
        </div>
      </RadioGroup>

      {preferences.marksDistribution === 'predefined' ? (
        <div className="space-y-2">
          <Select defaultValue="standard">
            <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
              <SelectValue placeholder="Select predefined distribution" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {predefinedMarks.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <CustomMarksDistribution 
          customMarks={preferences.customMarks}
          onCustomMarksChange={onCustomMarksChange}
        />
      )}
    </div>
  );
};

export default MarksDistributionSelector;


// src/components/preferences/PatternStreamSelector.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patterns, streams, QuestionPreferencesType } from '@/types/questionPreferences';

interface PatternStreamSelectorProps {
  preferences: QuestionPreferencesType;
  onPreferenceChange: (key: keyof QuestionPreferencesType, value: any) => void;
}

const PatternStreamSelector: React.FC<PatternStreamSelectorProps> = ({
  preferences,
  onPreferenceChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm text-gray-300">Question Pattern</Label>
        <Select 
          value={preferences.pattern}
          onValueChange={(value) => onPreferenceChange('pattern', value)}
        >
          <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
            <SelectValue placeholder="Select pattern" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {patterns.map(pattern => (
              <SelectItem key={pattern.value} value={pattern.value}>
                {pattern.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-gray-300">Subject Stream</Label>
        <Select 
          value={preferences.stream}
          onValueChange={(value) => onPreferenceChange('stream', value)}
        >
          <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
            <SelectValue placeholder="Select stream" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {streams.map(stream => (
              <SelectItem key={stream.value} value={stream.value}>
                {stream.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PatternStreamSelector;



// src/components/ChatHistory.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, History } from "lucide-react";

interface ChatHistoryProps {
  histories: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  activeHistoryId: string | null;
  onSelectHistory: (historyId: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  histories, 
  activeHistoryId, 
  onSelectHistory 
}) => {
  return (
    <div className="h-full w-full bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <History size={20} />
          Chat History
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {histories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No previous chats found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {histories.map((history) => (
              <button
                key={history.id}
                onClick={() => onSelectHistory(history.id)}
                className={`w-full text-left p-3 rounded-md transition-all duration-300 hover:bg-theme-tertiary/20 group flex items-start gap-3 animate-fade-in hover-lift ${
                  activeHistoryId === history.id ? 'bg-theme-tertiary/30 border border-theme-tertiary/50' : 'bg-gray-800/50'
                }`}
              >
                <FileText size={18} className="text-gray-400 group-hover:text-theme-primary transition-colors mt-1" />
                <div>
                  <h3 className="font-medium text-white group-hover:text-theme-primary transition-colors">
                    {history.title}
                  </h3>
                  <p className="text-sm text-gray-400">{history.date}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-800">
        <Button 
          className="w-full bg-theme-primary hover:bg-theme-primary/80 text-white"
          size="sm"
        >
          New Chat
        </Button>
      </div>
    </div>
  );
};

export default ChatHistory;


// src/components/ChatInput.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
interface ChatInputProps {
  onSendMessage: (text: string) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSending(true);

      // Simulate sending delay for animation
      setTimeout(() => {
        onSendMessage(message);
        setMessage('');
        setIsSending(false);
      }, 300);
    }
  };
  return <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
      <input type="text" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} disabled={isSending} className="flex-1 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-theme-primary bg-gray-800 text-white transition-all duration-300 text-base rounded-xl" />
      <Button type="submit" disabled={!message.trim() || isSending} className={`bg-theme-primary hover:bg-theme-tertiary transition-all duration-300 ${message.trim() && !isSending ? 'animate-pulse-scale' : ''} rounded-md px-4`}>
        <Send className={`h-5 w-5 ${isSending ? 'animate-pulse opacity-50' : ''}`} />
        <span className="sr-only">Send</span>
      </Button>
    </form>;
};
export default ChatInput;

// src/components/ChatMessages.tsx

import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp?: Date;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTime = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className={`flex items-start gap-3 ${
            message.user === 'me' ? 'flex-row-reverse' : ''
          } animate-fade-in transition-opacity duration-300`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Avatar className={`h-9 w-9 ring-2 ${
            message.user === 'me' 
              ? 'ring-theme-primary' 
              : 'ring-theme-tertiary'
          } transition-all duration-300 hover:scale-110`}>
            <AvatarImage src={message.user === 'me' ? '/avatar.png' : '/bot.png'} />
            <AvatarFallback className={
              message.user === 'me' 
                ? 'bg-theme-primary text-white' 
                : 'bg-theme-tertiary text-white'
            }>
              {message.user === 'me' ? 'ME' : 'QG'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 max-w-[80%]">
            <div 
              className={`px-4 py-3 rounded-lg ${
                message.user === 'me' 
                  ? 'bg-theme-primary text-white rounded-tr-none' 
                  : 'bg-gray-700 text-white rounded-tl-none'
              } shadow-lg hover-lift`}
            >
              {message.text}
              
              {/* File attachments if any */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map(attachment => (
                    <div key={attachment.id} className="flex items-center gap-2 p-2 rounded bg-black/20">
                      <div className="h-8 w-8 bg-gray-600 rounded flex items-center justify-center text-xs text-white">
                        {attachment.type.split('/')[0].substring(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1 truncate text-sm">
                        {attachment.name}
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs">View</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Timestamp */}
            <div className={`text-xs text-gray-400 ${message.user === 'me' ? 'text-right' : 'text-left'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;



// src/components/Footer.tsx
"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin, Mail, ArrowUp, FileText } from "lucide-react"

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-black/80 backdrop-blur-md border-t border-white/10 text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#511849]/20 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#C70039]/20 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-6 py-12">
        {/* Top section with logo and back to top */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#511849] to-[#C70039] flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">QuestionPaperAI</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ArrowUp className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-white/70 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-white/70 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-white/70 hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-white/70 hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-white/70 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white/70 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-white/70 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#900C3F] text-white"
              />
              <button className="bg-gradient-to-r from-[#900C3F] to-[#C70039] px-4 py-2 rounded-r-lg text-white hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-white/10 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#511849]/30 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Multiple Choice Questions</h4>
              <p className="text-white/60 text-sm">Create objective questions with perfect distribution</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#900C3F]/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Custom Subject Streams</h4>
              <p className="text-white/60 text-sm">Generate questions for any subject</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C70039]/30 flex items-center justify-center flex-shrink-0">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Smart Marks Distribution</h4>
              <p className="text-white/60 text-sm">Set your preferred marks distribution</p>
            </div>
          </div>
        </div> */}

        {/* Bottom section with social links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} QuestionPaperAI. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 mt-6 text-sm text-white/50">
          <Link to="/terms" className="hover:text-white/80 transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-white/80 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/cookies" className="hover:text-white/80 transition-colors">
            Cookie Policy
          </Link>
          <Link to="/accessibility" className="hover:text-white/80 transition-colors">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer


// src/components/hero.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, Search } from "lucide-react"
import { FlipWords } from "@/components/ui/flip-words";


export default function HeroSection() {
    const words = ["better", "perfect", "fast", "modern"];
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Gradient Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#511849] via-[#900C3F] to-[#C70039] z-0"

                aria-hidden="true"
            />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-10 md:py-24 lg:py-24">
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-10 lg:p-16 min-w-7xl mx-auto">
                    {/* Hero Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Generate   <FlipWords words={words} /> <br />
                            <span className="text-yellow-300">Question Papers</span> With Ease
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl mb-8">
                            Access a comprehensive library of question papers from various examinations, universities, and educational
                            boards. Study smarter, not harder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-[#C70039] hover:bg-[#900C3F] text-white rounded-xl" >
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" className="bg-[#23010C] hover:bg-white hover:text-black text-white rounded-xl" >
                                Learn More 
                            </Button>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <FeatureCard
                            icon={<Search className="h-8 w-8" />}
                            title="Smart Search"
                            description="Find exactly what you need with our intelligent search system that understands academic context."
                        />
                        <FeatureCard
                            icon={<FileText className="h-8 w-8" />}
                            title="Vast Collection"
                            description="Access thousands of question papers from various universities, boards, and competitive exams."
                        />
                        <FeatureCard
                            icon={<BookOpen className="h-8 w-8" />}
                            title="Study Resources"
                            description="Get complementary study materials and resources to help you prepare effectively."
                        />
                    </div>

                    {/* Call to Action */}
                    {/* <div className="mt-16 text-center">
                        <Link
                            className="inline-flex items-center text-yellow-300 hover:text-yellow-200 text-lg font-medium"
                            to="/question-papers"
                        >
                            Browse All Question Papers <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div> */}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#511849]/30 blur-3xl" aria-hidden="true"></div>
            <div
                className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#C70039]/30 blur-3xl"
                aria-hidden="true"
            ></div>
        </section>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-white mb-4">{icon}</div>
            <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
            <p className="text-white/70">{description}</p>
        </div>
    )
}



// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="py-4 px-6 glass-morphism backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent animate-fade-in cursor-pointer" 
            onClick={() => navigate('/')}
          >
            QuestionGenius
          </h1>
          <span className="text-xs text-white/80">Dibrugarh University</span>
        </div>
        
        <div className="hidden md:block ml-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10">Features</NavigationMenuTrigger>
                <NavigationMenuContent className="glass-morphism">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-secondary/50 to-theme-tertiary/50 p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            QuestionGenius AI
                          </div>
                          <p className="text-sm leading-tight text-white/70">
                            Our AI-powered platform generates perfect question papers tailored to your needs
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Multiple Choice</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Generate objective questions with perfect distribution
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Custom Subjects</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Questions for any subject from Physics to Computer Science
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Smart Distribution</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Set your preferred marks distribution across question types
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} href="#">
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} 
                  onClick={() => navigate('/dashboard')}
                  style={{ cursor: 'pointer' }}
                >
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          className="hidden md:flex text-white border-white hover:bg-white/20 animate-fade-in transition-all duration-300" 
          onClick={() => navigate('/chat')}
        >
          Login
        </Button>
        <Button 
          className="hidden md:flex bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:bg-yellow-400 animate-fade-in transition-all duration-300" 
          onClick={() => navigate('/chat')}
        >
          Get Started
        </Button>
        
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
          <Menu />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;

// src/components/QuestionPreferences.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import PatternStreamSelector from './preferences/PatternStreamSelector';
import MarksDistributionSelector from './preferences/MarksDistributionSelector';
import { QuestionPreferencesType } from '@/types/questionPreferences';
interface QuestionPreferencesProps {
  onUpdatePreferences: (preferences: QuestionPreferencesType) => void;
}
const QuestionPreferences: React.FC<QuestionPreferencesProps> = ({
  onUpdatePreferences
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<QuestionPreferencesType>({
    pattern: 'mixed',
    stream: 'computer-science',
    marksDistribution: 'predefined',
    customMarks: {
      mcq: 40,
      shortAnswer: 30,
      longAnswer: 20,
      practical: 10
    }
  });
  const handlePreferenceChange = (key: keyof QuestionPreferencesType, value: any) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        [key]: value
      };
      onUpdatePreferences(updated);
      return updated;
    });
  };
  const handleCustomMarksChange = (type: keyof typeof preferences.customMarks, value: number) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        customMarks: {
          ...prev.customMarks,
          [type]: value
        }
      };
      onUpdatePreferences(updated);
      return updated;
    });
  };
  return <div className="w-full bg-gray-800 border border-gray-700 rounded-md mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex justify-between items-center py-2 text-gray-300 hover:text-white rounded-xl">
            Question Preferences
            <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 space-y-4">
          <PatternStreamSelector preferences={preferences} onPreferenceChange={handlePreferenceChange} />
          
          <MarksDistributionSelector preferences={preferences} onPreferenceChange={handlePreferenceChange} onCustomMarksChange={handleCustomMarksChange} />
        </CollapsibleContent>
      </Collapsible>
    </div>;
};
export default QuestionPreferences;

// src/components/UserDropdown.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;


// src/pages/ChatPage.tsx
import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Upload, Send, PaperclipIcon } from "lucide-react";
import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';
import UserDropdown from '@/components/UserDropdown';
import ChatHistory from '@/components/ChatHistory';
import { toast } from "@/components/ui/sonner";
import QuestionPreferences from '@/components/QuestionPreferences';
import { QuestionPreferencesType } from '@/types/questionPreferences';

// Sample chat histories for demonstration
const sampleHistories = [{
  id: '1',
  title: 'Math Exam - Grade 10',
  date: 'Today, 10:30 AM'
}, {
  id: '2',
  title: 'Science Quiz - Chemistry',
  date: 'Yesterday, 3:15 PM'
}, {
  id: '3',
  title: 'English Literature Test',
  date: 'May 9, 2:00 PM'
}];
const ChatPage = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeHistoryId, setActiveHistoryId] = useState<string | null>('1');
  const [questionPreferences, setQuestionPreferences] = useState<QuestionPreferencesType>({
    pattern: 'mixed',
    stream: 'computer-science',
    marksDistribution: 'predefined',
    customMarks: {
      mcq: 40,
      shortAnswer: 30,
      longAnswer: 20,
      practical: 10
    }
  });
  const [messages, setMessages] = useState<Array<{
    id: string;
    text: string;
    user: string;
    timestamp?: Date;
    attachments?: any[];
  }>>([{
    id: '1',
    text: 'Welcome to QuestionGenius!',
    user: 'system',
    timestamp: new Date(Date.now() - 60000 * 10)
  }, {
    id: '2',
    text: 'I can help you generate customized question papers. Upload your content or describe what type of questions you need.',
    user: 'system',
    timestamp: new Date(Date.now() - 60000 * 9)
  }]);
  const handleSendMessage = (text: string) => {
    // Include preferences in the message
    const preferencesInfo = `
Pattern: ${questionPreferences.pattern}
Stream: ${questionPreferences.stream}
Marks Distribution: ${questionPreferences.marksDistribution === 'predefined' ? 'Standard' : 'Custom'}
${questionPreferences.marksDistribution === 'custom' ? `MCQ: ${questionPreferences.customMarks.mcq}%, Short Answer: ${questionPreferences.customMarks.shortAnswer}%, Long Answer: ${questionPreferences.customMarks.longAnswer}%, Practical: ${questionPreferences.customMarks.practical}%` : ''}
    `;

    // Add user message
    const newMessage = {
      id: Date.now().toString(),
      text,
      user: 'me',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, newMessage]);

    // Simulate response after a short delay
    setTimeout(() => {
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        text: `I'll help you create a ${questionPreferences.stream.replace('-', ' ')} question paper with ${questionPreferences.pattern.replace('-', ' ')} format. ${text}\n\nBased on your preferences:\n${preferencesInfo}`,
        user: 'system',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, responseMessage]);
    }, 1000);
  };
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a message with attachment
      const newMessage = {
        id: Date.now().toString(),
        text: `I've uploaded a file that contains material for the question paper.`,
        user: 'me',
        timestamp: new Date(),
        attachments: [{
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type,
          url: URL.createObjectURL(file)
        }]
      };
      setMessages(prev => [...prev, newMessage]);

      // Show toast notification
      toast.success("File uploaded successfully!", {
        description: file.name
      });

      // Simulate response
      setTimeout(() => {
        const responseMessage = {
          id: (Date.now() + 1).toString(),
          text: `Thanks for uploading "${file.name}". I'll analyze this document to create ${questionPreferences.stream.replace('-', ' ')} questions with ${questionPreferences.pattern.replace('-', ' ')} format. Would you like me to focus on any specific sections or difficulty levels?`,
          user: 'system',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, responseMessage]);
      }, 1500);
    }
  };
  const handleSelectHistory = (historyId: string) => {
    setActiveHistoryId(historyId);
    // In a real app, you would load the messages for this history
    toast.info(`Loaded chat: ${sampleHistories.find(h => h.id === historyId)?.title}`);
  };
  const handleUpdatePreferences = (preferences: QuestionPreferencesType) => {
    setQuestionPreferences(preferences);
  };
  return <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100">
      {/* Header with user dropdown */}
      <header className="bg-gray-900 shadow-md border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-bold text-white bg-gradient-to-r from-theme-primary via-theme-tertiary to-theme-secondary bg-clip-text text-transparent animate-pulse-scale">
            QuestionGenius
          </h1>
          <div className="h-6 w-px bg-gray-700"></div>
          <span className="text-sm text-gray-400">AI Question Paper Generator</span>
        </div>
        <UserDropdown />
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Chat history sidebar */}
        <div className={`w-72 transition-all duration-300 ease-in-out ${showSidebar ? 'translate-x-0' : '-translate-x-full'}`}>
          <ChatHistory histories={sampleHistories} activeHistoryId={activeHistoryId} onSelectHistory={handleSelectHistory} />
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Toggle sidebar button */}
          <div className="absolute top-20 left-2 z-10">
            <Button variant="outline" size="icon" onClick={() => setShowSidebar(!showSidebar)} className="h-8 w-8 bg-gray-800 border-gray-700 hover:bg-theme-tertiary/50">
              {showSidebar ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>}
            </Button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-6">
            <ChatMessages messages={messages} />
          </div>

          {/* Chat input and controls */}
          <div className="bg-gray-900 border-t border-gray-800 p-4 flex flex-col rounded-xl">
            <QuestionPreferences onUpdatePreferences={handleUpdatePreferences} />
            <div className="flex items-end gap-2">
              <label className="cursor-pointer">
                <input type="file" className="hidden" onChange={handleFileUpload} accept="image/*,.pdf,.doc,.docx" />
                <Button variant="outline" size="icon" type="button" className="h-12 w-12 border-gray-700 hover:bg-theme-tertiary/30 hover:border-theme-tertiary transition-colors animate-fade-in hover-lift rounded-2xl">
                  <Upload className="h-5 w-5" />
                </Button>
              </label>

              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ChatPage;

// src/pages/Index.tsx
// Update this page (the content is just a fallback if you fail to update the page)

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Your Blank App</h1>
        <p className="text-xl text-gray-600">Start building your amazing project here!</p>
      </div>
    </div>
  );
};

export default Index;


// src/pages/Landing
import type React from "react"

import Navbar from "@/components/Navbar"
import HeroSection from "@/components/hero"
import Footer from "@/components/Footer"

const LandingPage: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-[#511849] via-[#900C3F] to-[#C70039]">
      <Navbar />
      <div className="mt-[-42px]"> {/* Adjust margin to reduce spacing */}
        <HeroSection />
      </div>

      <Footer />
    </div>
  )
}

export default LandingPage




import React from "react";
import { SignIn, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const signIn = () => {
  return (
    <div
    className="flex justify-center items-center min-h-screen p-4"
    style={{
      backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
    }}
  >
        <SignIn signUpUrl="/sign-up" />     
    </div>
  );
};

export default signIn;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;



import React from "react";
import { SignUp, useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
const Signup = () => {
  return (
    <div
      className="flex justify-center items-center min-h-screen p-4"
      style={{
        backgroundImage: 'linear-gradient(19deg, #FAACA8 0%, #DDD6F3 100%)',
      }}
    >
        <SignUp 
          signInUrl="/sign-in"
          afterSignUpUrl="/dashboard"

        />
    </div>
  );
};

export default Signup;

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeacherInfo from '@/components/dashboard/TeachersInfo';
import SubjectNotes from '@/components/dashboard/SubjectNotes';
import QuestionPapers from '@/components/dashboard/QuestionPapers';
import CustomPromptEditor from '@/components/dashboard/CustomPromptEditor';

const TeacherDashboard: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#221F26] text-white">
      <Navbar />
      
      <div className="flex-1 p-6 md:p-10 max-w-7xl mx-auto w-full">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gradient">Teacher Dashboard</h1>
        <p className="text-white/70 mb-8">Manage your teaching resources and preferences</p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <TeacherInfo />
        </div>
        
        <Tabs defaultValue="notes" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8 bg-theme-secondary/30">
            <TabsTrigger value="notes" className="data-[state=active]:bg-theme-primary/30 data-[state=active]:text-white">
              Subject Notes
            </TabsTrigger>
            <TabsTrigger value="papers" className="data-[state=active]:bg-theme-primary/30 data-[state=active]:text-white">
              Question Papers
            </TabsTrigger>
            <TabsTrigger value="prompt" className="data-[state=active]:bg-theme-primary/30 data-[state=active]:text-white">
              AI Prompt Editor
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="notes" className="space-y-8">
            <SubjectNotes />
          </TabsContent>
          
          <TabsContent value="papers" className="space-y-8">
            <QuestionPapers />
          </TabsContent>
          
          <TabsContent value="prompt" className="space-y-8">
            <CustomPromptEditor />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default TeacherDashboard;





================================================
FILE: src/App.css
================================================
#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}



================================================
FILE: src/App.tsx
================================================
// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ChatPage from "./pages/ChatPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import LandingPage from "./pages/LandingPage";
import TeachersDashboard from "./pages/TeachersDashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="dark">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/sign-in/*" element={<Login />} />
            <Route path="/sign-up/*" element={<Signup />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/dashboard" element={<TeachersDashboard />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;



================================================
FILE: src/index.css
================================================

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;

    --sidebar-background: 0 0% 98%;

    --sidebar-foreground: 240 5.3% 26.1%;

    --sidebar-primary: 240 5.9% 10%;

    --sidebar-primary-foreground: 0 0% 98%;

    --sidebar-accent: 240 4.8% 95.9%;

    --sidebar-accent-foreground: 240 5.9% 10%;

    --sidebar-border: 220 13% 91%;

    --sidebar-ring: 217.2 91.2% 59.8%;
  }

  .dark {
    --background: 240 10% 7%; /* Darker background */
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
    --sidebar-background: 240 5.9% 10%;
    --sidebar-foreground: 240 4.8% 95.9%;
    --sidebar-primary: 224.3 76.3% 48%;
    --sidebar-primary-foreground: 0 0% 100%;
    --sidebar-accent: 240 3.7% 15.9%;
    --sidebar-accent-foreground: 240 4.8% 95.9%;
    --sidebar-border: 240 3.7% 15.9%;
    --sidebar-ring: 217.2 91.2% 59.8%;
  }
}

@layer base {
  * {
    @apply border-border;
  }

  body {
    @apply bg-background text-foreground;
    font-feature-settings: "rlig" 1, "calt" 1;
  }
}

@layer utilities {
  .glass-morphism {
    @apply bg-black/20 backdrop-blur-lg border border-white/10 rounded-xl;
  }
  
  .animated-gradient {
    background: linear-gradient(270deg, #C70039, #511849, #900C3F);
    background-size: 600% 600%;
    animation: gradientShift 15s ease infinite;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50% }
    50% { background-position: 100% 50% }
    100% { background-position: 0% 50% }
  }

  .hover-scale {
    @apply transition-all duration-300 hover:scale-105;
  }

  .hover-lift {
    @apply transition-all duration-300 hover:-translate-y-1;
  }
}



================================================
FILE: src/main.tsx
================================================

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ClerkProvider } from '@clerk/clerk-react'

// Import your Publishable Key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} 
        signInFallbackRedirectUrl="/"
        signUpFallbackRedirectUrl="/"
         afterSignOutUrl="/">
      <App />
    </ClerkProvider>
  </React.StrictMode>,
)



================================================
FILE: src/vite-env.d.ts
================================================
/// <reference types="vite/client" />



================================================
FILE: src/components/ChatHistory.tsx
================================================
// src/components/ChatHistory.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, History } from "lucide-react";

interface ChatHistoryProps {
  histories: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  activeHistoryId: string | null;
  onSelectHistory: (historyId: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  histories, 
  activeHistoryId, 
  onSelectHistory 
}) => {
  return (
    <div className="h-full w-full bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <History size={20} />
          Chat History
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {histories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No previous chats found</p>
          </div>
        ) : (
          <div className="space-y-2">
            {histories.map((history) => (
              <button
                key={history.id}
                onClick={() => onSelectHistory(history.id)}
                className={`w-full text-left p-3 rounded-md transition-all duration-300 hover:bg-theme-tertiary/20 group flex items-start gap-3 animate-fade-in hover-lift ${
                  activeHistoryId === history.id ? 'bg-theme-tertiary/30 border border-theme-tertiary/50' : 'bg-gray-800/50'
                }`}
              >
                <FileText size={18} className="text-gray-400 group-hover:text-theme-primary transition-colors mt-1" />
                <div>
                  <h3 className="font-medium text-white group-hover:text-theme-primary transition-colors">
                    {history.title}
                  </h3>
                  <p className="text-sm text-gray-400">{history.date}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-800">
        <Button 
          className="w-full bg-theme-primary hover:bg-theme-primary/80 text-white"
          size="sm"
        >
          New Chat
        </Button>
      </div>
    </div>
  );
};

export default ChatHistory;



================================================
FILE: src/components/ChatInput.tsx
================================================
// src/components/ChatInput.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
interface ChatInputProps {
  onSendMessage: (text: string) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSending(true);

      // Simulate sending delay for animation
      setTimeout(() => {
        onSendMessage(message);
        setMessage('');
        setIsSending(false);
      }, 300);
    }
  };
  return <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
      <input type="text" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} disabled={isSending} className="flex-1 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-theme-primary bg-gray-800 text-white transition-all duration-300 text-base rounded-xl" />
      <Button type="submit" disabled={!message.trim() || isSending} className={`bg-theme-primary hover:bg-theme-tertiary transition-all duration-300 ${message.trim() && !isSending ? 'animate-pulse-scale' : ''} rounded-md px-4`}>
        <Send className={`h-5 w-5 ${isSending ? 'animate-pulse opacity-50' : ''}`} />
        <span className="sr-only">Send</span>
      </Button>
    </form>;
};
export default ChatInput;


================================================
FILE: src/components/ChatMessages.tsx
================================================
// src/components/ChatMessages.tsx

import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp?: Date;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTime = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className={`flex items-start gap-3 ${
            message.user === 'me' ? 'flex-row-reverse' : ''
          } animate-fade-in transition-opacity duration-300`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Avatar className={`h-9 w-9 ring-2 ${
            message.user === 'me' 
              ? 'ring-theme-primary' 
              : 'ring-theme-tertiary'
          } transition-all duration-300 hover:scale-110`}>
            <AvatarImage src={message.user === 'me' ? '/avatar.png' : '/bot.png'} />
            <AvatarFallback className={
              message.user === 'me' 
                ? 'bg-theme-primary text-white' 
                : 'bg-theme-tertiary text-white'
            }>
              {message.user === 'me' ? 'ME' : 'QG'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 max-w-[80%]">
            <div 
              className={`px-4 py-3 rounded-lg ${
                message.user === 'me' 
                  ? 'bg-theme-primary text-white rounded-tr-none' 
                  : 'bg-gray-700 text-white rounded-tl-none'
              } shadow-lg hover-lift`}
            >
              {message.text}
              
              {/* File attachments if any */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map(attachment => (
                    <div key={attachment.id} className="flex items-center gap-2 p-2 rounded bg-black/20">
                      <div className="h-8 w-8 bg-gray-600 rounded flex items-center justify-center text-xs text-white">
                        {attachment.type.split('/')[0].substring(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1 truncate text-sm">
                        {attachment.name}
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs">View</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Timestamp */}
            <div className={`text-xs text-gray-400 ${message.user === 'me' ? 'text-right' : 'text-left'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;



================================================
FILE: src/components/Footer.tsx
================================================
// src/components/Footer.tsx
"use client"

import type React from "react"
import { Link } from "react-router-dom"
import { Github, Twitter, Linkedin, Mail, ArrowUp, FileText } from "lucide-react"

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="relative bg-black/80 backdrop-blur-md border-t border-white/10 text-white overflow-hidden">
      {/* Decorative elements */}
      <div
        className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-[#511849]/20 blur-3xl"
        aria-hidden="true"
      ></div>
      <div
        className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-[#C70039]/20 blur-3xl"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-6 py-12">
        {/* Top section with logo and back to top */}
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#511849] to-[#C70039] flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold">QuestionPaperAI</span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white/10 transition-all">
              <ArrowUp className="h-4 w-4" />
            </div>
          </button>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-white/70 hover:text-white transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-white/70 hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/templates" className="text-white/70 hover:text-white transition-colors">
                  Templates
                </Link>
              </li>
              <li>
                <Link to="/changelog" className="text-white/70 hover:text-white transition-colors">
                  Changelog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/blog" className="text-white/70 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-white/70 hover:text-white transition-colors">
                  Guides
                </Link>
              </li>
              <li>
                <Link to="/documentation" className="text-white/70 hover:text-white transition-colors">
                  Documentation
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-white/70 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-white/70 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/70 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/70 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white/70 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 - Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold mb-4 text-white">Stay Updated</h3>
            <p className="text-white/70 mb-4">Subscribe to our newsletter for the latest updates and features.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-white/10 border border-white/20 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#900C3F] text-white"
              />
              <button className="bg-gradient-to-r from-[#900C3F] to-[#C70039] px-4 py-2 rounded-r-lg text-white hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Feature highlights */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-t border-b border-white/10 mb-8">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#511849]/30 flex items-center justify-center flex-shrink-0">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Multiple Choice Questions</h4>
              <p className="text-white/60 text-sm">Create objective questions with perfect distribution</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#900C3F]/30 flex items-center justify-center flex-shrink-0">
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Custom Subject Streams</h4>
              <p className="text-white/60 text-sm">Generate questions for any subject</p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 rounded-full bg-[#C70039]/30 flex items-center justify-center flex-shrink-0">
              <Search className="h-5 w-5 text-white" />
            </div>
            <div>
              <h4 className="text-white font-medium">Smart Marks Distribution</h4>
              <p className="text-white/60 text-sm">Set your preferred marks distribution</p>
            </div>
          </div>
        </div> */}

        {/* Bottom section with social links and copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-white/60 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} QuestionPaperAI. All rights reserved.
          </div>

          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Linkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Legal links */}
        <div className="flex flex-wrap justify-center md:justify-start gap-x-6 mt-6 text-sm text-white/50">
          <Link to="/terms" className="hover:text-white/80 transition-colors">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-white/80 transition-colors">
            Privacy Policy
          </Link>
          <Link to="/cookies" className="hover:text-white/80 transition-colors">
            Cookie Policy
          </Link>
          <Link to="/accessibility" className="hover:text-white/80 transition-colors">
            Accessibility
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer



================================================
FILE: src/components/hero.tsx
================================================
// src/components/hero.tsx
import { Button } from "@/components/ui/button"
import { ArrowRight, BookOpen, FileText, Search } from "lucide-react"
import { FlipWords } from "@/components/ui/flip-words";


export default function HeroSection() {
    const words = ["better", "perfect", "fast", "modern"];
    return (
        <section className="relative min-h-screen w-full overflow-hidden">
            {/* Gradient Background */}
            <div
                className="absolute inset-0 bg-gradient-to-br from-[#511849] via-[#900C3F] to-[#C70039] z-0"

                aria-hidden="true"
            />

            {/* Content Container */}
            <div className="relative z-10 container mx-auto px-4 py-10 md:py-24 lg:py-24">
                <div className="bg-black/30 backdrop-blur-sm rounded-2xl p-6 md:p-10 lg:p-16 min-w-7xl mx-auto">
                    {/* Hero Header */}
                    <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
                            Generate   <FlipWords words={words} /> <br />
                            <span className="text-yellow-300">Question Papers</span> With Ease
                        </h1>
                        <p className="text-white/90 text-lg md:text-xl mb-8">
                            Access a comprehensive library of question papers from various examinations, universities, and educational
                            boards. Study smarter, not harder.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button size="lg" className="bg-[#C70039] hover:bg-[#900C3F] text-white rounded-xl" >
                                Get Started <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                            <Button size="lg" className="bg-[#23010C] hover:bg-white hover:text-black text-white rounded-xl" >
                                Learn More 
                            </Button>
                        </div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                        <FeatureCard
                            icon={<Search className="h-8 w-8" />}
                            title="Smart Search"
                            description="Find exactly what you need with our intelligent search system that understands academic context."
                        />
                        <FeatureCard
                            icon={<FileText className="h-8 w-8" />}
                            title="Vast Collection"
                            description="Access thousands of question papers from various universities, boards, and competitive exams."
                        />
                        <FeatureCard
                            icon={<BookOpen className="h-8 w-8" />}
                            title="Study Resources"
                            description="Get complementary study materials and resources to help you prepare effectively."
                        />
                    </div>

                    {/* Call to Action */}
                    {/* <div className="mt-16 text-center">
                        <Link
                            className="inline-flex items-center text-yellow-300 hover:text-yellow-200 text-lg font-medium"
                            to="/question-papers"
                        >
                            Browse All Question Papers <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </div> */}
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#511849]/30 blur-3xl" aria-hidden="true"></div>
            <div
                className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#C70039]/30 blur-3xl"
                aria-hidden="true"
            ></div>
        </section>
    )
}

function FeatureCard({ icon, title, description }) {
    return (
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-all">
            <div className="text-white mb-4">{icon}</div>
            <h3 className="text-white text-xl font-semibold mb-3">{title}</h3>
            <p className="text-white/70">{description}</p>
        </div>
    )
}



================================================
FILE: src/components/Navbar.tsx
================================================
// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Menu } from "lucide-react";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <header className="py-4 px-6 glass-morphism backdrop-blur-lg border-b border-white/10 sticky top-0 z-50 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <div className="flex flex-col">
          <h1 
            className="text-2xl font-bold bg-gradient-to-r from-white to-yellow-300 bg-clip-text text-transparent animate-fade-in cursor-pointer" 
            onClick={() => navigate('/')}
          >
            QuestionGenius
          </h1>
          <span className="text-xs text-white/80">Dibrugarh University</span>
        </div>
        
        <div className="hidden md:block ml-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-white hover:bg-white/10">Features</NavigationMenuTrigger>
                <NavigationMenuContent className="glass-morphism">
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <a
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-theme-secondary/50 to-theme-tertiary/50 p-6 no-underline outline-none focus:shadow-md"
                          href="#"
                        >
                          <div className="mb-2 mt-4 text-lg font-medium text-white">
                            QuestionGenius AI
                          </div>
                          <p className="text-sm leading-tight text-white/70">
                            Our AI-powered platform generates perfect question papers tailored to your needs
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Multiple Choice</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Generate objective questions with perfect distribution
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Custom Subjects</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Questions for any subject from Physics to Computer Science
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-white/10 hover:text-white focus:bg-white/10 focus:text-white"
                          href="#"
                        >
                          <div className="text-sm font-medium leading-none text-white">Smart Distribution</div>
                          <p className="line-clamp-2 text-sm leading-snug text-white/70">
                            Set your preferred marks distribution across question types
                          </p>
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} href="#">
                  Pricing
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} 
                  onClick={() => navigate('/dashboard')}
                  style={{ cursor: 'pointer' }}
                >
                  Dashboard
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Button 
          variant="outline" 
          className="hidden md:flex text-white border-white hover:bg-white/20 animate-fade-in transition-all duration-300" 
          onClick={() => navigate('/chat')}
        >
          Login
        </Button>
        <Button 
          className="hidden md:flex bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:bg-yellow-400 animate-fade-in transition-all duration-300" 
          onClick={() => navigate('/chat')}
        >
          Get Started
        </Button>
        
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
          <Menu />
        </Button>
      </div>
    </header>
  );
};

export default Navbar;


================================================
FILE: src/components/QuestionPreferences.tsx
================================================
// src/components/QuestionPreferences.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import PatternStreamSelector from './preferences/PatternStreamSelector';
import MarksDistributionSelector from './preferences/MarksDistributionSelector';
import { QuestionPreferencesType } from '@/types/questionPreferences';
interface QuestionPreferencesProps {
  onUpdatePreferences: (preferences: QuestionPreferencesType) => void;
}
const QuestionPreferences: React.FC<QuestionPreferencesProps> = ({
  onUpdatePreferences
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState<QuestionPreferencesType>({
    pattern: 'mixed',
    stream: 'computer-science',
    marksDistribution: 'predefined',
    customMarks: {
      mcq: 40,
      shortAnswer: 30,
      longAnswer: 20,
      practical: 10
    }
  });
  const handlePreferenceChange = (key: keyof QuestionPreferencesType, value: any) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        [key]: value
      };
      onUpdatePreferences(updated);
      return updated;
    });
  };
  const handleCustomMarksChange = (type: keyof typeof preferences.customMarks, value: number) => {
    setPreferences(prev => {
      const updated = {
        ...prev,
        customMarks: {
          ...prev.customMarks,
          [type]: value
        }
      };
      onUpdatePreferences(updated);
      return updated;
    });
  };
  return <div className="w-full bg-gray-800 border border-gray-700 rounded-md mb-4">
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className="w-full">
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full flex justify-between items-center py-2 text-gray-300 hover:text-white rounded-xl">
            Question Preferences
            <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="p-4 space-y-4">
          <PatternStreamSelector preferences={preferences} onPreferenceChange={handlePreferenceChange} />
          
          <MarksDistributionSelector preferences={preferences} onPreferenceChange={handlePreferenceChange} onCustomMarksChange={handleCustomMarksChange} />
        </CollapsibleContent>
      </Collapsible>
    </div>;
};
export default QuestionPreferences;


================================================
FILE: src/components/UserDropdown.tsx
================================================
// src/components/UserDropdown.tsx
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UserDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="User" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
        <DropdownMenuItem className="cursor-pointer">Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer text-red-500">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;



================================================
FILE: src/components/dashboard/CustomPromptEditor.tsx
================================================
// src/components/dashboard/CustomPromptEditor.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save } from "lucide-react";

const promptPlaceholder = `I teach Computer Science to 2nd year undergraduates. 
When creating question papers, I prefer:
- 40% easy questions, 40% medium difficulty, and 20% challenging questions
- Mix of theoretical and practical questions
- Include at least two programming problems for each paper
- Focus on fundamental concepts rather than memorization`;

const CustomPromptEditor: React.FC = () => {
  const [promptText, setPromptText] = useState<string>(promptPlaceholder);
  const [preferences, setPreferences] = useState({
    includeObjective: true,
    includeSubjective: true,
    includePractical: true,
    balancedDifficulty: true,
    focusOnConcepts: true,
    includeRealWorld: false,
    includeDiagrams: false
  });
  
  const handleSavePrompt = () => {
    // In a real application, this would save to a backend
    console.log("Saved prompt:", promptText);
    console.log("Preferences:", preferences);
    // Show success message or toast
  };
  
  const togglePreference = (key: keyof typeof preferences) => {
    setPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold">AI Prompt Preferences</h2>
        <p className="text-white/70">
          Customize your preferences for AI-generated question papers. This information helps the AI understand your teaching style and requirements.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 lg:col-span-2">
          <Card className="glass-morphism border-theme-tertiary/20 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Custom AI Prompt</CardTitle>
              <p className="text-sm text-white/70">
                Describe your question paper style, preferences, and requirements in detail
              </p>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={promptText} 
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe your question paper preferences here..."
                className="h-80 bg-theme-secondary/20 border-theme-tertiary/30 text-white"
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-theme-primary hover:bg-theme-primary/80"
                onClick={handleSavePrompt}
              >
                <Save className="mr-2 h-4 w-4" />
                Save Preferences
              </Button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="col-span-1">
          <Card className="glass-morphism border-theme-tertiary/20 h-full">
            <CardHeader>
              <CardTitle className="text-lg">Quick Preferences</CardTitle>
              <p className="text-sm text-white/70">
                Select common preferences to incorporate
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="objective" 
                  checked={preferences.includeObjective}
                  onCheckedChange={() => togglePreference('includeObjective')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="objective"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Objective Questions
                  </label>
                  <p className="text-xs text-white/50">
                    MCQs, true/false, fill in the blanks
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="subjective" 
                  checked={preferences.includeSubjective}
                  onCheckedChange={() => togglePreference('includeSubjective')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="subjective"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Subjective Questions
                  </label>
                  <p className="text-xs text-white/50">
                    Short answer, essay questions
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="practical" 
                  checked={preferences.includePractical}
                  onCheckedChange={() => togglePreference('includePractical')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="practical"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Practical Problems
                  </label>
                  <p className="text-xs text-white/50">
                    Implementation, coding challenges
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="balanced" 
                  checked={preferences.balancedDifficulty}
                  onCheckedChange={() => togglePreference('balancedDifficulty')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="balanced"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Balanced Difficulty Level
                  </label>
                  <p className="text-xs text-white/50">
                    Mix of easy, medium, and challenging
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="concepts" 
                  checked={preferences.focusOnConcepts}
                  onCheckedChange={() => togglePreference('focusOnConcepts')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="concepts"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Focus on Concepts
                  </label>
                  <p className="text-xs text-white/50">
                    Testing understanding over memorization
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="realworld" 
                  checked={preferences.includeRealWorld}
                  onCheckedChange={() => togglePreference('includeRealWorld')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="realworld"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Real-World Applications
                  </label>
                  <p className="text-xs text-white/50">
                    Scenario-based questions with practical applications
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2">
                <Checkbox 
                  id="diagrams" 
                  checked={preferences.includeDiagrams}
                  onCheckedChange={() => togglePreference('includeDiagrams')}
                  className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary"
                />
                <div className="grid gap-1.5 leading-none">
                  <label
                    htmlFor="diagrams"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Include Diagrams/Visual Elements
                  </label>
                  <p className="text-xs text-white/50">
                    Questions requiring diagrams or visual interpretation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomPromptEditor;


================================================
FILE: src/components/dashboard/QuestionPapers.tsx
================================================
//src/components/dashboard/QuestionPapers.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { FilePlus, Trash2, FileText, Download } from "lucide-react";

interface QuestionPaper {
  id: string;
  subject: string;
  year: string;
  examType: string;
  totalMarks: number;
  filename: string;
  uploadDate: string;
}

const QuestionPapers: React.FC = () => {
  const [papers, setPapers] = useState<QuestionPaper[]>([
    {
      id: '1',
      subject: 'Mathematics',
      year: '2024',
      examType: 'Mid Term',
      totalMarks: 50,
      filename: 'math_midterm_2024.pdf',
      uploadDate: '2025-05-01'
    },
    {
      id: '2',
      subject: 'Physics',
      year: '2024',
      examType: 'Final',
      totalMarks: 100,
      filename: 'physics_final_2024.pdf',
      uploadDate: '2025-05-03'
    },
    {
      id: '3',
      subject: 'Computer Science',
      year: '2024',
      examType: 'Mid Term',
      totalMarks: 60,
      filename: 'cs_midterm_2024.pdf',
      uploadDate: '2025-05-06'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaper, setNewPaper] = useState<Omit<QuestionPaper, 'id' | 'uploadDate'>>({
    subject: '',
    year: new Date().getFullYear().toString(),
    examType: '',
    totalMarks: 100,
    filename: ''
  });
  
  const handleAddPaper = () => {
    if (newPaper.subject && newPaper.examType && newPaper.filename) {
      const newId = Date.now().toString();
      const currentDate = new Date().toISOString().split('T')[0];
      
      setPapers([...papers, {
        id: newId,
        ...newPaper,
        uploadDate: currentDate
      }]);
      
      setNewPaper({
        subject: '',
        year: new Date().getFullYear().toString(),
        examType: '',
        totalMarks: 100,
        filename: ''
      });
      
      setShowAddForm(false);
    }
  };
  
  const handleDeletePaper = (id: string) => {
    setPapers(papers.filter(paper => paper.id !== id));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setNewPaper({...newPaper, filename: file.name});
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Question Papers</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Upload Question Paper
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Upload Question Paper</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Subject</label>
                <Input 
                  value={newPaper.subject} 
                  onChange={(e) => setNewPaper({...newPaper, subject: e.target.value})}
                  placeholder="e.g. Mathematics"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Year</label>
                <Input 
                  value={newPaper.year} 
                  onChange={(e) => setNewPaper({...newPaper, year: e.target.value})}
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Exam Type</label>
                <Input 
                  value={newPaper.examType} 
                  onChange={(e) => setNewPaper({...newPaper, examType: e.target.value})}
                  placeholder="e.g. Mid Term, Final"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Total Marks</label>
                <Input 
                  type="number"
                  value={newPaper.totalMarks} 
                  onChange={(e) => setNewPaper({...newPaper, totalMarks: parseInt(e.target.value)})}
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Upload File</label>
              <Input 
                type="file" 
                onChange={handleFileChange}
                className="bg-theme-secondary/20 border-theme-tertiary/30"
                accept=".pdf,.doc,.docx"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
              className="border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddPaper}
              className="bg-theme-primary hover:bg-theme-primary/80"
              disabled={!newPaper.filename}
            >
              Upload Paper
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <Card className="glass-morphism border-theme-tertiary/20">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-theme-secondary/30">
              <TableRow className="border-b-theme-tertiary/30">
                <TableHead className="text-white">Subject</TableHead>
                <TableHead className="text-white">Year</TableHead>
                <TableHead className="text-white">Exam Type</TableHead>
                <TableHead className="text-white">Total Marks</TableHead>
                <TableHead className="text-white">Filename</TableHead>
                <TableHead className="text-white">Upload Date</TableHead>
                <TableHead className="text-right text-white">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {papers.map((paper) => (
                <TableRow key={paper.id} className="border-b-theme-tertiary/20">
                  <TableCell>{paper.subject}</TableCell>
                  <TableCell>{paper.year}</TableCell>
                  <TableCell>{paper.examType}</TableCell>
                  <TableCell>{paper.totalMarks}</TableCell>
                  <TableCell>{paper.filename}</TableCell>
                  <TableCell>{paper.uploadDate}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-white/70 hover:text-white hover:bg-theme-tertiary/20">
                        <Download size={16} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={() => handleDeletePaper(paper.id)}
                        className="h-8 w-8 text-white/50 hover:text-white hover:bg-theme-tertiary/20"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPapers;


================================================
FILE: src/components/dashboard/SubjectNotes.tsx
================================================
//src/components/dashboard/SubjectNotes.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Trash2, FileText } from "lucide-react";

interface Note {
  id: string;
  subject: string;
  title: string;
  content: string;
  date: string;
}

const SubjectNotes: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([
    {
      id: '1',
      subject: 'Mathematics',
      title: 'Calculus Fundamentals',
      content: 'Key concepts in differential calculus including limits, derivatives and their applications.',
      date: '2025-05-02'
    },
    {
      id: '2',
      subject: 'Physics',
      title: 'Quantum Mechanics',
      content: 'An introduction to wave functions, Schrödinger equation and quantum states.',
      date: '2025-05-04'
    },
    {
      id: '3',
      subject: 'Computer Science',
      title: 'Data Structures',
      content: 'Overview of arrays, linked lists, stacks, queues, trees and graphs.',
      date: '2025-05-08'
    }
  ]);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNote, setNewNote] = useState<Omit<Note, 'id' | 'date'>>({
    subject: '',
    title: '',
    content: ''
  });
  
  const handleAddNote = () => {
    if (newNote.subject && newNote.title && newNote.content) {
      const newId = Date.now().toString();
      const currentDate = new Date().toISOString().split('T')[0];
      
      setNotes([...notes, {
        id: newId,
        ...newNote,
        date: currentDate
      }]);
      
      setNewNote({
        subject: '',
        title: '',
        content: ''
      });
      
      setShowAddForm(false);
    }
  };
  
  const handleDeleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Subject Notes</h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80"
        >
          <FilePlus className="mr-2 h-4 w-4" />
          Add New Note
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/20 animate-fade-in">
          <CardHeader>
            <CardTitle className="text-lg">Add New Note</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Subject</label>
                <Input 
                  value={newNote.subject} 
                  onChange={(e) => setNewNote({...newNote, subject: e.target.value})}
                  placeholder="e.g. Mathematics"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
              <div>
                <label className="text-sm text-white/70">Title</label>
                <Input 
                  value={newNote.title} 
                  onChange={(e) => setNewNote({...newNote, title: e.target.value})}
                  placeholder="e.g. Calculus Fundamentals"
                  className="bg-theme-secondary/20 border-theme-tertiary/30"
                />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Content</label>
              <Textarea 
                value={newNote.content} 
                onChange={(e) => setNewNote({...newNote, content: e.target.value})}
                placeholder="Enter your note content here..."
                className="h-32 bg-theme-secondary/20 border-theme-tertiary/30"
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowAddForm(false)}
              className="border-white/20 text-white"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleAddNote}
              className="bg-theme-primary hover:bg-theme-primary/80"
            >
              Save Note
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((note) => (
          <Card key={note.id} className="glass-morphism border-theme-tertiary/20 hover:border-theme-tertiary/40 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-theme-tertiary/70">{note.subject}</p>
                  <CardTitle className="text-lg">{note.title}</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteNote(note.id)}
                  className="h-8 w-8 text-white/50 hover:text-white hover:bg-theme-tertiary/20"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 line-clamp-4">{note.content}</p>
            </CardContent>
            <CardFooter className="pt-2 border-t border-white/10 flex justify-between">
              <p className="text-xs text-white/50">{note.date}</p>
              <div className="flex items-center text-xs text-white/50">
                <FileText size={12} className="mr-1" />
                Note
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubjectNotes;


================================================
FILE: src/components/dashboard/TeachersInfo.tsx
================================================
//src/components/dashboard/TeachersInfo.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCircle, Edit2, Save } from "lucide-react";

interface TeacherInfoData {
  name: string;
  department: string;
  semester: string;
  email: string;
}

const TeacherInfo: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [teacherInfo, setTeacherInfo] = useState<TeacherInfoData>({
    name: "Dr. Sarah Johnson",
    department: "Computer Science",
    semester: "Fall 2025",
    email: "sarahjohnson@university.edu"
  });
  
  const [editForm, setEditForm] = useState<TeacherInfoData>({...teacherInfo});
  
  const handleSave = () => {
    setTeacherInfo(editForm);
    setIsEditing(false);
  };
  
  return (
    <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-white">Teacher Information</CardTitle>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="h-8 w-8 text-white/70 hover:text-white"
        >
          {isEditing ? <Save size={18} /> : <Edit2 size={18} />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="flex justify-center items-center">
            <div className="bg-theme-secondary/30 rounded-full p-8 border-2 border-theme-tertiary/30">
              <UserCircle className="w-16 h-16 text-white/80" />
            </div>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-white/70">Name</label>
                  <Input 
                    value={editForm.name} 
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Department</label>
                  <Input 
                    value={editForm.department} 
                    onChange={(e) => setEditForm({...editForm, department: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Semester</label>
                  <Input 
                    value={editForm.semester} 
                    onChange={(e) => setEditForm({...editForm, semester: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
                <div>
                  <label className="text-sm text-white/70">Email</label>
                  <Input 
                    value={editForm.email} 
                    onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                    className="bg-theme-secondary/20 border-theme-tertiary/30"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-white/70">Name</p>
                  <p className="font-semibold text-white">{teacherInfo.name}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Department</p>
                  <p className="font-semibold text-white">{teacherInfo.department}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Semester</p>
                  <p className="font-semibold text-white">{teacherInfo.semester}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-semibold text-white">{teacherInfo.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TeacherInfo;


================================================
FILE: src/components/preferences/CustomMarksDistribution.tsx
================================================
// src/components/preferences/CustomMarksDistribution.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { QuestionPreferencesType } from '@/types/questionPreferences';

interface CustomMarksDistributionProps {
  customMarks: QuestionPreferencesType['customMarks'];
  onCustomMarksChange: (type: keyof QuestionPreferencesType['customMarks'], value: number) => void;
}

const CustomMarksDistribution: React.FC<CustomMarksDistributionProps> = ({
  customMarks,
  onCustomMarksChange
}) => {
  const totalMarks = customMarks.mcq + customMarks.shortAnswer + customMarks.longAnswer + customMarks.practical;
  
  return (
    <div className="space-y-3 mt-2">
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">MCQs: {customMarks.mcq}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.mcq]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('mcq', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Short Answer: {customMarks.shortAnswer}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.shortAnswer]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('shortAnswer', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Long Answer: {customMarks.longAnswer}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.longAnswer]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('longAnswer', value)}
        />
      </div>
      
      <div>
        <div className="flex justify-between">
          <Label className="text-xs text-gray-400">Practical: {customMarks.practical}%</Label>
        </div>
        <Slider
          className="my-1.5"
          value={[customMarks.practical]}
          min={0}
          max={100}
          step={5}
          onValueChange={([value]) => onCustomMarksChange('practical', value)}
        />
      </div>
      
      <div className="mt-4 py-3 px-4 rounded-lg bg-gray-700/50 border border-gray-600">
        <div className="flex justify-between items-center">
          <span className="text-white font-medium">Total:</span>
          <span className={`text-xl font-bold ${totalMarks !== 100 ? 'text-red-400' : 'text-green-400'}`}>
            {totalMarks}%
          </span>
        </div>
        {totalMarks !== 100 && 
          <p className="text-red-400 text-sm mt-1">Must equal 100%</p>
        }
      </div>
    </div>
  );
};

export default CustomMarksDistribution;



================================================
FILE: src/components/preferences/MarksDistributionSelector.tsx
================================================
// src/components/preferences/MarksDistributionSelector.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { predefinedMarks, QuestionPreferencesType } from '@/types/questionPreferences';
import CustomMarksDistribution from './CustomMarksDistribution';

interface MarksDistributionSelectorProps {
  preferences: QuestionPreferencesType;
  onPreferenceChange: (key: keyof QuestionPreferencesType, value: any) => void;
  onCustomMarksChange: (type: keyof QuestionPreferencesType['customMarks'], value: number) => void;
}

const MarksDistributionSelector: React.FC<MarksDistributionSelectorProps> = ({
  preferences,
  onPreferenceChange,
  onCustomMarksChange
}) => {
  return (
    <div className="space-y-2">
      <Label className="text-sm text-gray-300">Marks Distribution</Label>
      <RadioGroup 
        defaultValue="predefined"
        value={preferences.marksDistribution}
        onValueChange={(value: 'predefined' | 'custom') => onPreferenceChange('marksDistribution', value)}
        className="flex flex-col space-y-1"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="predefined" id="predefined" />
          <Label htmlFor="predefined" className="text-sm text-gray-300">Predefined Distribution</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="custom" id="custom" />
          <Label htmlFor="custom" className="text-sm text-gray-300">Custom Distribution</Label>
        </div>
      </RadioGroup>

      {preferences.marksDistribution === 'predefined' ? (
        <div className="space-y-2">
          <Select defaultValue="standard">
            <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
              <SelectValue placeholder="Select predefined distribution" />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-gray-700 text-white">
              {predefinedMarks.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <CustomMarksDistribution 
          customMarks={preferences.customMarks}
          onCustomMarksChange={onCustomMarksChange}
        />
      )}
    </div>
  );
};

export default MarksDistributionSelector;



================================================
FILE: src/components/preferences/PatternStreamSelector.tsx
================================================
// src/components/preferences/PatternStreamSelector.tsx

import React from 'react';
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { patterns, streams, QuestionPreferencesType } from '@/types/questionPreferences';

interface PatternStreamSelectorProps {
  preferences: QuestionPreferencesType;
  onPreferenceChange: (key: keyof QuestionPreferencesType, value: any) => void;
}

const PatternStreamSelector: React.FC<PatternStreamSelectorProps> = ({
  preferences,
  onPreferenceChange
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label className="text-sm text-gray-300">Question Pattern</Label>
        <Select 
          value={preferences.pattern}
          onValueChange={(value) => onPreferenceChange('pattern', value)}
        >
          <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
            <SelectValue placeholder="Select pattern" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {patterns.map(pattern => (
              <SelectItem key={pattern.value} value={pattern.value}>
                {pattern.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label className="text-sm text-gray-300">Subject Stream</Label>
        <Select 
          value={preferences.stream}
          onValueChange={(value) => onPreferenceChange('stream', value)}
        >
          <SelectTrigger className="border-gray-700 bg-gray-800 text-white">
            <SelectValue placeholder="Select stream" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700 text-white">
            {streams.map(stream => (
              <SelectItem key={stream.value} value={stream.value}>
                {stream.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default PatternStreamSelector;


