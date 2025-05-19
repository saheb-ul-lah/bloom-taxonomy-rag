import React from 'react';
import { Button } from "@/components/ui/button";
import { History, PlusCircle, MessageSquareText, Loader2 } from "lucide-react"; // Updated icons
import { ScrollArea } from "@/components/ui/scroll-area";

// Component-specific styles for ChatHistory
const ChatHistoryStyles = () => (
  <style>{`
    .chat-history-container {
      height: 100%;
      display: flex;
      flex-direction: column;
    }
    .chat-history-header {
      padding: 1rem 1.25rem; /* py-4 px-5 */
      border-bottom: 1px solid hsl(var(--border));
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-shrink: 0; /* Prevent header from shrinking */
    }
    .chat-history-title {
      font-family: var(--font-heading);
      font-size: 1.125rem; /* text-lg */
      font-weight: 600;
      color: hsl(var(--foreground));
      display: flex;
      align-items: center;
      gap: 0.5rem; /* gap-2 */
    }
    .chat-history-list {
      padding: 0.75rem; /* p-3 */
    }
    .history-item-button {
      width: 100%;
      text-align: left;
      padding: 0.75rem 1rem; /* py-3 px-4 */
      border-radius: var(--radius-lg);
      transition: all 0.2s ease-out;
      display: flex;
      align-items: center;
      gap: 0.75rem; /* gap-3 */
      border: 1px solid transparent; /* For active state border */
      margin-bottom: 0.25rem; /* space-y-1 like */
    }
    .history-item-button:hover {
      background-color: hsl(var(--muted) / 0.5);
      color: hsl(var(--foreground));
    }
    .history-item-button-active {
      background-color: hsl(var(--primary) / 0.1);
      color: hsl(var(--primary));
      border-color: hsl(var(--primary) / 0.5);
      font-weight: 500;
    }
    .history-item-button .lucide {
      color: hsl(var(--muted-foreground));
      transition: color 0.2s ease;
      width: 1.125rem; /* Size 18px */
      height: 1.125rem;
      flex-shrink: 0;
    }
    .history-item-button:hover .lucide,
    .history-item-button-active .lucide {
      color: hsl(var(--primary));
    }
    .history-item-text-content {
      overflow: hidden; /* For ellipsis */
    }
    .history-item-title {
      font-size: 0.875rem; /* text-sm */
      font-weight: 500; /* Normal weight unless active */
      color: hsl(var(--foreground)); /* Ensure it inherits button color */
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .history-item-date {
      font-size: 0.75rem; /* text-xs */
      color: hsl(var(--muted-foreground));
    }
    .empty-history-placeholder {
      padding: 2rem 1rem; /* py-8 px-4 */
      text-align: center;
      color: hsl(var(--muted-foreground));
      font-size: 0.875rem;
    }
  `}</style>
);


const ChatHistory = ({ 
  histories, 
  activeHistoryId, 
  onSelectHistory,
  onNewChat,
  isLoading // Added isLoading prop
}) => {
  return (
    <>
      <ChatHistoryStyles />
      <div className="chat-history-container">
        <div className="chat-history-header">
          <h2 className="chat-history-title">
            <History size={20} />
            Chat Sessions
          </h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onNewChat}
            className="text-muted-foreground hover:text-primary hover:bg-primary/10 rounded-full"
            title="Start New Chat"
          >
            <PlusCircle size={22} />
          </Button>
        </div>

        <ScrollArea className="flex-grow"> {/* ScrollArea wraps the list */}
          <div className="chat-history-list">
            {isLoading ? (
              <div className="flex justify-center items-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : histories.length === 0 ? (
              <div className="empty-history-placeholder">
                <MessageSquareText size={32} className="mb-3 opacity-50"/>
                <p>No previous chats found.</p>
                <p className="mt-1">Start a new conversation!</p>
              </div>
            ) : (
              <div className="space-y-1">
                {histories.map((history) => (
                  <button
                    key={history.id}
                    onClick={() => onSelectHistory(history.id)}
                    className={`history-item-button ${
                      activeHistoryId === history.id ? 'history-item-button-active' : ''
                    }`}
                    title={history.title} // Full title on hover
                  >
                    <MessageSquareText />
                    <div className="history-item-text-content">
                      <h3 className="history-item-title">
                        {history.title}
                      </h3>
                      <p className="history-item-date">{history.date}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </>
  );
};

export default ChatHistory;