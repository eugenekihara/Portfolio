"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LayoutDashboard, FolderOpen, Mail, LogOut, ArrowLeft } from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!session) return;

    const fetchUnreadCount = async () => {
      try {
        const res = await fetch("/api/messages/stats");
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.unread || 0);
        }
      } catch {
        // Silently fail
      }
    };

    fetchUnreadCount();

    // Poll every 30 seconds for new messages
    const interval = setInterval(fetchUnreadCount, 30_000);
    return () => clearInterval(interval);
  }, [session]);

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Projects", href: "/admin/projects/new", icon: FolderOpen, exact: false },
    { label: "Messages", href: "/admin/messages", icon: Mail, badge: unreadCount, exact: false },
  ];

  const isActive = (item: { href: string; exact?: boolean }) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(item.href + "/");
  };

  return (
    <header className="border-b border-border bg-white sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-6">
            <Link
              href="/admin"
              className="text-xl font-bold font-[family-name:var(--font-poppins)] tracking-tight"
            >
              Eugene<span className="text-[#8b4049]">.</span>{" "}
              <span className="text-sm font-normal text-muted-foreground">
                Admin
              </span>
            </Link>

            <nav className="hidden sm:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive(item)
                      ? "bg-[#8b4049]/10 text-[#8b4049]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                  {item.badge && item.badge > 0 ? (
                    <Badge className="bg-[#8b4049] text-white text-[10px] h-5 min-w-[20px] flex items-center justify-center px-1.5 rounded-full">
                      {item.badge > 99 ? "99+" : item.badge}
                    </Badge>
                  ) : null}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile nav items */}
            <div className="flex sm:hidden items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`relative flex items-center justify-center p-2 rounded-lg transition-colors ${
                    isActive(item)
                      ? "bg-[#8b4049]/10 text-[#8b4049]"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.badge && item.badge > 0 ? (
                    <span className="absolute -top-0.5 -right-0.5 bg-[#8b4049] text-white text-[9px] h-4 min-w-[16px] flex items-center justify-center px-1 rounded-full leading-none">
                      {item.badge > 99 ? "99+" : item.badge}
                    </span>
                  ) : null}
                </Link>
              ))}
            </div>

            <Link href="/">
              <Button variant="ghost" size="sm" className="text-muted-foreground">
                <ArrowLeft className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Portfolio</span>
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="text-muted-foreground"
            >
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
