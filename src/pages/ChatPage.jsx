// src/pages/ChatPage.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import Navbar from '@/components/Navbar';
import { useAuth, RedirectToSignIn, SignedIn, SignedOut } from '@clerk/clerk-react';
import {
  Loader2, MessageSquare, Settings, UploadCloud, Bot, User, Paperclip, X, ChevronDown as ChevronDownIcon, LayoutGrid, Brain as BrainIcon,
  Menu as MenuIcon, Link as LinkIcon, BookCopy, FileCode2, Columns, ListOrdered, Sigma, 
  BarChart3, Layers , Users, Lightbulb, Activity, Edit3, Target, SparklesIcon, Puzzle, TrendingUp
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiRequest from '@/lib/api';

import ChatHistory from '@/components/ChatHistory'; // Will need minor updates later
import ChatMessages from '@/components/ChatMessages'; // Will need major updates for KaTeX & structured content
import ChatInput from '@/components/ChatInput';     // Will remain similar
import QuestionPreferences from '@/components/QuestionPreferences'; // Will become highly dynamic
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup,
  DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuTrigger, DropdownMenuSub, DropdownMenuSubTrigger, DropdownMenuSubContent, DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import {
  Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Collapsible, CollapsibleContent, CollapsibleTrigger,
} from "@/components/ui/collapsible"; // For Context Manager panel
import { Checkbox } from "@/components/ui/checkbox"; // For selecting docs/notes in Context Manager
import { Badge } from "@/components/ui/badge"; // For displaying active context items

// KaTeX CSS (ensure this is loaded, typically in index.html or App.tsx)
// import 'katex/dist/katex.min.css'; // We'll assume it's loaded globally for now

// --- Constants for Pedagogical Frameworks & AI Tasks ---
const pedagogicalFrameworks = [
  { id: 'blooms_architect', label: "Bloom's Architect", icon: BarChart3, description: "Focus on cognitive levels (Remember, Understand, Apply...)." },
  { id: 'dok_navigator', label: "DOK Navigator", icon: Layers, description: "Target Webb's Depth of Knowledge for cognitive rigor." },
  { id: 'udl_enhancer', label: "UDL Enhancer", icon: Users, description: "Apply Universal Design for Learning principles." },
  { id: 'constructivist_spark', label: "Constructivist Spark", icon: Lightbulb, description: "Foster inquiry-based and active learning." },
  { id: 'combine_conquer', label: "Combine & Conquer", icon: Puzzle, description: "Integrate multiple frameworks." },
];

// Define AI tasks conceptually. These would map to specific backend logic / prompts.
const aiTasks = {
  common: [ // Tasks available for most frameworks
    { id: 'generate_questions', label: 'Generate Questions', icon: MessageSquare },
    { id: 'suggest_activities', label: 'Suggest Activities', icon: Activity },
    { id: 'refine_objectives', label: 'Refine Learning Objectives', icon: Target },
    { id: 'summarize_content', label: 'Summarize Content', icon: BookCopy }
  ],
  blooms_architect: [
    { id: 'analyze_blooms_coverage', label: "Analyze Bloom's Coverage", icon: BarChart3 },
  ],
  dok_navigator: [
    { id: 'analyze_dok_level', label: "Analyze DOK Level", icon: Layers },
    { id: 'suggest_dok_rigor_up', label: "Increase DOK Rigor", icon: TrendingUp },
  ],
  udl_enhancer: [
    { id: 'check_udl_representation', label: "Check UDL: Representation", icon: Users },
    { id: 'check_udl_action', label: "Check UDL: Action/Expression", icon: Edit3 },
    { id: 'check_udl_engagement', label: "Check UDL: Engagement", icon: SparklesIcon },
  ],
  // ... add tasks specific to other frameworks
};


// Component-specific styles for ChatPage
const ChatPageStyles = () => (
  <style>{`
    /* Base Layout */
    .chat-page-wrapper { height: 100vh; display: flex; flex-direction: column; overflow: hidden; background-color: hsl(var(--background)); }
    .chat-page-container { flex-grow: 1; display: flex; overflow: hidden; }

    /* Sidebar (Chat History) */
    .chat-sidebar {
      width: 280px; /* Slightly narrower */
      min-width: 260px;
      border-right: 1px solid hsl(var(--border));
      background-color: hsl(var(--card) / 0.3); /* More subtle */
      display: flex;
      flex-direction: column;
      transition: margin-left 0.3s ease, width 0.3s ease;
      z-index: 20; /* Above main panel if it ever overlaps (e.g. mobile absolute) */
    }
    .chat-sidebar.collapsed { margin-left: -280px; width:0; min-width:0; } /* Slide out */
    @media (max-width: 1024px) { /* On medium screens and below, sidebar is collapsed by default */
        .chat-sidebar { position: absolute; height: 100%; margin-left: -280px; box-shadow: 5px 0 15px hsl(var(--background)/0.1);}
        .chat-sidebar.mobile-open { margin-left: 0; }
    }

    /* Main Chat Panel */
    .chat-main-panel { flex-grow: 1; display: flex; flex-direction: column; overflow: hidden; position: relative; }

    /* Chat Header */
    .chat-header {
      padding: 0.625rem 1rem; /* py-2.5 px-4 */
      border-bottom: 1px solid hsl(var(--border));
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: hsl(var(--card));
      min-height: 56px; /* Consistent height */
      flex-shrink: 0;
    }
    .chat-header-left { display: flex; align-items: center; gap: 0.5rem; /* gap-2 */ overflow:hidden; }
    .chat-header-title-wrapper { display: flex; align-items: center; gap: 0.5rem; min-width: 0; }
    .chat-header-framework-icon { color: hsl(var(--primary)); flex-shrink: 0; }
    .chat-header-title { 
        font-family: var(--font-heading); font-size: 1.05rem; /* text-base/lg */ font-weight: 600; 
        color: hsl(var(--foreground)); white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    }
    .chat-header-controls { display: flex; align-items: center; gap: 0.5rem; /* gap-2 */ }
    
    .framework-selector-trigger, .task-selector-trigger { /* Shared style for dropdown triggers in header */
      font-family: var(--font-sans); font-weight: 500; font-size: 0.8rem; /* text-xs */
      padding: 0.375rem 0.625rem; /* py-1.5 px-2.5 */
      border: 1px solid hsl(var(--border)); border-radius: var(--radius-md);
      background-color: hsl(var(--background)); color: hsl(var(--muted-foreground));
      display: flex; align-items: center; gap: 0.25rem; /* gap-1 */
      height: 32px; /* Fixed height */
    }
    .framework-selector-trigger:hover, .task-selector-trigger:hover { border-color: hsl(var(--primary)); color: hsl(var(--primary)); }
    .framework-selector-trigger .lucide, .task-selector-trigger .lucide { opacity: 0.9; }
    
    .dropdown-menu-content-custom { background-color: hsl(var(--popover)) !important; border-color: hsl(var(--border)) !important; box-shadow: var(--shadow-lg) !important; }
    .dropdown-menu-content-custom .lucide { margin-right: 0.5rem; opacity: 0.7; width:16px; height:16px; }
    .dropdown-menu-content-custom [data-state="checked"] .lucide { color: hsl(var(--primary)); opacity: 1; }
    .dropdown-menu-content-custom .dropdown-menu-label { font-size: 0.75rem; text-transform: uppercase; letter-spacing: 0.05em; color: hsl(var(--muted-foreground));}
    .dropdown-menu-content-custom .dropdown-menu-item, 
    .dropdown-menu-content-custom .dropdown-menu-radio-item,
    .dropdown-menu-content-custom .dropdown-menu-sub-trigger {
        font-size: 0.875rem; cursor: pointer;
    }
    .dropdown-menu-content-custom .dropdown-menu-item:focus,
    .dropdown-menu-content-custom .dropdown-menu-radio-item:focus,
    .dropdown-menu-content-custom .dropdown-menu-sub-trigger:focus {
        background-color: hsl(var(--accent) / 0.1) !important;
        color: hsl(var(--accent-foreground)) !important;
    }


    /* Messages Area */
    .chat-messages-container { flex-grow: 1; overflow-y: auto; padding: 1rem 1.5rem; /* p-4 md:p-6 */ }
    .chat-empty-state { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; text-align: center; color: hsl(var(--muted-foreground)); padding: 1rem; }
    .chat-empty-state .lucide { font-size: 3rem; /* text-5xl */ margin-bottom: 1rem; opacity: 0.4; color: hsl(var(--primary)); }
    .chat-empty-state h3 { font-size: 1.25rem; /* text-xl */ font-semibold; font-family: var(--font-heading); color: hsl(var(--foreground)); }

    /* Input Area & Context Manager */
    .chat-input-section { padding: 0.75rem 1.5rem; /* py-3 px-6 */ border-top: 1px solid hsl(var(--border)); background-color: hsl(var(--card)); flex-shrink: 0; }
    .context-manager-collapsible { margin-bottom: 0.75rem; border: 1px solid hsl(var(--border)); border-radius: var(--radius-lg); background-color: hsl(var(--muted)/0.2); }
    .context-manager-trigger { 
        width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 0.5rem 0.75rem; /* py-2 px-3 */
        font-family: var(--font-sans); font-weight: 500; font-size: 0.8rem; color: hsl(var(--muted-foreground));
    }
    .context-manager-trigger:hover { color: hsl(var(--primary)); }
    .context-manager-trigger .lucide-chevron-down { transition: transform 0.2s; }
    .context-manager-trigger[data-state="open"] .lucide-chevron-down { transform: rotate(180deg); }
    .context-manager-content { padding: 0.75rem; max-height: 150px; overflow-y: auto; font-size: 0.8rem; }
    .context-item { display: flex; align-items: center; gap: 0.5rem; padding: 0.25rem 0; }
    .context-item .lucide { flex-shrink: 0; width: 14px; height: 14px; }
    .active-context-badge { margin-left: 0.25rem; }

    .selected-file-preview-chat { /* Style for file selected for one-time upload */
      background-color: hsl(var(--muted) / 0.5); padding: 0.5rem 0.75rem; border-radius: var(--radius-md);
      display: flex; align-items: center; gap: 0.5rem; font-size: 0.8rem; color: hsl(var(--muted-foreground));
      animation: fadeIn 0.3s ease; margin-bottom: 0.5rem;
    }
    .selected-file-preview-chat .lucide-x { cursor: pointer; }
    .selected-file-preview-chat .lucide-x:hover { color: hsl(var(--destructive)); }
    
    @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  `}</style>
);


const ChatPage = () => {
  const { userId, isLoaded, getToken } = useAuth();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null); // For one-time file upload with message
  // const { theme } = useContext(ThemeContext); // Unused for now, but available

  // --- Core State ---
  const [messages, setMessages] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [chatTitle, setChatTitle] = useState("New Design Session");
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024); // Open by default on larger screens

  // --- Pedagogical Framework & AI Task State ---
  const [activeFrameworkId, setActiveFrameworkId] = useState(pedagogicalFrameworks[0].id);
  const [currentAiTask, setCurrentAiTask] = useState(aiTasks.common[0].id); // Default to 'generate_questions'

  // --- Preferences State ---
  // This will hold the combined preferences object, structured by frameworkId if needed.
  // e.g., { blooms_architect: { levels: [], types: [] }, dok_navigator: { targetDOK: 3 } }
  const [currentChatPreferences, setCurrentChatPreferences] = useState({});

  // --- RAG Context State ---
  const [userDocuments, setUserDocuments] = useState([]); // For RAG selector: [{id, name, type: 'document'}]
  const [userNotes, setUserNotes] = useState([]);       // For RAG selector: [{id, name, type: 'note'}]
  const [activeContextItems, setActiveContextItems] = useState([]); // [{id, name, type}] of pinned items

  // --- Misc State ---
  const [selectedFileForUpload, setSelectedFileForUpload] = useState(null); // For one-time file upload
  const [customAIPrompt, setCustomAIPrompt] = useState("");

  // --- Side Effects ---
  // Fetch user's custom AI prompt
  useEffect(() => {
    if (userId) {
      const storedPrompt = localStorage.getItem('customAIPrompt_teacher_' + userId);
      if (storedPrompt) setCustomAIPrompt(storedPrompt);
      // TODO: Optionally fetch from backend if not in local storage for freshness
    }
  }, [userId]);

  // Fetch user's documents and notes for RAG context selection
  const { data: fetchedUserDocuments } = useQuery({
    queryKey: ['userUploadedFilesForRAG', userId],
    queryFn: async () => {
      if (!userId) return [];
      // Fetching all files, then filtering. Ideally, API supports category filter.
      const files = await apiRequest(`/teacher/uploaded-files?clerkId=${userId}`, {}, getToken);
      return (files || []).filter(f => f.isVectorized).map(f => ({ id: f.id, name: f.fileName, type: 'document' }));
    },
    enabled: !!userId,
    onSuccess: (data) => setUserDocuments(data || []),
  });

  const { data: fetchedUserNotes } = useQuery({
    queryKey: ['userNotesForRAG', userId],
    queryFn: async () => {
      if (!userId) return [];
      const notes = await apiRequest(`/teacher/notes?clerkId=${userId}`, {}, getToken);
      // TODO: Filter notes that are suitable for RAG (e.g., vectorized, have content)
      // For now, assuming all notes with content are usable.
      return (notes || []).filter(n => n.content).map(n => ({ id: n.id, name: n.title, type: 'note' }));
    },
    enabled: !!userId,
    onSuccess: (data) => setUserNotes(data || []),
  });

  // Update chat title and reset preferences when activeFrameworkId or currentChatId (for new chat) changes
  useEffect(() => {
    if (!currentChatId) { // Only for new chats
      const framework = pedagogicalFrameworks.find(f => f.id === activeFrameworkId);
      setChatTitle(`New ${framework?.label || 'Design'} Session`);
      // Reset preferences when framework changes for a NEW chat
      // This needs a robust way to get default preferences for `activeFrameworkId`
      setCurrentChatPreferences({}); // Placeholder: actual defaults should come from QuestionPreferences or a config
    }
  }, [activeFrameworkId, currentChatId]);

  // Responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // --- Data Fetching: Chat History List & Active Chat Messages ---
  const { data: chatHistoriesData, isLoading: isLoadingHistories } = useQuery({
    queryKey: ['chatHistories', userId],
    queryFn: async () => { /* ... (same as before, ensure frameworkId is fetched/set) ... */
      if (!userId) return [];
      const histories = await apiRequest(`/teacher/chat-history?clerkId=${userId}`, {}, getToken);
      return histories.map(h => ({
        id: h.id,
        title: h.customTitle || `${h.subject || 'Chat Session'} (${new Date(h.updatedAt).toLocaleDateString()})`, // Prefer custom title if stored
        date: new Date(h.updatedAt).toLocaleString(),
        frameworkId: h.frameworkId || pedagogicalFrameworks[0].id,
      }));
    },
    enabled: !!userId,
  });

  const { isLoading: isLoadingActiveChat } = useQuery({
    queryKey: ['chatMessages', currentChatId, userId],
    queryFn: async () => { /* ... (same as before, but ensure preferences are loaded correctly) ... */
      if (!currentChatId || !userId) { setMessages([]); return null; } // Clear messages if no currentChatId
      const historyDetail = await apiRequest(`/teacher/chat-history/${currentChatId}?clerkId=${userId}`, {}, getToken);

      const formattedMessages = (historyDetail.messages || []).map((msg, index) => ({
        id: `msg-${currentChatId}-${index}`, user: msg.role === 'user' ? 'me' : 'assistant',
        text: msg.content, // This will be used by ChatMessages for simple text display
        structuredContent: msg.structuredContent, // For complex AI outputs (tables, KaTeX, custom cards)
        timestamp: msg.timestamp || new Date().toISOString(),
        usedSources: msg.role === 'assistant' ? msg.usedSources : undefined, // Array of {id, name, type}
        aiTaskType: msg.aiTaskType, // e.g., 'generate_questions', 'suggest_activity'
        attachments: msg.attachments || [], // If user messages can have attachments persisted
      }));
      setMessages(formattedMessages);
      setChatTitle(historyDetail.customTitle || `${historyDetail.subject || 'Chat'} - ${historyDetail.class || 'General'}`);
      setActiveFrameworkId(historyDetail.frameworkId || pedagogicalFrameworks[0].id);
      setActiveContextItems(historyDetail.activeContextItems || []); // Load pinned context

      // Load preferences from chat history
      setCurrentChatPreferences(historyDetail.lastPreferences || historyDetail.defaultPreferences || getDefaultPreferencesForFramework(historyDetail.frameworkId || pedagogicalFrameworks[0].id));

      return historyDetail;
    },
    enabled: !!currentChatId && !!userId,
  });

  // Function to get default preferences based on framework (simplified)
  const getDefaultPreferencesForFramework = (frameworkId) => {
    // This should be more sophisticated, perhaps fetching from a config or QuestionPreferences component
    switch (frameworkId) {
      case 'blooms_architect': return { targetLevels: ['apply'], questionTypes: { mcq: true } };
      // Add defaults for other frameworks
      default: return {};
    }
  };

  // --- Mutations ---
  const aiCoPilotMutation = useMutation({ // Renamed from generateQuestionsMutation
    mutationFn: (payload) => apiRequest('/ai/pedagogy-assist', { // Generic endpoint
      method: 'POST', body: JSON.stringify(payload),
    }, getToken),
    onSuccess: (data, variables) => { /* ... (same as generateAIMutation in previous response, using structuredContent) ... */
      setMessages(prev => prev.map(msg => msg.isGenerating ? {
        ...msg, user: 'assistant', id: `msg-ai-${Date.now()}`,
        text: data.summaryText || "AI response generated.", // Fallback/summary text
        structuredContent: data.structuredOutput, // Main content for complex rendering
        isGenerating: false, usedSources: data.usedSources, aiTaskType: variables.aiTask,
        timestamp: new Date().toISOString()
      } : msg));

      if (!variables.chatHistoryId && data.chatHistoryId) {
        setCurrentChatId(data.chatHistoryId);
        queryClient.invalidateQueries({ queryKey: ['chatHistories', userId] });
        if (data.chatTitle) setChatTitle(data.chatTitle);
      } else if (variables.chatHistoryId) {
        queryClient.invalidateQueries({ queryKey: ['chatHistories', userId] });
      }
    },
    onError: (error) => { /* ... (same error handling) ... */
      setMessages(prev => prev.map(msg => msg.isGenerating ? {
        ...msg, text: `Error: ${error.message || "Failed to get response."}`, isGenerating: false,
        timestamp: new Date().toISOString()
      } : msg));
      toast.error("AI Co-Pilot failed to respond.");
    }
  });

  // --- Event Handlers ---
  const handleSendMessage = async (text) => {
    if (!text.trim()) return;

    const userMessage = {
      id: `msg-user-${Date.now()}`, user: 'me', text: text, timestamp: new Date().toISOString(),
      attachments: selectedFileForUpload ? [{ id: 'file-1', name: selectedFileForUpload.name, type: selectedFileForUpload.type }] : []
    };
    const thinkingMessage = {
      id: `msg-ai-thinking-${Date.now()}`, user: 'assistant', text: "EduCraft AI is processing...", isGenerating: true, timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, userMessage, thinkingMessage]);

    const payload = {
      clerkId: userId,
      userQuery: text,
      activeFrameworkId: activeFrameworkId,
      aiTask: currentAiTask, // This is now set by QuestionPreferences or inferred
      preferences: currentChatPreferences,
      customPromptText: customAIPrompt,
      chatHistoryId: currentChatId,
      activeContextItemIds: activeContextItems.map(item => item.id), // Send IDs of pinned RAG items
      // oneTimeFile: selectedFileForUpload (backend needs to handle this if sent directly)
    };

    if (selectedFileForUpload) {
      toast.info(`File "${selectedFileForUpload.name}" attached for this query.`);
      // Actual file upload would happen here or be handled by backend based on payload
      // For now, just clearing it visually
      setSelectedFileForUpload(null);
    }
    aiCoPilotMutation.mutate(payload);
  };

  const handleSelectHistory = (historyItem) => { /* ... (same as before, using historyItem object) ... */
    setCurrentChatId(historyItem.id);
    // Other state (title, framework, prefs, messages) will be set by useQuery's onSuccess for activeChatMessages
  };

  const handleNewChat = () => { /* ... (same as before, resets more state) ... */
    setCurrentChatId(null);
    setMessages([]);
    const defaultFw = pedagogicalFrameworks[0];
    setActiveFrameworkId(defaultFw.id);
    setCurrentAiTask(aiTasks.common[0].id); // Reset to default task
    setChatTitle(`New ${defaultFw.label} Session`);
    setCurrentChatPreferences(getDefaultPreferencesForFramework(defaultFw.id));
    setActiveContextItems([]);
    setSelectedFileForUpload(null);
    queryClient.removeQueries({ queryKey: ['chatMessages', null, userId] }); // Clear any cached "new chat"
  };

  const handleFileSelectForMessage = (event) => { /* ... (same as before) ... */
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error("File for chat context is too large (max 10MB).");
        return;
      }
      setSelectedFileForUpload(file);
    }
  };

  const toggleContextItem = (item) => {
    setActiveContextItems(prev =>
      prev.find(ci => ci.id === item.id)
        ? prev.filter(ci => ci.id !== item.id)
        : [...prev, item]
    );
    // TODO: Persist activeContextItems to backend when chat is saved/updated
  };

  // --- Render Logic ---
  if (!isLoaded) { /* ... (same loading spinner) ... */
    return (<div className="min-h-screen flex items-center justify-center bg-background"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>);
  }

  const currentFramework = pedagogicalFrameworks.find(f => f.id === activeFrameworkId) || pedagogicalFrameworks[0];
  const availableTasksForFramework = [
    ...aiTasks.common,
    ...(aiTasks[activeFrameworkId] || [])
  ];

  return (
    <>
      <ChatPageStyles />
      <TooltipProvider>
        <SignedIn>
          <div className="chat-page-wrapper">
            <Navbar />
            <div className="chat-page-container">
              <aside className={`chat-sidebar ${isSidebarOpen ? 'mobile-open' : ''}`}> {/* mobile-open controls visibility on small screens */}
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
                      {isSidebarOpen ? <X size={20} /> : <MenuIcon size={20} />}
                    </Button>
                    <div className="chat-header-title-wrapper">
                      <currentFramework.icon size={20} className="chat-header-framework-icon shrink-0" />
                      <h2 className="chat-header-title" title={chatTitle}>{chatTitle}</h2>
                    </div>
                  </div>

                  <div className="chat-header-controls">
                    {/* AI Task Selector Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="task-selector-trigger">
                          {(aiTasks.common.find(t => t.id === currentAiTask) || availableTasksForFramework.find(t => t.id === currentAiTask))?.icon &&
                            React.createElement((aiTasks.common.find(t => t.id === currentAiTask) || availableTasksForFramework.find(t => t.id === currentAiTask)).icon, { size: 14, className: "mr-1 text-primary" })}
                          {(aiTasks.common.find(t => t.id === currentAiTask) || availableTasksForFramework.find(t => t.id === currentAiTask))?.label || "Select Task"}
                          <ChevronDownIcon size={14} className="ml-auto opacity-70" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-64 dropdown-menu-content-custom" align="end">
                        <DropdownMenuLabel>Select AI Task</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={currentAiTask} onValueChange={setCurrentAiTask}>
                          {availableTasksForFramework.map(task => (
                            <DropdownMenuRadioItem key={task.id} value={task.id}>
                              {task.icon && <task.icon />} {task.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {/* Framework Selector Dropdown */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="framework-selector-trigger">
                          <LayoutGrid size={14} className="text-primary" />
                          {currentFramework.label}
                          <ChevronDownIcon size={14} className="ml-auto opacity-70" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="w-72 dropdown-menu-content-custom" align="end">
                        <DropdownMenuLabel>Active Pedagogical Framework</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={activeFrameworkId} onValueChange={setActiveFrameworkId}>
                          {pedagogicalFrameworks.map(fw => (
                            <DropdownMenuRadioItem key={fw.id} value={fw.id}>
                              <fw.icon /> {fw.label}
                            </DropdownMenuRadioItem>
                          ))}
                        </DropdownMenuRadioGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <ScrollArea className="chat-messages-container">
                  {isLoadingActiveChat && currentChatId ? ( /* ... (Loading state) ... */
                    <div className="flex justify-center items-center h-full"><Loader2 className="h-8 w-8 animate-spin text-primary" /><p className="ml-3 text-muted-foreground">Loading session...</p></div>
                  ) : messages.length === 0 ? ( /* ... (Empty state) ... */
                    <div className="chat-empty-state">
                      <currentFramework.icon className="text-primary" />
                      <h3 className="mt-2">EduCraft AI: {currentFramework.label} Mode</h3>
                      <p className="max-w-md mt-1 text-sm">{currentFramework.description}</p>
                      <p className="mt-3 text-xs">Set preferences & context below, then type your request to begin.</p>
                    </div>
                  ) : (
                    <ChatMessages messages={messages} />
                  )}
                </ScrollArea>

                <div className="chat-input-section">
                  {/* Context Manager - Collapsible Panel */}
                  <Collapsible className="context-manager-collapsible">
                    <CollapsibleTrigger className="context-manager-trigger">
                      <div className="flex items-center gap-1.5">
                        <LinkIcon size={14} className="text-primary" /> Manage RAG Context
                        {activeContextItems.length > 0 &&
                          <Badge variant="secondary" className="active-context-badge h-5">{activeContextItems.length} active</Badge>}
                      </div>
                      <ChevronDownIcon size={16} className="lucide-chevron-down" />
                    </CollapsibleTrigger>
                    <CollapsibleContent className="context-manager-content">
                      {(userDocuments.length === 0 && userNotes.length === 0) ? (
                        <p className="text-xs text-center text-muted-foreground py-2">No documents or notes available for context. Upload/create them in your dashboard.</p>
                      ) : (
                        <div className="space-y-2">
                          {userDocuments.length > 0 && <p className="text-xs font-semibold text-foreground">My Documents:</p>}
                          {userDocuments.map(doc => (
                            <div key={doc.id} className="context-item">
                              <Checkbox id={`ctx-doc-${doc.id}`} checked={!!activeContextItems.find(ci => ci.id === doc.id)} onCheckedChange={() => toggleContextItem(doc)} />
                              <FileCode2 className="text-blue-500" />
                              <label htmlFor={`ctx-doc-${doc.id}`} className="truncate cursor-pointer hover:text-primary" title={doc.name}>{doc.name}</label>
                            </div>
                          ))}
                          {userNotes.length > 0 && <p className="text-xs font-semibold text-foreground mt-2">My Notes:</p>}
                          {userNotes.map(note => (
                            <div key={note.id} className="context-item">
                              <Checkbox id={`ctx-note-${note.id}`} checked={!!activeContextItems.find(ci => ci.id === note.id)} onCheckedChange={() => toggleContextItem(note)} />
                              <BookCopy className="text-green-500" />
                              <label htmlFor={`ctx-note-${note.id}`} className="truncate cursor-pointer hover:text-primary" title={note.name}>{note.name}</label>
                            </div>
                          ))}
                        </div>
                      )}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Preferences Panel - now more dynamic */}
                  <QuestionPreferences
                    key={activeFrameworkId + "_" + currentAiTask} // Force re-render on framework or task change
                    activeFrameworkId={activeFrameworkId}
                    currentAiTask={currentAiTask}
                    initialPreferences={currentChatPreferences[activeFrameworkId] || getDefaultPreferencesForFramework(activeFrameworkId)}
                    onUpdatePreferences={(frameworkSpecificPrefs) => {
                      setCurrentChatPreferences(prev => ({ ...prev, [activeFrameworkId]: frameworkSpecificPrefs }));
                    }}
                  // onSetAiTask={setCurrentAiTask} // If QP needs to set task directly
                  />

                  {selectedFileForUpload && (
                    <div className="selected-file-preview-chat">
                      <Paperclip size={16} className="text-primary" />
                      <span className="flex-grow truncate">{selectedFileForUpload.name}</span>
                      <X size={18} onClick={() => setSelectedFileForUpload(null)} />
                    </div>
                  )}

                  <div className="flex items-center gap-2 md:gap-3"> {/* Adjusted gap */}
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline" size="icon"
                          className="border-border text-muted-foreground hover:text-primary hover:border-primary h-10 w-10 md:h-12 md:w-12 rounded-lg"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <UploadCloud size={18} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Attach file for this query (Max 10MB)</p></TooltipContent>
                    </Tooltip>
                    <input type="file" ref={fileInputRef} onChange={handleFileSelectForMessage} className="hidden" accept=".pdf,.doc,.docx,.txt" />

                    <ChatInput onSendMessage={handleSendMessage} />
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