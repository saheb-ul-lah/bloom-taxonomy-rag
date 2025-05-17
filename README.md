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

**UI/UX Overhaul (The "Cool Factor"):**

As per your request for a more visually appealing and modern UI:

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
    git clone <your-repo-url>
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
