import { createBrowserClient } from "@supabase/ssr";

import { isSupabaseConfigured } from "@/lib/supabase/config";

/** Für zukünftige Client-Session-Refreshs; aktuell nutzen Formulare Server Actions. */
export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase ist nicht konfiguriert (.env.local).");
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
