"use client";

import { useState } from "react";
import { Phone, Video, MoreVertical } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import type { Chat } from "@/lib/types";
import { loggedInUser } from "@/data/mock";
import { CallModal } from "./call-modal";

interface ChatTopbarProps {
  chat: Chat;
}

export function ChatTopbar({ chat }: ChatTopbarProps) {
  const otherUser = chat.users.find((u) => u.id !== loggedInUser.id)!;
  const [isCallModalOpen, setIsCallModalOpen] = useState(false);
  const [callType, setCallType] = useState<"voice" | "video">("voice");

  const openCallModal = (type: "voice" | "video") => {
    setCallType(type);
    setIsCallModalOpen(true);
  };

  return (
    <>
      <div className="flex h-16 items-center justify-between border-b bg-card p-4">
        <div className="flex items-center gap-3">
          <Avatar className="relative">
            <AvatarImage src={otherUser.avatar} alt={otherUser.name} data-ai-hint="avatar"/>
            <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
            {otherUser.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />}
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold">{otherUser.name}</span>
            <span className="text-xs text-muted-foreground">
              {otherUser.online ? "Online" : "Offline"}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => openCallModal("voice")}>
            <Phone className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => openCallModal("video")}>
            <Video className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Button variant="ghost" size="icon">
            <MoreVertical className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
      </div>
      {isCallModalOpen && (
        <CallModal
          isOpen={isCallModalOpen}
          onClose={() => setIsCallModalOpen(false)}
          callType={callType}
          user={otherUser}
        />
      )}
    </>
  );
}
