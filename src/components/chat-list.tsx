
"use client";

import { Search, Camera, Plus, Pin, VolumeX } from "lucide-react";
import { chats } from "@/data/mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ChatList() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // You can show a skeleton loader here
    return null;
  }

  return (
    <div className="flex h-full flex-col">
       <header className="sticky top-0 z-10 border-b bg-background p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Chats</h1>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon">
              <Camera className="h-6 w-6" />
            </Button>
            <Button variant="ghost" size="icon">
              <Plus className="h-6 w-6" />
            </Button>
          </div>
        </div>
        <div className="relative mt-4">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={20}
          />
          <Input placeholder="Search" className="pl-10" />
        </div>
      </header>
      <ScrollArea className="flex-1">
        <nav className="grid gap-px">
          {chats.map((chat) => {
            const otherUser = chat.users.find((u) => u.id !== "user1")!;
            return (
              <Link href={`/chat/${chat.id}`} key={chat.id}>
                <div
                  className={cn(
                    "flex w-full items-center gap-3 p-3 transition-colors hover:bg-muted"
                  )}
                >
                  <Avatar className="h-12 w-12 flex-shrink-0">
                    <AvatarImage src={otherUser.avatar} alt={otherUser.name} data-ai-hint="avatar" />
                    <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 overflow-hidden">
                    <div className="flex items-baseline justify-between">
                      <p className="truncate font-semibold">{otherUser.name}</p>
                      <p className={cn(
                          "text-xs",
                          chat.unreadCount > 0 ? "font-bold text-accent" : "text-muted-foreground"
                      )}>
                        {chat.lastMessageTimestamp}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                        <p className="truncate text-sm text-muted-foreground">
                            {chat.lastMessage}
                        </p>
                        <div className="flex items-center gap-2">
                            {chat.pinned && <Pin className="h-4 w-4 text-muted-foreground" />}
                            {chat.muted && <VolumeX className="h-4 w-4 text-muted-foreground" />}
                            {chat.unreadCount > 0 && (
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                                    {chat.unreadCount}
                                </span>
                            )}
                        </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
