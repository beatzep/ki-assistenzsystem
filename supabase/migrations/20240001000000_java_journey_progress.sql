-- Tabelle: java_journey_progress
-- Speichert pro User welche Task-IDs abgeschlossen sind

create table if not exists public.java_journey_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  task_id text not null,
  completed_at timestamptz not null default now(),
  unique (user_id, task_id)
);

-- Row Level Security: User sieht nur eigene Zeilen
alter table public.java_journey_progress enable row level security;

create policy "Users can read own progress"
  on public.java_journey_progress for select
  using (auth.uid() = user_id);

create policy "Users can insert own progress"
  on public.java_journey_progress for insert
  with check (auth.uid() = user_id);

create policy "Users can delete own progress"
  on public.java_journey_progress for delete
  using (auth.uid() = user_id);

