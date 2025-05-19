import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bot, User, DownloadCloud, ExternalLink, Layers, CheckCircle } from "lucide-react"; // Added Layers, CheckCircle
import { marked } from 'marked'; // For rendering Markdown from AI string responses
import DOMPurify from 'dompurify'; // For sanitizing HTML output from marked

// Component-specific styles for ChatMessages
const ChatMessagesStyles = () => (
  <style>{`
    .message-bubble-container {
      display: flex;
      gap: 0.75rem; /* gap-3 */
      max-width: 90%; /* Prevent bubbles from being too wide */
      margin-bottom: 1.5rem; /* space-y-6 like */
    }
    .message-bubble-container.user-message {
      margin-left: auto; /* Align user messages to the right */
      flex-direction: row-reverse;
    }
    
    .message-avatar {
      width: 36px; /* h-9 w-9 */
      height: 36px;
      flex-shrink: 0;
      border: 2px solid transparent;
    }
    .message-avatar.user-avatar {
      border-color: hsl(var(--primary) / 0.5);
    }
    .message-avatar.ai-avatar {
      border-color: hsl(var(--accent) / 0.5);
    }

    .message-content-wrapper {
      display: flex;
      flex-direction: column;
      max-width: calc(100% - 48px); /* Account for avatar and gap */
    }
    .user-message .message-content-wrapper {
      align-items: flex-end;
    }
    .ai-message .message-content-wrapper {
      align-items: flex-start;
    }

    .message-bubble {
      padding: 0.75rem 1rem; /* py-3 px-4 */
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-soft);
      word-break: break-word;
      line-height: 1.6;
      color: hsl(var(--foreground));
      font-size: 0.95rem;
    }
    .user-message .message-bubble {
      background-color: hsl(var(--primary));
      color: hsl(var(--primary-foreground));
      border-bottom-right-radius: var(--radius-sm);
    }
    .ai-message .message-bubble {
      background-color: hsl(var(--card));
      border: 1px solid hsl(var(--border));
      border-bottom-left-radius: var(--radius-sm);
    }
    .system-message .message-bubble { /* For system messages if any */
      background-color: hsl(var(--muted));
      color: hsl(var(--muted-foreground));
      text-align: center;
      width: 100%;
      font-size: 0.8rem;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-md);
    }

    .message-bubble .prose { /* For Markdown content */
      color: inherit; /* Inherit color from bubble */
      font-size: inherit;
    }
    .message-bubble .prose p, 
    .message-bubble .prose ul, 
    .message-bubble .prose ol,
    .message-bubble .prose blockquote {
      margin-top: 0.5em;
      margin-bottom: 0.5em;
    }
    .message-bubble .prose a {
      color: hsl(var(--brand-primary)); /* Or a link color */
      text-decoration: underline;
    }
    .dark .user-message .message-bubble .prose a {
      color: hsl(var(--brand-accent)); /* Lighter link on dark primary */
    }


    .message-timestamp {
      font-size: 0.7rem; /* text-xs */
      color: hsl(var(--muted-foreground));
      margin-top: 0.25rem; /* mt-1 */
      padding: 0 0.25rem; /* px-1 */
    }

    .generated-question-card {
      background-color: hsl(var(--background)); /* Slightly different from bubble */
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-lg);
      padding: 0.75rem 1rem; /* py-3 px-4 */
      margin-top: 0.5rem; /* mt-2 */
      box-shadow: var(--shadow-soft);
    }
    .dark .generated-question-card {
      background-color: hsl(var(--muted) / 0.2);
    }
    .generated-question-card p { margin: 0.25rem 0; }
    .generated-question-card .bloom-level-badge {
      font-size: 0.7rem;
      padding: 0.1rem 0.4rem;
      border-radius: var(--radius-sm);
      background-color: hsl(var(--accent) / 0.2);
      color: hsl(var(--accent));
      border: 1px solid hsl(var(--accent) / 0.3);
      font-weight: 500;
    }

    .source-list {
      font-size: 0.75rem; /* text-xs */
      color: hsl(var(--muted-foreground));
      margin-top: 0.5rem; /* mt-2 */
      padding-top: 0.5rem; /* pt-2 */
      border-top: 1px dashed hsl(var(--border));
    }
    .source-list .lucide {
      width: 0.875rem; /* 14px */
      height: 0.875rem;
      margin-right: 0.25rem;
      opacity: 0.7;
    }
  `}</style>
);


const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).format(date);
  };

  // Configure marked
  marked.setOptions({
    gfm: true, // Enable GitHub Flavored Markdown
    breaks: true, // Convert single line breaks to <br>
    smartypants: true, // Use smart quotes and dashes
  });

  const renderAIResponse = (responseData) => {
    if (typeof responseData === 'string') {
      // Sanitize HTML from marked
      const rawMarkup = marked.parse(responseData);
      const cleanMarkup = DOMPurify.sanitize(rawMarkup);
      return <div className="prose" dangerouslySetInnerHTML={{ __html: cleanMarkup }} />;
    }

    if (Array.isArray(responseData)) {
      return (
        <div className="space-y-3 mt-1">
          {responseData.map((q, index) => (
            <div key={index} className="generated-question-card">
              <p className="font-semibold text-sm text-foreground">
                <span className="text-primary">Q{index + 1}: </span>{q.question}
              </p>
              <p className="text-xs text-muted-foreground">
                Bloom's Level: <span className="bloom-level-badge">{q.bloomLevel}</span>
              </p>
              <p className="text-xs text-muted-foreground italic">Justification: {q.justification}</p>
            </div>
          ))}
        </div>
      );
    }
    return <p className="whitespace-pre-wrap">Received complex data. Display not fully implemented for this structure.</p>;
  };

  return (
    <>
      <ChatMessagesStyles />
      <div className="space-y-0"> {/* No extra space between message bubble containers */}
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className={`message-bubble-container ${message.user === 'me' ? 'user-message' : 'ai-message'} animate-fade-in-up`}
            style={{ animationDuration: '0.4s', animationDelay: `${index * 0.05}s` }}
          >
            <Avatar className={`message-avatar ${message.user === 'me' ? 'user-avatar' : 'ai-avatar'}`}>
              <AvatarImage src={message.user === 'me' ? undefined : undefined /* AI avatar URL if any */} />
              <AvatarFallback className={
                message.user === 'me' 
                  ? 'bg-primary text-primary-foreground' 
                  : 'bg-accent text-accent-foreground' // Or use a specific AI avatar color
              }>
                {message.user === 'me' ? <User size={18} /> : <Bot size={18} />}
              </AvatarFallback>
            </Avatar>

            <div className="message-content-wrapper">
              <div className="message-bubble">
                {message.isGenerating ? (
                  <div className="flex items-center space-x-2 text-sm opacity-80">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse delay-0"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse delay-200"></div>
                    <span className="italic">{typeof message.text === 'string' ? message.text : "Thinking..."}</span>
                  </div>
                ) : message.user === 'assistant' ? (
                  renderAIResponse(message.text)
                ) : (
                  <p className="whitespace-pre-wrap">{message.text}</p>
                )}
                
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {/* Attachment rendering can be improved further */}
                    {message.attachments.map(attachment => (
                      <div key={attachment.id} className="flex items-center gap-2 p-2 rounded bg-black/10 dark:bg-white/5 border border-border/50">
                         <div className="h-7 w-7 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground shrink-0">
                          {attachment.type?.split('/')[1]?.substring(0,3).toUpperCase() || 'FILE'}
                        </div>
                        <div className="flex-1 truncate text-sm text-muted-foreground">
                          {attachment.name}
                        </div>
                        {/* <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" asChild>
                          <a href={attachment.url} target="_blank" rel="noopener noreferrer"><DownloadCloud size={16}/></a>
                        </Button> */}
                      </div>
                    ))}
                  </div>
                )}
                {message.user === 'assistant' && message.usedSources && message.usedSources.length > 0 && (
                  <div className="source-list">
                    <p className="font-semibold text-xs flex items-center"><Layers /> Sources Consulted:</p>
                    <ul className="list-disc list-inside pl-1">
                      {message.usedSources.map((source, i) => <li key={i} className="truncate" title={source}>{source}</li>)}
                    </ul>
                  </div>
                )}
              </div>
              
              {message.timestamp && !message.isGenerating && (
                  <p className="message-timestamp">
                  {message.user !== 'me' && <span className="font-medium mr-1">{message.user === 'assistant' ? 'AI Assistant' : 'System'}:</span>}
                  {formatTime(message.timestamp)}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </>
  );
};

export default ChatMessages;