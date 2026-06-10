import { generateArticle } from "./generateArticle";
import { generateImage } from "./generateImage";
import { generateImagePrompt } from "./generateImagePrompt";
import { generateMetadata } from "./generateMetadata";
import { getPlaybookBySlug, savePlaybook } from "./registry";
import type { PlaybookArticle } from "./schema";
import type { TopicCluster } from "./topics";
import { getClusterForTopic } from "./topics";

export interface PipelineOptions {
  topic: string;
  cluster?: TopicCluster;
  skipImage?: boolean;
  status?: "draft" | "published";
}

export interface ImageOnlyOptions {
  slug: string;
}

export interface PipelineResult {
  article: PlaybookArticle;
  imageGenerated: boolean;
  imageError?: string;
}

async function generateAndAttachImage(
  article: PlaybookArticle,
): Promise<{ article: PlaybookArticle; imageGenerated: boolean; imageError?: string }> {
  let imagePath: string | null = article.imagePath;
  let imageGenerated = false;
  let imageError: string | undefined;

  try {
    console.log(`[pipeline] Extracting image text for: ${article.slug}`);
    const { imageText, imagePrompt } = await generateImagePrompt(article);

    console.log(`[pipeline] Generating image for: ${article.slug}`);
    imagePath = await generateImage(article.slug, imagePrompt);
    imageGenerated = true;

    return {
      article: { ...article, imageText, imagePrompt, imagePath },
      imageGenerated,
    };
  } catch (error) {
    imageError =
      error instanceof Error ? error.message : "Image generation failed";
    console.warn(`[pipeline] Image generation failed: ${imageError}`);
    return { article, imageGenerated, imageError };
  }
}

export async function runContentPipeline(
  options: PipelineOptions,
): Promise<PipelineResult> {
  const cluster =
    options.cluster ?? getClusterForTopic(options.topic);
  if (!cluster) {
    throw new Error(`Unknown topic: ${options.topic}`);
  }

  console.log(`[pipeline] Generating article: ${options.topic}`);
  const draft = await generateArticle(options.topic, cluster);

  console.log(`[pipeline] Generating SEO metadata for: ${draft.slug}`);
  const seo = await generateMetadata(options.topic, draft);

  let article: PlaybookArticle = {
    ...draft,
    imagePrompt: "",
    cluster,
    seo,
    imagePath: null,
    generatedAt: new Date().toISOString(),
    status: options.status ?? "draft",
  };

  let imageGenerated = false;
  let imageError: string | undefined;

  const skipImage = options.skipImage ?? true;

  if (!skipImage) {
    const result = await generateAndAttachImage(article);
    article = result.article;
    imageGenerated = result.imageGenerated;
    imageError = result.imageError;
  }

  await savePlaybook(article);
  console.log(`[pipeline] Saved: content/playbooks/${draft.slug}.json`);

  return { article, imageGenerated, imageError };
}

export async function runImageOnlyPipeline(
  options: ImageOnlyOptions,
): Promise<PipelineResult> {
  const existing = await getPlaybookBySlug(options.slug);
  if (!existing) {
    throw new Error(`Playbook not found: ${options.slug}`);
  }

  console.log(`[pipeline] Image-only regen for: ${options.slug}`);
  const result = await generateAndAttachImage(existing);

  const article: PlaybookArticle = {
    ...result.article,
    generatedAt: new Date().toISOString(),
  };

  await savePlaybook(article);
  console.log(`[pipeline] Updated: content/playbooks/${options.slug}.json`);

  return {
    article,
    imageGenerated: result.imageGenerated,
    imageError: result.imageError,
  };
}
