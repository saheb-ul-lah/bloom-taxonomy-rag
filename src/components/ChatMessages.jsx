// src/components/ChatMessages.jsx
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bot, User, DownloadCloud, ExternalLink } from "lucide-react"; // Added ExternalLink

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (date) => {
    if (!date) return '';
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit' }).format(new Date(date));
  };

  const renderAIResponse = (responseData) => {
    if (typeof responseData === 'string') {
      // Basic Markdown-like link detection: [text](url)
      const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;

      while ((match = linkRegex.exec(responseData)) !== null) {
        if (match.index > lastIndex) {
          parts.push(responseData.substring(lastIndex, match.index));
        }
        parts.push(
          <a
            key={match.index}
            href={match[2]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-300 underline inline-flex items-center"
          >
            {match[1]} <ExternalLink size={12} className="ml-1" />
          </a>
        );
        lastIndex = linkRegex.lastIndex;
      }
      if (lastIndex < responseData.length) {
        parts.push(responseData.substring(lastIndex));
      }

      return <p className="whitespace-pre-wrap">{parts.length > 0 ? parts.map((part, i) => <React.Fragment key={i}>{part}</React.Fragment>) : responseData}</p>;
    }

    if (Array.isArray(responseData)) {
      return (
        <div className="space-y-3 mt-2">
          {responseData.map((q, index) => (
            <div key={index} className="p-3 rounded-md bg-black/20 border border-gray-600/50">
              <p className="font-semibold text-sm">Question {index + 1}: <span className="font-normal">{q.question}</span></p>
              <p className="text-xs text-gray-300 mt-1">Bloom's Level: <span className="font-medium text-yellow-400">{q.bloomLevel}</span></p>
              <p className="text-xs text-gray-400 mt-0.5">Justification: <span className="italic">{q.justification}</span></p>
            </div>
          ))}
        </div>
      );
    }
    return <p className="whitespace-pre-wrap">Received complex data. Display not fully implemented for this structure.</p>;
  };

  return (
    <div className="space-y-6">
      {messages.map((message, index) => (
        <div 
          key={message.id} 
          className={`flex items-start gap-3 ${message.user === 'me' ? 'flex-row-reverse' : ''} animate-fade-in`}
          style={{ animationDelay: `${index * 0.05}s` }}
        >
          <Avatar className={`h-9 w-9 ring-1 shrink-0 ${
            message.user === 'me' ? 'ring-theme-primary' : 'ring-theme-tertiary'
          }`}>
            <AvatarImage src={undefined} /> {/* No default images */}
            <AvatarFallback className={
              message.user === 'me' ? 'bg-theme-primary text-white' : 'bg-theme-tertiary text-white'
            }>
              {message.user === 'me' ? <User size={18} /> : <Bot size={18} />}
            </AvatarFallback>
          </Avatar>

          <div className={`space-y-1 max-w-[85%] md:max-w-[75%]`}>
            <div 
              className={`px-4 py-3 rounded-xl shadow-md break-words ${
                message.user === 'me' 
                  ? 'bg-theme-primary text-white rounded-tr-none' 
                  : (message.user === 'system' ? 'bg-gray-600 text-gray-200 rounded-tl-none text-center w-full max-w-full text-sm' : 'bg-gray-700 text-white rounded-tl-none') 
              }`}
            >
              {message.isGenerating ? (
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-0"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-100"></div>
                  <div className="w-2 h-2 bg-current rounded-full animate-pulse delay-200"></div>
                  <span>{typeof message.text === 'string' ? message.text : "Processing..."}</span>
                </div>
              ) : message.user === 'assistant' ? (
                renderAIResponse(message.text)
              ) : (
                <p className="whitespace-pre-wrap">{message.text}</p>
              )}
              
              {message.attachments && message.attachments.length > 0 && (
                <div className="mt-2 space-y-2">
                  {message.attachments.map(attachment => (
                    <div key={attachment.id} className="flex items-center gap-2 p-2 rounded bg-black/20 border border-gray-600/50">
                       <div className="h-8 w-8 bg-gray-600 rounded flex items-center justify-center text-xs text-white shrink-0">
                        {attachment.type?.split('/')[1]?.substring(0,3).toUpperCase() || 'FILE'}
                      </div>
                      <div className="flex-1 truncate text-sm text-gray-300">
                        {attachment.name}
                      </div>
                      <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-400 hover:text-theme-primary" asChild>
                        <a href={attachment.url} target="_blank" rel="noopener noreferrer"><DownloadCloud size={16}/></a>
                      </Button>
                    </div>
                  ))}
                </div>
              )}
               {message.user === 'assistant' && message.usedSources && message.usedSources.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-600/50">
                  <p className="text-xs text-gray-400">Sources:</p>
                  <ul className="list-disc list-inside pl-2 text-xs text-gray-500">
                    {message.usedSources.map((source, i) => <li key={i} className="truncate">{source}</li>)}
                  </ul>
                </div>
              )}
            </div>
            
            {message.timestamp && !message.isGenerating && (
                <div className={`text-xs text-gray-500 ${message.user === 'me' ? 'text-right pr-1' : 'text-left pl-1'}`}>
                {formatTime(message.timestamp)}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatMessages;