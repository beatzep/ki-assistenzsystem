"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

interface WorkspaceGateProps {
  onboardingCompleted: boolean;
  children: React.ReactNode;
}

export function WorkspaceGate({ onboardingCompleted, children }: WorkspaceGateProps) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!onboardingCompleted && pathname !== "/onboarding") {
      router.replace("/onboarding");
    }
    if (onboardingCompleted && pathname === "/onboarding") {
      router.replace("/workspace");
    }
  }, [onboardingCompleted, pathname, router]);

  return <>{children}</>;
}
