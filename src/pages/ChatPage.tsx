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