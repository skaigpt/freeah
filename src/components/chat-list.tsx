"use client";

import { Search, LogOut, Settings } from "lucide-react";
import { chats, loggedInUser } from "@/data/mock";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

export function ChatList() {
  return (
    <div className="flex h-full flex-col">
      <div className="sticky top-0 z-10 border-b bg-sidebar p-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
                 <Avatar>
                    <AvatarImage src={loggedInUser.avatar} alt={loggedInUser.name} data-ai-hint="avatar" />
                    <AvatarFallback>{loggedInUser.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h2 className="text-lg font-semibold">{loggedInUser.name}</h2>
            </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/" className="w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative mt-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
          <Input placeholder="Search chats..." className="pl-10" />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="grid gap-1 p-2">
          {chats.map((chat, index) => {
            const otherUser = chat.users.find((u) => u.id !== loggedInUser.id)!;
            return (
              <button
                key={chat.id}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all hover:bg-sidebar-accent",
                  index === 0 && "bg-sidebar-accent"
                )}
              >
                <Avatar className="relative">
                  <AvatarImage src={otherUser.avatar} alt={otherUser.name} data-ai-hint="avatar" />
                  <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                  {otherUser.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />}
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-baseline justify-between">
                    <p className="font-semibold">{otherUser.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {chat.lastMessageTimestamp}
                    </p>
                  </div>
                  <p className="truncate text-sm text-muted-foreground">
                    {chat.lastMessage}
                  </p>
                </div>
              </button>
            );
          })}
        </nav>
      </ScrollArea>
    </div>
  );
}
