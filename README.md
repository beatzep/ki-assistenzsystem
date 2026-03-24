# CodeMentor Learn

Didaktischer, KI-gestuetzter Coding-Assistent als Uni-Prototyp fuer das Modul "Agile Software-Entwicklung".

## Projektidee

CodeMentor Learn ist kein klassischer Chatbot, sondern ein Lernstudio fuer Programmier-Anfaenger:

- Fehlerdiagnose statt sofortiger Komplettloesung
- sokratische Rueckfragen und Reflexion
- abgestufte Hilfen (Hinweis 1 bis 3)
- sichtbarer Unsicherheits- und Halluzinationshinweis
- Fokus auf "Verstehen statt Kopieren"

## Featureuebersicht

- Landing mit Nutzenversprechen und Feature Cards
- Learning Workspace mit:
  - Sidebar-Navigation
  - Monaco Editor
  - Sprachauswahl (Java, Python, JavaScript)
  - Analyse-Button
  - Assistance Panel mit Diagnose, Konzept und Guided Hints
- Aufgabenmodus mit didaktischen Uebungen
- Konzepte- und Verlaufsscreens
- Settings mit Sicherheits-/Datenschutzfokus
- Confidence Meter + Privacy Badge + Trust-Hinweise

## Architekturueberblick

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
- **Designsystem:** shadcn/ui + Tailwind fuer konsistente, professionelle SaaS-Optik.

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

Wenn `OPENAI_ENABLED=false` oder kein API-Key gesetzt ist, faellt die App automatisch auf die lokale Mock-Analyse zurueck.

## Demo-Flow

1. ` /workspace` oeffnen
2. Starter-Snippet ist vorausgefuellt
3. `Analysieren` klicken
4. Rechts erscheint didaktische Analyse
5. Durch Hinweislevel klicken oder `Naechsten Hinweis` nutzen
6. Confidence, Reflexionsfragen und Vertrauenshinweise prüfen

## Stellen fuer echte LLM-Anbindung

Fuer eine produktive OpenAI-/LLM-Integration muessen diese Dateien angepasst werden:

- `lib/llm/client.ts` (API-Call, Auth, Provider)
- `lib/llm/prompts.ts` (didaktische Promptsteuerung)
- `lib/analysis/analyzeCode.ts` (Fallback-/Routing-Strategie)
- optional `app/api/analyze/route.ts` (Rate Limits, Logging, Safety Policies)

## Zukuenftige Erweiterungen

- echte Nutzerkonten und Sessions
- Persistenz fuer Verlauf/Aufgabenfortschritt
- automatische Testfall-Generierung
- kontextuelle Quellen-/Doku-Verlinkung je Konzept
- adaptives Hinting basierend auf Lernstand
