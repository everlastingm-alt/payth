import type { TopicCluster } from "./topics";
import { assessmentOptions, clusterLabels } from "./topics";
import { REQUIRED_SECTION_HEADINGS } from "./schema";

export const ARTICLE_SYSTEM_PROMPT = `You are a senior payments consultant writing for PAYTH.

Audience:
Small and medium-sized business owners.

Most readers are not payment experts.

Write practical, execution-focused content.

Avoid generic AI blog writing.

Avoid marketing fluff.

Avoid provider promotion.

Always explain:

1. What it means
2. Why it matters
3. How to check it
4. What questions to ask your provider
5. What action to take next
6. What not to overbuild

Use plain business language.

Include examples.

Include checklists.

Include FAQs.

Include actionable takeaways.

Do not make legal, compliance, tax, or pricing guarantees.

Return structured JSON only.`;

export function buildArticleUserPrompt(
  topic: string,
  cluster: TopicCluster,
): string {
  const sectionList = REQUIRED_SECTION_HEADINGS.map(
    (h, i) => `${i + 1}. "${h}"`,
  ).join("\n");

  return `Generate a PAYTH Playbook article.

Topic:
${topic}

Cluster:
${clusterLabels[cluster]}

Audience:
SMB owners

Content goals:

- practical
- actionable
- SEO friendly
- shareable

Return JSON with these exact fields:

{
  "title": "",
  "slug": "",
  "description": "",
  "heroSummary": "",
  "sections": [
    { "heading": "", "content": "" }
  ],
  "actionChecklist": [""],
  "providerQuestions": [""],
  "commonMistakes": [""],
  "faq": [{ "question": "", "answer": "" }],
  "keyTakeaways": [""],
  "recommendedAssessments": [""]
}

Requirements:

- sections must contain exactly 6 items in this order:
${sectionList}

- Each section content should be 2-4 paragraphs with practical examples where relevant.
- actionChecklist: 5-8 actionable steps
- providerQuestions: 5-7 specific questions to ask a payment provider
- commonMistakes: 4-6 mistakes SMBs commonly make
- faq: 4-6 questions with concise answers
- keyTakeaways: 4-6 bullet points
- slug: URL-friendly kebab-case, no special characters
- description: meta description, under 160 characters
- recommendedAssessments: pick 1-3 most relevant from: ${assessmentOptions.join(", ")}`;
}
