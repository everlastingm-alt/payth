import { NextResponse } from "next/server";
import OpenAI from "openai";
import { ZodError } from "zod";
import { getDeepQuestions } from "@/lib/assessment/deepRegistry";
import { deepAssessmentResultSchema } from "@/lib/assessment/deepSchema";
import { buildDeepUserPrompt, DEEP_SYSTEM_PROMPT } from "@/lib/assessment/deepPrompts";
import { normalizeDeepAssessmentResponse } from "@/lib/assessment/normalizeDeepResult";
import { getProviderProfile } from "@/lib/assessment/providerProfiles";
import type { AssessmentAnswers, BusinessType, DeepAnswer } from "@/lib/assessment/types";

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
    const firstLayerAnswers = body.firstLayerAnswers as AssessmentAnswers;
    const deepAnswers = body.deepAnswers as DeepAnswer[];

    if (!businessType || !firstLayerAnswers || !deepAnswers) {
      return NextResponse.json(
        { error: "Missing businessType, firstLayerAnswers, or deepAnswers" },
        { status: 400 },
      );
    }

    if (!firstLayerAnswers.currentProvider) {
      return NextResponse.json(
        { error: "Missing currentProvider in first layer answers" },
        { status: 400 },
      );
    }

    const expectedQuestions = getDeepQuestions(businessType);
    if (deepAnswers.length !== expectedQuestions.length) {
      return NextResponse.json(
        { error: `Expected ${expectedQuestions.length} deep answers, got ${deepAnswers.length}` },
        { status: 400 },
      );
    }

    const providerId = firstLayerAnswers.currentProvider as string;
    const providerProfile = getProviderProfile(providerId);

    const userPrompt = buildDeepUserPrompt({
      businessType,
      firstLayerAnswers,
      deepAnswers,
      providerProfile,
    });

    const model = process.env.OPENAI_MODEL ?? "gpt-4o-mini";

    const completion = await openai.chat.completions.create({
      model,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: DEEP_SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
    });

    const content = completion.choices[0]?.message?.content;
    if (!content) {
      return NextResponse.json({ error: "Empty response from AI" }, { status: 500 });
    }

    const parsed = JSON.parse(content) as Record<string, unknown>;
    const normalized = normalizeDeepAssessmentResponse(parsed, providerProfile);
    const result = deepAssessmentResultSchema.parse(normalized);

    return NextResponse.json(result);
  } catch (error) {
    console.error("Deep assessment API error:", error);

    if (error instanceof ZodError) {
      return NextResponse.json(
        { error: "We could not format the assessment result. Please try again." },
        { status: 500 },
      );
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(
      { error: "Failed to generate deep assessment" },
      { status: 500 },
    );
  }
}
