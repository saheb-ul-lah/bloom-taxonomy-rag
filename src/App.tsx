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