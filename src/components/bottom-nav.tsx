
"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MessageSquare, Phone, Users, Settings, CircleDot } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/updates", label: "Updates", icon: CircleDot },
  { href: "/calls", label: "Calls", icon: Phone },
  { href: "/community", label: "Communities", icon: Users },
  { href: "/chat", label: "Chats", icon: MessageSquare, badge: 5 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0 left-0 z-50 w-full border-t bg-background">
      <div className="grid h-16 grid-cols-5">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "group inline-flex flex-col items-center justify-center p-2 text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                isActive && "text-primary"
              )}
            >
              <div className="relative">
                <item.icon className="h-6 w-6" />
                {item.badge && (
                    <span className="absolute -right-2 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        {item.badge}
                    </span>
                )}
              </div>
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
