"use server";

import { redirect } from "next/navigation";

import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function signInWithPassword(
  formData: FormData,
): Promise<{ error: string } | undefined> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase ist nicht konfiguriert." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const next = String(formData.get("next") ?? "/workspace");

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message };
  }

  redirect(next);
}

export async function signUpWithPassword(
  formData: FormData,
): Promise<
  | { error: string }
  | { ok: true; needsEmailConfirmation: true; message: string }
  | undefined
> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase ist nicht konfiguriert." };
  }

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const supabase = await createClient();

  const origin = process.env.NEXT_PUBLIC_APP_ORIGIN ?? "http://localhost:3000";
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/callback?next=/onboarding`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.session) {
    redirect("/onboarding");
  }

  return {
    ok: true as const,
    needsEmailConfirmation: true,
    message: "Bitte bestätige deine E-Mail über den Link von Supabase, um fortzufahren.",
  };
}

export async function signOut() {
  if (!isSupabaseConfigured()) {
    redirect("/login?error=config");
  }

  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
