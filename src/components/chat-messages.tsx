
"use client";

import { useRef, useEffect } from "react";
import { Lock } from "lucide-react";
import type { Message, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatMessagesProps {
  messages: Message[];
  currentUser: User;
  otherUser: User;
}

export function ChatMessages({ messages, currentUser, otherUser }: ChatMessagesProps) {
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            const viewport = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (viewport) {
                viewport.scrollTo({
                    top: viewport.scrollHeight,
                    behavior: 'smooth',
                });
            }
        }
    }, [messages]);

  return (
    <div className="relative flex-1 bg-muted/40">
      <ScrollArea className="absolute inset-0" ref={scrollAreaRef}>
        <div className="p-4">
            <div className="mb-4 flex justify-center">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                    <Lock size={12} />
                    Messages are end-to-end encrypted.
                </div>
            </div>
          <div className="grid gap-4">
            {messages.map((message, index) => {
              const isCurrentUser = message.senderId === currentUser.id;
              const showAvatar = !isCurrentUser && (index === 0 || messages[index - 1].senderId !== message.senderId);

              return (
                <div
                  key={message.id}
                  className={cn(
                    "flex items-end gap-2",
                    isCurrentUser ? "justify-end" : "justify-start"
                  )}
                >
                  {!isCurrentUser && (
                    <Avatar className={cn("h-8 w-8", showAvatar ? 'opacity-100' : 'opacity-0')}>
                      {showAvatar && (
                        <>
                            <AvatarImage src={otherUser.avatar} alt={otherUser.name} data-ai-hint="avatar"/>
                            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                        </>
                      )}
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "max-w-xs rounded-lg p-3 lg:max-w-md",
                      isCurrentUser
                        ? "rounded-br-none bg-primary text-primary-foreground"
                        : "rounded-bl-none bg-card"
                    )}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p
                      className={cn(
                        "mt-1 text-right text-xs",
                        isCurrentUser ? "text-primary-foreground/70" : "text-muted-foreground"
                      )}
                    >
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
