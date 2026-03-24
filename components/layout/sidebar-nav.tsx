"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  FileStack,
  Gauge,
  History,
  PlusCircle,
  Settings,
  ShieldCheck,
} from "lucide-react";

import { useWorkspaceStore } from "@/store/workspace-store";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/workspace", label: "Learning Workspace", icon: Gauge },
  { href: "/tasks", label: "Meine Aufgaben", icon: FileStack },
  { href: "/history", label: "Verlauf", icon: History },
  { href: "/concepts", label: "Konzepte", icon: BookOpen },
  { href: "/settings", label: "Einstellungen", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const startNewSession = useWorkspaceStore((state) => state.startNewSession);

  return (
    <aside className="hidden w-72 flex-col border-r bg-card/70 p-5 backdrop-blur lg:flex">
      <div className="mb-6 space-y-1">
        <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Didactic Studio</p>
        <h1 className="text-xl font-semibold tracking-tight">CodeMentor Learn</h1>
      </div>

      <Button
        className="mb-6 justify-start gap-2 rounded-xl"
        variant="secondary"
        onClick={startNewSession}
      >
        <PlusCircle className="h-4 w-4" />
        Neue Session
      </Button>

      <nav className="space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition-all",
                isActive
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-xl border bg-background p-3">
        <div className="mb-2 flex items-center gap-2 text-sm font-medium">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          Privacy Badge
        </div>
        <p className="text-xs text-muted-foreground">
          Lokale Verarbeitung bevorzugt. Keine sensiblen Daten ohne Freigabe senden.
        </p>
      </div>
    </aside>
  );
}
