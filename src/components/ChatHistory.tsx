// src/components/ChatHistory.tsx
import React from 'react';
import { Button } from "@/components/ui/button";
import { FileText, History } from "lucide-react";

interface ChatHistoryProps {
  histories: Array<{
    id: string;
    title: string;
    date: string;
  }>;
  activeHistoryId: string | null;
  onSelectHistory: (historyId: string) => void;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
  histories, 
  activeHistoryId, 
  onSelectHistory 
}) => {
  return (
    <div className="h-full w-full bg-gray-900 border-r border-gray-800 flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <h2 className="text-lg font-medium text-white flex items-center gap-2">
          <History size={20} />
          Chat History
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {histories.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p>No previous chats found</p>
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
                <FileText size={18} className="text-gray-400 group-hover:text-theme-primary transition-colors mt-1" />
                <div>
                  <h3 className="font-medium text-white group-hover:text-theme-primary transition-colors">
                    {history.title}
                  </h3>
                  <p className="text-sm text-gray-400">{history.date}</p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="p-3 border-t border-gray-800">
        <Button 
          className="w-full bg-theme-primary hover:bg-theme-primary/80 text-white"
          size="sm"
        >
          New Chat
        </Button>
      </div>
    </div>
  );
};

export default ChatHistory;
