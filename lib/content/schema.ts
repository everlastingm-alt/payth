import { z } from "zod";
import { topicClusters } from "./topics";

export const REQUIRED_SECTION_HEADINGS = [
  "What It Means",
  "Why It Matters",
  "How To Check",
  "What To Ask Your Provider",
  "Common Mistakes",
  "Action Checklist",
] as const;

const clusterKeys = Object.keys(topicClusters) as [
  keyof typeof topicClusters,
  ...Array<keyof typeof topicClusters>,
];

export const playbookSectionSchema = z.object({
  heading: z.string().min(1),
  content: z.string().min(1),
});

export const faqItemSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export const seoMetadataSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.array(z.string()).min(1),
  ogTitle: z.string().min(1),
  ogDescription: z.string().min(1),
});

export const imageVisualTypeSchema = z.enum([
  "checklist",
  "benchmark",
  "framework",
  "roadmap",
]);

export const imageLabelSchema = z.object({
  text: z.string().min(1).max(40),
  sourceField: z.string().min(1),
  sourceText: z.string().min(1),
});

export const imageTextSchema = z.object({
  title: z.string().min(1).max(80),
  labels: z.array(imageLabelSchema).min(3).max(4),
  visualType: imageVisualTypeSchema,
});

export const playbookArticleDraftSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  heroSummary: z.string().min(1),
  sections: z.array(playbookSectionSchema).length(6),
  actionChecklist: z.array(z.string()).min(3),
  providerQuestions: z.array(z.string()).min(3),
  commonMistakes: z.array(z.string()).min(3),
  faq: z.array(faqItemSchema).min(3),
  keyTakeaways: z.array(z.string()).min(3),
  imagePrompt: z.string().optional().default(""),
  recommendedAssessments: z.array(z.string()).min(1).max(3),
});

export const playbookArticleSchema = playbookArticleDraftSchema
  .extend({
    cluster: z.enum(clusterKeys),
    seo: seoMetadataSchema,
    imageText: imageTextSchema.optional(),
    imagePath: z.string().nullable(),
    generatedAt: z.string(),
    status: z.enum(["draft", "published"]),
  })
  .refine(
    (data) => {
      const headings = data.sections.map((s) => s.heading.toLowerCase());
      return REQUIRED_SECTION_HEADINGS.every((required) =>
        headings.some((h) => h.includes(required.toLowerCase())),
      );
    },
    { message: "Sections must include all 6 required playbook headings" },
  );

export type ImageVisualType = z.infer<typeof imageVisualTypeSchema>;
export type ImageLabel = z.infer<typeof imageLabelSchema>;
export type ImageText = z.infer<typeof imageTextSchema>;
export type PlaybookSection = z.infer<typeof playbookSectionSchema>;
export type FaqItem = z.infer<typeof faqItemSchema>;
export type SeoMetadata = z.infer<typeof seoMetadataSchema>;
export type PlaybookArticleDraft = z.infer<typeof playbookArticleDraftSchema>;
export type PlaybookArticle = z.infer<typeof playbookArticleSchema>;

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/['']/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
