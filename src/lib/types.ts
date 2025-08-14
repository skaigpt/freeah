
export type User = {
  id: string;
  name: string;
  avatar: string;
  online: boolean;
};

export type Message = {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
};

export type Chat = {
  id: string;
  users: User[];
  messages: Message[];
  lastMessage: string;
  lastMessageTimestamp: string;
  unreadCount: number;
  pinned: boolean;
  muted: boolean;
};
