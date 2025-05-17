// src/pages/ChatPage.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Upload, ChevronLeft, ChevronRight, Send } from "lucide-react"; // Added Send
import ChatInput from '@/components/ChatInput';
import ChatMessages from '@/components/ChatMessages';
import UserDropdown from '@/components/UserDropdown';
import ChatHistory from '@/components/ChatHistory';
import { toast } from "@/components/ui/sonner";
import QuestionPreferences from '@/components/QuestionPreferences';
// No longer import QuestionPreferencesType, rely on structure.
import apiRequest from '@/lib/api';

const ChatPage = () => {
  const { userId, getToken } = useAuth();
  const queryClient = useQueryClient();

  const [showSidebar, setShowSidebar] = useState(true);
  const [activeChatHistoryId, setActiveChatHistoryId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoadingResponse, setIsLoadingResponse] = useState(false);

  const [questionPreferences, setQuestionPreferences] = useState({
    pattern: 'mixed',
    stream: 'computer-science',
    marksDistribution: 'predefined',
    customMarks: { mcq: 40, shortAnswer: 30, longAnswer: 20, practical: 10 }
  });
  const [customPromptText, setCustomPromptText] = useState('');

  // --- TanStack Query for Chat History ---
  const { data: chatHistoriesData, isLoading: isLoadingHistories } = useQuery({
    queryKey: ['chatHistories', userId],
    queryFn: async () => {
      if (!userId) return [];
      // Using fetch directly here for simplicity in queryFn, ensure getToken is available
      const token = await getToken(); 
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/teacher/chat-history?clerkId=${userId}`, {
          headers: { Authorization: `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Failed to fetch chat histories');
      const rawHistories = await response.json();
      return rawHistories.map((h) => ({
          id: h.id,
          title: `Chat: ${h.subject || 'General'} - ${new Date(h.updatedAt).toLocaleDateString()}`,
          date: new Date(h.updatedAt).toLocaleString(),
          subject: h.subject,
          classLevel: h.class, // class is a reserved keyword
          updatedAt: h.updatedAt,
      }));
    },
    enabled: !!userId,
  });

  // --- TanStack Query for fetching a specific chat's messages ---
  const { isLoading: isLoadingActiveChatMessages } = useQuery({
    queryKey: ['chatMessages', activeChatHistoryId, userId],
    queryFn: async () => {
        if (!activeChatHistoryId || !userId) return [];
        const token = await getToken();
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/teacher/chat-history/${activeChatHistoryId}?clerkId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        if (!response.ok) throw new Error('Failed to fetch chat messages');
        const chat = await response.json();
        // Ensure messages are in the correct format for ChatMessages component
        return (chat.messages || []).map((msg) => ({ 
            id: msg.id || crypto.randomUUID(), // Prefer ID from DB, fallback to UUID
            text: msg.role === 'assistant' ? msg.content : (msg.content?.text || msg.content), // Assistant content might be JSON
            user: msg.role === 'user' ? 'me' : 'assistant',
            timestamp: new Date(msg.timestamp || chat.updatedAt),
            attachments: msg.attachments || undefined,
            usedSources: msg.role === 'assistant' ? (msg.content?.usedSources || chat.usedDocuments?.sources) : undefined,
        }));
    },
    enabled: !!activeChatHistoryId && !!userId,
    onSuccess: (data) => {
        if (data) setMessages(data);
        else setMessages([]); // Clear messages if no data (e.g., history deleted)
    }
  });

  // --- TanStack Mutation for sending a message / generating questions ---
  const sendMessageMutation = useMutation({
    mutationFn: async ({ userQuery }) => { // Removed file from here, handle file uploads separately
      if (!userId) throw new Error("User not authenticated");
      
      const payload = {
          clerkId: userId,
          userQuery,
          questionPreferences,
          customPromptText,
          chatHistoryId: activeChatHistoryId,
      };
      console.log("Frontend: Sending payload to /api/chat/generate-questions:", payload);
      // Pass getToken to apiRequest
      return apiRequest('/chat/generate-questions', {
        method: 'POST',
        body: JSON.stringify(payload),
      }, getToken);
    },
    onMutate: ({ userQuery }) => {
      const userMessage = {
        id: crypto.randomUUID(),
        text: userQuery,
        user: 'me',
        timestamp: new Date(),
      };
      const assistantPlaceholder = {
        id: crypto.randomUUID(),
        text: 'Generating questions...',
        user: 'assistant',
        timestamp: new Date(),
        isGenerating: true,
      };
      setMessages(prev => [...prev, userMessage, assistantPlaceholder]);
      setIsLoadingResponse(true);
    },
    onSuccess: (data) => {
      setMessages(prev => {
        const newMessages = [...prev.filter(m => !m.isGenerating)];
        const aiResponse = {
          id: crypto.randomUUID(),
          text: data.answer,
          user: 'assistant',
          timestamp: new Date(),
          usedSources: data.usedSources,
        };
        return [...newMessages, aiResponse];
      });
      if (data.chatHistoryId && (!activeChatHistoryId || activeChatHistoryId !== data.chatHistoryId)) {
          setActiveChatHistoryId(data.chatHistoryId);
      }
      queryClient.invalidateQueries({ queryKey: ['chatHistories', userId] });
      queryClient.invalidateQueries({ queryKey: ['chatMessages', data.chatHistoryId, userId]});
    },
    onError: (error) => {
      toast.error(error.message || "Failed to get response from AI.");
      setMessages(prev => prev.filter(m => !m.isGenerating));
    },
    onSettled: () => {
      setIsLoadingResponse(false);
    }
  });

  const uploadMaterialMutation = useMutation({
      mutationFn: async ({ file, metadata }) => {
          if (!userId) throw new Error("User not authenticated for file upload.");
          
          const formData = new FormData();
          formData.append('file', file);
          formData.append('clerkId', userId);
          Object.keys(metadata).forEach(key => formData.append(key, metadata[key]));
          
          return apiRequest('/teacher/upload-material', {
              method: 'POST',
              body: formData,
              isFormData: true,
          }, getToken);
      },
      onSuccess: (data) => {
          toast.success(data.message || `${data.file.name} uploaded and processing.`);
          // Optionally, automatically send a message to chat about the uploaded file
          sendMessageMutation.mutate({ userQuery: `I have uploaded ${data.file.name}. Please consider this for generating questions.` });
      },
      onError: (error) => {
          toast.error(error.message || "File upload failed.");
      }
  });

  const handleSendMessage = (text) => {
    if (!userId) {
      toast.error("Please log in to chat.");
      return;
    }
    sendMessageMutation.mutate({ userQuery: text });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file && userId) {
      const metadata = {
        subject: questionPreferences.stream || 'General',
        classLevel: 'General', // Or get from preferences/form
        chapter: 'General', // Or get from preferences/form
      };
      uploadMaterialMutation.mutate({ file, metadata });
      event.target.value = null; // Reset file input
    } else if (!userId) {
      toast.error("Please log in to upload files.");
    }
  };
  
  const handleSelectHistory = (historyId) => {
    if (activeChatHistoryId === historyId) return; // Avoid reloading same chat
    setActiveChatHistoryId(historyId);
    setMessages([]); // Clear current messages, new ones will load via useQuery
    const selectedHistory = chatHistoriesData?.find(h => h.id === historyId);
    toast.info(`Loading chat: ${selectedHistory?.title || 'Chat'}`);
  };

  const handleNewChat = () => {
    setActiveChatHistoryId(null);
    setMessages([
      { id: 'welcome_new', text: 'New chat started. How can I help you generate questions today?', user: 'system', timestamp: new Date() }
    ]);
    toast.success("New chat started!");
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setQuestionPreferences(updatedPreferences);
    toast.info("Question preferences updated for this session.");
  };

  useEffect(() => {
    // Example: Load custom prompt from localStorage or a settings API
    const savedPrompt = localStorage.getItem('customAIPrompt_teacher_' + userId);
    if (savedPrompt) {
      setCustomPromptText(savedPrompt);
    }
  }, [userId]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-black-900">
      <header className="bg-gray-900 shadow-md border-b border-gray-800 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setShowSidebar(!showSidebar)} 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-theme-tertiary/30"
          >
            {showSidebar ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </Button>
          <h1 className="text-xl font-bold text-white bg-gradient-to-r from-theme-primary via-theme-tertiary to-theme-secondary bg-clip-text text-transparent">
            QuestionGenius AI
          </h1>
        </div>
        <UserDropdown />
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div 
          className={`bg-gray-950 border-r border-gray-800 transition-all duration-300 ease-in-out ${
            showSidebar ? 'w-72' : 'w-0'
          } overflow-hidden`}
        >
          {showSidebar && (
            <ChatHistory 
              histories={chatHistoriesData || []} 
              activeHistoryId={activeChatHistoryId} 
              onSelectHistory={handleSelectHistory} 
              onNewChat={handleNewChat}
            />
          )}
        </div>

        <div className="flex-1 flex flex-col bg-gray-850 relative">
          {/* Main chat area */}
          <div className="flex-1 overflow-y-auto p-6 pb-4"> {/* Reduced bottom padding */}
            {isLoadingActiveChatMessages && messages.length === 0 && <p className="text-center text-gray-400 py-10">Loading messages...</p>}
            {!isLoadingActiveChatMessages && messages.length === 0 && (
                 <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <Send size={48} className="mb-4 opacity-50"/>
                    <p>Start a conversation or select one from history.</p>
                    <p className="text-sm">Upload materials using the button below.</p>
                 </div>
            )}
            <ChatMessages messages={messages} />
          </div>

          {/* Chat input and controls area */}
          <div className="bg-gray-900 border-t border-gray-800 p-4 flex flex-col"> {/* Removed rounded-t-xl */}
            <QuestionPreferences onUpdatePreferences={handleUpdatePreferences} />
            <div className="flex items-end gap-2">
              <label className="cursor-pointer">
                <input 
                  type="file" 
                  className="hidden" 
                  onChange={handleFileUpload} 
                  accept=".pdf,.doc,.docx,.txt"
                />
                <Button variant="outline" size="icon" type="button" className="h-12 w-12 border-gray-700 hover:bg-theme-tertiary/30 hover:border-theme-tertiary transition-colors rounded-xl">
                  <Upload className="h-5 w-5" />
                </Button>
              </label>
              <ChatInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatPage;