// src/components/ChatInput.tsx
import React, { useState, useRef, KeyboardEvent, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { SendHorizonal, Loader2, Mic, Paperclip } from "lucide-react"; // Added Mic, Paperclip for potential future use
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-hot-toast";

// Component-specific styles for ChatInput
const ChatInputStyles = () => (
  <style>{`
    .chat-input-form-advanced { /* New class to avoid conflict if old one is used elsewhere */
      display: flex;
      align-items: flex-end; 
      gap: 0.5rem; /* md:gap-3 from ChatPage, keep consistent or override */
      position: relative; /* For potential character counter */
    }
    .chat-textarea-wrapper {
      flex-grow: 1;
      position: relative; /* For character counter positioning */
    }
    .chat-textarea-advanced {
      flex-grow: 1;
      background-color: hsl(var(--input));
      border: 1.5px solid hsl(var(--border)); /* Slightly thicker border */
      border-radius: var(--radius-lg); /* Consistent with send button */
      padding: 0.75rem 1rem; /* py-3 px-4 */
      padding-right: 2.5rem; /* Space for potential clear button or mic inside textarea */
      color: hsl(var(--foreground));
      font-size: 0.95rem; /* text-base slightly smaller */
      min-height: 46px; /* Adjusted to match button height */
      max-height: 200px; /* Increased max height */
      resize: none; 
      line-height: 1.6;
      transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
      overflow-y: auto; /* Ensure scrollbar appears if max-height is reached */
    }
    .chat-textarea-advanced::placeholder {
      color: hsl(var(--muted-foreground) / 0.6);
    }
    .chat-textarea-advanced:focus {
      border-color: hsl(var(--primary));
      background-color: hsl(var(--background)); /* Slightly change bg on focus */
      box-shadow: 0 0 0 3px hsl(var(--primary) / 0.15), 0 2px 8px hsl(var(--primary) / 0.1);
      outline: none;
    }
    .chat-textarea-advanced:disabled {
      background-color: hsl(var(--muted) / 0.3);
      cursor: not-allowed;
      opacity: 0.7;
    }

    /* Character counter (optional) */
    .char-counter {
      position: absolute;
      bottom: 8px;
      right: 8px;
      font-size: 0.7rem;
      color: hsl(var(--muted-foreground) / 0.8);
    }
    .char-counter.limit-exceeded {
      color: hsl(var(--destructive));
      font-weight: 500;
    }


    .chat-send-button-advanced {
      height: 46px; 
      width: 46px; 
      border-radius: var(--radius-lg);
      background-image: linear-gradient(to right, hsl(var(--primary)/0.9), hsl(var(--tertiary, var(--primary-dark))/0.9) );
      color: hsl(var(--primary-foreground));
      box-shadow: var(--shadow-sm); /* Softer default shadow */
      transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      flex-shrink: 0;
      display: flex; /* Ensure icon is centered */
      align-items: center;
      justify-content: center;
    }
    .chat-send-button-advanced:hover:not(:disabled) {
      opacity: 1;
      background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--tertiary, var(--primary-dark))) );
      box-shadow: 0 0 18px hsl(var(--primary) / 0.35), 0 4px 8px hsl(var(--primary)/0.15);
      transform: scale(1.08) translateY(-1px);
    }
    .chat-send-button-advanced:active:not(:disabled) {
      transform: scale(1.02) translateY(0px);
      box-shadow: 0 0 10px hsl(var(--primary) / 0.25), 0 2px 4px hsl(var(--primary)/0.1);
    }
    .chat-send-button-advanced:disabled {
      background-image: none;
      background-color: hsl(var(--muted));
      cursor: not-allowed;
      opacity: 0.5;
      box-shadow: none;
    }
    .chat-send-button-advanced .lucide {
      transition: transform 0.2s ease-out, opacity 0.2s ease;
    }
    .chat-send-button-advanced:hover:not(:disabled) .lucide-send-horizonal { /* Target specific icon for specific animation */
      transform: translateX(2px) translateY(-2px) scale(1.05) rotate(5deg);
    }
    /* Style for Loader2 if needed */
    .chat-send-button-advanced .lucide-loader-2 {
        /* color: hsl(var(--primary-foreground) / 0.8); */
    }
  `}</style>
);

interface ChatInputProps {
  onSendMessage: (text: string) => void;
  isGenerating?: boolean; // Prop to indicate if AI is working
  maxLength?: number; // Optional max length for input
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  onSendMessage, 
  isGenerating = false, 
  maxLength = 2000 
}) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      const maxHeight = parseInt(getComputedStyle(textareaRef.current).maxHeight, 10) || 200;
      if (scrollHeight > maxHeight) {
        textareaRef.current.style.height = `${maxHeight}px`;
        textareaRef.current.style.overflowY = 'auto'; // Show scrollbar if content exceeds max height
      } else {
        textareaRef.current.style.height = `${scrollHeight}px`;
        textareaRef.current.style.overflowY = 'hidden'; // Hide scrollbar if content is less than max height
      }
    }
  };

  useEffect(() => { // Adjust height on initial mount if there's a default message (though unlikely here)
    adjustTextareaHeight();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let value = e.target.value;
    if (maxLength && value.length > maxLength) {
      value = value.slice(0, maxLength);
      // Optionally, provide feedback about limit reached
      toast.error(`Message limit of ${maxLength} characters reached.`, { duration: 2000 });
    }
    setMessage(value);
    adjustTextareaHeight();
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim() && !isGenerating) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto'; // Reset height after sending
        textareaRef.current.focus(); // Re-focus after sending
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isGenerating) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const charsLeft = maxLength - message.length;

  return (
    <>
      <ChatInputStyles />
      <form onSubmit={handleSubmit} className="chat-input-form-advanced flex-grow"> {/* Added flex-grow here */}
        <div className="chat-textarea-wrapper"> {/* Wrapper for textarea and counter */}
            <Textarea
            ref={textareaRef}
            placeholder="Ask EduCraft AI anything about your lesson, materials, or pedagogy... (Shift+Enter for newline)"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            disabled={isGenerating}
            className="chat-textarea-advanced"
            rows={1}
            aria-label="Chat message input"
            />
            {maxLength && (
            <div className={`char-counter ${charsLeft < 0 ? 'limit-exceeded' : ''}`}>
                {charsLeft < 20 && charsLeft >=0 ? `${charsLeft}` : ""}
                {charsLeft < 0 ? `-${Math.abs(charsLeft)}` : ""}
            </div>
            )}
        </div>
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isGenerating}
          className="chat-send-button-advanced"
          aria-label="Send message"
        >
          {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
        </Button>
        {/* Conceptual: Voice Input Button */}
        {/* <Button type="button" size="icon" variant="ghost" className="h-12 w-12 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10" aria-label="Voice input">
          <Mic className="h-5 w-5" />
        </Button> */}
      </form>
    </>
  );
};

export default ChatInput;