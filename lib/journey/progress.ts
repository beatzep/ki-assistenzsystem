// /lib/journey/progress.ts
// Liest und schreibt Fortschritt aus/in Supabase java_journey_progress

import { createClient } from "@/lib/supabase/client"; // existierender Client

async function requireUserId(supabase: ReturnType<typeof createClient>) {
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  if (!data.user) {
    throw new Error("Not authenticated");
  }
  return data.user.id;
}

export async function getCompletedTaskIds(): Promise<string[]> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("java_journey_progress")
    .select("task_id");
  if (error) {
    console.error("[journey] getCompletedTaskIds:", error.message);
    return [];
  }
  return data.map((row) => row.task_id);
}

export async function markTaskCompleted(taskId: string): Promise<void> {
  const supabase = createClient();
  try {
    const userId = await requireUserId(supabase);
    const { error } = await supabase
      .from("java_journey_progress")
      .insert({ user_id: userId, task_id: taskId })
      .single();
    if (error && error.code !== "23505") {
      // 23505 = unique_violation → Task war schon completed, kein Fehler
      console.error("[journey] markTaskCompleted:", error.message);
    }
  } catch (e) {
    console.error(
      "[journey] markTaskCompleted:",
      e instanceof Error ? e.message : String(e),
    );
  }
}

export async function resetTaskProgress(taskId: string): Promise<void> {
  const supabase = createClient();
  try {
    const userId = await requireUserId(supabase);
    const { error } = await supabase
      .from("java_journey_progress")
      .delete()
      .eq("user_id", userId)
      .eq("task_id", taskId);
    if (error) console.error("[journey] resetTaskProgress:", error.message);
  } catch (e) {
    console.error(
      "[journey] resetTaskProgress:",
      e instanceof Error ? e.message : String(e),
    );
  }
}

