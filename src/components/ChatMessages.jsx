// src/components/ChatMessages.jsx
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { 
    Bot, User, Layers, CheckCircle, Edit2, Save, ThumbsUp, ThumbsDown, Copy, 
    BookCopy, FileCode2, AlertTriangle // Added AlertTriangle for error display
} from "lucide-react"; // Removed DownloadCloud, ExternalLink as they weren't used recently
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';
import { toast } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// --- Placeholder components for structured content ---
// You need to build these out with proper rendering logic
const TableDisplay = ({ data }) => {
  if (!data || !Array.isArray(data.headers) || !Array.isArray(data.rows)) {
    return <p className="text-xs text-destructive italic">[AI Table data malformed]</p>;
  }
  if (data.headers.length === 0 && data.rows.length === 0) {
    return <p className="text-xs text-muted-foreground italic">[AI provided an empty table]</p>;
  }
  return (
    <div className="my-2 overflow-x-auto rounded-md border border-border bg-background/50 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-muted/20 dark:bg-muted/10">
          <tr>
            {data.headers.map((header, i) => (
              <th key={i} className="p-2 px-3 text-left font-semibold text-foreground tracking-wide">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i} className="border-t border-border hover:bg-muted/10 transition-colors">
              {row.map((cell, j) => (
                <td key={j} className="p-2 px-3 text-muted-foreground align-top">
                  {/* Basic cell rendering, can be enhanced for markdown/katex if cells contain them */}
                  {typeof cell === 'string' ? cell : JSON.stringify(cell)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ActivityCardDisplay = ({ activity }) => {
  if (!activity || typeof activity !== 'object') {
    return <p className="text-xs text-destructive italic">[AI Activity data malformed]</p>;
  }
  return (
    <div className="my-2 p-3 border border-accent/40 dark:border-accent/60 rounded-lg bg-accent/10 shadow-sm">
      <h5 className="font-semibold text-accent dark:text-accent-light mb-1">{activity.title || "Suggested Activity"}</h5>
      {activity.description && <p className="text-xs text-muted-foreground mb-1">{activity.description}</p>}
      {activity.pedagogicalRationale && <p className="text-xs text-muted-foreground mb-1"><em>Rationale:</em> {activity.pedagogicalRationale}</p>}
      {Array.isArray(activity.materialsNeeded) && activity.materialsNeeded.length > 0 && (
        <div className="mt-1">
          <strong className="text-xs text-foreground">Materials:</strong>
          <ul className="list-disc list-inside pl-1 text-xs text-muted-foreground">
            {activity.materialsNeeded.map((mat, i) => <li key={i}>{mat}</li>)}
          </ul>
        </div>
      )}
      {/* Add more fields like estimatedTime, udlConnections, frameworkTags as needed */}
      <Button size="xs" variant="outline" className="mt-2 border-accent/70 text-accent hover:bg-accent/20 h-7 px-2 text-xs">
        View/Save Activity
      </Button>
    </div>
  );
};

// --- KaTeX Rendering Logic ---
const renderWithKaTeX = (text) => {
  if (typeof text !== 'string' || !text) return "";

  try {
    // Process block equations first ($$...$$)
    let processedText = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false, trust: true });
      } catch (e) {
        console.error("KaTeX block rendering error:", e.message, "Latex:", latex);
        return `<span class="text-destructive font-mono p-1 bg-destructive/10 rounded" title="KaTeX Error: ${e.message}">[Block KaTeX Error]</span>`;
      }
    });

    // Process inline equations ($...$)
    processedText = processedText.replace(/(?<!\$)\$([\s\S]*?)\$(?!\$)/g, (match, latex) => {
      if (match.includes("<span class=\"katex\">")) return match; // Avoid re-processing
      try {
        return katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false, trust: true });
      } catch (e) {
        console.error("KaTeX inline rendering error:", e.message, "Latex:", latex);
        return `<span class="text-destructive font-mono p-0.5 bg-destructive/10 rounded" title="KaTeX Error: ${e.message}">[Inline KaTeX Error]</span>`;
      }
    });
    return processedText;
  } catch (error) {
    console.error("Overall KaTeX processing error:", error);
    return text; // Fallback to original text if regex or outer processing fails
  }
};

// Component-specific styles for ChatMessages
const ChatMessagesStyles = () => (
  <style>{`
    .message-bubble-container { display: flex; gap: 0.75rem; max-width: 90%; margin-bottom: 1.5rem; }
    .message-bubble-container.user-message { margin-left: auto; flex-direction: row-reverse; }
    .message-avatar { width: 36px; height: 36px; flex-shrink: 0; border: 2px solid transparent; border-radius: 50%; }
    .message-avatar.user-avatar { border-color: hsl(var(--primary) / 0.5); }
    .message-avatar.ai-avatar { border-color: hsl(var(--accent) / 0.5); }
    .message-content-wrapper { display: flex; flex-direction: column; max-width: calc(100% - 48px); }
    .user-message .message-content-wrapper { align-items: flex-end; }
    .ai-message .message-content-wrapper { align-items: flex-start; }

    .message-bubble {
      padding: 0.75rem 1rem; border-radius: var(--radius-xl); box-shadow: var(--shadow-soft);
      word-break: break-word; line-height: 1.6; color: hsl(var(--foreground)); font-size: 0.95rem;
      position: relative; /* For copy button */
    }
    .user-message .message-bubble { background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-bottom-right-radius: var(--radius-sm); }
    .ai-message .message-bubble { background-color: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-bottom-left-radius: var(--radius-sm); }
    
    .message-bubble .prose { color: inherit; font-size: inherit; max-width: none; }
    .message-bubble .prose p, .message-bubble .prose ul, .message-bubble .prose ol, .message-bubble .prose blockquote, .message-bubble .prose pre, .message-bubble .prose table { margin-top: 0.6em; margin-bottom: 0.6em; }
    .message-bubble .prose h1, .message-bubble .prose h2, .message-bubble .prose h3 { margin-top: 1em; margin-bottom: 0.5em; font-family: var(--font-heading); font-weight:600; color: inherit; border-bottom: 1px solid hsl(var(--border)/0.5); padding-bottom: 0.2em;}
    .message-bubble .prose code { background-color: hsl(var(--muted)/0.7); padding: 0.15em 0.4em; border-radius: var(--radius-sm); font-size: 0.85em; color: hsl(var(--accent-foreground));}
    .dark .message-bubble .prose code { background-color: hsl(var(--muted)/0.2); }
    .message-bubble .prose pre { background-color: hsl(var(--muted)/0.5); padding: 0.75rem; border-radius: var(--radius-md); overflow-x: auto; }
    .dark .message-bubble .prose pre { background-color: hsl(var(--muted)/0.15); }
    .message-bubble .prose pre code { background-color: transparent; padding: 0; font-size: 0.85em;}
    .message-bubble .prose a { color: hsl(var(--brand-primary)); text-decoration: underline; }
    .dark .user-message .message-bubble .prose a { color: hsl(var(--brand-accent)); } /* Link color inside user bubble on dark theme */
    .message-bubble .prose table { width: 100%; border-collapse: collapse; }
    .message-bubble .prose th, .message-bubble .prose td { border: 1px solid hsl(var(--border)); padding: 0.3rem 0.5rem; }
    .message-bubble .prose th { background-color: hsl(var(--muted)/0.3); font-weight: 600; }
    
    .message-bubble .katex-display { margin: 0.75em 0; overflow-x: auto; overflow-y: hidden; text-align: center; padding: 0.25rem 0;}
    .message-bubble .katex { font-size: 1.05em; }
    .user-message .message-bubble .katex { color: hsl(var(--primary-foreground)) !important; }
    .ai-message .message-bubble .katex { color: hsl(var(--foreground)) !important; }

    .message-timestamp { font-size: 0.7rem; color: hsl(var(--muted-foreground)); margin-top: 0.25rem; padding: 0 0.25rem; }
    .generated-question-card {
        background-color: hsl(var(--background)); border: 1px solid hsl(var(--border)); border-radius: var(--radius-lg);
        padding: 0.75rem 1rem; margin-top: 0.75rem; box-shadow: var(--shadow-soft);
    }
    .dark .generated-question-card { background-color: hsl(var(--muted) / 0.1); }
    .generated-question-card p { margin: 0.25rem 0; }
    .generated-question-card .bloom-level-badge { 
        font-size: 0.7rem; padding: 0.1rem 0.4rem; border-radius: var(--radius-sm);
        background-color: hsl(var(--accent) / 0.2); color: hsl(var(--accent));
        border: 1px solid hsl(var(--accent) / 0.3); font-weight: 500; display: inline-block;
    }

    .source-attribution-list { font-size: 0.75rem; color: hsl(var(--muted-foreground)); margin-top: 0.75rem; padding-top: 0.75rem; border-top: 1px dashed hsl(var(--border)); }
    .source-attribution-list .list-title { font-semibold text-xs flex items-center; color: hsl(var(--foreground)); }
    .source-attribution-list .lucide-layers { width: 1em; height: 1em; margin-right: 0.3rem; opacity: 0.8; color: hsl(var(--primary)); }
    .source-item { display: flex; align-items: center; gap: 0.3rem; padding: 0.1rem 0; }
    .source-item .lucide { width: 0.8em; height: 0.8em; opacity: 0.7; }

    .message-actions-toolbar {
      display: flex; gap: 0.25rem; position: absolute; top: 0.25rem; right: 0.25rem;
      opacity: 0; transition: opacity 0.2s ease-in-out;
      background-color: hsl(var(--popover) / 0.8); backdrop-filter: blur(2px);
      padding: 0.125rem; border-radius: var(--radius-md); box-shadow: var(--shadow-md); border: 1px solid hsl(var(--border));
    }
    .ai-message .message-bubble:hover .message-actions-toolbar, .user-message .message-bubble:hover .message-actions-toolbar { opacity: 1; }
    .message-action-btn { color: hsl(var(--muted-foreground)); padding: 0.25rem; height: 24px; width: 24px; } /* Smaller buttons */
    .message-action-btn:hover { color: hsl(var(--primary)); background-color: hsl(var(--primary)/0.1); }
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
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
  };

  marked.setOptions({
    gfm: true,
    breaks: true,
    smartypants: true,
    mangle: false, // Important for security with sanitize
    headerIds: false // Disable auto-generating header IDs
  });

  const renderMessageContent = (message) => {
    // console.log("ChatMessages: Rendering message object:", JSON.parse(JSON.stringify(message))); // For deep debugging

    if (message.isGenerating) {
      return ( 
        <div className="flex items-center space-x-2 text-sm opacity-80">
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse delay-0"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse delay-100"></div>
            <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse delay-200"></div>
            <span className="italic">{typeof message.text === 'string' ? message.text : "Thinking..."}</span>
        </div>
      );
    }

    // Primary content is structuredOutput for AI messages if available
    if (message.user === 'assistant' && message.structuredContent) {
      const sc = message.structuredContent;
      if (sc.type === 'table' && sc.data) {
        return <TableDisplay data={sc.data} />;
      }
      if (sc.type === 'activity_suggestion_list' && Array.isArray(sc.data)) { // Assuming data is an array of activities
        return (
            <div className="space-y-2">
                {sc.data.map((activity, idx) => <ActivityCardDisplay key={idx} activity={activity} />)}
            </div>
        );
      }
      if (sc.type === 'question_list' && Array.isArray(sc.data)) {
        return (
            <div className="space-y-2"> {/* Removed mt-1, handled by prose margin or card margin */}
            {sc.data.map((q, index) => (
                <div key={index} className="generated-question-card">
                <div className="font-semibold text-sm text-foreground prose dark:prose-invert max-w-none"> {/* Apply prose for potential markdown in questionText */}
                    <span className="text-primary !no-underline">Q{index + 1}: </span> {/* Ensure Q number is not underlined by prose */}
                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parseInline(renderWithKaTeX(q.questionText || q.question || ""))) }} />
                </div>
                {q.options && q.options.length > 0 && (
                    <ul className="list-disc list-inside pl-4 my-1 text-sm text-muted-foreground">
                        {q.options.map((opt, i) => <li key={i} className={i === q.correctAnswerIndex ? 'font-semibold text-green-600 dark:text-green-400' : ''}>{opt}</li>)}
                    </ul>
                )}
                {q.bloomLevel && <p className="text-xs text-muted-foreground mt-0.5">Bloom's: <span className="bloom-level-badge">{q.bloomLevel}</span></p>}
                {q.dokLevel && <p className="text-xs text-muted-foreground mt-0.5">DOK: <span className="bloom-level-badge !bg-sky-500/20 !text-sky-600 dark:!text-sky-400 !border-sky-500/30">{q.dokLevel}</span></p>}
                {q.justification && <p className="text-xs text-muted-foreground italic mt-0.5">Justification: {q.justification}</p>}
                </div>
            ))}
            </div>
        );
      }
      if (sc.type === 'simple_text' && sc.data?.text) {
        const textWithKatex = renderWithKaTeX(sc.data.text);
        const rawMarkup = marked.parse(textWithKatex);
        const cleanMarkup = DOMPurify.sanitize(rawMarkup, { USE_PROFILES: { html: true } });
        return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: cleanMarkup }} />;
      }
      // If structuredContent exists but no specific handler, display summaryText if available
      if (typeof message.summaryText === 'string' && message.summaryText.trim() !== "") {
        const textWithKatex = renderWithKaTeX(message.summaryText);
        const rawMarkup = marked.parse(textWithKatex);
        const cleanMarkup = DOMPurify.sanitize(rawMarkup, { USE_PROFILES: { html: true } });
        return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: cleanMarkup }} />;
      }
      // Fallback for unhandled structuredContent
      return <pre className="text-xs bg-muted/20 p-2 rounded overflow-x-auto whitespace-pre-wrap">Structured (type: {sc.type}): {JSON.stringify(sc.data, null, 2)}</pre>;
    }

    // Fallback to message.text (for user messages or AI messages without handled structuredContent)
    let textToRender = "";
    if (typeof message.text === 'string' && message.text.trim() !== "") {
      textToRender = message.text;
    } else if (message.user === 'assistant' && typeof message.summaryText === 'string' && message.summaryText.trim() !== "") {
      // This case should ideally be caught by structuredContent simple_text or summaryText rendering above
      textToRender = message.summaryText;
    } else {
      console.warn("Message has no primary text or handled structured content:", JSON.parse(JSON.stringify(message)));
      return <p className="italic text-muted-foreground flex items-center gap-1"><AlertTriangle size={14} className="text-orange-500" /> [AI response content is missing or in an unhandled format]</p>;
    }
    
    const textWithKatex = renderWithKaTeX(textToRender);
    const rawMarkup = marked.parse(textWithKatex);
    // IMPORTANT: Allow more tags for KaTeX if needed, e.g., for specific math environments.
    // Default USE_PROFILES: { html: true } is generally safe for marked + basic KaTeX.
    const cleanMarkup = DOMPurify.sanitize(rawMarkup, { USE_PROFILES: { html: true }, ADD_TAGS: ['math', 'mtable', 'mtr', 'mtd', 'mrow', 'mi', 'mo', 'mn', 'mtext', 'msup', 'msub', 'mfrac', 'msqrt', 'mover', 'munder', 'munderover', 'mstyle', 'semantics', 'annotation', 'svg', 'path', 'g', 'use', 'foreignobject'], ADD_ATTR: ['encoding', 'src', 'alt', 'width', 'height', 'xlink:href', 'xmlns:xlink', 'xmlns', 'viewBox', 'style', 'transform', 'd'] });

    return <div className="prose dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: cleanMarkup }} />;
  };

  const handleCopyToClipboard = (message) => {
    let textToCopy = "";
    if (message.structuredContent) {
        // Prioritize copying a textual representation of structured content
        if (message.structuredContent.type === 'question_list' && Array.isArray(message.structuredContent.data)) {
            textToCopy = message.structuredContent.data.map(q => 
                `Q: ${q.questionText}\nBloom: ${q.bloomLevel || 'N/A'}\nDOK: ${q.dokLevel || 'N/A'}\nJustification: ${q.justification || 'N/A'}`
            ).join('\n\n');
        } else if (message.structuredContent.type === 'simple_text' && message.structuredContent.data?.text) {
            textToCopy = message.structuredContent.data.text;
        } else {
            // Fallback to stringifying the structured data
            try { textToCopy = JSON.stringify(message.structuredContent, null, 2); } catch (e) { /* ignore */ }
        }
    }
    // If no structured content or it couldn't be stringified well, use summaryText or text
    if (!textToCopy && typeof message.summaryText === 'string') {
        textToCopy = message.summaryText;
    }
    if (!textToCopy && typeof message.text === 'string') {
        textToCopy = message.text;
    }

    if (!textToCopy) {
        toast.error("Nothing to copy for this message.", {icon: <AlertTriangle size={16}/>});
        return;
    }

    navigator.clipboard.writeText(textToCopy)
      .then(() => toast.success("Content copied to clipboard!", {icon: <Copy size={16}/>}))
      .catch(err => toast.error("Failed to copy content."));
  };

  return (
    <>
      <ChatMessagesStyles />
      <div className="space-y-0"> {/* Container for all messages */}
        {(messages || []).map((message, index) => ( // Ensure messages is an array
          <div 
            key={message.id || `msg-fallback-${index}`} 
            className={`message-bubble-container ${message.user === 'me' ? 'user-message' : 'ai-message'} animate-fade-in-up`}
            style={{ animationDuration: '0.3s', animationDelay: `${Math.min(index * 0.07, 0.7)}s` }} // Faster, capped delay
          >
            <Avatar className={`message-avatar ${message.user === 'me' ? 'user-avatar' : 'ai-avatar'}`}>
              <AvatarImage src={message.user === 'me' ? undefined /* user avatar URL if available */ : undefined /* AI avatar URL */} />
              <AvatarFallback className={`${message.user === 'me' ? 'bg-primary text-primary-foreground' : 'bg-accent text-accent-foreground'}`}>
                {message.user === 'me' ? <User size={18} /> : <Bot size={18} />}
              </AvatarFallback>
            </Avatar>

            <div className="message-content-wrapper">
              <div className="message-bubble group">
                {!message.isGenerating && (message.text || message.structuredContent) && ( // Only show toolbar if there's content
                  <div className="message-actions-toolbar">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="message-action-btn" onClick={() => handleCopyToClipboard(message)}>
                          <Copy size={14} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top"><p>Copy Content</p></TooltipContent>
                    </Tooltip>
                    {/* Add more actions here later */}
                  </div>
                )}
                {renderMessageContent(message)}
                
                {message.user === 'assistant' && Array.isArray(message.usedSources) && message.usedSources.length > 0 && (
                  <div className="source-attribution-list">
                    <p className="list-title"><Layers /> Sources Consulted:</p>
                    <ul className="mt-1 space-y-0.5">
                      {message.usedSources.map((source, i) => (
                        <li key={source.id || i} className="source-item" title={source.name}>
                          {source.type === 'document' ? <FileCode2 className="text-blue-500" /> : <BookCopy className="text-green-500" />}
                          <span className="truncate">{source.name || `Source ${i+1}`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              {message.timestamp && !message.isGenerating && (
                  <p className="message-timestamp">
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