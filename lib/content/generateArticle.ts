import {
  ARTICLE_SYSTEM_PROMPT,
  buildArticleUserPrompt,
} from "./articlePrompts";
import { callJsonModel } from "./openai";
import {
  playbookArticleDraftSchema,
  slugify,
  type PlaybookArticleDraft,
} from "./schema";
import type { TopicCluster } from "./topics";
import { playbookExists } from "./registry";

function normalizeToString(value: unknown): string {
  if (typeof value === "string") return value;
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join("\n");
  }
  return String(value ?? "");
}

function normalizeArticleRaw(raw: Record<string, unknown>): Record<string, unknown> {
  const normalized = { ...raw };

  if (!normalized.imagePrompt) {
    normalized.imagePrompt = "";
  }

  if (Array.isArray(normalized.sections)) {
    normalized.sections = normalized.sections.map((section) => {
      if (typeof section !== "object" || section === null) return section;
      const s = section as Record<string, unknown>;
      return {
        ...s,
        content: normalizeToString(s.content),
        heading: normalizeToString(s.heading),
      };
    });
  }

  for (const key of [
    "actionChecklist",
    "providerQuestions",
    "commonMistakes",
    "keyTakeaways",
    "recommendedAssessments",
  ] as const) {
    if (Array.isArray(normalized[key])) {
      normalized[key] = (normalized[key] as unknown[]).map((item) =>
        normalizeToString(item),
      );
    }
  }

  if (Array.isArray(normalized.faq)) {
    normalized.faq = normalized.faq.map((item) => {
      if (typeof item !== "object" || item === null) return item;
      const f = item as Record<string, unknown>;
      return {
        question: normalizeToString(f.question),
        answer: normalizeToString(f.answer),
      };
    });
  }

  return normalized;
}

export async function generateArticle(
  topic: string,
  cluster: TopicCluster,
): Promise<PlaybookArticleDraft> {
  const raw = await callJsonModel<Record<string, unknown>>(
    ARTICLE_SYSTEM_PROMPT,
    buildArticleUserPrompt(topic, cluster),
  );

  if (!raw.slug || typeof raw.slug !== "string") {
    raw.slug = slugify(String(raw.title ?? topic));
  }

  let slug = slugify(String(raw.slug));
  let suffix = 1;
  while (await playbookExists(slug)) {
    slug = `${slugify(String(raw.slug))}-${suffix}`;
    suffix++;
  }
  raw.slug = slug;

  return playbookArticleDraftSchema.parse(normalizeArticleRaw(raw));
}
