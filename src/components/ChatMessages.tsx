// src/components/ChatMessages.tsx

import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  text: string;
  user: string;
  timestamp?: Date;
  attachments?: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
  }>;
}

interface ChatMessagesProps {
  messages: Message[];
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Format timestamp
  const formatTime = (date?: Date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className={`flex items-start gap-3 ${
            message.user === 'me' ? 'flex-row-reverse' : ''
          } animate-fade-in transition-opacity duration-300`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <Avatar className={`h-9 w-9 ring-2 ${
            message.user === 'me' 
              ? 'ring-theme-primary' 
              : 'ring-theme-tertiary'
          } transition-all duration-300 hover:scale-110`}>
            <AvatarImage src={message.user === 'me' ? '/avatar.png' : '/bot.png'} />
            <AvatarFallback className={
              message.user === 'me' 
                ? 'bg-theme-primary text-white' 
                : 'bg-theme-tertiary text-white'
            }>
              {message.user === 'me' ? 'ME' : 'QG'}
            </AvatarFallback>
          </Avatar>
          <div className="space-y-2 max-w-[80%]">
            <div 
              className={`px-4 py-3 rounded-lg ${
                message.user === 'me' 
                  ? 'bg-theme-primary text-white rounded-tr-none' 
                  : 'bg-gray-700 text-white rounded-tl-none'
              } shadow-lg hover-lift`}
            >
              {message.text}
              
              {/* File attachments if any */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map(attachment => (
                    <div key={attachment.id} className="flex items-center gap-2 p-2 rounded bg-black/20">
                      <div className="h-8 w-8 bg-gray-600 rounded flex items-center justify-center text-xs text-white">
                        {attachment.type.split('/')[0].substring(0,2).toUpperCase()}
                      </div>
                      <div className="flex-1 truncate text-sm">
                        {attachment.name}
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs">View</Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Timestamp */}
            <div className={`text-xs text-gray-400 ${message.user === 'me' ? 'text-right' : 'text-left'}`}>
              {formatTime(message.timestamp)}
            </div>
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;
