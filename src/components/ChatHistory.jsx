// src/components/ChatHistory.jsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, History, PlusCircle } from "lucide-react";

const ChatHistory = ({ 
  histories, 
  activeHistoryId, 
  onSelectHistory,
  onNewChat
}) => {
  return (
    <div className="h-full w-full bg-black-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800 flex justify-between items-center">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <History size={20} />
          Chat History
        </h2>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={onNewChat}
          className="text-white/70 hover:text-white hover:bg-theme-tertiary/20"
          title="New Chat"
        >
          <PlusCircle size={20} />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {histories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No previous chats found.</p>
            <Button 
              onClick={onNewChat}
              className="mt-2 bg-theme-primary hover:bg-theme-primary/80 text-white"
              size="sm"
            >
              Start New Chat
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            {histories.map((history) => (
              <button
                key={history.id}
                onClick={() => onSelectHistory(history.id)}
                className={`w-full text-left p-3 rounded-md transition-all duration-300 hover:bg-theme-tertiary/20 group flex items-start gap-3 animate-fade-in hover-lift ${
                  activeHistoryId === history.id ? 'bg-theme-tertiary/30 border border-theme-tertiary/50' : 'bg-gray-800/50'
                }`}
              >
                <FileText size={18} className="text-gray-400 group-hover:text-theme-primary transition-colors mt-1 shrink-0" />
                <div className="overflow-hidden"> {/* Added for text ellipsis */}
                  <h3 className="font-medium text-white group-hover:text-theme-primary transition-colors text-sm truncate">
                    {history.title}
                  </h3>
                  <p className="text-xs text-gray-500">{history.date}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatHistory;