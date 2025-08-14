"use client";

import { useState, useEffect } from "react";
import { Send, Smile, Paperclip } from "lucide-react";
import { getSmartReplySuggestions } from "@/ai/flows/smart-reply-suggestions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import type { Message } from "@/lib/types";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  messages: Message[];
}

export function ChatInput({ onSendMessage, messages }: ChatInputProps) {
  const [text, setText] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (messages.length === 0) return;
      setIsLoadingSuggestions(true);
      try {
        const conversationHistory = messages
          .map((m) => `${m.senderId === 'user1' ? 'User' : 'Assistant'}: ${m.text}`)
          .join("\n");
        const result = await getSmartReplySuggestions({ conversationHistory });
        setSuggestions(result.suggestions);
      } catch (error) {
        console.error("Failed to get smart replies:", error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    fetchSuggestions();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onSendMessage(text);
      setText("");
    }
  };
  
  const handleSuggestionClick = (suggestion: string) => {
    onSendMessage(suggestion);
  }

  return (
    <div className="border-t bg-card p-4">
      <div className="mb-2 flex gap-2">
        {isLoadingSuggestions ? (
          <>
            <Skeleton className="h-9 w-24 rounded-full" />
            <Skeleton className="h-9 w-32 rounded-full" />
            <Skeleton className="h-9 w-28 rounded-full" />
          </>
        ) : (
          suggestions.map((s, i) => (
            <Button key={i} variant="outline" size="sm" className="rounded-full" onClick={() => handleSuggestionClick(s)}>
              {s}
            </Button>
          ))
        )}
      </div>
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="min-h-[48px] resize-none rounded-2xl pr-28"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
           <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
            <Smile className="h-5 w-5 text-muted-foreground" />
          </Button>
           <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button type="submit" size="icon" className="h-8 w-8 rounded-full bg-primary">
            <Send className="h-4 w-4 text-primary-foreground" />
          </Button>
        </div>
      </form>
    </div>
  );
}
