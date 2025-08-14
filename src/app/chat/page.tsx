
"use client";

import { useState, useEffect } from "react";
import { ChatTopbar } from "@/components/chat-topbar";
import { ChatMessages } from "@/components/chat-messages";
import { ChatInput } from "@/components/chat-input";
import { chats, loggedInUser } from "@/data/mock";
import type { Message } from "@/lib/types";

export default function ChatPage() {
  const [selectedChat] = useState(chats[0]);
  const [messages, setMessages] = useState<Message[]>(selectedChat.messages);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const otherUser = selectedChat.users.find(u => u.id !== loggedInUser.id)!;

  const handleSendMessage = (text: string) => {
    const newMessage: Message = {
      id: `msg${messages.length + 1}`,
      senderId: loggedInUser.id,
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex h-full flex-col">
      <ChatTopbar chat={selectedChat} />
      <ChatMessages messages={messages} currentUser={loggedInUser} otherUser={otherUser} />
      <ChatInput onSendMessage={handleSendMessage} messages={messages} />
    </div>
  );
}
