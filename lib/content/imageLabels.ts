import { z } from "zod";
import {
  IMAGE_TEXT_SYSTEM_PROMPT,
  buildImageTextUserPrompt,
  buildImagePromptFromText,
  inferVisualType,
} from "./imagePrompts";
import { callJsonModel } from "./openai";
import {
  imageTextSchema,
  type ImageText,
  type PlaybookArticle,
  type PlaybookArticleDraft,
} from "./schema";
import type { TopicCluster } from "./topics";

const imageTextResponseSchema = z.object({
  imageText: imageTextSchema,
});

function truncateToWords(text: string, maxWords: number): string {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.slice(0, maxWords).join(" ");
}

function labelWordsAppearInSource(label: string, source: string): boolean {
  const labelWords = label
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w.length > 2);
  const sourceLower = source.toLowerCase();
  return labelWords.every((word) => sourceLower.includes(word));
}

export function validateImageTextLabels(imageText: ImageText): ImageText {
  const title = truncateToWords(imageText.title, 8);

  const labels = imageText.labels.slice(0, 4).map((label) => {
    const text = truncateToWords(label.text, 4);
    if (!labelWordsAppearInSource(text, label.sourceText)) {
      const fallback = truncateToWords(label.sourceText, 4);
      return { ...label, text: fallback || text };
    }
    return { ...label, text };
  });

  return {
    ...imageText,
    title,
    labels,
  };
}

export async function extractImageText(
  article: PlaybookArticleDraft,
  cluster?: TopicCluster,
): Promise<ImageText> {
  const raw = await callJsonModel<unknown>(
    IMAGE_TEXT_SYSTEM_PROMPT,
    buildImageTextUserPrompt(article, cluster),
    0.3,
  );

  const parsed = imageTextResponseSchema.parse(raw);
  return validateImageTextLabels(parsed.imageText);
}

export function buildImagePromptForArticle(
  imageText: ImageText,
): string {
  return buildImagePromptFromText(imageText);
}

export async function prepareImageGeneration(
  article: PlaybookArticle | PlaybookArticleDraft,
): Promise<{ imageText: ImageText; imagePrompt: string }> {
  const cluster = "cluster" in article ? article.cluster : undefined;
  const imageText =
    "imageText" in article && article.imageText
      ? validateImageTextLabels(article.imageText)
      : await extractImageText(article, cluster);

  if (!imageText.visualType) {
    imageText.visualType = inferVisualType(cluster);
  }

  const imagePrompt = buildImagePromptFromText(imageText);
  return { imageText, imagePrompt };
}
