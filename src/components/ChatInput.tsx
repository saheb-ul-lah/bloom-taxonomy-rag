// src/components/ChatInput.tsx
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
interface ChatInputProps {
  onSendMessage: (text: string) => void;
}
const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage
}) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setIsSending(true);

      // Simulate sending delay for animation
      setTimeout(() => {
        onSendMessage(message);
        setMessage('');
        setIsSending(false);
      }, 300);
    }
  };
  return <form onSubmit={handleSubmit} className="flex-1 flex gap-2">
      <input type="text" placeholder="Type a message..." value={message} onChange={e => setMessage(e.target.value)} disabled={isSending} className="flex-1 border border-gray-700 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-theme-primary bg-gray-800 text-white transition-all duration-300 text-base rounded-xl" />
      <Button type="submit" disabled={!message.trim() || isSending} className={`bg-theme-primary hover:bg-theme-tertiary transition-all duration-300 ${message.trim() && !isSending ? 'animate-pulse-scale' : ''} rounded-md px-4`}>
        <Send className={`h-5 w-5 ${isSending ? 'animate-pulse opacity-50' : ''}`} />
        <span className="sr-only">Send</span>
      </Button>
    </form>;
};
export default ChatInput;