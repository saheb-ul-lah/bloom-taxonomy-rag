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