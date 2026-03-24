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
