"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

import { signInWithPassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/workspace";
  const globalError = searchParams.get("error");
  const [error, setError] = useState<string | null>(
    globalError === "config"
      ? "Supabase ist nicht konfiguriert. Bitte .env.local prüfen."
      : globalError === "auth"
        ? "Anmeldung fehlgeschlagen."
        : null,
  );
  const [pending, startTransition] = useTransition();

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>Anmelden</CardTitle>
        <CardDescription>Mit deinem Konto ins Lernstudio wechseln.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            fd.set("next", next);
            setError(null);
            startTransition(async () => {
              const res = await signInWithPassword(fd);
              if (res?.error) setError(res.error);
            });
          }}
        >
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-Mail
            </label>
            <Input id="email" name="email" type="email" autoComplete="email" required className="rounded-xl" />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Passwort
            </label>
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="rounded-xl"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <Button type="submit" className="w-full rounded-xl" disabled={pending}>
            {pending ? "Wird angemeldet…" : "Anmelden"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Noch kein Konto?{" "}
          <Link href="/register" className="font-medium text-primary underline-offset-4 hover:underline">
            Registrieren
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
