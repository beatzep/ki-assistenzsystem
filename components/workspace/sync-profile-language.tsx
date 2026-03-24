"use client";

import { useEffect } from "react";

import { useWorkspaceStore } from "@/store/workspace-store";
import type { SupportedLanguage } from "@/types/analysis";

export function SyncProfileLanguage({ target }: { target: SupportedLanguage }) {
  const setLanguage = useWorkspaceStore((s) => s.setLanguage);

  useEffect(() => {
    const current = useWorkspaceStore.getState().language;
    if (current !== target) {
      setLanguage(target);
    }
  }, [setLanguage, target]);

  return null;
}
