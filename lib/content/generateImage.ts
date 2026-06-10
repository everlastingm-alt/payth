import fs from "fs/promises";
import path from "path";
import type OpenAI from "openai";
import { getOpenAIClient } from "./openai";

const PUBLIC_PLAYBOOKS_DIR = path.join(process.cwd(), "public", "playbooks");

const IMAGE_MODEL_FALLBACKS = ["gpt-image-1.5", "gpt-image-1", "dall-e-3"];

export function getImageModel(): string {
  return process.env.OPENAI_IMAGE_MODEL ?? "gpt-image-1.5";
}

export function getImageQuality(): "low" | "medium" | "high" | "auto" {
  const quality = process.env.OPENAI_IMAGE_QUALITY ?? "high";
  if (quality === "low" || quality === "medium" || quality === "high" || quality === "auto") {
    return quality;
  }
  return "high";
}

export function getImageModelCandidates(): string[] {
  const primary = getImageModel();
  return [...new Set([primary, ...IMAGE_MODEL_FALLBACKS])];
}

export function isGptImageModel(model: string): boolean {
  return model.startsWith("gpt-image");
}

function getImageSize(
  model: string,
): "1024x1024" | "1536x1024" | "1792x1024" {
  if (model === "dall-e-3") return "1792x1024";
  if (isGptImageModel(model)) return "1536x1024";
  return "1024x1024";
}

async function imageDataToBuffer(
  item: OpenAI.Images.Image | undefined,
): Promise<Buffer> {
  if (!item) {
    throw new Error("Image API returned no image data");
  }

  if (item.b64_json) {
    return Buffer.from(item.b64_json, "base64");
  }

  if (item.url) {
    const imageResponse = await fetch(item.url);
    if (!imageResponse.ok) {
      throw new Error(`Failed to download image: ${imageResponse.statusText}`);
    }
    return Buffer.from(await imageResponse.arrayBuffer());
  }

  throw new Error("Image API returned neither b64_json nor url");
}

async function generateWithModel(
  model: string,
  imagePrompt: string,
): Promise<Buffer> {
  const openai = getOpenAIClient();
  const size = getImageSize(model);
  const quality = getImageQuality();

  const response = await openai.images.generate({
    model,
    prompt: imagePrompt,
    n: 1,
    size,
    ...(isGptImageModel(model)
      ? { quality, output_format: "png" as const }
      : {}),
    ...(model === "dall-e-3" ? { quality: "standard" as const } : {}),
  });

  return imageDataToBuffer(response.data?.[0]);
}

export async function ensurePlaybooksImageDir(): Promise<void> {
  await fs.mkdir(PUBLIC_PLAYBOOKS_DIR, { recursive: true });
}

export async function generateImage(
  slug: string,
  imagePrompt: string,
): Promise<string> {
  await ensurePlaybooksImageDir();

  const candidates = getImageModelCandidates();
  let lastError: Error | undefined;

  for (const model of candidates) {
    try {
      console.log(`[image] Trying model: ${model}`);
      const buffer = await generateWithModel(model, imagePrompt);
      const filename = `${slug}.png`;
      const filePath = path.join(PUBLIC_PLAYBOOKS_DIR, filename);
      await fs.writeFile(filePath, buffer);
      return `/playbooks/${filename}`;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      console.warn(`[image] Model ${model} failed: ${lastError.message}`);
    }
  }

  throw lastError ?? new Error("Image generation failed");
}
