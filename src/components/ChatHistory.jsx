// src/components/ChatHistory.jsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { History, PlusCircle, MessageSquareText, Loader2, Tag, BarChart3, Layers, Users, Lightbulb, Puzzle } from "lucide-react"; // Added Tag icon
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge"; // For displaying framework tag

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";


// Assuming pedagogicalFrameworks is passed as a prop or imported if it's a shared constant
// For simplicity, let's assume it's passed or defined here, matching ChatPage.jsx
const pedagogicalFrameworksList = [ // Renamed to avoid conflict if imported elsewhere
  { id: 'blooms_architect', label: "Bloom's", shortLabel: "Bloom's", icon: BarChart3, color: "text-blue-500", bgColor: "bg-blue-500/10" },
  { id: 'dok_navigator', label: "DOK", shortLabel: "DOK", icon: Layers, color: "text-green-500", bgColor: "bg-green-500/10" },
  { id: 'udl_enhancer', label: "UDL", shortLabel: "UDL", icon: Users, color: "text-purple-500", bgColor: "bg-purple-500/10" },
  { id: 'constructivist_spark', label: "Inquiry", shortLabel: "Inquiry", icon: Lightbulb, color: "text-orange-500", bgColor: "bg-orange-500/10" },
  { id: 'combine_conquer', label: "Combined", shortLabel: "Combined", icon: Puzzle, color: "text-pink-500", bgColor: "bg-pink-500/10" },
  // Add more if ChatPage supports them
];


// Component-specific styles for ChatHistory
const ChatHistoryStyles = () => (
  <style>{`
    .chat-history-panel { /* Renamed from container for clarity */
      height: 100%;
      display: flex;
      flex-direction: column;
      background-color: hsl(var(--card) / 0.4); /* Subtle bg for sidebar */
      border-right: 1px solid hsl(var(--border)); /* Ensure border is visible if sidebar slides */
    }
    .dark .chat-history-panel {
        background-color: hsl(var(--muted) / 0.05);
    }

    .chat-history-header {
      padding: 0.875rem 1rem; /* py-3.5 px-4 */
      border-bottom: 1px solid hsl(var(--border));
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0;
      background-color: hsl(var(--card) / 0.6); /* Slightly more opaque header */
    }
    .dark .chat-history-header {
        background-color: hsl(var(--muted) / 0.08);
    }

    .chat-history-title {
      font-family: var(--font-heading);
      font-size: 1.05rem; /* text-base slightly larger */
      font-weight: 600;
      color: hsl(var(--foreground));
      display: flex;
      align-items: center;
      gap: 0.625rem; /* gap-2.5 */
    }
    .chat-history-title .lucide {
        color: hsl(var(--primary));
    }

    .new-chat-button {
      color: hsl(var(--muted-foreground));
      transition: all 0.2s ease;
    }
    .new-chat-button:hover {
      color: hsl(var(--primary));
      background-color: hsl(var(--primary) / 0.1);
      transform: scale(1.05) rotate(15deg);
    }

    .chat-history-list-scrollarea {
      flex-grow: 1;
    }
    .chat-history-list {
      padding: 0.75rem; /* p-3 */
    }

    .history-item-button {
      width: 100%;
      text-align: left;
      padding: 0.625rem 0.875rem; /* py-2.5 px-3.5 */
      border-radius: var(--radius-lg);
      transition: all 0.2s ease-out;
      display: flex; /* Keep flex for icon alignment */
      align-items: flex-start; /* Align items to top for multi-line text */
      gap: 0.625rem; /* gap-2.5 */
      border: 1px solid transparent;
      margin-bottom: 0.25rem; /* space-y-1 like */
      background-color: hsl(var(--background)); /* Default item bg */
      box-shadow: var(--shadow-sm);
    }
    .dark .history-item-button {
        background-color: hsl(var(--card) / 0.5);
    }

    .history-item-button:hover {
      background-color: hsl(var(--muted) / 0.7);
      border-color: hsl(var(--primary) / 0.3);
      transform: translateX(3px);
    }
    .history-item-button-active {
      background-color: hsl(var(--primary) / 0.15) !important; /* Ensure override */
      color: hsl(var(--primary)) !important;
      border-color: hsl(var(--primary) / 0.7) !important;
      box-shadow: 0 0 10px hsl(var(--primary)/0.15), inset 0 0 0 1px hsl(var(--primary)/0.3);
    }
    .history-item-button-active .history-item-title {
      color: hsl(var(--primary)) !important;
      font-weight: 600;
    }
    .history-item-button-active .history-item-icon,
    .history-item-button:hover .history-item-icon {
      color: hsl(var(--primary));
    }

    .history-item-icon {
      color: hsl(var(--muted-foreground));
      transition: color 0.2s ease;
      width: 1.125rem; /* Size 18px */
      height: 1.125rem;
      flex-shrink: 0;
      margin-top: 0.125rem; /* Align with first line of text */
    }
    
    .history-item-text-content {
      overflow: hidden;
      flex-grow: 1; /* Allow text content to take space */
    }
    .history-item-title {
      font-size: 0.875rem; /* text-sm */
      font-weight: 500;
      color: hsl(var(--foreground));
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-bottom: 0.125rem; /* mb-0.5 */
    }
    .history-item-details {
      font-size: 0.7rem; /* text-xs */
      color: hsl(var(--muted-foreground));
      display: flex;
      align-items: center;
      gap: 0.5rem; /* gap-2 */
      flex-wrap: wrap; /* Allow wrapping if too long */
    }
    .history-item-framework-badge {
        padding: 0.1rem 0.35rem;
        font-size: 0.65rem; /* Smaller badge text */
        font-weight: 500;
        height: auto; /* Adjust height */
        line-height: 1.2;
    }

    .empty-history-placeholder {
      padding: 2rem 1rem;
      text-align: center;
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%; /* Take full height of scroll area if empty */
    }
    .empty-history-placeholder .lucide {
      width: 2.5rem; /* w-10 */
      height: 2.5rem; /* h-10 */
      margin-bottom: 0.75rem; /* mb-3 */
      opacity: 0.4;
      color: hsl(var(--primary));
    }
  `}</style>
);


const ChatHistory = ({ 
  histories, 
  activeHistoryId, 
  onSelectHistory,
  onNewChat,
  isLoading
}) => {

  const getFrameworkVisuals = (frameworkId) => {
    const fw = pedagogicalFrameworksList.find(f => f.id === frameworkId);
    return fw || { label: "General", shortLabel: "Gen", icon: MessageSquareText, color: "text-gray-500", bgColor: "bg-gray-500/10" }; // Fallback
  };

  return (
    <>
      <ChatHistoryStyles />
      <div className="chat-history-panel">
        <div className="chat-history-header">
          <h2 className="chat-history-title">
            <History size={20} />
            Chat Sessions
          </h2>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={onNewChat}
                className="new-chat-button rounded-full"
              >
                <PlusCircle size={22} />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="bg-popover text-popover-foreground border-border">
                <p>Start New Design Session</p>
            </TooltipContent>
          </Tooltip>
        </div>

        <ScrollArea className="chat-history-list-scrollarea">
          <div className="chat-history-list">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-7 w-7 animate-spin text-primary" />
              </div>
            ) : histories.length === 0 ? (
              <div className="empty-history-placeholder">
                <MessageSquareText />
                <p className="mt-2 font-semibold">No Sessions Yet</p>
                <p className="mt-1">Click the '+' icon to begin a new pedagogical design session.</p>
              </div>
            ) : (
              <div className="space-y-1">
                {histories.map((history) => {
                  const frameworkVisuals = getFrameworkVisuals(history.frameworkId);
                  return (
                    <button
                      key={history.id}
                      onClick={() => onSelectHistory(history)} // Pass the whole history item
                      className={`history-item-button ${
                        activeHistoryId === history.id ? 'history-item-button-active' : ''
                      }`}
                      title={history.title}
                    >
                      <frameworkVisuals.icon className="history-item-icon" style={{ color: activeHistoryId === history.id ? frameworkVisuals.color : undefined }}/>
                      <div className="history-item-text-content">
                        <h3 className="history-item-title">
                          {history.title}
                        </h3>
                        <div className="history-item-details">
                          <span>{history.date}</span>
                          <Badge 
                            variant="outline" 
                            className="history-item-framework-badge"
                            style={{ 
                                color: frameworkVisuals.color, 
                                backgroundColor: frameworkVisuals.bgColor,
                                borderColor: `${frameworkVisuals.color}40` // color with opacity
                            }}
                          >
                            <Tag size={10} className="mr-1 opacity-80"/>{frameworkVisuals.shortLabel}
                          </Badge>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default ChatHistory;