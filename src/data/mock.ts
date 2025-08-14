import type { User, Message, Chat } from "@/lib/types";

export const loggedInUser: User = {
  id: "user1",
  name: "You",
  avatar: "https://placehold.co/100x100.png",
  online: true,
};

export const users: User[] = [
  loggedInUser,
  {
    id: "user2",
    name: "Alice",
    avatar: "https://placehold.co/100x100.png",
    online: true,
  },
  {
    id: "user3",
    name: "Bob",
    avatar: "https://placehold.co/100x100.png",
    online: false,
  },
  {
    id: "user4",
    name: "Charlie",
    avatar: "https://placehold.co/100x100.png",
    online: true,
  },
  {
    id: "user5",
    name: "Diana",
    avatar: "https://placehold.co/100x100.png",
    online: false,
  },
];

export const messages: Message[] = [
  {
    id: "msg1",
    senderId: "user2",
    text: "Hey! How's it going?",
    timestamp: "10:30 AM",
  },
  {
    id: "msg2",
    senderId: "user1",
    text: "Pretty good, thanks! Just working on a new project. You?",
    timestamp: "10:31 AM",
  },
  {
    id: "msg3",
    senderId: "user2",
    text: "That sounds exciting! I'm just planning my weekend. Any suggestions?",
    timestamp: "10:32 AM",
  },
  {
    id: "msg4",
    senderId: "user1",
    text: "How about a hike? The weather is supposed to be great.",
    timestamp: "10:33 AM",
  },
];

export const chats: Chat[] = [
  {
    id: "chat1",
    users: [users[1], loggedInUser],
    messages: messages,
    lastMessage: "How about a hike? The weather is supposed to be great.",
    lastMessageTimestamp: "10:33 AM",
  },
  {
    id: "chat2",
    users: [users[2], loggedInUser],
    messages: [],
    lastMessage: "Sounds good, let's catch up then.",
    lastMessageTimestamp: "Yesterday",
  },
  {
    id: "chat3",
    users: [users[3], loggedInUser],
    messages: [],
    lastMessage: "Can you send me the file?",
    lastMessageTimestamp: "3 days ago",
  },
  {
    id: "chat4",
    users: [users[4], loggedInUser],
    messages: [],
    lastMessage: "Happy Birthday! 🎉",
    lastMessageTimestamp: "1/15/24",
  },
];
