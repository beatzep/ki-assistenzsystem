# CodeMentor Learn

Didaktischer, KI-gestützter Coding-Assistent als Uni-Prototyp für das Modul "Agile Software-Entwicklung".

## Projektidee

CodeMentor Learn ist kein klassischer Chatbot, sondern ein Lernstudio für Programmier-Anfänger:

- Fehlerdiagnose statt sofortiger Komplettlösung
- sokratische Rückfragen und Reflexion
- abgestufte Hilfen (Hinweis 1 bis 3)
- sichtbarer Unsicherheits- und Halluzinationshinweis
- Fokus auf "Verstehen statt Kopieren"

## Feature-Übersicht

- Landing mit Nutzenversprechen und Feature Cards
- Learning Workspace mit:
  - Sidebar-Navigation
  - Monaco Editor
  - Sprachauswahl (Java, Python, JavaScript)
  - Analyse-Button
  - Assistance Panel mit Diagnose, Konzept und Guided Hints
- Aufgabenmodus mit didaktischen Übungen
- Konzepte- und Verlaufs-Screens
- Nutzerkonten (Supabase Auth) und Qualifikationsprofil (Onboarding + Settings)
- Settings mit Sicherheits-/Datenschutzfokus und Profil-Pflege
- Confidence Meter + Privacy Badge + Trust-Hinweise

## Architektur-Überblick

```text
/app
  /(marketing)
  /(workspace)
  /api/analyze
/components
  /ui
  /layout
  /workspace
  /assistant
  /education
/lib
  /llm
  /analysis
  /mock
  /utils
/store
/types
/data
/docs
```

### Kernentscheidungen

- **App Router + Route Groups:** saubere Trennung von Landing und Produkt-Workspace.
- **Didaktische Service-Schicht:** `lib/analysis/analyzeCode.ts` kapselt Analyse-Pipeline.
- **LLM austauschbar:** `lib/llm/client.ts` ist als Adapter vorbereitet, aktuell mit Mock-Fallback.
- **Validierung via Zod:** Request/Response-Schema in `lib/analysis/schema.ts`.
- **UI-State via Zustand:** Session-, Editor- und Hint-State zentral im `workspace-store`.
- **Designsystem:** shadcn/ui + Tailwind für konsistente, professionelle SaaS-Optik.

## Repository-URL / Klonen

- **Repository:** [https://github.com/beatzep/ki-assistenzsystem](https://github.com/beatzep/ki-assistenzsystem)

Lokal kopieren und ins Projektverzeichnis wechseln:

```bash
git clone https://github.com/beatzep/ki-assistenzsystem.git
cd ki-assistenzsystem
```

Danach wie unter [Startanleitung](#startanleitung) mit `npm install` und `npm run dev` fortfahren.

## Startanleitung

```bash
npm install
npm run dev
```

Danach im Browser:

- `http://localhost:3000/`
- `http://localhost:3000/workspace`

### Environment / Secrets

Lege deine Secrets nur in `.env.local` ab (nicht committen), z. B.:

```bash
OPENAI_API_KEY=...
OPENAI_MODEL=gpt-4o-mini
OPENAI_BASE_URL=https://api.openai.com/v1
OPENAI_ENABLED=true
```

Wenn `OPENAI_ENABLED=false` oder kein API-Key gesetzt ist, fällt die App automatisch auf die lokale Mock-Analyse zurück.

### Supabase (Accounts + Lernprofil)

Optional für Registrierung, Login und persistentes Qualifikationsprofil. Ohne diese Variablen zeigt der Workspace einen kurzen Hinweis; Build und Landing funktionieren trotzdem.

**Umgebungsvariablen** (in `.env.local`, Werte aus Cloud-Dashboard oder lokal aus `supabase status`):

```bash
NEXT_PUBLIC_SUPABASE_URL=https://<project>.supabase.co
# lokal z. B. http://127.0.0.1:55421 — exakt wie in der CLI-Ausgabe
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key>
NEXT_PUBLIC_APP_ORIGIN=http://localhost:3000
```

**Hosted (Supabase Cloud):** Dashboard → **Project Settings → API** → Project URL und `anon` `public` Key.

**Lokal mit Supabase CLI:** [CLI installieren](https://supabase.com/docs/guides/cli), **Docker Desktop** starten, im Projektverzeichnis:

```bash
supabase start
supabase status   # API URL und anon key für .env.local
```

Die Datei [`supabase/config.toml`](supabase/config.toml) legt die **nach außen gemappten Ports** fest (im Repo von den Standard-5432x-Ports abweichend, damit parallel ein zweiter lokaler Stack laufen kann). Nach Änderungen an den Ports: `supabase stop --no-backup` und erneut `supabase start`.

**Schema:** SQL für `learner_profiles`, RLS und Trigger: [`docs/supabase-schema.md`](docs/supabase-schema.md) — im **SQL Editor** ausführen (Cloud-Dashboard oder lokales Supabase Studio, URL steht bei `supabase status`).

**Redirects:** In Supabase **Authentication → URL Configuration** die Site-URL und Redirect-URLs setzen (z. B. `http://localhost:3000/auth/callback`).

## Demo-Flow

1. `/workspace` öffnen
2. Starter-Snippet ist vorausgefüllt
3. `Analysieren` klicken
4. Rechts erscheint didaktische Analyse
5. Durch Hinweislevel klicken oder `Nächsten Hinweis` nutzen
6. Confidence, Reflexionsfragen und Vertrauenshinweise prüfen

## Stellen für echte LLM-Anbindung

Für eine produktive OpenAI-/LLM-Integration müssen diese Dateien angepasst werden:

- `lib/llm/client.ts` (API-Call, Auth, Provider)
- `lib/llm/prompts.ts` (didaktische Promptsteuerung)
- `lib/analysis/analyzeCode.ts` (Fallback-/Routing-Strategie)
- optional `app/api/analyze/route.ts` (Rate Limits, Logging, Safety Policies)

## Zukünftige Erweiterungen

- Persistenz für Verlauf/Aufgabenfortschritt (über das Supabase-Profil hinaus)
- automatische Testfall-Generierung
- kontextuelle Quellen-/Doku-Verlinkung je Konzept
- adaptives Hinting basierend auf Lernstand
