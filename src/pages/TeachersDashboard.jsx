// src/pages/TeachersDashboard.jsx
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import TeacherInfo from '@/components/dashboard/TeachersInfo';
import SubjectNotes from '@/components/dashboard/SubjectNotes';
import QuestionPapers from '@/components/dashboard/QuestionPapers';
import CustomPromptEditor from '@/components/dashboard/CustomPromptEditor';
import { useAuth } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';

const TeachersDashboard = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#221F26] via-[#2a233a] to-[#3a2740] text-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400 mr-4"></div>
        <span className="text-lg font-semibold">Loading Dashboard...</span>
      </div>
    );
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#221F26] via-[#2a233a] to-[#3a2740] text-white">
      <Navbar />

      <main className="flex-1 px-4 py-8 md:px-10 max-w-6xl mx-auto w-full">
        <div className="mb-10">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent drop-shadow-lg">
            Teacher Dashboard
          </h1>
          <p className="text-white/80 text-base md:text-lg">
            Manage your teaching resources and AI preferences.
          </p>
        </div>

        <div className="mb-10">
          <TeacherInfo />
        </div>

        <div className="bg-white/5 rounded-2xl shadow-xl p-4 md:p-8 backdrop-blur-md border border-white/10">
          <Tabs defaultValue="notes" className="w-full">
            <TabsList className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-center mb-8 bg-gradient-to-r from-theme-secondary/30 to-theme-primary/10 p-2 rounded-xl shadow-md">
              <TabsTrigger
                value="notes"
                className="flex-1 data-[state=active]:bg-theme-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2 px-4 transition-all duration-200 text-base font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16" /><path d="M4 4h16" /></svg>
                  Subject Notes
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="papers"
                className="flex-1 data-[state=active]:bg-theme-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2 px-4 transition-all duration-200 text-base font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" /></svg>
                  Question Papers
                </span>
              </TabsTrigger>
              <TabsTrigger
                value="prompt"
                className="flex-1 data-[state=active]:bg-theme-primary data-[state=active]:text-white data-[state=active]:shadow-lg rounded-lg py-2 px-4 transition-all duration-200 text-base font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20h9" /><path d="M12 4v16" /><path d="M4 4h16" /></svg>
                  AI Prompt Editor
                </span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="notes" className="mt-0">
              <SubjectNotes />
            </TabsContent>
            <TabsContent value="papers" className="mt-0">
              <QuestionPapers />
            </TabsContent>
            <TabsContent value="prompt" className="mt-0">
              <CustomPromptEditor />
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeachersDashboard;