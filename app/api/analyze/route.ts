import { NextResponse } from "next/server";
import { ZodError } from "zod";

import { analyzeCode } from "@/lib/analysis/analyzeCode";
import { analyzePayloadSchema } from "@/lib/analysis/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const payload = analyzePayloadSchema.parse(body);
    const result = await analyzeCode(payload);

    return NextResponse.json({ result });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          message: "Ungueltige Eingabe",
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
