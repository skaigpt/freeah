
"use client";

import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { BottomNav } from "@/components/bottom-nav";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isChatPage = pathname.includes('/chat/') && pathname.split('/').length > 2;

  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full flex-col">
        <div className="flex-1 overflow-y-auto">{children}</div>
        {!isChatPage && <BottomNav />}
      </div>
    </SidebarProvider>
  )
}
