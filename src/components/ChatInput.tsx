import React, { useState, useRef, KeyboardEvent } from 'react';
import { Button } from "@/components/ui/button";
import { SendHorizonal, CornerDownLeft, Loader2 } from "lucide-react"; // Updated icon
import { Textarea } from "@/components/ui/textarea"; // Using Textarea for multiline

// Component-specific styles for ChatInput
const ChatInputStyles = () => (
  <style>{`
    .chat-input-form {
      display: flex;
      align-items: flex-end; /* Align button to bottom if textarea grows */
      gap: 0.75rem; /* gap-3 */
      width:100%;
    }
    .chat-textarea {
      flex-grow: 1;
      background-color: hsl(var(--input));
      border: 1px solid hsl(var(--border));
      border-radius: var(--radius-xl); /* More rounded */
      padding: 0.75rem 1rem; /* py-3 px-4 */
      color: hsl(var(--foreground));
      font-size: 1rem; /* text-base */
      min-height: 48px; /* Approx 3 lines */
      max-height: 150px; /* Limit growth */
      resize: none; /* Disable manual resize */
      line-height: 1.5;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }
    .chat-textarea::placeholder {
      color: hsl(var(--muted-foreground) / 0.7);
    }
    .chat-textarea:focus {
      border-color: hsl(var(--primary));
      box-shadow: 0 0 0 3px hsl(var(--primary) / 0.2), 0 0 10px hsl(var(--primary) / 0.1); /* Focus glow */
      outline: none;
    }
    .send-button {
      height: 48px; /* Match min-height of textarea */
      width: 48px; /* Square button */
      border-radius: var(--radius-lg); /* Consistent rounding */
      background-image: linear-gradient(to right, hsl(var(--primary)), hsl(var(--tertiary, var(--primary-dark))));
      color: hsl(var(--primary-foreground));
      box-shadow: var(--shadow-soft);
      transition: all 0.3s ease;
      flex-shrink: 0; /* Prevent button from shrinking */
    }
    .send-button:hover:not(:disabled) {
      opacity: 0.9;
      box-shadow: 0 0 15px hsl(var(--primary) / 0.4);
      transform: scale(1.05);
    }
    .send-button:disabled {
      background-image: none;
      background-color: hsl(var(--muted));
      cursor: not-allowed;
      opacity: 0.6;
    }
    .send-button .lucide {
      transition: transform 0.2s ease-out;
    }
    .send-button:hover:not(:disabled) .lucide {
      transform: translateX(1px) translateY(-1px) scale(1.1);
    }
  `}</style>
);


interface ChatInputProps {
  onSendMessage: (text: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false); // conceptual, actual loading handled by parent
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    adjustTextareaHeight();
  };
  
  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (message.trim()) {
      // setIsSending(true); // Parent will handle actual loading state
      onSendMessage(message);
      setMessage('');
      // setTimeout(() => setIsSending(false), 300); // Parent handles this
      if (textareaRef.current) { // Reset height after sending
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // Prevent newline
      handleSubmit();
    }
  };

  return (
    <>
      <ChatInputStyles />
      <form onSubmit={handleSubmit} className="chat-input-form">
        <Textarea
          ref={textareaRef}
          placeholder="Ask about topics, Bloom's levels, or specific content... (Shift+Enter for newline)"
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isSending} // Or a prop from parent like `isGenerating`
          className="chat-textarea "
          rows={1} // Start with 1 row, will auto-grow
        />
        <Button
          type="submit"
          size="icon"
          disabled={!message.trim() || isSending} // Or `isGenerating`
          className="send-button"
          aria-label="Send message"
        >
          {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <SendHorizonal className="h-5 w-5" />}
        </Button>
      </form>
    </>
  );
};

export default ChatInput;