import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { analyzeCode } from "@/lib/analysis/analyzeCode";
import { analyzeApiInputSchema } from "@/lib/analysis/schema";
import { getLearnerProfileByUserId } from "@/lib/profile/queries";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = analyzeApiInputSchema.parse(body);

    let qualificationProfile = null;
    if (isSupabaseConfigured()) {
      try {
        const supabase = await createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (user) {
          qualificationProfile = await getLearnerProfileByUserId(user.id);
        }
      } catch {
        /* keine Session oder Profil nicht lesbar */
      }
    }

    const result = await analyzeCode({ ...payload, qualificationProfile });

    return NextResponse.json({ result });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Ungültige Eingabe",
          issues: error.issues,
        },
        { status: 400 },
      );
    }

    return NextResponse.json(
      {
        message: "Analyse fehlgeschlagen",
      },
      { status: 500 },
    );
  }
}
