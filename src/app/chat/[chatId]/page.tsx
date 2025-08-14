
"use client";

import { useState, useEffect } from "react";
import { ChatTopbar } from "@/components/chat-topbar";
import { ChatMessages } from "@/components/chat-messages";
import { ChatInput } from "@/components/chat-input";
import { chats, loggedInUser } from "@/data/mock";
import type { Message, Chat } from "@/lib/types";
import { notFound } from "next/navigation";

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const [isClient, setIsClient] = useState(false);
  const [selectedChat, setSelectedChat] = useState<Chat | undefined>(undefined);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setIsClient(true);
    const chat = chats.find((c) => c.id === params.chatId);
    setSelectedChat(chat);
    if (chat) {
        setMessages(chat.messages);
    }
  }, [params.chatId]);

  if (!isClient) {
    return null; // or a loading skeleton
  }
  
  if (!selectedChat) {
      // better to have a not found page
    return notFound();
  }

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

  return (
    <div className="flex h-full flex-col">
      <ChatTopbar chat={selectedChat} />
      <ChatMessages messages={messages} currentUser={loggedInUser} otherUser={otherUser} />
      <ChatInput onSendMessage={handleSendMessage} messages={messages} />
    </div>
  );
}
