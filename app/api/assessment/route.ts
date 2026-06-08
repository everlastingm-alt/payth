import { NextResponse } from "next/server";
import OpenAI from "openai";
import { assessmentResultSchema } from "@/lib/assessment/schema";
import { buildUserPrompt, SYSTEM_PROMPT } from "@/lib/assessment/prompts";
import type { BusinessType } from "@/lib/assessment/types";

export async function POST(request: Request) {
  try {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "OpenAI API key is not configured" },
        { status: 500 },
      );
    }

    const openai = new OpenAI({ apiKey });

    const body = await request.json();
    const businessType = body.businessType as BusinessType;
    const answers = body.answers as Record<string, string | string[]>;

    if (!businessType || !answers) {
      return NextResponse.json(
        { error: "Missing businessType or answers" },
        { status: 400 },
      );
    }

    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: buildUserPrompt(businessType, answers) },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json(
        { error: "Empty response from AI" },
        { status: 500 },
      );
    }

    const parsed = JSON.parse(content);
    const result = assessmentResultSchema.parse(parsed);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Assessment API error:", error);

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to generate assessment" },
      { status: 500 },
    );
  }
}
