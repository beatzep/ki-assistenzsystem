"use client";

import { createContext, useContext } from "react";

interface WorkspaceSessionValue {
  email: string;
  userId: string;
}

const WorkspaceSessionContext = createContext<WorkspaceSessionValue | null>(null);

export function WorkspaceSessionProvider({
  email,
  userId,
  children,
}: {
  email: string;
  userId: string;
  children: React.ReactNode;
}) {
  return (
    <WorkspaceSessionContext.Provider value={{ email, userId }}>{children}</WorkspaceSessionContext.Provider>
  );
}

export function useWorkspaceSession() {
  return useContext(WorkspaceSessionContext);
}
