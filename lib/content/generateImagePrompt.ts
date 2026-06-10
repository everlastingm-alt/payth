import { prepareImageGeneration } from "./imageLabels";
import type { ImageText } from "./schema";
import type { PlaybookArticle, PlaybookArticleDraft } from "./schema";

export interface ImageGenerationPrep {
  imageText: ImageText;
  imagePrompt: string;
}

export async function generateImagePrompt(
  article: PlaybookArticle | PlaybookArticleDraft,
): Promise<ImageGenerationPrep> {
  return prepareImageGeneration(article);
}
