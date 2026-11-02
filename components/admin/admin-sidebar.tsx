"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  FolderGit2,
  Mail,
  Image as ImageIcon,
  Settings,
  ExternalLink,
} from "lucide-react";

interface AdminNavItem {
  readonly href: string;
  readonly label: string;
  readonly icon: React.ComponentType<{ className?: string }>;
  readonly phase?: string;
}

const ADMIN_NAV: readonly AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/posts", label: "Posts", icon: FileText, phase: "Phase 5" },
  {
    href: "/admin/projects",
    label: "Projects",
    icon: FolderGit2,
    phase: "Phase 4",
  },
  { href: "/admin/messages", label: "Messages", icon: Mail, phase: "Phase 6" },
  { href: "/admin/media", label: "Media", icon: ImageIcon, phase: "Phase 4" },
  {
    href: "/admin/settings",
    label: "Settings",
    icon: Settings,
    phase: "Phase 6",
  },
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="border-border bg-card/60 flex min-h-[calc(100vh-4rem)] w-64 shrink-0 flex-col justify-between border-r p-4">
      <div className="space-y-6">
        <div className="px-3 pt-2">
          <span className="text-muted-foreground block font-mono text-[11px] tracking-wider uppercase">
            Management
          </span>
        </div>

        <nav className="space-y-1 text-sm font-medium">
          {ADMIN_NAV.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-md px-3 py-2 transition-colors ${
                  isActive
                    ? "bg-brand/10 text-brand font-semibold"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="size-4" />
                  <span>{item.label}</span>
                </div>
                {item.phase && (
                  <span className="text-muted-foreground/70 bg-muted rounded px-1.5 py-0.5 font-mono text-[10px]">
                    {item.phase}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-border border-t px-2 pt-4">
        <Link
          href="/"
          target="_blank"
          className="text-muted-foreground hover:text-foreground flex items-center justify-between py-1.5 text-xs transition-colors"
        >
          <span>View Public Site</span>
          <ExternalLink className="size-3.5" />
        </Link>
      </div>
    </aside>
  );
}
