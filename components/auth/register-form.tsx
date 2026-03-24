"use client";

import Link from "next/link";
import { useState, useTransition } from "react";

import { signUpWithPassword } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function RegisterForm() {
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  return (
    <Card className="rounded-2xl border shadow-sm">
      <CardHeader>
        <CardTitle>Konto anlegen</CardTitle>
        <CardDescription>Danach richten wir dein Qualifikationsprofil für personalisierte Hilfen ein.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const fd = new FormData(form);
            setError(null);
            setInfo(null);
            startTransition(async () => {
              const res = await signUpWithPassword(fd);
              if (res && "error" in res) {
                setError(res.error);
                return;
              }
              if (res && "ok" in res) {
                setInfo(res.message);
                form.reset();
              }
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
              autoComplete="new-password"
              required
              minLength={6}
              className="rounded-xl"
            />
          </div>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          {info ? <p className="text-sm text-emerald-700">{info}</p> : null}
          <Button type="submit" className="w-full rounded-xl" disabled={pending}>
            {pending ? "Wird erstellt…" : "Registrieren"}
          </Button>
        </form>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Schon registriert?{" "}
          <Link href="/login" className="font-medium text-primary underline-offset-4 hover:underline">
            Anmelden
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
