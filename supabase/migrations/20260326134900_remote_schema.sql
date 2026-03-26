drop extension if exists "pg_net";


  create table "public"."learner_profiles" (
    "id" uuid not null,
    "known_languages" text[] not null default '{}'::text[],
    "target_language" text not null default 'python'::text,
    "skill_level" text not null default 'beginner'::text,
    "known_concepts" text[] not null default '{}'::text[],
    "goal_tags" text[] not null default '{}'::text[],
    "goals_free_text" text,
    "onboarding_completed" boolean not null default false,
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now()
      );


alter table "public"."learner_profiles" enable row level security;

CREATE UNIQUE INDEX learner_profiles_pkey ON public.learner_profiles USING btree (id);

alter table "public"."learner_profiles" add constraint "learner_profiles_pkey" PRIMARY KEY using index "learner_profiles_pkey";

alter table "public"."learner_profiles" add constraint "learner_profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."learner_profiles" validate constraint "learner_profiles_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
begin
  insert into public.learner_profiles (id)
  values (new.id);
  return new;
end;
$function$
;

CREATE OR REPLACE FUNCTION public.set_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
begin
  new.updated_at = now();
  return new;
end;
$function$
;

grant delete on table "public"."learner_profiles" to "anon";

grant insert on table "public"."learner_profiles" to "anon";

grant references on table "public"."learner_profiles" to "anon";

grant select on table "public"."learner_profiles" to "anon";

grant trigger on table "public"."learner_profiles" to "anon";

grant truncate on table "public"."learner_profiles" to "anon";

grant update on table "public"."learner_profiles" to "anon";

grant delete on table "public"."learner_profiles" to "authenticated";

grant insert on table "public"."learner_profiles" to "authenticated";

grant references on table "public"."learner_profiles" to "authenticated";

grant select on table "public"."learner_profiles" to "authenticated";

grant trigger on table "public"."learner_profiles" to "authenticated";

grant truncate on table "public"."learner_profiles" to "authenticated";

grant update on table "public"."learner_profiles" to "authenticated";

grant delete on table "public"."learner_profiles" to "service_role";

grant insert on table "public"."learner_profiles" to "service_role";

grant references on table "public"."learner_profiles" to "service_role";

grant select on table "public"."learner_profiles" to "service_role";

grant trigger on table "public"."learner_profiles" to "service_role";

grant truncate on table "public"."learner_profiles" to "service_role";

grant update on table "public"."learner_profiles" to "service_role";


  create policy "Users insert own profile"
  on "public"."learner_profiles"
  as permissive
  for insert
  to public
with check ((auth.uid() = id));



  create policy "Users read own profile"
  on "public"."learner_profiles"
  as permissive
  for select
  to public
using ((auth.uid() = id));



  create policy "Users update own profile"
  on "public"."learner_profiles"
  as permissive
  for update
  to public
using ((auth.uid() = id));


CREATE TRIGGER learner_profiles_updated_at BEFORE UPDATE ON public.learner_profiles FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


