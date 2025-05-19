import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
// import Footer from '@/components/Footer'; // Usually no footer on chat pages
import { useAuth, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import { Loader2, MessageSquare, Settings, UploadCloud, Bot, User, Paperclip, X } from 'lucide-react'; // Added icons
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';

import ChatHistory from '@/components/ChatHistory';
import ChatMessages from '@/components/ChatMessages';
import ChatInput from '@/components/ChatInput';
import QuestionPreferences from '@/components/QuestionPreferences';
import { Button } from '@/components/ui/button';
import { toast } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area"; // For chat messages
// **** ADD THIS IMPORT ****
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// *************************


// Component-specific styles for ChatPage
const ChatPageStyles = () => (
  <style>{`
    .chat-page-container {
      height: calc(100vh - var(--navbar-height, 70px)); /* Full height minus navbar */
      display: flex;
      overflow: hidden; /* Prevent overall page scroll, internal areas will scroll */
      background-color: hsl(var(--background));
    }

    .chat-sidebar {
      width: 300px; /* Fixed width for sidebar */
      min-width: 280px;
      border-right: 1px solid hsl(var(--border));
      background-color: hsl(var(--card) / 0.5); /* Slightly different for sidebar */
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease, margin-left 0.3s ease;
    }
    .chat-sidebar.collapsed {
      width: 0;
      min-width: 0;
      overflow: hidden;
      margin-left: -1px; /* To hide border completely */
    }
    @media (max-width: 768px) { /* Mobile: sidebar becomes an overlay or is hidden by default */
      .chat-sidebar {
        position: absolute;
        z-index: 40; /* Above main chat content */
        height: 100%;
        /* Further mobile styling for overlay if needed */
      }
       .chat-sidebar:not(.mobile-open) { /* Example class to control mobile visibility */
         width: 0;
         min-width: 0;
         overflow: hidden;
       }
    }


    .chat-main-panel {
      flex-grow: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden; /* Important for internal scrolling */
      position: relative; /* For absolute positioned elements like file preview */
    }

    .chat-header {
      padding: 1rem 1.5rem; /* py-4 px-6 */
      border-bottom: 1px solid hsl(var(--border));
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: hsl(var(--card));
    }
    .chat-header-title {
      font-family: var(--font-heading);
      font-size: 1.25rem; /* text-xl */
      font-weight: 600;
      color: hsl(var(--foreground));
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .chat-messages-container {
      flex-grow: 1;
      overflow-y: auto; /* This is where messages scroll */
      padding: 1.5rem; /* p-6 */
    }

    .chat-input-area {
      padding: 1rem 1.5rem; /* py-4 px-6 */
      border-top: 1px solid hsl(var(--border));
      background-color: hsl(var(--card));
      /* box-shadow: 0 -5px 15px -5px hsl(var(--background) / 0.1); */
    }
    .file-upload-container {
      display: flex;
      align-items: center;
      gap: 0.75rem; /* gap-3 */
      margin-bottom: 0.75rem; /* mb-3 */
    }
    .selected-file-preview {
      background-color: hsl(var(--muted) / 0.5);
      padding: 0.5rem 0.75rem; /* py-2 px-3 */
      border-radius: var(--radius-md);
      display: flex;
      align-items: center;
      gap: 0.5rem; /* gap-2 */
      font-size: 0.875rem; /* text-sm */
      color: hsl(var(--muted-foreground));
      animation: fadeIn 0.3s ease;
    }
    .selected-file-preview .lucide-x {
      cursor: pointer;
      color: hsl(var(--muted-foreground));
    }
    .selected-file-preview .lucide-x:hover {
      color: hsl(var(--destructive));
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(5px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `}</style>
);


const ChatPage = () => {
  const { userId, isLoaded, getToken } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null); // To track active chat session
  const [chatTitle, setChatTitle] = useState("New Chat"); // Title for current chat
  const [currentPreferences, setCurrentPreferences] = useState(null);
  const [selectedFileForUpload, setSelectedFileForUpload] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // For desktop sidebar toggle

  // Fetch chat history list
  const { data: chatHistoriesData, isLoading: isLoadingHistories } = useQuery({
    queryKey: ['chatHistories', userId],
    queryFn: async () => {
      if (!userId) return [];
      const histories = await apiRequest(`/teacher/chat-history?clerkId=${userId}`, {}, getToken);
      return histories.map(h => ({ // Adapt to match ChatHistory component's expected props
        id: h.id,
        title: `${h.subject || 'Chat'} - ${h.class || 'General'} (${new Date(h.updatedAt).toLocaleDateString()})`,
        date: new Date(h.updatedAt).toLocaleString(), // More detailed date
        // You might need more fields if ChatHistory component uses them
      }));
    },
    enabled: !!userId,
  });

  // Fetch messages for a selected chat history
  const { data: activeChatMessages, isLoading: isLoadingActiveChat } = useQuery({
    queryKey: ['chatMessages', currentChatId, userId],
    queryFn: async () => {
      if (!currentChatId || !userId) return null;
      const historyDetail = await apiRequest(`/teacher/chat-history/${currentChatId}?clerkId=${userId}`, {}, getToken);
      
      // Transform messages for display
      const formattedMessages = historyDetail.messages.map((msg, index) => ({
        id: `msg-${currentChatId}-${index}`, // Create a unique ID for each message
        user: msg.role === 'user' ? 'me' : 'assistant', // 'me' or 'assistant'
        text: msg.content, // This could be string or array of questions
        timestamp: msg.timestamp || new Date().toISOString(),
        // attachments if any, and usedSources for assistant
        usedSources: msg.role === 'assistant' ? msg.usedSources : undefined,
        // Add more fields as needed by ChatMessages component
      }));
      setMessages(formattedMessages);
      setChatTitle(`${historyDetail.subject || 'Chat'} - ${historyDetail.class || 'General'}`);
      return historyDetail; // We might use other details from historyDetail later
    },
    enabled: !!currentChatId && !!userId,
    onSuccess: (data) => {
      if(data && data.messages && data.messages.length > 0) {
        // Potentially find the last user message to re-populate preferences if available
        const lastUserMessage = [...data.messages].reverse().find(m => m.role === 'user' && m.preferences);
        if (lastUserMessage && lastUserMessage.preferences) {
          setCurrentPreferences(lastUserMessage.preferences);
        }
      }
    }
  });


  // Load custom AI prompt from localStorage (set by CustomPromptEditor)
  const [customAIPrompt, setCustomAIPrompt] = useState("");
  useEffect(() => {
    if (userId) {
      const storedPrompt = localStorage.getItem('customAIPrompt_teacher_' + userId);
      if (storedPrompt) {
        setCustomAIPrompt(storedPrompt);
      }
      // Optionally, fetch from backend if not in local storage or to ensure freshness
    }
  }, [userId]);


  const generateQuestionsMutation = useMutation({
    mutationFn: (payload) => apiRequest('/chat/generate-questions', {
      method: 'POST',
      body: JSON.stringify(payload),
    }, getToken),
    onSuccess: (data, variables) => {
      setMessages(prev => prev.map(msg => msg.isGenerating ? {
        ...msg,
        id: `msg-ai-${Date.now()}`, // Ensure unique ID for AI response
        text: data.answer,
        isGenerating: false,
        usedSources: data.usedSources,
        timestamp: new Date().toISOString()
      } : msg));
      setCurrentChatId(data.chatHistoryId); // Update currentChatId if it's a new chat
      queryClient.invalidateQueries({ queryKey: ['chatHistories', userId] }); // Refresh history list
      if (!variables.chatHistoryId && data.chatHistoryId) { // If it was a new chat, update title
         // Maybe fetch the new history item to get its subject/class for title
      }
    },
    onError: (error) => {
      setMessages(prev => prev.map(msg => msg.isGenerating ? {
        ...msg,
        text: `Error: ${error.message || "Failed to get response."}`,
        isGenerating: false,
        timestamp: new Date().toISOString()
      } : msg));
      toast.error("Failed to generate questions.");
    }
  });

  const handleSendMessage = async (text) => {
    if (!currentPreferences) {
      toast.error("Please set your question preferences before sending a message.");
      return;
    }

    const userMessage = {
      id: `msg-user-${Date.now()}`,
      user: 'me',
      text: text,
      timestamp: new Date().toISOString(),
      attachments: selectedFileForUpload ? [{
        id: 'file-1', // temp id
        name: selectedFileForUpload.name,
        type: selectedFileForUpload.type,
        // url: URL.createObjectURL(selectedFileForUpload) // For local preview if needed
      }] : []
    };
    const thinkingMessage = {
      id: `msg-ai-thinking-${Date.now()}`,
      user: 'assistant',
      text: "Generating questions based on your request...",
      isGenerating: true,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage, thinkingMessage]);

    const payload = {
      clerkId: userId,
      userQuery: text,
      questionPreferences: currentPreferences,
      customPromptText: customAIPrompt, // From state/localStorage
      chatHistoryId: currentChatId,
    };
    
    // If a file is selected, upload it first, then send message with file context (mock for now)
    // This part needs backend to support file context in generate-questions or a separate upload-then-chat flow
    if (selectedFileForUpload) {
        toast.info(`File "${selectedFileForUpload.name}" would be processed with your query. (File handling with chat query TBD)`);
        // Example: You might add a file_id to the payload if uploaded separately
        // payload.fileContextId = await uploadFileAndGetId(selectedFileForUpload); 
        setSelectedFileForUpload(null); // Clear after "sending"
    }
    
    generateQuestionsMutation.mutate(payload);
  };

  const handleSelectHistory = (historyId) => {
    setCurrentChatId(historyId);
    // Messages will be loaded by the useQuery for activeChatMessages
  };
  
  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setChatTitle("New Chat");
    setCurrentPreferences(null); // Reset preferences for new chat
    setSelectedFileForUpload(null);
    // queryClient.invalidateQueries({ queryKey: ['chatMessages'] }); // Not strictly needed as enabled is false
  };

  const handleFileSelect = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit for chat context files
        toast.error("File is too large for chat context (max 10MB). For larger RAG sources, use the dashboard upload.");
        return;
      }
      // Add more specific file type checks if needed for chat context
      setSelectedFileForUpload(file);
    }
  };


  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <>
      <ChatPageStyles />
      {/* TooltipProvider should wrap the part of the tree where tooltips are used */}
      {/* Or, if it's already in App.tsx at the root, that's fine too. */}
      {/* For this specific component, wrapping its direct content is safer. */}
      <TooltipProvider> 
        <SignedIn>
          <div className="flex flex-col h-screen overflow-hidden">
            <Navbar />
            <div className="chat-page-container">
              {/* Sidebar for Chat History */}
              <aside className={`chat-sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
                <ChatHistory 
                  histories={chatHistoriesData || []}
                  activeHistoryId={currentChatId}
                  onSelectHistory={handleSelectHistory}
                  onNewChat={handleNewChat}
                  isLoading={isLoadingHistories}
                />
              </aside>

              {/* Main Chat Panel */}
              <main className="chat-main-panel">
                <div className="chat-header">
                  <div className="chat-header-title">
                    <MessageSquare size={24} className="text-primary" />
                    <h2 className="truncate" title={chatTitle}>{chatTitle}</h2>
                  </div>
                  <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                    {isSidebarOpen ? <X/> : <Settings />} {/* Icon changes based on state, replace Settings with Menu icon if preferred */}
                  </Button>
                </div>
                
                <ScrollArea className="chat-messages-container">
                  {isLoadingActiveChat && currentChatId ? (
                    <div className="flex justify-center items-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <p className="ml-3 text-muted-foreground">Loading chat...</p>
                    </div>
                  ) : messages.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                          <Bot size={48} className="mb-4 opacity-50"/>
                          <h3 className="text-xl font-semibold font-heading text-foreground">Start a Conversation</h3>
                          <p className="max-w-sm">
                              Ask me to generate questions based on topics, Bloom's levels, or your uploaded materials (via dashboard).
                              Set your preferences below to begin.
                          </p>
                      </div>
                  ) : (
                    <ChatMessages messages={messages} />
                  )}
                </ScrollArea>

                <div className="chat-input-area">
                  <QuestionPreferences onUpdatePreferences={setCurrentPreferences} />
                  
                  {selectedFileForUpload && (
                    <div className="selected-file-preview">
                      <Paperclip size={16} className="text-primary" />
                      <span className="flex-grow truncate">{selectedFileForUpload.name}</span>
                      <X size={18} onClick={() => setSelectedFileForUpload(null)} />
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="border-border text-muted-foreground hover:text-primary hover:border-primary"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <UploadCloud size={20} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent className="bg-popover text-popover-foreground border-border"><p>Attach file for context (Max 10MB)</p></TooltipContent>
                    </Tooltip>
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" accept=".pdf,.doc,.docx,.txt" />
                    
                    <ChatInput onSendMessage={handleSendMessage} className="flex-grow" />
                  </div>
                </div>
              </main>
            </div>
          </div>
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </TooltipProvider>
    </>
  );
};

export default ChatPage;