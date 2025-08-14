
import { SidebarProvider } from "@/components/ui/sidebar";
import { BottomNav } from "@/components/bottom-nav";

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="relative flex h-screen w-full flex-col">
        <div className="flex-1 overflow-y-hidden">{children}</div>
        <BottomNav />
      </div>
    </SidebarProvider>
  )
}
