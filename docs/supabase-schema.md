# Supabase: Auth und Lernprofil

## Trennung Auth vs. Lernprofil

- **Authentifizierung:** `auth.users` (von Supabase Auth verwaltet, nicht manuell ändern).
- **Lern-/Qualifikationsprofil:** eigene Tabelle `public.learner_profiles`, 1:1 über die UUID mit dem Auth-User verknüpft.

So bleiben Passwort, E-Mail-Verifizierung und Sessions klar von didaktischen Daten getrennt.

## Tabelle `public.learner_profiles`

| Spalte | Typ | Bedeutung |
|--------|-----|-----------|
| `id` | `uuid` PK, `references auth.users(id) on delete cascade` | Gleiche ID wie der Auth-User |
| `known_languages` | `text[]` | z. B. `java`, `python`, `javascript`, `assembly` |
| `target_language` | `text` | Eine Fokussprache für Unterstützung |
| `skill_level` | `text` | `beginner` \| `basic` \| `intermediate` \| `advanced` |
| `known_concepts` | `text[]` | IDs aus dem UI (z. B. `variables`, `control-flow`) |
| `goal_tags` | `text[]` | Vordefinierte Lernziel-Schlagworte |
| `goals_free_text` | `text` nullable | Freitext-Lernziele |
| `onboarding_completed` | `boolean` default `false` | Profil-Einrichtung abgeschlossen |
| `created_at` | `timestamptz` | optional |
| `updated_at` | `timestamptz` | bei Update setzen |

### Beziehung

- **Ein Nutzer (`auth.users`)** hat **genau ein** `learner_profiles`-Datensatz (empfohlen per Trigger beim Sign-up anlegen, siehe unten).

## SQL (Beispiel, im Supabase SQL Editor ausführen)

```sql
create table public.learner_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  known_languages text[] not null default '{}',
  target_language text not null default 'python',
  skill_level text not null default 'beginner',
  known_concepts text[] not null default '{}',
  goal_tags text[] not null default '{}',
  goals_free_text text,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.learner_profiles enable row level security;

create policy "Users read own profile"
  on public.learner_profiles for select
  using (auth.uid() = id);

create policy "Users insert own profile"
  on public.learner_profiles for insert
  with check (auth.uid() = id);

create policy "Users update own profile"
  on public.learner_profiles for update
  using (auth.uid() = id);

create function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger learner_profiles_updated_at
  before update on public.learner_profiles
  for each row execute function public.set_updated_at();

create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.learner_profiles (id)
  values (new.id);
  return new;
end;
$$ language plpgsql security definer
set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

Hinweis: Auf manchen Postgres-Versionen lautet die Syntax `execute function` statt `execute procedure` — ggf. anpassen.

## Auth-Konfiguration im Supabase Dashboard

- **Site URL:** z. B. `http://localhost:3000` (Produktion: deine Domain).
- **Redirect URLs:** `http://localhost:3000/auth/callback` (und Produktions-URL).
- E-Mail-Bestätigung: für schnelle lokale Demos kann „Confirm email“ deaktiviert werden; sonst Link aus der Mail nutzen (`/auth/callback`).

## App-Umgebungsvariablen

Siehe `.env.example`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, optional `NEXT_PUBLIC_APP_ORIGIN`.
