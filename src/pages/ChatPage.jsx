// src/pages/ChatPage.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react'; // Added useCallback
import Navbar from '@/components/Navbar';
import { useAuth, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import {
  Loader2, MessageSquare, Settings, UploadCloud, Bot, User, Paperclip, X, ChevronDown as ChevronDownIcon, LayoutGrid, Brain as BrainIcon,
  Menu as MenuIcon, Link as LinkIcon, BookCopy, FileCode2, Columns, ListOrdered, Sigma, Info,
  BarChart3, Layers, Users as UdlIcon, Lightbulb, Activity, Edit3, Target, SparklesIcon, Puzzle, TrendingUp
} from 'lucide-react'; // Renamed Users to UdlIcon to avoid conflict
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';

import ChatHistory from '@/components/ChatHistory';
import ChatMessages from '../components/ChatMessages.jsx';
import ChatInput from '@/components/ChatInput';
import QuestionPreferences from '@/components/QuestionPreferences';
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner"; // Using sonner for toasts
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label"; // For Context Manager labels

// KaTeX CSS should be loaded globally (e.g., in App.jsx or index.html)
// import 'katex/dist/katex.min.css';

// --- Constants for Pedagogical Frameworks & AI Tasks ---
// Ensure these match definitions in server.js if they affect backend logic
export const pedagogicalFrameworks = [
  { id: 'blooms_architect', label: "Bloom's Architect", icon: BarChart3, description: "Focus on cognitive levels (Remember, Understand, Apply...)." },
  { id: 'dok_navigator', label: "DOK Navigator", icon: Layers, description: "Target Webb's Depth of Knowledge for cognitive rigor." },
  { id: 'udl_enhancer', label: "UDL Enhancer", icon: UdlIcon, description: "Apply Universal Design for Learning principles." },
  { id: 'constructivist_spark', label: "Constructivist Spark", icon: Lightbulb, description: "Foster inquiry-based and active learning." },
  { id: 'combine_conquer', label: "Combine & Conquer", icon: Puzzle, description: "Integrate multiple frameworks for a holistic approach." },
];

export const aiTasks = {
  common: [
    { id: 'generate_questions', label: 'Generate Questions', icon: MessageSquare, description: "Create diverse questions based on content and framework." },
    { id: 'suggest_activities', label: 'Suggest Activities', icon: Activity, description: "Propose engaging learning activities aligned with goals." },
    { id: 'refine_objectives', label: 'Refine Learning Objectives', icon: Target, description: "Sharpen objectives to be SMART and framework-aligned." },
    { id: 'summarize_content', label: 'Summarize Content', icon: BookCopy, description: "Condense provided text or RAG context into key takeaways." }
  ],
  blooms_architect: [
    { id: 'analyze_blooms_coverage', label: "Analyze Bloom's Coverage", icon: BarChart3, description: "Assess the distribution of cognitive levels in given material." },
  ],
  dok_navigator: [
    { id: 'analyze_dok_level', label: "Analyze DOK Level", icon: Layers, description: "Determine the Depth of Knowledge level of tasks or questions." },
    { id: 'suggest_dok_rigor_up', label: "Increase DOK Rigor", icon: TrendingUp, description: "Suggest ways to elevate the cognitive demand of activities." },
  ],
  udl_enhancer: [
    { id: 'check_udl_representation', label: "UDL Check: Representation", icon: UdlIcon, description: "Evaluate and suggest improvements for multiple means of representation." },
    { id: 'check_udl_action', label: "UDL Check: Action/Expression", icon: Edit3, description: "Assess options for multiple means of action and expression." },
    { id: 'check_udl_engagement', label: "UDL Check: Engagement", icon: SparklesIcon, description: "Review strategies for multiple means of engagement." },
  ],
  constructivist_spark: [
    { id: 'generate_inquiry_prompts', label: "Generate Inquiry Prompts", icon: Lightbulb, description: "Create questions to spark student curiosity and investigation." }
  ],
  combine_conquer: [
    { id: 'integrate_frameworks_advice', label: "Advise on Framework Integration", icon: Puzzle, description: "Get suggestions on how to blend selected pedagogical approaches." }
  ]
};


const ChatPageStyles = () => (
  <style>{`
    .chat-page-wrapper { height: 100vh; display: flex; flex-direction: column; overflow: hidden; background-color: hsl(var(--background)); }
    .chat-page-container { flex-grow: 1; display: flex; overflow: hidden; }

    .chat-sidebar {
      width: 280px; min-width: 260px; border-right: 1px solid hsl(var(--border));
      background-color: hsl(var(--muted)/0.1); display: flex; flex-direction: column;
      transition: margin-left 0.3s ease, width 0.3s ease; z-index: 30;
    }
    .chat-sidebar.collapsed { margin-left: -280px; width:0; min-width:0; border-right:none; }
    @media (max-width: 1024px) {
        .chat-sidebar { position: absolute; height: calc(100% - var(--navbar-height)); margin-left: -280px; box-shadow: 5px 0 15px hsl(var(--background)/0.1); background-color: hsl(var(--card));}
        .chat-sidebar.mobile-open { margin-left: 0; }
    }

    .chat-main-panel { flex-grow: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }
    .chat-header {
      padding: 0.5rem 1rem; border-bottom: 1px solid hsl(var(--border)); display: flex;
      justify-content: space-between; align-items: center; background-color: hsl(var(--card));
      min-height: 58px; flex-shrink: 0; box-shadow: 0 2px 4px hsl(var(--shadow-color)/0.05);
    }
    .chat-header-left { display: flex; align-items: center; gap: 0.5rem; overflow:hidden; }
    .chat-header-title-wrapper { display: flex; align-items: center; gap: 0.625rem; min-width: 0; }
    .chat-header-framework-icon { color: hsl(var(--primary)); flex-shrink: 0; }
    .chat-header-title { 
        font-family: var(--font-heading); font-size: 1.1rem; font-weight: 600; 
        color: hsl(var(--foreground)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .chat-header-controls { display: flex; align-items: center; gap: 0.5rem; }
    
    .header-dropdown-trigger { /* For both framework and task selectors */
      font-family: var(--font-sans); font-weight: 500; font-size: 0.8rem;
      padding: 0.375rem 0.75rem; border: 1px solid hsl(var(--border)); border-radius: var(--radius-md);
      background-color: hsl(var(--background)); color: hsl(var(--muted-foreground));
      display: flex; align-items: center; gap: 0.375rem; height: 36px;
      box-shadow: var(--shadow-sm);
    }
    .header-dropdown-trigger:hover { border-color: hsl(var(--primary)/0.7); color: hsl(var(--primary)); background-color: hsl(var(--muted)/0.3); }
    .header-dropdown-trigger .lucide:first-child { color: hsl(var(--primary)); } /* Icon before text */
    
    .dropdown-menu-content-custom { background-color: hsl(var(--popover)) !important; border: 1px solid hsl(var(--border)) !important; box-shadow: var(--shadow-lg) !important; z-index: 50;}
    .dropdown-menu-content-custom .lucide { margin-right: 0.625rem; opacity: 0.8; width:16px; height:16px; }
    .dropdown-menu-content-custom [data-state="checked"] > .lucide:first-child { color: hsl(var(--primary)); opacity: 1; }
    .dropdown-menu-content-custom .dropdown-menu-label { font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.05em; color: hsl(var(--muted-foreground)); padding: 0.5rem 0.75rem;}
    .dropdown-menu-content-custom .dropdown-menu-item, 
    .dropdown-menu-content-custom .dropdown-menu-radio-item { font-size: 0.875rem; cursor: pointer; padding: 0.5rem 0.75rem; }
    .dropdown-menu-content-custom .dropdown-menu-item:focus,
    .dropdown-menu-content-custom .dropdown-menu-radio-item:focus { background-color: hsl(var(--accent)) !important; color: hsl(var(--accent-foreground)) !important; }

    .chat-messages-container { flex-grow: 1; overflow-y: auto; padding: 1rem 1.5rem; }
    .chat-empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; color: hsl(var(--muted-foreground)); padding: 1rem; }
    .chat-empty-state .lucide { font-size: 3.5rem; margin-bottom: 1rem; opacity: 0.3; color: hsl(var(--primary)); }
    .chat-empty-state h3 { font-size: 1.375rem; font-semibold; font-family: var(--font-heading); color: hsl(var(--foreground)); }
    .chat-empty-state .description { font-size: 0.9rem; max-width: 450px; margin-top:0.25rem; }
    .chat-empty-state .tip { font-size: 0.8rem; margin-top:1.25rem; }

    .chat-input-section { padding: 0.75rem 1.5rem; border-top: 1px solid hsl(var(--border)); background-color: hsl(var(--card)); flex-shrink: 0; box-shadow: 0 -2px 5px hsl(var(--shadow-color)/0.05); }
    
    .context-manager-collapsible { margin-bottom: 0.75rem; border: 1px solid hsl(var(--border)); border-radius: var(--radius-lg); background-color: hsl(var(--background)); }
    .context-manager-trigger { 
        width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0.625rem 0.875rem;
        font-family: var(--font-sans); font-weight: 500; font-size: 0.875rem; color: hsl(var(--muted-foreground));
    }
    .context-manager-trigger:hover { color: hsl(var(--primary)); background-color: hsl(var(--muted)/0.2); }
    .context-manager-trigger .lucide-chevron-down { transition: transform 0.2s; }
    .context-manager-trigger[data-state="open"] .lucide-chevron-down { transform: rotate(180deg); }
    .context-manager-content { padding: 0.5rem 0.875rem 0.875rem; border-top: 1px solid hsl(var(--border)); max-height: 180px; overflow-y: auto; font-size: 0.8rem; }
    .context-item-group-label { font-size: 0.7rem; font-weight:600; color: hsl(var(--muted-foreground)); text-transform:uppercase; margin-bottom:0.25rem; margin-top:0.5rem; }
    .context-item { display: flex; align-items: center; gap: 0.625rem; padding: 0.375rem 0.25rem; border-radius: var(--radius-sm); }
    .context-item:hover { background-color: hsl(var(--muted)/0.3); }
    .context-item .lucide { flex-shrink: 0; width: 14px; height: 14px; }
    .context-item label { font-size: 0.8rem; color: hsl(var(--foreground)); cursor:pointer; flex-grow:1; }
    .active-context-badge { margin-left: 0.375rem; font-size: 0.7rem; padding: 0.1rem 0.35rem; height: auto; line-height: normal; }

    .selected-file-preview-chat {
      background-color: hsl(var(--muted) / 0.4); padding: 0.5rem 0.75rem; border-radius: var(--radius-md);
      display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: hsl(var(--muted-foreground));
      animation: fadeIn 0.3s ease; margin-bottom: 0.5rem; border: 1px solid hsl(var(--border));
    }
    .selected-file-preview-chat .lucide-x { cursor: pointer; margin-left: auto; }
    .selected-file-preview-chat .lucide-x:hover { color: hsl(var(--destructive)); }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  `}</style>
);


const ChatPage = () => {
  const { userId, isLoaded, getToken } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatTitle, setChatTitle] = useState("New Design Session");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  const [activeFrameworkId, setActiveFrameworkId] = useState(pedagogicalFrameworks[0].id);
  const [currentAiTask, setCurrentAiTask] = useState(aiTasks.common[0].id);

  const [currentChatPreferences, setCurrentChatPreferences] = useState({});

  const [userDocuments, setUserDocuments] = useState([]);
  const [userNotes, setUserNotes] = useState([]);
  const [activeContextItems, setActiveContextItems] = useState([]);

  const [selectedFileForUpload, setSelectedFileForUpload] = useState(null);
  const [customAIPrompt, setCustomAIPrompt] = useState(""); // This should be fetched or from local storage

  // Function to determine default preferences for a given framework and task
  // This is a simplified version. QuestionPreferences.jsx should have the detailed one.
  const getDefaultPreferences = useCallback((frameworkId, taskId) => {
    // Use the detailed logic from QuestionPreferences.jsx, passed via prop or reconstructed here
    // For now, a simple placeholder:
    if (frameworkId === "blooms_architect" && taskId === "generate_questions") {
      return { targetLevels: ["apply"], numQuestions: 3, questionTypes: { mcq: true } };
    }
    return {}; // Fallback
  }, []);


  // Fetch user's custom AI prompt (from local storage for now)
  useEffect(() => {
    if (userId) {
      const storedPrompt = localStorage.getItem(`customAIPrompt_teacher_${userId}`);
      if (storedPrompt) setCustomAIPrompt(storedPrompt);
      // Optionally: API call to fetch if not in local storage or to ensure freshness
    }
  }, [userId]);

  // Fetch RAG context materials (documents and notes)
  const { data: fetchedUserDocsAndNotes } = useQuery({
    queryKey: ['userAllMaterialsForRAG', userId],
    queryFn: async () => {
      if (!userId) return { documents: [], notes: [] };
      const token = await getToken();
      const [docsResponse, notesResponse] = await Promise.all([
        apiRequest(`/teacher/uploaded-files?clerkId=${userId}`, {}, token),
        apiRequest(`/teacher/notes?clerkId=${userId}`, {}, token)
      ]);
      const documents = (docsResponse || []).filter(f => f.isVectorized).map(f => ({ id: f.id, name: f.fileName, type: 'document', subject: f.subject, classLevel: f.classLevel }));
      const notes = (notesResponse || []).filter(n => n.content && n.content.trim() !== "").map(n => ({ id: n.id, name: n.title, type: 'note', subject: n.subject, classLevel: n.classLevel }));
      return { documents, notes };
    },
    enabled: !!userId,
    onSuccess: (data) => {
      setUserDocuments(data.documents);
      setUserNotes(data.notes);
    }
  });

  // Update chat title and AI task when activeFrameworkId changes for a NEW chat
  useEffect(() => {
    if (!currentChatId) { // Only for new chats
      const framework = pedagogicalFrameworks.find(f => f.id === activeFrameworkId);
      setChatTitle(`New ${framework?.label || 'Design'} Session`);
      
      // Set default AI task for the new framework
      const newDefaultTask = (aiTasks[activeFrameworkId]?.[0] || aiTasks.common[0]).id;
      setCurrentAiTask(newDefaultTask);
      
      // Reset preferences to defaults for this new framework & task
      setCurrentChatPreferences(prev => ({
        ...prev,
        [activeFrameworkId]: getDefaultPreferences(activeFrameworkId, newDefaultTask)
      }));
    }
  }, [activeFrameworkId, currentChatId, getDefaultPreferences]);

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => setIsSidebarOpen(window.innerWidth > 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const { data: chatHistoriesData, isLoading: isLoadingHistories } = useQuery({
    queryKey: ['chatHistories', userId],
    queryFn: async () => {
      if (!userId) return [];
      const histories = await apiRequest(`/teacher/chat-history?clerkId=${userId}`, {}, getToken);
      return histories.map(h => ({
        id: h.id,
        title: h.title, // Assuming backend now returns a well-formatted title
        date: h.date,   // And date
        frameworkId: h.frameworkId || pedagogicalFrameworks[0].id,
      }));
    },
    enabled: !!userId,
  });

  const { isLoading: isLoadingActiveChat } = useQuery({
    queryKey: ['chatMessages', currentChatId, userId],
    queryFn: async () => {
      if (!currentChatId || !userId) { 
        setMessages([]); 
        const defaultFw = pedagogicalFrameworks.find(f => f.id === activeFrameworkId) || pedagogicalFrameworks[0];
        setChatTitle(`New ${defaultFw.label} Session`);
        setActiveContextItems([]);
        setCurrentChatPreferences(getDefaultPreferences(activeFrameworkId, currentAiTask));
        return null;
      }
      const historyDetail = await apiRequest(`/teacher/chat-history/${currentChatId}?clerkId=${userId}`, {}, getToken);
      
      // Reformat messages based on the new schema in prisma
      const formattedMessages = (Array.isArray(historyDetail.messages) ? historyDetail.messages : []).map((msg, index) => ({
        id: `msg-${currentChatId}-${index}`, // Create a unique ID for React key
        user: msg.role === 'user' ? 'me' : 'assistant',
        text: msg.role === 'user' ? msg.userQuery : msg.summaryText, // Use userQuery for user, summaryText for AI (can be overridden by structuredContent)
        structuredContent: msg.role === 'assistant' ? msg.structuredContent : undefined,
        timestamp: msg.timestamp || new Date().toISOString(),
        usedSources: msg.role === 'assistant' ? msg.usedSources : undefined,
        aiTaskType: msg.aiTaskType,
        // attachments: msg.userAttachments, // If you persist user attachments per message
      }));

      setMessages(formattedMessages);
      setChatTitle(historyDetail.customTitle || "Chat Session");
      setActiveFrameworkId(historyDetail.frameworkId || pedagogicalFrameworks[0].id);
      setCurrentAiTask(historyDetail.messages?.slice(-1)[0]?.aiTaskType || aiTasks.common[0].id) // Get task from last AI message or default
      setActiveContextItems(historyDetail.activeContextItems || []);
      setCurrentChatPreferences(historyDetail.lastPreferences || getDefaultPreferences(historyDetail.frameworkId || pedagogicalFrameworks[0].id, currentAiTask));
      return historyDetail;
    },
    enabled: !!userId, // Run if userId exists, even if currentChatId is null (for new chat setup)
    refetchOnWindowFocus: false,
  });

  const aiCoPilotMutation = useMutation({
    mutationFn: (payload) => apiRequest('/ai/pedagogy-assist', {
      method: 'POST', body: JSON.stringify(payload),
    }, getToken),
    onSuccess: (data, variables) => {
      // The AI response (data) should directly contain structuredOutput and summaryText
      const newAiMessage = {
        id: `msg-ai-${Date.now()}`, user: 'assistant',
        summaryText: data.summaryText || "AI response processed.",
        structuredContent: data.structuredOutput,
        isGenerating: false, usedSources: data.usedSources, 
        aiTaskType: variables.aiTask, // Task type used for this generation
        timestamp: new Date().toISOString()
      };
      setMessages(prev => prev.filter(msg => !msg.isGenerating).concat(newAiMessage));

      if (!variables.chatHistoryId && data.chatHistoryId) { // New chat saved
        setCurrentChatId(data.chatHistoryId);
        if (data.chatTitle) setChatTitle(data.chatTitle);
        queryClient.invalidateQueries({ queryKey: ['chatHistories', userId] });
      } else if (variables.chatHistoryId) { // Existing chat updated
        queryClient.invalidateQueries({ queryKey: ['chatMessages', variables.chatHistoryId, userId] });
        queryClient.invalidateQueries({ queryKey: ['chatHistories', userId] }); // To update timestamp in list
      }
    },
    onError: (error, variables) => {
      toast.error(`AI Co-Pilot Error: ${error.message || "Failed to get response."}`);
      setMessages(prev => prev.map(msg => msg.isGenerating ? {
        ...msg, text: `Error: ${error.message || "Failed to get response."}`, isGenerating: false, user:'assistant',
        structuredContent: { type: "simple_text", data: { text: `**Error:** ${error.message || "Failed to get response."}` } },
        timestamp: new Date().toISOString()
      } : msg));
    }
  });

  const handleSendMessage = async (text) => {
    if (!text.trim() && !selectedFileForUpload) { // Allow sending if only a file is attached
        toast.warning("Please type a message or attach a file.");
        return;
    }

    const userMessageText = text.trim();
    const userMessage = {
      id: `msg-user-${Date.now()}`, user: 'me', 
      userQuery: userMessageText, // Using the field name from schema
      timestamp: new Date().toISOString(),
      // attachments: selectedFileForUpload ? [{ name: selectedFileForUpload.name, type: selectedFileForUpload.type, size: selectedFileForUpload.size }] : []
      // Backend doesn't handle direct file upload with /pedagogy-assist yet. File is for context selection from dashboard.
    };
    const thinkingMessage = {
      id: `msg-ai-thinking-${Date.now()}`, user: 'assistant', text: "EduCraft AI is processing...", isGenerating: true, timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage, thinkingMessage]);

    const payload = {
      clerkId: userId,
      userQuery: userMessageText,
      activeFrameworkId: activeFrameworkId,
      aiTask: currentAiTask,
      preferences: currentChatPreferences, // Send the whole object
      customPromptText: customAIPrompt,
      chatHistoryId: currentChatId,
      activeContextItems: activeContextItems,
      // If backend were to handle one-time file:
      // oneTimeFile: selectedFileForUpload ? { name: selectedFileForUpload.name, type: selectedFileForUpload.type } : undefined,
    };
    
    // If a file was selected for this message, display it and then clear.
    // The actual file data isn't sent in this setup; RAG uses pre-uploaded files.
    if (selectedFileForUpload) {
      toast.info(`File "${selectedFileForUpload.name}" was noted for context (not uploaded with this message).`);
      setSelectedFileForUpload(null); // Clear after noting
    }
    aiCoPilotMutation.mutate(payload);
  };

  const handleSelectHistory = (historyItem) => {
    if (currentChatId === historyItem.id) return; // Avoid reloading same chat
    setCurrentChatId(historyItem.id);
    // State updates (messages, title, framework, prefs, contextItems) are handled by useQuery's onSuccess for ['chatMessages', ...]
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    const defaultFw = pedagogicalFrameworks[0];
    setActiveFrameworkId(defaultFw.id);
    const defaultTask = aiTasks.common[0].id;
    setCurrentAiTask(defaultTask);
    setChatTitle(`New ${defaultFw.label} Session`);
    setCurrentChatPreferences(getDefaultPreferences(defaultFw.id, defaultTask));
    setActiveContextItems([]);
    setSelectedFileForUpload(null);
    // Query for 'chatMessages' with null ID will trigger its logic to clear/set defaults.
    queryClient.invalidateQueries({ queryKey: ['chatMessages', null, userId] });
  };

  const handleFileSelectForMessage = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) { // 10MB limit for temp context idea
        toast.error("File for immediate context is too large (max 10MB). Please upload to dashboard for permanent RAG.");
        return;
      }
      setSelectedFileForUpload(file);
    }
  };

  const toggleContextItem = (itemToToggle) => {
    setActiveContextItems(prev =>
      prev.some(ci => ci.id === itemToToggle.id)
        ? prev.filter(ci => ci.id !== itemToToggle.id)
        : [...prev, { id: itemToToggle.id, name: itemToToggle.name, type: itemToToggle.type }] // Store essential info
    );
  };
  
  // Update currentAiTask if the selected one isn't valid for the new framework
  useEffect(() => {
    const validTasksForFramework = [
        ...(aiTasks.common || []),
        ...(aiTasks[activeFrameworkId] || [])
    ].map(t => t.id);

    if (!validTasksForFramework.includes(currentAiTask)) {
        setCurrentAiTask(validTasksForFramework[0] || aiTasks.common[0].id);
    }
  }, [activeFrameworkId, currentAiTask]);


  if (!isLoaded) {
    return (<div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>);
  }

  const currentFramework = pedagogicalFrameworks.find(f => f.id === activeFrameworkId) || pedagogicalFrameworks[0];
  const availableTasksForCurrentFramework = [
    ...aiTasks.common,
    ...(aiTasks[activeFrameworkId] || [])
  ].filter((task, index, self) => index === self.findIndex(t => t.id === task.id)); // Deduplicate

  const currentTaskDetails = availableTasksForCurrentFramework.find(t => t.id === currentAiTask) || availableTasksForCurrentFramework[0] || {};


  return (
    <>
      <ChatPageStyles />
      <TooltipProvider delayDuration={200}>
        <SignedIn>
          <div className="chat-page-wrapper">
            <Navbar />
            <div className="chat-page-container">
              <aside className={`chat-sidebar ${isSidebarOpen ? 'mobile-open' : ''}`}>
                <ChatHistory
                  histories={chatHistoriesData || []} activeHistoryId={currentChatId}
                  onSelectHistory={handleSelectHistory} onNewChat={handleNewChat}
                  isLoading={isLoadingHistories}
                />
              </aside>

              <main className="chat-main-panel">
                <div className="chat-header">
                  <div className="chat-header-left">
                    <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary lg:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                      {isSidebarOpen ? <X size={22} /> : <MenuIcon size={22} />}
                    </Button>
                    <div className="chat-header-title-wrapper">
                      <currentFramework.icon size={22} className="chat-header-framework-icon shrink-0" />
                      <h2 className="chat-header-title" title={chatTitle}>{chatTitle}</h2>
                    </div>
                  </div>

                  <div className="chat-header-controls">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="header-dropdown-trigger">
                          {currentTaskDetails.icon && React.createElement(currentTaskDetails.icon, { size: 14 })}
                          {currentTaskDetails.label || "Select Task"}
                          <ChevronDownIcon size={16} className="ml-auto opacity-60" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-72 dropdown-menu-content-custom" align="end">
                        <DropdownMenuLabel>Select AI Task</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={currentAiTask} onValueChange={setCurrentAiTask}>
                          {availableTasksForCurrentFramework.map(task => (
                            <DropdownMenuRadioItem key={task.id} value={task.id} title={task.description}>
                              {task.icon && <task.icon />} {task.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="header-dropdown-trigger">
                          <LayoutGrid size={14} /> {currentFramework.label}
                          <ChevronDownIcon size={16} className="ml-auto opacity-60" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-72 dropdown-menu-content-custom" align="end">
                        <DropdownMenuLabel>Active Pedagogical Framework</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={activeFrameworkId} onValueChange={setActiveFrameworkId}>
                          {pedagogicalFrameworks.map(fw => (
                            <DropdownMenuRadioItem key={fw.id} value={fw.id} title={fw.description}>
                              <fw.icon /> {fw.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <ScrollArea className="chat-messages-container">
                  {isLoadingActiveChat && currentChatId ? (
                    <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="ml-3 text-muted-foreground">Loading session...</p></div>
                  ) : messages.length === 0 ? (
                    <div className="chat-empty-state">
                      <currentFramework.icon />
                      <h3 className="mt-2">EduCraft AI: {currentFramework.label} Mode</h3>
                      <p className="description">{currentFramework.description}</p>
                      <p className="tip">Select a task, adjust preferences, or provide context, then type your query below.</p>
                    </div>
                  ) : (
                    <ChatMessages messages={messages} />
                  )}
                </ScrollArea>

                <div className="chat-input-section">
                  <Collapsible className="context-manager-collapsible">
                    <CollapsibleTrigger className="context-manager-trigger">
                      <div className="flex items-center gap-1.5">
                        <LinkIcon size={16} className="text-primary" /> Manage RAG Context
                        {activeContextItems.length > 0 &&
                          <Badge variant="secondary" className="active-context-badge">{activeContextItems.length} active</Badge>}
                      </div>
                      <ChevronDownIcon size={18} className="lucide-chevron-down" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="context-manager-content">
                      {(userDocuments.length === 0 && userNotes.length === 0) ? (
                        <p className="text-xs text-center text-muted-foreground py-2">No documents or notes available for context. Upload/create them in your dashboard.</p>
                      ) : (
                        <div className="space-y-1">
                          {userDocuments.length > 0 && <p className="context-item-group-label">My Documents ({userDocuments.length})</p>}
                          {userDocuments.map(doc => (
                            <div key={doc.id} className="context-item">
                              <Checkbox id={`ctx-doc-${doc.id}`} checked={activeContextItems.some(ci => ci.id === doc.id)} onCheckedChange={() => toggleContextItem(doc)} className="accent-primary" />
                              <FileCode2 className="text-blue-500" />
                              <Label htmlFor={`ctx-doc-${doc.id}`} className="truncate" title={`${doc.name}\nSubject: ${doc.subject || 'N/A'}\nClass: ${doc.classLevel || 'N/A'}`}>{doc.name}</Label>
                            </div>
                          ))}
                          {userNotes.length > 0 && <p className="context-item-group-label mt-2">My Notes ({userNotes.length})</p>}
                          {userNotes.map(note => (
                            <div key={note.id} className="context-item">
                              <Checkbox id={`ctx-note-${note.id}`} checked={activeContextItems.some(ci => ci.id === note.id)} onCheckedChange={() => toggleContextItem(note)} className="accent-primary" />
                              <BookCopy className="text-green-500" />
                              <Label htmlFor={`ctx-note-${note.id}`} className="truncate" title={`${note.name}\nSubject: ${note.subject || 'N/A'}\nClass: ${note.classLevel || 'N/A'}`}>{note.name}</Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  <QuestionPreferences
                    key={activeFrameworkId + "_" + currentAiTask}
                    activeFrameworkId={activeFrameworkId}
                    currentAiTask={currentAiTask}
                    onSetAiTask={setCurrentAiTask} // Pass callback to update task from QP if needed
                    initialPreferences={currentChatPreferences} // Pass the whole preferences object
                    onUpdatePreferences={setCurrentChatPreferences} // Pass callback to update the whole object
                    allAiTasksConfig={aiTasks} // Pass the aiTasks configuration
                  />

                  {selectedFileForUpload && (
                    <div className="selected-file-preview-chat">
                      <Paperclip size={16} className="text-primary shrink-0" />
                      <span className="flex-grow truncate" title={selectedFileForUpload.name}>{selectedFileForUpload.name}</span>
                      <span className="text-xs opacity-70 shrink-0">({(selectedFileForUpload.size / 1024).toFixed(1)} KB)</span>
                      <Button variant="ghost" size="icon" className="h-6 w-6 shrink-0" onClick={() => setSelectedFileForUpload(null)}>
                        <X size={16} />
                      </Button>
                    </div>
                  )}

                  <div className="flex items-end gap-2 md:gap-3">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline" size="icon"
                          className="border-border text-muted-foreground hover:text-primary hover:border-primary h-10 w-10 md:h-12 md:w-12 rounded-lg shrink-0"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <UploadCloud size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Attach file for this query (Max 10MB, temporary context)</p></TooltipContent>
                    </Tooltip>
                    <input type="file" ref={fileInputRef} onChange={handleFileSelectForMessage} className="hidden" accept=".pdf,.doc,.docx,.txt" />

                    <ChatInput 
                        onSendMessage={handleSendMessage} 
                        isGenerating={aiCoPilotMutation.isPending}
                    />
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