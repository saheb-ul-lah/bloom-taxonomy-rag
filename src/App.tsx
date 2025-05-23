// App.jsx

import React, { useState, useEffect } from 'react'; // Added useState, useEffect
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index"; // Will become Index.jsx
import NotFound from "./pages/NotFound"; // Will become NotFound.jsx
import ChatPage from "./pages/ChatPage"; // Will become ChatPage.jsx
import Login from "./pages/Login"; // Will become Login.tsx
import Signup from "./pages/Signup"; // Will become Signup.tsx
import LandingPage from "./pages/LandingPage"; // Will become LandingPage.tsx
import TeachersDashboard from "./pages/TeachersDashboard.jsx"; // Will become TeachersDashboard.jsx

const queryClient = new QueryClient();

// Create a context for theme
export const ThemeContext = React.createContext({
  theme: 'dark',
  toggleTheme: () => {},
});

const App = () => {
  const [theme, setTheme] = useState(() => {
    // Initialize theme from localStorage or default to 'dark'
    const storedTheme = localStorage.getItem('app-theme');
    return storedTheme || 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'dark' ? 'light' : 'dark');
    root.classList.add(theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {/* The class is now managed by useEffect on the <html> element */}
          {/* No need for <div className="dark"> here anymore */}
          <Toaster />
          <Sonner richColors theme={theme as 'light' | 'dark' | 'system' | undefined} /> {/* Sonner can take theme prop */}
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
        </ThemeContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;