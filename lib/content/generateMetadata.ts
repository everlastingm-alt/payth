import {
  METADATA_SYSTEM_PROMPT,
  buildMetadataUserPrompt,
} from "./metadataPrompts";
import { callJsonModel } from "./openai";
import { seoMetadataSchema, type PlaybookArticleDraft, type SeoMetadata } from "./schema";

export async function generateMetadata(
  topic: string,
  article: PlaybookArticleDraft,
): Promise<SeoMetadata> {
  const raw = await callJsonModel<{ seo: unknown }>(
    METADATA_SYSTEM_PROMPT,
    buildMetadataUserPrompt({
      topic,
      title: article.title,
      description: article.description,
      heroSummary: article.heroSummary,
      keyTakeaways: article.keyTakeaways,
    }),
    0.5,
  );

  return seoMetadataSchema.parse(raw.seo);
}
