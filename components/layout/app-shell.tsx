"use client";

import type { ReactNode } from "react";
import { Sparkles } from "lucide-react";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { Badge } from "@/components/ui/badge";

interface AppShellProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AppShell({ title, subtitle, children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,theme(colors.slate.50),theme(colors.background)_55%)]">
      <div className="mx-auto flex min-h-screen max-w-[1600px]">
        <SidebarNav />
        <div className="flex min-h-screen flex-1 flex-col">
          <header className="flex items-center justify-between border-b bg-background/80 px-4 py-4 backdrop-blur sm:px-6">
            <div className="space-y-1">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">Verstehen statt Kopieren</p>
              <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            </div>
            <Badge className="gap-1 rounded-full bg-amber-100 text-amber-900 hover:bg-amber-100">
              <Sparkles className="h-3.5 w-3.5" />
              Modellgestuetzte Heuristik
            </Badge>
          </header>
          <main className="flex-1 p-4 sm:p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
