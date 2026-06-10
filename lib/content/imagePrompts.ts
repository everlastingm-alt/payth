import type { PlaybookArticleDraft } from "./schema";
import type { ImageText, ImageVisualType } from "./schema";
import type { TopicCluster } from "./topics";

export const IMAGE_TEXT_SYSTEM_PROMPT = `You are a PAYTH image text editor. You select and shorten text for playbook infographic images.

Rules:
- You are NOT a content author. Every word in the output must come from the provided article fields.
- Select 1 title and 3-4 card labels from the article content only.
- Each label must be at most 4 English words.
- Do NOT invent words, tips, formulas, or sentences not present in the source article.
- Do NOT add descriptions or body text for the image.
- Each label must include sourceField (e.g. "actionChecklist[0]") and sourceText (the original text you derived from).
- The label text must use words that appear in sourceText.
- If you cannot find 4 suitable labels, return 3. Never fabricate a 4th label.
- Choose visualType based on cluster guidance in the user prompt.

Return structured JSON only.`;

export function inferVisualType(cluster?: TopicCluster): ImageVisualType {
  switch (cluster) {
    case "costOptimization":
      return "checklist";
    case "paymentVisibility":
      return "benchmark";
    case "decisionFrameworks":
      return "framework";
    case "growthReadiness":
      return "roadmap";
    default:
      return "checklist";
  }
}

export function buildImageTextUserPrompt(
  article: PlaybookArticleDraft,
  cluster?: TopicCluster,
): string {
  const suggestedType = inferVisualType(cluster);

  return `Extract image text from this PAYTH Playbook article. All output text must come from these fields only.

Topic cluster: ${cluster ?? "unknown"}
Suggested visualType: ${suggestedType}

Article JSON:
${JSON.stringify(
  {
    title: article.title,
    heroSummary: article.heroSummary,
    keyTakeaways: article.keyTakeaways,
    actionChecklist: article.actionChecklist,
    providerQuestions: article.providerQuestions,
    commonMistakes: article.commonMistakes,
    sections: article.sections.map((s) => ({
      heading: s.heading,
      content: s.content.slice(0, 500),
    })),
  },
  null,
  2,
)}

Return JSON:
{
  "imageText": {
    "title": "",
    "labels": [
      { "text": "", "sourceField": "", "sourceText": "" }
    ],
    "visualType": "${suggestedType}"
  }
}

Requirements:
- title: use article.title (truncate to 8 words max if needed, do not rephrase)
- labels: pick 3-4 items, priority order:
  1. actionChecklist items (shorten to ≤4 words using words from the item)
  2. providerQuestions (extract key fee/metric phrase)
  3. keyTakeaways (only if checklist insufficient)
  4. commonMistakes (only if still insufficient)
- Each label text ≤4 words, copied or shortened from sourceText only
- visualType: one of checklist, benchmark, framework, roadmap`;
}

export function buildImagePromptFromText(imageText: ImageText): string {
  const labelLines = imageText.labels
    .map((label, i) => `${i + 1}. "${label.text}"`)
    .join("\n");

  const layoutHint =
    imageText.visualType === "framework"
      ? "pillar framework diagram"
      : imageText.visualType === "benchmark"
        ? "benchmark metric dashboard"
        : imageText.visualType === "roadmap"
          ? "roadmap timeline"
          : "checklist card layout";

  return `Educational fintech infographic for PAYTH Playbook.
RENDER EXACTLY AND ONLY the following text. Copy verbatim. Do not paraphrase. Do not add any other words.

TITLE: "${imageText.title}"

LABELS (one per card, no other text on cards):
${labelLines}

Layout: ${imageText.labels.length} equal cards in one row, ${layoutHint}.
Each card: Lucide-style icon above label only. No sentences. No tips. No formulas. No descriptions.
Safe area: 10% padding on all sides. Content must not be cropped at edges.
White background. Blue #2563EB and cyan #06B6D4 accents. Rounded cards.
Minimal modern SaaS design. Professional SMB audience.
No people. No photos. No stock imagery. Landscape 16:9.`;
}
