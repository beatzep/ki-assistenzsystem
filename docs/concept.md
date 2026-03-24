# Didaktisches Konzept

CodeMentor Learn ist als Lernstudio aufgebaut, nicht als klassischer Chat. Ziel ist Hilfe zur Selbsthilfe:

- zuerst Diagnose des Problems
- dann einfache Erklärung
- danach sokratische Fragen
- dann gestufte Hinweise (Level 1 bis 3)
- erst sehr spät konkrete Richtung

Das Interface führt Lernende bewusst durch Reflexion statt Copy-Paste.

# Umgang mit Halluzinationen

Das Produkt zeigt Unsicherheit explizit an:

- Confidence Meter (`low`, `medium`, `high`)
- Halluzinationswarnung im Assistance Panel
- permanenter Vertrauenshinweis: "Bitte Code testen"
- Hinweis auf heuristische / modellbasierte Antworten

Dadurch wird KI nicht als unfehlbare Quelle, sondern als Lernhilfe kommuniziert.

# Datenschutzkonzept

- Privacy Badge in der Sidebar: lokale Verarbeitung bevorzugt
- Hinweis, keine sensiblen Daten zu senden
- Mock-Analyse lokal im Projekt als Standard
- LLM-Client ist austauschbar gekapselt, damit später gezielt API-Grenzen definiert werden können

# Abgrenzung zu Standard-Chatbots

Dieses System vermeidet ein reines Messenger-Pattern und nutzt stattdessen didaktische Module:

- Fehlerdiagnose-Karte
- Konzept-Erklärung
- Guided Hints
- Reflexionskarte
- Fortschrittsanzeige zur Selbstableitung

So steht Lernerfolg im Vordergrund statt schneller Lösungsabgabe.
