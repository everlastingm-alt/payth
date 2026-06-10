import type { ProviderProfile } from "./providerProfiles";

function ensureArray<T>(value: unknown): T[] {
  if (Array.isArray(value)) return value as T[];
  if (value == null) return [];
  if (typeof value === "object") return Object.values(value) as T[];
  return [];
}

function normalizeQuestionItem(item: unknown): { question: string; whyAsk: string } | null {
  if (typeof item === "string" && item.trim()) {
    return {
      question: item.trim(),
      whyAsk: "Helps clarify your current payment setup and costs.",
    };
  }

  if (typeof item === "object" && item !== null) {
    const obj = item as Record<string, unknown>;
    const question = String(obj.question ?? obj.q ?? obj.text ?? "").trim();
    const whyAsk = String(
      obj.whyAsk ?? obj.why ?? obj.reason ?? obj.whyItMatters ?? "",
    ).trim();

    if (!question) return null;

    return {
      question,
      whyAsk: whyAsk || "Helps you make a more informed decision with your provider.",
    };
  }

  return null;
}

function normalizeWhatToAskProvider(
  raw: unknown,
  providerProfile: ProviderProfile,
): { provider: string; questions: Array<{ question: string; whyAsk: string }> } {
  const base =
    typeof raw === "object" && raw !== null ? (raw as Record<string, unknown>) : {};

  const rawQuestions =
    base.questions ?? base.items ?? base.questionsToAsk ?? base.list;

  const questions = ensureArray<unknown>(rawQuestions)
    .map(normalizeQuestionItem)
    .filter((item): item is { question: string; whyAsk: string } => item !== null);

  if (questions.length === 0) {
    return {
      provider: String(base.provider ?? providerProfile.displayName),
      questions: providerProfile.questionsToAsk.slice(0, 5).map((question) => ({
        question,
        whyAsk: "This question is commonly useful for businesses using this provider.",
      })),
    };
  }

  return {
    provider: String(base.provider ?? providerProfile.displayName),
    questions,
  };
}

export function normalizeDeepAssessmentResponse(
  parsed: Record<string, unknown>,
  providerProfile: ProviderProfile,
): Record<string, unknown> {
  return {
    ...parsed,
    whatToAskProvider: normalizeWhatToAskProvider(parsed.whatToAskProvider, providerProfile),
  };
}
