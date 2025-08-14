import { Sidebar, SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { ChatList } from "@/components/chat-list";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex h-screen">
        <Sidebar collapsible="icon">
          <ChatList />
        </Sidebar>
        <SidebarInset>
          <div className="flex h-full w-full flex-col">{children}</div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
