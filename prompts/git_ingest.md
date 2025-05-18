Directory structure:
└── saheb-ul-lah-bloom-taxonomy-rag/
    ├── README.md
    ├── components.json
    ├── eslint.config.js
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    ├── vite.config.ts
    ├── backend/
    │   ├── README.md
    │   ├── package.json
    │   ├── server copy.js
    │   ├── server.js
    │   ├── .env copy
    │   ├── .gitignore
    │   └── prisma/
    │       ├── schema.prisma
    │       └── migrations/
    │           ├── migration_lock.toml
    │           └── 20250517065655_init/
    │               └── migration.sql
    ├── prompts/
    │   ├── push.md
    │   └── quick_links.md
    ├── public/
    │   └── robots.txt
    └── src/
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main copy.tsx
        ├── main.tsx
        ├── vite-env.d.ts
        ├── components/
        │   ├── ChatHistory.jsx
        │   ├── ChatInput.tsx
        │   ├── ChatMessages.jsx
        │   ├── Footer.tsx
        │   ├── hero.tsx
        │   ├── Navbar.tsx
        │   ├── QuestionPreferences.tsx
        │   ├── UserDropdown.tsx
        │   ├── dashboard/
        │   │   ├── CustomPromptEditor.jsx
        │   │   ├── QuestionPapers.jsx
        │   │   ├── SubjectNotes.jsx
        │   │   └── TeachersInfo.jsx
        │   ├── preferences/
        │   │   ├── CustomMarksDistribution.tsx
        │   │   ├── MarksDistributionSelector.tsx
        │   │   └── PatternStreamSelector.tsx
        │   └── ui/
        │       ├── accordion.tsx
        │       ├── alert-dialog.tsx
        │       ├── alert.tsx
        │       ├── aspect-ratio.tsx
        │       ├── avatar.tsx
        │       ├── badge.tsx
        │       ├── breadcrumb.tsx
        │       ├── button.tsx
        │       ├── calendar.tsx
        │       ├── card.tsx
        │       ├── carousel.tsx
        │       ├── chart.tsx
        │       ├── checkbox.tsx
        │       ├── collapsible.tsx
        │       ├── command.tsx
        │       ├── context-menu.tsx
        │       ├── dialog.tsx
        │       ├── drawer.tsx
        │       ├── dropdown-menu.tsx
        │       ├── flip-words.tsx
        │       ├── form.tsx
        │       ├── hover-card.tsx
        │       ├── input-otp.tsx
        │       ├── input.tsx
        │       ├── label.tsx
        │       ├── menubar.tsx
        │       ├── navigation-menu.tsx
        │       ├── pagination.tsx
        │       ├── popover.tsx
        │       ├── progress.tsx
        │       ├── radio-group.tsx
        │       ├── resizable.tsx
        │       ├── scroll-area.tsx
        │       ├── select.tsx
        │       ├── separator.tsx
        │       ├── sheet.tsx
        │       ├── sidebar.tsx
        │       ├── skeleton.tsx
        │       ├── slider.tsx
        │       ├── sonner.tsx
        │       ├── switch.tsx
        │       ├── table.tsx
        │       ├── tabs.tsx
        │       ├── textarea.tsx
        │       ├── toast.tsx
        │       ├── toaster.tsx
        │       ├── toggle-group.tsx
        │       ├── toggle.tsx
        │       ├── tooltip.tsx
        │       └── use-toast.ts
        ├── hooks/
        │   ├── use-mobile.tsx
        │   └── use-toast.ts
        ├── lib/
        │   ├── api.js
        │   └── utils.ts
        ├── pages/
        │   ├── ChatPage.jsx
        │   ├── Index.tsx
        │   ├── LandingPage.tsx
        │   ├── Login.tsx
        │   ├── NotFound.tsx
        │   ├── Signup.tsx
        │   └── TeachersDashboard.jsx
        ├── services/
        │   └── api.ts
        └── types/
            └── questionPreferences.ts



(Files content cropped to 300k characters, download full ingest to see more)
================================================
FILE: README.md
================================================
# 🧠 QuestionGenius AI: Bloom's Taxonomy RAG Chatbot 🎓

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React Version](https://img.shields.io/badge/react-^18.3-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/vite-^5.4-purple?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/tailwind_css-^3.4-cyan?logo=tailwindcss)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-^20.x-green?logo=nodedotjs)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-^5.x-lightgrey?logo=express)](https://expressjs.com/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-^6.8-darkblue?logo=prisma)](https://www.prisma.io/)
[![Qdrant](https://img.shields.io/badge/Qdrant-Vector_DB-red?logo=qdrant)](https://qdrant.tech/)
[![Clerk Auth](https://img.shields.io/badge/Clerk-Authentication-orange?logo=clerk)](https://clerk.com/)
[![Gemini API](https://img.shields.io/badge/Google_AI-Gemini_API-blueviolet?logo=googlecloud)](https://ai.google.dev/)

## ✨ Overview

**QuestionGenius AI** is an innovative web application designed to empower educators by leveraging the power of Large Language Models (LLMs) through a Retrieval-Augmented Generation (RAG) system. Its core purpose is to assist teachers in creating high-quality, targeted question papers and educational content aligned with **Bloom's Taxonomy of educational objectives**.

Teachers can upload their own subject notes, existing question papers, and other educational materials. The AI then uses this curated knowledge base to generate new questions, provide explanations, and support various pedagogical tasks, all while allowing teachers to specify desired cognitive levels (Remember, Understand, Apply, Analyze, Evaluate, Create).

The platform aims to save teachers valuable time, enhance the quality of assessments, and promote deeper student learning by focusing on diverse cognitive skills.

---

## 🚀 Core Features & Concept

The application revolves around a sophisticated RAG pipeline and a user-friendly interface for teachers:

1.  **Teacher Dashboard:** A central hub for educators to:
    *   Manage their profile and teaching context (institution, department).
    *   Upload and organize source materials (PDFs, DOCX, TXT - lecture notes, textbooks, past papers).
    *   Create and manage subject-specific text notes.
    *   Define detailed AI preferences for question generation, including custom prompts and structured settings.
2.  **RAG-Powered Chat Interface:**
    *   Teachers interact with an AI assistant (powered by Google's Gemini API).
    *   They can request question generation based on:
        *   Specific uploaded materials.
        *   Particular topics or chapters.
        *   Targeted Bloom's Taxonomy levels.
        *   Custom question paper patterns and marks distribution.
    *   The AI retrieves relevant information from the teacher's private knowledge base (vectorized and stored in Qdrant) to generate contextually grounded and accurate questions.
3.  **Bloom's Taxonomy Focus:**
    *   The system is designed to understand and generate questions corresponding to the different levels of Bloom's Taxonomy.
    *   Teachers can guide the AI to produce questions that test various cognitive skills, from basic recall to higher-order thinking like analysis and creation.
4.  **Personalized Knowledge Base:** Each teacher's uploaded materials form a private, secure knowledge base, ensuring generated content is highly relevant to their specific curriculum and teaching style.
5.  **Secure Authentication:** User management and authentication are handled by [Clerk](https://clerk.com/), providing a secure and seamless login/signup experience.

---

## 🛠️ Technology Stack

### Frontend:
*   **React 18+** with **Vite** as the build tool.
*   **JavaScript (JSX)** for component development.
*   **React Router DOM v6** for client-side routing.
*   **Tailwind CSS v3** for utility-first styling.
*   **Shadcn/ui** (likely, based on component structure) for pre-built, accessible UI components.
*   **`@tanstack/react-query` v5** for server state management, caching, and data fetching.
*   **Lucide React** for icons.
*   **Clerk React** for frontend authentication.

### Backend:
*   **Node.js** with **Express.js v5** as the web framework.
*   **JavaScript (ES Modules)**.
*   **Prisma ORM v6** for database interaction with a PostgreSQL database (hosted on Supabase).
*   **Qdrant** as the vector database for storing and searching embeddings.
*   **LangChain.js** for:
    *   Document Loaders (`PDFLoader`, `DocxLoader`, `TextLoader`).
    *   Text Splitters (`RecursiveCharacterTextSplitter`).
    *   Embeddings (`GoogleGenerativeAIEmbeddings`).
    *   Vector Store integration (`QdrantVectorStore`).
*   **Google Generative AI SDK (`@google/generative-ai`)** for interacting with the Gemini API (LLM).
*   **Multer** for handling file uploads.
*   **Svix** for verifying Clerk webhook signatures.
*   **dotenv** for environment variable management.

### Database:
*   **PostgreSQL** (managed by Supabase).
*   **Qdrant** (Vector Database - either local Docker instance or Qdrant Cloud).

### Authentication:
*   **Clerk** (handles user signup, sign-in, session management, and user data synchronization via webhooks).

---

## 📈 Project Progress (As of our latest discussions)

The project has made significant strides, with many core functionalities in place or well underway:

**Frontend:**

*   ✅ **Core Application Structure:** Routing, UI provider setup (`QueryClientProvider`, `TooltipProvider`), and basic layout (`App.jsx`).
*   ✅ **Authentication Pages:** Login (`Login.jsx`) and Signup (`Signup.jsx`) pages integrated with Clerk.
*   ✅ **Landing Page (`LandingPage.jsx`):** Basic structure with Navbar, Hero, and Footer.
*   ✅ **Teacher Dashboard (`TeachersDashboard.jsx`):**
    *   Tabbed interface for different management sections.
    *   `TeacherInfo.jsx`: UI for displaying/editing teacher profile data (backend integration in progress).
    *   `SubjectNotes.jsx`: UI for adding/viewing/deleting text notes (backend integration in progress).
    *   `QuestionPapers.jsx` (manages `UploadedFile`): UI for uploading and listing "question paper" type files (backend integration for upload and fetch in progress).
    *   `CustomPromptEditor.jsx`: UI for detailed AI prompt preferences (backend integration for saving/loading in progress).
*   ✅ **Chat Page (`ChatPage.jsx`):**
    *   Layout with chat history, message display, and input.
    *   `QuestionPreferences.jsx` component for setting generation parameters.
    *   File upload capability (frontend part).
    *   **API calls to the backend for question generation and material upload are implemented.**
*   ✅ **Styling Foundation:** Tailwind CSS configured with custom theme colors and CSS variables for dark mode. Basic utility classes like `glass-morphism` are defined.

**Backend:**

*   ✅ **Server Setup:** Express server initialized with CORS, body parsers.
*   ✅ **Database Schema (`schema.prisma`):** Models defined for `User`, `UploadedFile`, `Note`, `TeacherPreference`, `ChatHistory`, etc., are quite comprehensive. Migrations have been applied.
*   ✅ **Clerk Webhook Integration (`/webhook/user`):**
    *   Successfully receives events from Clerk (verified via ngrok/localtunnel).
    *   Svix signature verification is in place.
    *   **User creation in the Supabase `User` table upon `user.created` event from Clerk is working.**
    *   Handles `user.updated` and `user.deleted` events.
*   ✅ **RAG Ingestion Pipeline (`/api/teacher/upload-material` and `processAndVectorizeFile`):**
    *   File uploads via Multer are working (files are saved to `uploads/` temporarily).
    *   `UploadedFile` metadata is saved to the Prisma database.
    *   **Asynchronous processing:**
        *   Document loading (PDF, DOCX, TXT) using LangChain loaders.
        *   Text splitting into chunks.
        *   Metadata enrichment for chunks.
        *   **Qdrant connection (via Qdrant Cloud or local Docker) is established.**
        *   Qdrant collections are created dynamically per user.
        *   **Embeddings are generated (using Google Generative AI Embeddings).**
        *   **Chunks and their embeddings are being stored in Qdrant (assuming the `addDocuments` return value issue is fully resolved or worked around).**
        *   Prisma records are updated to reflect vectorization status.
        *   Temporary uploaded files are cleaned up.
*   ✅ **RAG Chat Generation Pipeline (`/api/chat/generate-questions`):**
    *   Receives user queries, question preferences, and custom prompt text from the frontend.
    *   Retrieves relevant text chunks (context) from the teacher's Qdrant collection based on the user query.
    *   Constructs a detailed prompt for the Gemini API, incorporating:
        *   System role (Bloom's Taxonomy expert).
        *   Teacher's preferences.
        *   Definitions of Bloom's Taxonomy levels.
        *   The retrieved context.
        *   The teacher's specific query.
        *   Instructions for JSON output and justification of Bloom's level.
    *   Successfully calls the Gemini API and receives a response.
    *   Parses the LLM's JSON response.
    *   Saves the conversation (user query, AI-generated questions, sources) to `ChatHistory`.
    *   Returns structured questions to the frontend.
*   ✅ **Basic CRUD Endpoints:** Endpoints for managing teacher profile, notes, custom prompts, and fetching chat history are defined and partially or fully functional.

**Overall Status:** The foundational backend RAG pipeline is largely in place and functional, from user sync to document ingestion and AI-powered question generation. The frontend is structured and making calls to these backend services. The main focus has been on getting the core mechanics working.

---

## 🔮 Future Enhancements & Next Steps

While the core RAG functionality is taking shape, there's a vast potential for future development:

**Core Functionality Enhancements:**

1.  **Refined Bloom's Taxonomy Targeting:**
    *   Allow teachers to explicitly select multiple Bloom's levels and desired counts/percentages for each in the `QuestionPreferences` UI.
    *   Backend logic to make multiple, targeted LLM calls per Bloom's level for more precise question generation.
    *   LLM to not only justify the Bloom's level but also suggest alternative phrasings or improvements.
2.  **Advanced Contextual Understanding:**
    *   Implement query expansion or rephrasing before Qdrant search for better retrieval.
    *   Explore hybrid search in Qdrant (keyword + semantic).
    *   Integrate a re-ranking step after initial retrieval for more relevant context.
3.  **Question Paper Assembly & Export:**
    *   Allow teachers to select generated questions from chat history or a "question bank" to assemble a full question paper.
    *   Functionality to format and export the assembled paper (e.g., to PDF, DOCX).
    *   Automatically calculate total marks and ensure adherence to specified distributions.
4.  **Teacher Feedback Loop:**
    *   Allow teachers to rate generated questions (relevance, accuracy, Bloom's level correctness).
    *   Collect feedback to potentially fine-tune prompts or (long-term) a custom model.
5.  **Support for More File Types:** Add loaders for PPTX, images (with OCR), etc.
6.  **Enhanced Note-Taking:** Rich text editor for subject notes, ability to link notes to specific uploaded documents or textbook sections.

**UI/UX (The "Cool Factor"):**

For a more visually appealing and modern UI:

1.  **Landing Page Revamp:**
    *   **Professional Design:** A very long, scrollable landing page with distinct, animated sections.
    *   **Animated Hero Section:** More dynamic text animations, perhaps with Parallax scrolling effects or subtle background video.
    *   **Interactive Feature Showcases:** Instead of static cards, use animated accordions, tabbed interfaces, or scroll-triggered animations to reveal feature details.
    *   **FAQ Section:** Stylish, animated accordion.
    *   **Testimonials:** Animated carousel or a "wall of love" style.
    *   **Pricing Tiers:** Clearly designed pricing cards (if applicable).
    *   **Contact Us Form:** Modern, clean design.
    *   **Consistent Color Scheme & Gradients:** Utilize your `theme.primary`, `theme.secondary`, `theme.tertiary` with engaging gradients and hover effects.
    *   **Custom Illustrations/Icons:** Commission or find high-quality visuals that match the "genius" and "AI" theme.
    *   **Smooth Scrolling & Transitions:** Implement smooth scroll behavior and page transition animations.
2.  **Dashboard & Chat Page Styling:**
    *   **Consistent Theme Application:** Ensure all components (Cards, Buttons, Inputs, Tables, Modals) strictly adhere to the defined dark mode (and potentially light mode) theme using your CSS variables.
    *   **Glassmorphism & Neumorphism (judiciously):** Use these effects for depth and a modern feel on cards, sidebars, etc.
    *   **Microinteractions & Animations:** Add subtle animations to buttons, input fields, loading states, and list items for a more polished feel.
    *   **Improved Layout & Spacing:** Ensure consistent padding, margins, and visual hierarchy across all pages.
    *   **Custom Fonts:** Integrate Poppins and Montserrat effectively for body text and headings.
    *   **Iconography:** Consistently use a high-quality icon set (Lucide React is good, or integrate Font Awesome if preferred for a wider selection).
3.  **Dark/Light/System Theme Toggler:** Implement a user-facing theme switcher.

**Technical Improvements & Scalability:**

1.  **Robust Backend Authentication:** Transition from passing `clerkId` in request bodies/queries to verifying Clerk session tokens in backend middleware for all protected API routes.
2.  **Input Validation:** Implement comprehensive server-side validation for all API inputs (using a library like Zod or Joi).
3.  **Background Job Queue for Ingestion:** For very large files or high traffic, move the `processAndVectorizeFile` function to a dedicated background job queue (e.g., BullMQ with Redis) instead of just `async` fire-and-forget.
4.  **Optimized Qdrant Queries:** Fine-tune Qdrant search parameters, explore filtering strategies, and optimize vector indexing for performance as your dataset grows.
5.  **Caching:** Implement caching strategies (e.g., Redis) for frequently accessed data that doesn't change often.
6.  **Testing:** Comprehensive unit, integration, and end-to-end tests.
7.  **Deployment:** Set up CI/CD pipelines for both frontend and backend deployment (e.g., Vercel/Netlify for frontend, Render/Fly.io/AWS/GCP for backend).

---

## 🚀 Getting Started (Current Project Setup)

**(This section would detail how someone else could clone and run your project)**

1.  **Prerequisites:**
    *   Node.js (v18+ recommended)
    *   npm or yarn
    *   Docker (if running Qdrant locally) or a Qdrant Cloud account
    *   A Supabase account (or any PostgreSQL database)
    *   A Clerk account
    *   A Google Gemini API Key

2.  **Clone the Repository:**
    ```bash
    git clone https://github.com/saheb-ul-lah/bloom-taxonomy-rag.git
    cd bloom-taxonomy-rag
    ```

3.  **Backend Setup:**
    ```bash
    cd backend
    npm install
    cp .env.example .env # Create .env from an example
    # Populate .env with your DATABASE_URL, DIRECT_URL, WEBHOOK_SECRET, GOOGLE_GEMINI_API_KEY, QDRANT_URL, QDRANT_API_KEY
    npx prisma migrate dev --name init # Or prisma migrate reset if db already has old schema
    npx prisma generate
    npm run dev
    ```

4.  **Frontend Setup:**
    ```bash
    cd .. # Back to root
    npm install
    cp .env.example .env # Create .env from an example
    # Populate .env with VITE_CLERK_PUBLISHABLE_KEY and VITE_API_BASE_URL
    npm run dev
    ```

5.  **Ngrok/Tunneling Setup:**
    *   Start ngrok (or localtunnel) to expose your backend port (e.g., 5000).
    *   Configure the generated public URL in your Clerk webhook settings.

---



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
  <title>Bloom Taxonomy RAG</title>
  <meta name="description" content="Bloom Taxonomy RAG" />
  <meta name="author" content="saheb-ul-lah" />

  <meta property="og:title" content="Bloom Taxonomy RAG" />
  <meta property="og:description" content="Bloom Taxonomy RAG" />
  <meta property="og:type" content="website" />

  <style>
    * {
      color: black;

    }

    input,
    textarea {
      color: black;
    }
  </style>
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
    "start": "nodemon server.js"
  },
  "dependencies": {
    "@google/generative-ai": "^0.24.1",
    "@langchain/community": "^0.3.42",
    "@langchain/core": "^0.3.55",
    "@langchain/google-genai": "^0.2.8",
    "@prisma/client": "^6.7.0",
    "@qdrant/js-client-rest": "^1.14.0",
    "cors": "^2.8.5",
    "dotenv": "^16.5.0",
    "express": "^5.1.0",
    "langchain": "^0.3.24",
    "mammoth": "^1.9.0",
    "multer": "^1.4.5-lts.2",
    "nodemon": "^3.1.10",
    "pdf-parse": "^1.1.1",
    "svix": "^1.65.0"
  }
}



================================================
FILE: backend/server.js
================================================
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
  let qdrantOperationSuccessful = false; // Flag to indicate if Qdrant operation was considered a success

  try {
    // 1. Verify File Access
    try {
      await fs.access(filePathFromMulter);
      console.log(`${logPrefix} File system access VERIFIED for: ${filePathFromMulter}`);
    } catch (accessError) {
      console.error(`${logPrefix} ERROR: File not accessible at ${filePathFromMulter} for record ${fileRecord.id}:`, accessError.message);
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false, notes: `File not found at path for vectorization: ${filePathFromMulter}` },
      });
      return; // Exit early
    }

    // 2. Load Documents (PDF, DOCX, TXT)
    const lowerCaseFileType = fileRecord.fileType.toLowerCase();
    console.log(`${logPrefix} Determined file type: ${lowerCaseFileType}`);
    if (lowerCaseFileType === 'application/pdf') { /* ... PDFLoader ... */ }
    // ... (Full loader logic as in your provided code)
    // Ensure this section correctly populates `documents` or returns if error/unsupported
    // For brevity, I'm assuming your existing loader logic is in place here.
    // Example for PDF:
    else if (lowerCaseFileType === 'application/pdf') {
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

    if (!documents || documents.length === 0) { /* ... handle no content ... */ return; }
    console.log(`${logPrefix} Loaded ${documents.length} raw document(s)/page(s).`);

    // 3. Split Documents
    const textSplitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 200, addStartIndex: true });
    const splitDocs = await textSplitter.splitDocuments(documents);
    console.log(`${logPrefix} Split into ${splitDocs.length} chunks.`);
    if (splitDocs.length === 0) { /* ... handle no chunks ... */ return; }

    // 4. Add Metadata to Chunks
    const chunksWithMetadata = splitDocs.map((doc, index) => ({ /* ... as in your provided code ... */
      ...doc,
      metadata: {
        ...doc.metadata, source_filename: fileRecord.fileName, file_id_db: fileRecord.id, user_id_db: internalUserId,
        subject: fileRecord.subject || 'general', class_level: fileRecord.classLevel || 'general',
        chapter: fileRecord.chapter || 'general', category: fileRecord.category || 'general_upload',
        year: fileRecord.year?.toString() || undefined, exam_type: fileRecord.examType || undefined,
        doc_type: 'uploaded_file', chunk_index: index,
      }
    }));
    console.log(`${logPrefix} Enriched ${chunksWithMetadata.length} chunks with metadata.`);
    if (chunksWithMetadata.length > 0) console.log(`${logPrefix} Sample enriched chunk metadata:`, chunksWithMetadata[0].metadata);


    // 5. Ensure Qdrant Collection Exists
    console.log(`${logPrefix} Checking/Creating Qdrant collection: ${collectionName}`);
    try { /* ... Qdrant getCollection/createCollection logic as in your provided code ... */
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

    // 6. Add Documents to Qdrant
    console.log(`${logPrefix} Initializing QdrantVectorStore for collection: ${collectionName}`);
    const qdrantStore = new QdrantVectorStore(embeddings, { client: qdrantClient, collectionName });

    console.log(`${logPrefix} Attempting to add ${chunksWithMetadata.length} document chunks to Qdrant...`);
    let addedIdsFromStore;
    try {
      // The addDocuments method in LangChain's QdrantVectorStore might return void on success,
      // or an array of IDs. It should throw an error on failure.
      addedIdsFromStore = await qdrantStore.addDocuments(chunksWithMetadata);
      console.log(`${logPrefix} Raw result from qdrantStore.addDocuments:`, addedIdsFromStore);

      // If no error was thrown, assume the operation was accepted by Qdrant.
      // The actual check of whether points exist would require querying Qdrant.
      qdrantOperationSuccessful = true;

    } catch (qdrantAddError) {
      console.error(`${logPrefix} ERROR explicitly caught during qdrantStore.addDocuments:`, qdrantAddError);
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false, notes: `Qdrant addDocuments error: ${String(qdrantAddError.message || qdrantAddError).substring(0, 200)}` },
      });
      throw qdrantAddError; // Propagate to the main catch block
    }

    // 7. Update Prisma Record based on Qdrant operation outcome
    if (qdrantOperationSuccessful) {
      // Check if addedIdsFromStore is an array and has content; otherwise, store null for qdrantIds
      const finalQdrantIds = (Array.isArray(addedIdsFromStore) && addedIdsFromStore.length > 0) ? addedIdsFromStore : null;
      const successNote = finalQdrantIds ? 'Successfully vectorized.' : 'Vectorized (Qdrant IDs not returned by lib, but op presumed success).';

      if (finalQdrantIds) {
        console.log(`${logPrefix} Added ${finalQdrantIds.length} vectors to Qdrant. Sample Qdrant IDs:`, finalQdrantIds.slice(0, 3));
      } else {
        console.warn(`${logPrefix} qdrantStore.addDocuments returned ${addedIdsFromStore}. Storing null for qdrantIds.`);
      }

      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: {
          processed: true,
          isVectorized: true, // Mark as vectorized if addDocuments didn't throw
          qdrantIds: finalQdrantIds,
          qdrantCollection: collectionName,
          notes: successNote
        },
      });
      console.log(`${logPrefix} SUCCESS: File processing marked as complete in DB.`);
    } else {
      // This 'else' would typically only be hit if addDocuments didn't throw but also didn't result in qdrantOperationSuccessful = true
      // (which our current logic doesn't allow, as we assume success if no throw).
      // Kept for logical completeness if future checks are added.
      console.error(`${logPrefix} ERROR: Qdrant addDocuments did not confirm success clearly.`);
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false, notes: 'Qdrant addDocuments result unclear or failed without explicit error.' },
      });
    }

  } catch (error) { // Catches errors from any step within the main try block
    console.error(`${logPrefix} OVERALL ERROR during vectorization pipeline:`, error);
    // Ensure record is updated to reflect failure if not already done in a more specific catch
    const existingRecord = await prisma.uploadedFile.findUnique({ where: { id: fileRecord.id } });
    if (existingRecord && !existingRecord.isVectorized) { // Only update if not already marked as successfully vectorized
      await prisma.uploadedFile.update({
        where: { id: fileRecord.id },
        data: { processed: true, isVectorized: false, notes: `Vectorization pipeline error: ${String(error.message || error).substring(0, 250)}` },
      }).catch(dbErr => console.error(`${logPrefix} DB update error on main failure:`, dbErr));
    }
  } finally {
    // Cleanup temporary file
    try {
      await fs.access(filePathFromMulter);
      await fs.unlink(filePathFromMulter);
      console.log(`${logPrefix} CLEANUP: Deleted temporary file: ${filePathFromMulter}`);
    } catch (unlinkError) {
      if (unlinkError.code !== 'ENOENT') {
        console.warn(`${logPrefix} CLEANUP WARNING during unlink of ${filePathFromMulter}:`, unlinkError.message);
      } else {
        console.log(`${logPrefix} CLEANUP: Temporary file ${filePathFromMulter} was already gone.`);
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
  teacherPreference TeacherPreference?
  department    String? // ADDED: For teacher's department
  institution   String? // ADDED: For teacher's institution
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
  category         String?  // e.g., "question_paper", "lecture_notes", "textbook_chapter"
  year             Int?     // If 'year' is specific to question papers
  examType         String?  // If 'examType' is specific to question papers
  notes            String? 
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


model TeacherPreference {
  id                String @id @default(uuid())
  userId            String @unique // Each user has one set of these preferences
  user              User   @relation(fields: [userId], references: [id])
  promptText        String? @db.Text // For long prompt text
  quickPreferences  Json?  // For the checkbox preferences
  // Add other structured preferences here if needed (e.g. default Bloom distribution)
  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}


================================================
FILE: backend/prisma/migrations/migration_lock.toml
================================================
# Please do not edit this file manually
# It should be added in your version-control system (e.g., Git)
provider = "postgresql"



================================================
FILE: backend/prisma/migrations/20250517065655_init/migration.sql
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
    "department" TEXT,
    "institution" TEXT,

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
    "category" TEXT,
    "year" INTEGER,
    "examType" TEXT,
    "notes" TEXT,

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

-- CreateTable
CREATE TABLE "TeacherPreference" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "promptText" TEXT,
    "quickPreferences" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TeacherPreference_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");

-- CreateIndex
CREATE UNIQUE INDEX "TeacherPreference_userId_key" ON "TeacherPreference"("userId");

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

-- AddForeignKey
ALTER TABLE "TeacherPreference" ADD CONSTRAINT "TeacherPreference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;



================================================
FILE: prompts/push.md
================================================
git add .
git commit -m "Updated the readme file"
git push origin main


================================================
FILE: prompts/quick_links.md
================================================
supabase dashboard->
https://supabase.com/dashboard/project/lejlgkaumgqnntjggkqx/editor/17318




================================================
FILE: public/robots.txt
================================================
User-agent: Googlebot
Allow: /

User-agent: Bingbot
Allow: /

User-agent: Twitterbot
Allow: /

User-agent: facebookexternalhit
Allow: /

User-agent: *
Allow: /



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


* {
  color: black;
}


================================================
FILE: src/App.tsx
================================================
// src/App.jsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"; // Will become Index.jsx
import NotFound from "./pages/NotFound"; // Will become NotFound.jsx
import ChatPage from "./pages/ChatPage"; // Will become ChatPage.jsx
import Login from "./pages/Login"; // Will become Login.jsx
import Signup from "./pages/Signup"; // Will become Signup.jsx
import LandingPage from "./pages/LandingPage"; // Will become LandingPage.jsx
import TeachersDashboard from "./pages/TeachersDashboard.jsx"; // Will become TeachersDashboard.jsx

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
    --background: 240 10% 7%;
    /* Darker background */
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
    0% {
      background-position: 0% 50%
    }

    50% {
      background-position: 100% 50%
    }

    100% {
      background-position: 0% 50%
    }
  }

  .hover-scale {
    @apply transition-all duration-300 hover:scale-105;
  }

  .hover-lift {
    @apply transition-all duration-300 hover:-translate-y-1;
  }
}

* {
  color: black;
}


================================================
FILE: src/main copy.tsx
================================================
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // Make sure this is .jsx
import './index.css';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) { throw new Error("Missing Publishable Key") }

// This is less ideal because ClerkProvider's navigate prop won't work as easily
// if BrowserRouter is inside App. Clerk needs to be able to control navigation.
// The setup below assumes Clerk's default navigation or component-level redirects will mostly handle it.
// If you need fine-grained control via Clerk's navigate prop, the structure with
// BrowserRouter -> ClerkProvider -> App (where App doesn't have BrowserRouter) is better.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      // signInFallbackRedirectUrl="/sign-in" // Optional: if user hits protected route
      // signUpFallbackRedirectUrl="/sign-up" // Optional
      // afterSignInUrl="/dashboard" // Central place for after sign-in
      // afterSignUpUrl="/dashboard" // Central place for after sign-up
    >
      <App /> {/* App.jsx contains BrowserRouter */}
    </ClerkProvider>
  </React.StrictMode>,
)


================================================
FILE: src/main.tsx
================================================
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js'; // Make sure this is .jsx
import './index.css';
import { ClerkProvider, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) { throw new Error("Missing Publishable Key") }

// This is less ideal because ClerkProvider's navigate prop won't work as easily
// if BrowserRouter is inside App. Clerk needs to be able to control navigation.
// The setup below assumes Clerk's default navigation or component-level redirects will mostly handle it.
// If you need fine-grained control via Clerk's navigate prop, the structure with
// BrowserRouter -> ClerkProvider -> App (where App doesn't have BrowserRouter) is better.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider 
      publishableKey={PUBLISHABLE_KEY}
      // signInFallbackRedirectUrl="/sign-in" // Optional: if user hits protected route
      // signUpFallbackRedirectUrl="/sign-up" // Optional
      // afterSignInUrl="/dashboard" // Central place for after sign-in
      // afterSignUpUrl="/dashboard" // Central place for after sign-up
    >
      <App /> {/* App.jsx contains BrowserRouter */}
    </ClerkProvider>
  </React.StrictMode>,
)


================================================
FILE: src/vite-env.d.ts
================================================
/// <reference types="vite/client" />



================================================
FILE: src/components/ChatHistory.jsx
================================================
// src/components/ChatHistory.jsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, History, PlusCircle } from "lucide-react";

const ChatHistory = ({ 
  histories, 
  activeHistoryId, 
  onSelectHistory,
  onNewChat
}) => {
  return (
    <div className="h-full w-full bg-black-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <History size={20} />
          Chat History
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onNewChat}
          className="text-white/70 hover:text-white hover:bg-theme-tertiary/20"
          title="New Chat"
        >
          <PlusCircle size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {histories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No previous chats found.</p>
            <Button 
              onClick={onNewChat}
              className="mt-2 bg-theme-primary hover:bg-theme-primary/80 text-white"
              size="sm"
            >
              Start New Chat
            </Button>
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
                <FileText size={18} className="text-gray-400 group-hover:text-theme-primary transition-colors mt-1 shrink-0" />
                <div className="overflow-hidden"> {/* Added for text ellipsis */}
                  <h3 className="font-medium text-white group-hover:text-theme-primary transition-colors text-sm truncate">
                    {history.title}
                  </h3>
                  <p className="text-xs text-gray-500">{history.date}</p>
                </div>
              </button>
            ))}
          </div>
        )}
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
FILE: src/components/ChatMessages.jsx
================================================
// src/components/ChatMessages.jsx
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bot, User, DownloadCloud, ExternalLink } from "lucide-react"; // Added ExternalLink

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(new Date(date));
  };

  const renderAIResponse = (responseData) => {
    if (typeof responseData === 'string') {
      // Basic Markdown-like link detection: [text](url)
      const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(responseData)) !== null) {
        if (match.index > lastIndex) {
          parts.push(responseData.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline inline-flex items-center"
          >
            {match[1]} <ExternalLink size={12} className="ml-1" />
          </a>
        );
        lastIndex = linkRegex.lastIndex;
      }
      if (lastIndex < responseData.length) {
        parts.push(responseData.substring(lastIndex));
      }

      return <p className="whitespace-pre-wrap">{parts.length > 0 ? parts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : responseData}</p>;
    }

    if (Array.isArray(responseData)) {
      return (
        <div className="space-y-3 mt-2">
          {responseData.map((q, index) => (
            <div key={index} className="p-3 rounded-md bg-black/20 border border-gray-600/50">
              <p className="font-semibold text-sm">Question {index + 1}: <span className="font-normal">{q.question}</span></p>
              <p className="text-xs text-gray-300 mt-1">Bloom's Level: <span className="font-medium text-yellow-400">{q.bloomLevel}</span></p>
              <p className="text-xs text-gray-400 mt-0.5">Justification: <span className="italic">{q.justification}</span></p>
            </div>
          ))}
        </div>
      );
    }
    return <p className="whitespace-pre-wrap">Received complex data. Display not fully implemented for this structure.</p>;
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className={`flex items-start gap-3 ${message.user === 'me' ? 'flex-row-reverse' : ''} animate-fade-in`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <Avatar className={`h-9 w-9 ring-1 shrink-0 ${
            message.user === 'me' ? 'ring-theme-primary' : 'ring-theme-tertiary'
          }`}>
            <AvatarImage src={undefined} /> {/* No default images */}
            <AvatarFallback className={
              message.user === 'me' ? 'bg-theme-primary text-white' : 'bg-theme-tertiary text-white'
            }>
              {message.user === 'me' ? <User size={18} /> : <Bot size={18} />}
            </AvatarFallback>
          </Avatar>

          <div className={`space-y-1 max-w-[85%] md:max-w-[75%]`}>
            <div 
              className={`px-4 py-3 rounded-xl shadow-md break-words ${
                message.user === 'me' 
                  ? 'bg-theme-primary text-white rounded-tr-none' 
                  : (message.user === 'system' ? 'bg-gray-600 text-gray-200 rounded-tl-none text-center w-full max-w-full text-sm' : 'bg-gray-700 text-white rounded-tl-none') 
              }`}
            >
              {message.isGenerating ? (
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-0"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200"></div>
                  <span>{typeof message.text === 'string' ? message.text : "Processing..."}</span>
                </div>
              ) : message.user === 'assistant' ? (
                renderAIResponse(message.text)
              ) : (
                <p className="whitespace-pre-wrap">{message.text}</p>
              )}
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map(attachment => (
                    <div key={attachment.id} className="flex items-center gap-2 p-2 rounded bg-black/20 border border-gray-600/50">
                       <div className="h-8 w-8 bg-gray-600 rounded flex items-center justify-center text-xs text-white shrink-0">
                        {attachment.type?.split('/')[1]?.substring(0,3).toUpperCase() || 'FILE'}
                      </div>
                      <div className="flex-1 truncate text-sm text-gray-300">
                        {attachment.name}
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-theme-primary" asChild>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer"><DownloadCloud size={16}/></a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
               {message.user === 'assistant' && message.usedSources && message.usedSources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-600/50">
                  <p className="text-xs text-gray-400">Sources:</p>
                  <ul className="list-disc list-inside pl-2 text-xs text-gray-500">
                    {message.usedSources.map((source, i) => <li key={i} className="truncate">{source}</li>)}
                  </ul>
                </div>
              )}
            </div>
            
            {message.timestamp && !message.isGenerating && (
                <div className={`text-xs text-gray-500 ${message.user === 'me' ? 'text-right pr-1' : 'text-left pl-1'}`}>
                {formatTime(message.timestamp)}
              </div>
            )}
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
// src/components/Navbar.jsx
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
import { useAuth } from '@clerk/clerk-react'; // MODIFIED: Import useAuth
import UserDropdown from '@/components/UserDropdown'; // MODIFIED: Import UserDropdown

const Navbar = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth(); // MODIFIED: Get authentication status

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
                  {/* ... (content unchanged) ... */}
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
              {isSignedIn && ( // MODIFIED: Only show Dashboard if signed in
                <NavigationMenuItem>
                  <NavigationMenuLink 
                    className={`${navigationMenuTriggerStyle()} bg-transparent text-white hover:bg-white/10`} 
                    onClick={() => navigate('/dashboard')}
                    style={{ cursor: 'pointer' }}
                  >
                    Dashboard
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {isSignedIn ? ( // MODIFIED: Show UserDropdown if signed in
          <UserDropdown />
        ) : (
          <>
            <Button 
              variant="outline" 
              className="hidden md:flex text-white border-white hover:bg-white/20 animate-fade-in transition-all duration-300" 
              onClick={() => navigate('/sign-in')} // MODIFIED: Navigate to /sign-in
            >
              Login
            </Button>
            <Button 
              className="hidden md:flex bg-gradient-to-r from-yellow-300 to-yellow-500 text-black hover:bg-yellow-400 animate-fade-in transition-all duration-300" 
              onClick={() => navigate('/sign-up')} // MODIFIED: Navigate to /sign-up
            >
              Get Started
            </Button>
          </>
        )}
        
        <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-white/10">
          <Menu /> {/* TODO: Implement mobile menu toggle and links */}
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
// src/components/UserDropdown.jsx
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
import { useClerk, useUser } from '@clerk/clerk-react'; // MODIFIED: Import useClerk and useUser
import { useNavigate } from 'react-router-dom'; // MODIFIED: For navigation

const UserDropdown = () => {
  const { signOut } = useClerk(); // MODIFIED: Get signOut function
  const { user } = useUser(); // MODIFIED: Get user information
  const navigate = useNavigate(); // MODIFIED

  const handleSignOut = async () => {
    await signOut();
    navigate('/'); // Redirect to home page after sign out
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer outline-none">
        <Avatar>
          <AvatarImage src={user?.imageUrl} alt={user?.fullName || 'User'} /> {/* MODIFIED: Use Clerk user data */}
          <AvatarFallback>{user?.firstName?.charAt(0) || ''}{user?.lastName?.charAt(0) || 'U'}</AvatarFallback> {/* MODIFIED */}
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-gray-800 border-gray-700 text-white"> {/* MODIFIED: Style consistency */}
        <DropdownMenuLabel className="text-gray-300">
            {user?.fullName || user?.primaryEmailAddress?.emailAddress || 'My Account'} {/* MODIFIED */}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-gray-700"/>
        <DropdownMenuItem className="cursor-pointer hover:bg-gray-700" onClick={() => navigate('/dashboard')}>Profile / Dashboard</DropdownMenuItem> {/* MODIFIED */}
        {/* Add other items like Settings if needed */}
        {/* <DropdownMenuItem className="cursor-pointer hover:bg-gray-700">Settings</DropdownMenuItem> */}
        <DropdownMenuSeparator className="bg-gray-700"/>
        <DropdownMenuItem 
            className="cursor-pointer text-red-400 hover:bg-red-700/50 hover:text-red-300"  // MODIFIED: Style consistency
            onClick={handleSignOut} // MODIFIED: Call handleSignOut
        >
            Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserDropdown;


================================================
FILE: src/components/dashboard/CustomPromptEditor.jsx
================================================
// src/components/dashboard/CustomPromptEditor.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Save, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const defaultPromptPlaceholder = `I teach Computer Science to 2nd year undergraduates. 
When creating question papers, I prefer:
- 40% easy questions, 40% medium difficulty, and 20% challenging questions
- Mix of theoretical and practical questions
- Include at least two programming problems for each paper
- Focus on fundamental concepts rather than memorization`;

const defaultQuickPreferences = {
  includeObjective: true,
  includeSubjective: true,
  includePractical: true,
  balancedDifficulty: true,
  focusOnConcepts: true,
  includeRealWorld: false,
  includeDiagrams: false
};

const CustomPromptEditor = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [promptText, setPromptText] = useState(defaultPromptPlaceholder);
  const [quickPreferences, setQuickPreferences] = useState(defaultQuickPreferences);

  const { data: existingPrefs, isLoading: isLoadingPrefs, error: prefsError } = useQuery({
    queryKey: ['teacherCustomPrompt', userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        // This endpoint was added in backend/server.js
        return await apiRequest(`/teacher/preferences/custom-prompt?clerkId=${userId}`, {}, getToken);
      } catch (error) {
        if (error.status === 404) {
          console.log("No custom prompt preferences found for user, using defaults.");
          return null; 
        }
        console.error("Error fetching custom prompt preferences:", error);
        throw error; // Re-throw other errors to be caught by react-query
      }
    },
    enabled: !!userId,
    onSuccess: (data) => {
      if (data) {
        setPromptText(data.promptText || defaultPromptPlaceholder);
        setQuickPreferences(data.quickPreferences || defaultQuickPreferences);
      } else {
        // If no data (404), ensure defaults are set
        setPromptText(defaultPromptPlaceholder);
        setQuickPreferences(defaultQuickPreferences);
      }
    },
    // Consider staleTime or cacheTime if these preferences don't change often
  });

  const savePromptMutation = useMutation({
    mutationFn: async (prefsToSave) => {
      if (!userId) throw new Error("User not authenticated");
      // This endpoint was added in backend/server.js
      return apiRequest('/teacher/preferences/custom-prompt', {
        method: 'POST',
        body: JSON.stringify({ clerkId: userId, ...prefsToSave }),
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherCustomPrompt', userId] });
      toast.success(data.message || "AI Prompt Preferences saved!");
      // For ChatPage.jsx to pick up the latest prompt without needing a global state manager immediately
      if (data.preference?.promptText) {
        localStorage.setItem('customAIPrompt_teacher_' + userId, data.preference.promptText);
      }
    },
    onError: (error) => {
      toast.error(error.message || "Failed to save preferences.");
    }
  });

  const handleSavePrompt = () => {
    const prefsToSave = { promptText, quickPreferences };
    savePromptMutation.mutate(prefsToSave);
  };
  
  const toggleQuickPreference = (key) => {
    setQuickPreferences(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  if (isLoadingPrefs) {
    return <div className="flex justify-center items-center p-8"><Loader2 className="h-8 w-8 animate-spin text-theme-primary" /> <span className="ml-2">Loading preferences...</span></div>;
  }
  if (prefsError) {
    return <div className="text-red-500 p-4 bg-red-900/20 rounded-md">Error loading preferences: {prefsError.message}</div>;
  }
  
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
          <Card className="glass-morphism border-theme-tertiary/20 h-full flex flex-col">
            <CardHeader>
              <CardTitle className="text-lg">Custom AI Prompt</CardTitle>
              <p className="text-sm text-white/70">
                Describe your question paper style, preferences, and requirements in detail. This will be used by the AI.
              </p>
            </CardHeader>
            <CardContent className="flex-grow">
              <Textarea 
                value={promptText} 
                onChange={(e) => setPromptText(e.target.value)}
                placeholder="Describe your question paper preferences here..."
                className="h-full min-h-[200px] bg-theme-secondary/20 border-theme-tertiary/30 text-white" // Ensure textarea can grow
              />
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button 
                className="bg-theme-primary hover:bg-theme-primary/80"
                onClick={handleSavePrompt}
                disabled={savePromptMutation.isPending}
              >
                {savePromptMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
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
                Select common preferences to incorporate. These can supplement your custom prompt.
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.keys(quickPreferences).map(key => (
                <div className="flex items-start space-x-3" key={key}> {/* Increased space */}
                  <Checkbox 
                    id={key}
                    checked={!!quickPreferences[key]} // Ensure boolean for controlled component
                    onCheckedChange={() => toggleQuickPreference(key)}
                    className="data-[state=checked]:bg-theme-primary data-[state=checked]:border-theme-primary mt-1" // Adjusted margin
                  />
                  <div className="grid gap-0.5 leading-none"> {/* Reduced gap */}
                    <label
                      htmlFor={key}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 capitalize"
                    >
                      {key.replace(/([A-Z_])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </label>
                    {/* You can add descriptions for quick preferences here if needed */}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomPromptEditor;




================================================
FILE: src/components/dashboard/QuestionPapers.jsx
================================================
// src/components/dashboard/QuestionPapers.jsx
import React, { useState, useRef } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from "@/components/ui/table";
import { FilePlus, Trash2, Download, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const initialNewPaperState = {
  subject: '',
  year: new Date().getFullYear().toString(),
  examType: '',
  classLevel: '',
  board: '', // e.g., University Name, Board Name
  institution: '', // Optional: e.g., UG, PG, School
  department: '',  // Optional: e.g., Computer Science
  courseCode: '',  // Optional
  // No filename here, it comes from the selectedFile object
};

const QuestionPapers = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newPaperData, setNewPaperData] = useState(initialNewPaperState);
  const [selectedFile, setSelectedFile] = useState(null);

  const { data: papers, isLoading: isLoadingPapers, error: papersError } = useQuery({
    queryKey: ['teacherUploadedQuestionPapers', userId], // More specific queryKey
    queryFn: async () => {
      if (!userId) return [];
      // MODIFIED: Using 'category' for filtering as discussed
      const rawPapers = await apiRequest(
        `/teacher/uploaded-files?clerkId=${userId}&category=question_paper`, 
        {}, 
        getToken
      );
      return (rawPapers || []).map(p => ({
        id: p.id,
        filename: p.fileName,
        uploadDate: new Date(p.createdAt).toLocaleDateString(),
        subject: p.subject || 'N/A',
        // Use optional chaining for potentially missing fields from backend if not all are set
        year: p.year?.toString() || new Date(p.createdAt).getFullYear().toString(), 
        examType: p.examType || 'N/A',
        classLevel: p.classLevel || 'N/A',
        board: p.board || 'N/A', // Assuming board might be stored directly on UploadedFile
      }));
    },
    enabled: !!userId,
  });

  const uploadPaperMutation = useMutation({
    mutationFn: async ({ file, metadata }) => {
      if (!userId) throw new Error("User not authenticated");
      if (!file) throw new Error("No file selected for upload");

      const formData = new FormData();
      formData.append('file', file);
      formData.append('clerkId', userId);
      
      // Append all metadata
      Object.entries(metadata).forEach(([key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          formData.append(key, value);
        }
      });
      formData.append('category', 'question_paper'); // Explicitly set category

      return apiRequest('/teacher/upload-material', {
        method: 'POST',
        body: formData,
        isFormData: true,
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherUploadedQuestionPapers', userId] });
      toast.success(data.message || "Question paper uploaded and is processing.");
      setShowAddForm(false);
      setNewPaperData(initialNewPaperState);
      setSelectedFile(null);
      if(fileInputRef.current) fileInputRef.current.value = "";
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload question paper.");
    }
  });

  const deletePaperMutation = useMutation({
    mutationFn: async (fileId) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest(`/teacher/uploaded-files/${fileId}`, { // Ensure this backend route exists
        method: 'DELETE',
        body: JSON.stringify({ clerkId: userId }),
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherUploadedQuestionPapers', userId] });
      toast.success("Question paper deleted successfully.");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete question paper.");
    }
  });

  const handleAddPaperSubmit = () => {
    if (selectedFile && newPaperData.subject && newPaperData.classLevel && newPaperData.board) {
      uploadPaperMutation.mutate({ file: selectedFile, metadata: newPaperData });
    } else {
      toast.error("Please select a file and fill in required fields: Subject, Class Level, and Board/University.");
    }
  };
  
  const handleDeletePaper = (id) => {
    if (window.confirm("Are you sure you want to delete this question paper? This action cannot be undone and will remove it from the RAG system.")) {
        deletePaperMutation.mutate(id);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaperData(prev => ({ ...prev, [name]: value }));
  };

  if (isLoadingPapers) return <div className="flex justify-center items-center h-40"><Loader2 className="h-10 w-10 animate-spin text-theme-primary" /> <span className="ml-3 text-lg">Loading Papers...</span></div>;
  
  // Display error only if it's not a 404 (which might mean no papers yet)
  if (papersError && papersError.status !== 404) {
      return <div className="text-red-400 p-4 bg-red-900/30 rounded-lg border border-red-700">Error loading papers: {papersError.message}</div>;
  }


  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500">
          Uploaded Question Papers
        </h2>
        <Button 
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-theme-primary hover:bg-theme-primary/80 text-white shadow-lg hover:shadow-xl transition-shadow w-full sm:w-auto"
        >
          <FilePlus className="mr-2 h-5 w-5" />
          {showAddForm ? 'Cancel Upload' : 'Upload New Paper'}
        </Button>
      </div>
      
      {showAddForm && (
        <Card className="glass-morphism border-theme-tertiary/30 shadow-xl animate-fade-in">
          <CardHeader><CardTitle className="text-xl text-white/90">Upload New Question Paper</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <div>
                <label htmlFor="subject" className="text-sm font-medium text-white/80 block mb-1.5">Subject*</label>
                <Input id="subject" name="subject" value={newPaperData.subject} onChange={handleInputChange} placeholder="e.g. Advanced Calculus" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="year" className="text-sm font-medium text-white/80 block mb-1.5">Year</label>
                <Input id="year" name="year" value={newPaperData.year} onChange={handleInputChange} type="number" placeholder={new Date().getFullYear().toString()} className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="examType" className="text-sm font-medium text-white/80 block mb-1.5">Exam Type</label>
                <Input id="examType" name="examType" value={newPaperData.examType} onChange={handleInputChange} placeholder="e.g. Mid Term, Final, Entrance" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="classLevel" className="text-sm font-medium text-white/80 block mb-1.5">Class Level / Semester*</label>
                <Input id="classLevel" name="classLevel" value={newPaperData.classLevel} onChange={handleInputChange} placeholder="e.g., 10th Grade, BSc Sem II" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
              <div>
                <label htmlFor="board" className="text-sm font-medium text-white/80 block mb-1.5">Board / University*</label>
                <Input id="board" name="board" value={newPaperData.board} onChange={handleInputChange} placeholder="e.g., CBSE, Dibrugarh University" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
               <div>
                <label htmlFor="institution" className="text-sm font-medium text-white/80 block mb-1.5">Institution Type (Optional)</label>
                <Input id="institution" name="institution" value={newPaperData.institution} onChange={handleInputChange} placeholder="e.g., School, UG, PG" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
               <div>
                <label htmlFor="department" className="text-sm font-medium text-white/80 block mb-1.5">Department (Optional)</label>
                <Input id="department" name="department" value={newPaperData.department} onChange={handleInputChange} placeholder="e.g., Computer Science" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
               <div>
                <label htmlFor="courseCode" className="text-sm font-medium text-white/80 block mb-1.5">Course Code (Optional)</label>
                <Input id="courseCode" name="courseCode" value={newPaperData.courseCode} onChange={handleInputChange} placeholder="e.g., CS-201" className="bg-theme-secondary/30 border-theme-tertiary/40 text-white placeholder:text-white/50" />
              </div>
            </div>
            <div>
              <label htmlFor="fileUpload" className="text-sm font-medium text-white/80 block mb-1.5">Upload File* (.pdf, .docx, .txt)</label>
              <Input 
                id="fileUpload" type="file" ref={fileInputRef} onChange={handleFileChange}
                className="w-full text-sm text-white/80 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-theme-primary/80 file:text-white hover:file:bg-theme-primary cursor-pointer bg-theme-secondary/30 border-theme-tertiary/40"
                accept=".pdf,.doc,.docx,.txt"
              />
               {selectedFile && <p className="text-xs text-green-400 mt-2">Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)</p>}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-3 pt-6 border-t border-white/10">
            <Button variant="outline" onClick={() => { setShowAddForm(false); setSelectedFile(null); if(fileInputRef.current) fileInputRef.current.value = ""; setNewPaperData(initialNewPaperState); }} className="border-white/30 text-white/80 hover:bg-white/10">Cancel</Button>
            <Button onClick={handleAddPaperSubmit} className="bg-theme-primary hover:bg-theme-primary/90 text-white shadow-md hover:shadow-lg" disabled={!selectedFile || uploadPaperMutation.isPending}>
              {uploadPaperMutation.isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : null}
              Upload & Process Paper
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <Card className="glass-morphism border-theme-tertiary/20 shadow-lg">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-theme-secondary/40">
                <TableRow className="border-b-theme-tertiary/40">
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Filename</TableHead>
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Subject</TableHead>
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Class/Sem</TableHead>
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Year</TableHead>
                  <TableHead className="text-white/90 font-semibold px-4 py-3">Uploaded</TableHead>
                  <TableHead className="text-right text-white/90 font-semibold px-4 py-3">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(papers && papers.length > 0) ? papers.map((paper) => (
                  <TableRow key={paper.id} className="border-b-theme-tertiary/20 hover:bg-theme-secondary/20 transition-colors">
                    <TableCell className="font-medium text-white/90 px-4 py-3 truncate max-w-xs" title={paper.filename}>{paper.filename}</TableCell>
                    <TableCell className="text-white/80 px-4 py-3">{paper.subject}</TableCell>
                    <TableCell className="text-white/80 px-4 py-3">{paper.classLevel}</TableCell>
                    <TableCell className="text-white/80 px-4 py-3">{paper.year}</TableCell>
                    <TableCell className="text-white/80 px-4 py-3">{paper.uploadDate}</TableCell>
                    <TableCell className="text-right px-4 py-3">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 text-blue-400 hover:text-blue-300 hover:bg-blue-500/20" title="Download (placeholder)" onClick={() => toast.info("Download functionality to be implemented. File URL: " + paper.fileUrl)}>
                          <Download size={18} />
                        </Button>
                        <Button 
                          variant="ghost" size="icon" 
                          onClick={() => handleDeletePaper(paper.id)}
                          disabled={deletePaperMutation.isPending && deletePaperMutation.variables === paper.id}
                          className="h-9 w-9 text-red-500/70 hover:text-red-400 hover:bg-red-500/20"
                          title="Delete Paper"
                        >
                          {deletePaperMutation.isPending && deletePaperMutation.variables === paper.id ? <Loader2 className="h-5 w-5 animate-spin"/> : <Trash2 size={18} />}
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )) : (
                  !isLoadingPapers && (
                    <TableRow>
                        <TableCell colSpan={6} className="text-center text-white/60 py-10 text-lg">
                            No question papers uploaded yet. Click "Upload New Paper" to begin.
                        </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuestionPapers;


================================================
FILE: src/components/dashboard/SubjectNotes.jsx
================================================
// src/components/dashboard/SubjectNotes.jsx
import React, { useState } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from '@/lib/api';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { FilePlus, Trash2, FileText, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const SubjectNotes = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [showAddForm, setShowAddForm] = useState(false);
  const [newNoteData, setNewNoteData] = useState({
    subject: '',
    title: '',
    content: '',
    classLevel: '',
    chapter: '',
    board: '',
    language: 'en',
    institution: '',
    department: '',
    courseCode: '',
  });

  const { data: notes, isLoading: isLoadingNotes, error: notesError } = useQuery({
    queryKey: ['teacherNotes', userId],
    queryFn: async () => {
      if (!userId) return [];
      const rawNotes = await apiRequest(`/teacher/notes?clerkId=${userId}`, {}, getToken);
      return rawNotes.map(n => ({ ...n, date: new Date(n.createdAt).toLocaleDateString() }));
    },
    enabled: !!userId,
  });

  const addNoteMutation = useMutation({
    mutationFn: async (noteData) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest('/teacher/notes', {
        method: 'POST',
        body: JSON.stringify({ ...noteData, clerkId: userId }),
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherNotes', userId] });
      toast.success("Note added successfully!");
      setShowAddForm(false);
      setNewNoteData({ subject: '', title: '', content: '', classLevel: '', chapter: '', board: '', language: 'en', institution: '', department: '', courseCode: '' });
    },
    onError: (error) => {
      toast.error(error.message || "Failed to add note.");
    }
  });

  const deleteNoteMutation = useMutation({
    mutationFn: async (noteId) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest(`/teacher/notes/${noteId}`, {
        method: 'DELETE',
        body: JSON.stringify({ clerkId: userId }), // Pass clerkId for backend authorization
      }, getToken);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['teacherNotes', userId] });
      toast.success("Note deleted successfully!");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to delete note.");
    }
  });

  const handleAddNoteSubmit = () => {
    const { title, subject, classLevel, chapter, board } = newNoteData;
    if (title && subject && classLevel && chapter && board) {
      addNoteMutation.mutate(newNoteData);
    } else {
      toast.error("Please fill in all required fields: Title, Subject, Class Level, Chapter, and Board/University.");
    }
  };

  const handleDeleteNote = (id) => {
    deleteNoteMutation.mutate(id);
  };

  if (isLoadingNotes) return <div className="flex justify-center items-center h-32"><Loader2 className="h-8 w-8 animate-spin text-theme-primary" /> <span className="ml-2">Loading notes...</span></div>;
  if (notesError) return <div className="text-red-500 p-4 bg-red-900/20 rounded-md">Error loading notes: {notesError.message}</div>;

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
          <CardHeader><CardTitle className="text-lg">Add New Note</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-white/70">Title*</label>
                <Input value={newNoteData.title} onChange={(e) => setNewNoteData({...newNoteData, title: e.target.value})} placeholder="e.g. Calculus Fundamentals" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              <div>
                <label className="text-sm text-white/70">Subject*</label>
                <Input value={newNoteData.subject} onChange={(e) => setNewNoteData({...newNoteData, subject: e.target.value})} placeholder="e.g. Mathematics" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
              <div>
                <label className="text-sm text-white/70">Class Level*</label>
                <Input value={newNoteData.classLevel} onChange={(e) => setNewNoteData({...newNoteData, classLevel: e.target.value})} placeholder="e.g. 2nd Year Undergraduate" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Chapter*</label>
                <Input value={newNoteData.chapter} onChange={(e) => setNewNoteData({...newNoteData, chapter: e.target.value})} placeholder="e.g. Chapter 3" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Board/University*</label>
                <Input value={newNoteData.board} onChange={(e) => setNewNoteData({...newNoteData, board: e.target.value})} placeholder="e.g. Dibrugarh University" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Language</label>
                <Input value={newNoteData.language} onChange={(e) => setNewNoteData({...newNoteData, language: e.target.value})} placeholder="e.g. en" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               {/* Optional fields */}
               <div>
                <label className="text-sm text-white/70">Institution (Optional)</label>
                <Input value={newNoteData.institution} onChange={(e) => setNewNoteData({...newNoteData, institution: e.target.value})} placeholder="e.g. UG" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Department (Optional)</label>
                <Input value={newNoteData.department} onChange={(e) => setNewNoteData({...newNoteData, department: e.target.value})} placeholder="e.g. BCA" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
               <div>
                <label className="text-sm text-white/70">Course Code (Optional)</label>
                <Input value={newNoteData.courseCode} onChange={(e) => setNewNoteData({...newNoteData, courseCode: e.target.value})} placeholder="e.g. CS101" className="bg-theme-secondary/20 border-theme-tertiary/30" />
              </div>
            </div>
            <div>
              <label className="text-sm text-white/70">Content (Optional)</label>
              <Textarea value={newNoteData.content} onChange={(e) => setNewNoteData({...newNoteData, content: e.target.value})} placeholder="Enter your note content here..." className="h-32 bg-theme-secondary/20 border-theme-tertiary/30" />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowAddForm(false)} className="border-white/20 text-white">Cancel</Button>
            <Button onClick={handleAddNoteSubmit} className="bg-theme-primary hover:bg-theme-primary/80" disabled={addNoteMutation.isPending}>
              {addNoteMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Note
            </Button>
          </CardFooter>
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(notes || []).map((note) => (
          <Card key={note.id} className="glass-morphism border-theme-tertiary/20 hover:border-theme-tertiary/40 transition-all">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="flex-1 overflow-hidden pr-2"> {/* Added for title ellipsis */}
                  <p className="text-xs text-theme-tertiary/70 truncate">{note.subject} - {note.classLevel}</p>
                  <CardTitle className="text-lg truncate" title={note.title}>{note.title}</CardTitle>
                </div>
                <Button
                  variant="ghost" size="icon"
                  onClick={() => handleDeleteNote(note.id)}
                  disabled={deleteNoteMutation.isPending && deleteNoteMutation.variables === note.id}
                  className="h-8 w-8 text-white/50 hover:text-white hover:bg-theme-tertiary/20 shrink-0"
                >
                  {(deleteNoteMutation.isPending && deleteNoteMutation.variables === note.id) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 size={16} />}
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white/70 line-clamp-4">{note.content || "This note might be file-based or have no text content."}</p>
            </CardContent>
            <CardFooter className="pt-2 border-t border-white/10 flex justify-between">
              <p className="text-xs text-white/50">{note.date}</p>
              <div className="flex items-center text-xs text-white/50">
                <FileText size={12} className="mr-1" /> Note
              </div>
            </CardFooter>
          </Card>
        ))}
         {notes && notes.length === 0 && !isLoadingNotes && (
            <p className="col-span-full text-center text-white/70 py-8">No notes found. Add your first note to get started!</p>
        )}
      </div>
    </div>
  );
};

export default SubjectNotes;





================================================
FILE: src/components/dashboard/TeachersInfo.jsx
================================================
// src/components/dashboard/TeachersInfo.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UserCircle, Edit2, Save, Loader2 } from "lucide-react";
import { toast } from '@/components/ui/sonner';

// MODIFICATION: Add these imports
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"; 

const initialTeacherInfo = {
  name: "",
  department: "",
  institution: "",
  email: "",
};

const TeacherInfo = () => {
  const { userId, getToken, user: clerkUser } = useAuth();
  const queryClient = useQueryClient();

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(initialTeacherInfo);

  const { data: teacherInfo, isLoading: isLoadingInfo, error: infoError } = useQuery({
    queryKey: ['teacherProfile', userId],
    queryFn: async () => {
      if (!userId) return null;
      try {
        return await apiRequest(`/teacher/profile?clerkId=${userId}`, {}, getToken);
      } catch (error) {
        if (error.status === 404) {
          console.log("No teacher profile found, using Clerk data as default.");
          return null; 
        }
        console.error("Error fetching teacher profile:", error);
        throw error;
      }
    },
    enabled: !!userId,
    onSuccess: (data) => {
      if (data) {
        setEditForm({
          name: data.name || clerkUser?.fullName || '',
          department: data.department || '',
          institution: data.institution || '',
          email: data.email || clerkUser?.primaryEmailAddress?.emailAddress || '',
        });
      } else if (clerkUser) {
        setEditForm({
          name: clerkUser.fullName || '',
          department: '',
          institution: '',
          email: clerkUser.primaryEmailAddress?.emailAddress || '',
        });
      }
    }
  });

  const saveProfileMutation = useMutation({
    mutationFn: async (profileData) => {
      if (!userId) throw new Error("User not authenticated");
      return apiRequest('/teacher/profile', {
        method: 'POST',
        body: JSON.stringify({ clerkId: userId, ...profileData }),
      }, getToken);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['teacherProfile', userId] });
      toast.success(data.message || "Profile updated successfully!");
      setIsEditing(false);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to update profile.");
    }
  });

  const handleSave = () => {
    saveProfileMutation.mutate(editForm);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    if (!teacherInfo && clerkUser && !isEditing) {
        setEditForm({
            name: clerkUser.fullName || '',
            email: clerkUser.primaryEmailAddress?.emailAddress || '',
            department: '',
            institution: '',
        });
    }
  }, [clerkUser, teacherInfo, isEditing]);

  const displayInfo = isEditing ? editForm : (teacherInfo || editForm); 

  if (isLoadingInfo && !clerkUser) { 
    return <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20 p-6 flex justify-center items-center"><Loader2 className="h-8 w-8 animate-spin text-theme-primary" /> <span className="ml-2">Loading teacher info...</span></Card>;
  }

  // Show error only if not editing and no clerkUser data to fall back on as a base
  if (infoError && !isEditing && !clerkUser) { 
    return <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20 p-6 text-red-500">Error loading teacher info: {infoError.message}</Card>;
  }

  return (
    <Card className="col-span-1 md:col-span-4 glass-morphism border-theme-tertiary/20">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xl text-white">Teacher Information</CardTitle>
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => {
            if (isEditing) {
              handleSave();
            } else {
              // When starting to edit, populate editForm with the most current displayInfo
              setEditForm(displayInfo); 
              setIsEditing(true);
            }
          }}
          disabled={isEditing && saveProfileMutation.isPending}
          className="h-8 w-8 text-white/70 hover:text-white"
        >
          {isEditing ? (saveProfileMutation.isPending ? <Loader2 size={18} className="animate-spin"/> : <Save size={18} />) : <Edit2 size={18} />}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div className="flex justify-center items-center md:justify-start">
            {/* THIS IS WHERE Avatar IS USED - AROUND LINE 141 or so */}
            <Avatar className="w-24 h-24 text-3xl border-2 border-theme-tertiary/50"> 
              <AvatarImage src={clerkUser?.imageUrl || displayInfo.imageUrl} alt={displayInfo.name || 'User'} /> {/* Added displayInfo.imageUrl as fallback if you store it */}
              <AvatarFallback className="bg-theme-secondary/50">
                {displayInfo.name ? displayInfo.name.split(' ').map(n => n[0]).join('').toUpperCase() : <UserCircle size={40}/>}
              </AvatarFallback>
            </Avatar>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="text-sm text-white/70">Name</label>
                  <Input id="name" name="name" value={editForm.name} onChange={handleInputChange} className="bg-theme-secondary/20 border-theme-tertiary/30" />
                </div>
                <div>
                  <label htmlFor="email" className="text-sm text-white/70">Email</label>
                  <Input id="email" name="email" type="email" value={editForm.email} onChange={handleInputChange} className="bg-theme-secondary/20 border-theme-tertiary/30" />
                </div>
                <div>
                  <label htmlFor="department" className="text-sm text-white/70">Department</label>
                  <Input id="department" name="department" value={editForm.department} onChange={handleInputChange} placeholder="e.g., Computer Science" className="bg-theme-secondary/20 border-theme-tertiary/30" />
                </div>
                <div>
                  <label htmlFor="institution" className="text-sm text-white/70">Institution</label>
                  <Input id="institution" name="institution" value={editForm.institution} onChange={handleInputChange} placeholder="e.g., Dibrugarh University" className="bg-theme-secondary/20 border-theme-tertiary/30" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-sm text-white/70">Name</p>
                  <p className="font-semibold text-white text-lg">{displayInfo.name || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Email</p>
                  <p className="font-semibold text-white">{displayInfo.email || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Department</p>
                  <p className="font-semibold text-white">{displayInfo.department || 'Not Set'}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Institution</p>
                  <p className="font-semibold text-white">{displayInfo.institution || 'Not Set'}</p>
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


