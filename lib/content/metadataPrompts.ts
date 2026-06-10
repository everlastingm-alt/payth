export const METADATA_SYSTEM_PROMPT = `You are an SEO specialist for PAYTH, a payment assessment platform for SMBs.

Generate SEO metadata that is:
- Clear and specific (not generic)
- Action-oriented
- Under character limits
- Free of marketing fluff

Return structured JSON only.`;

export function buildMetadataUserPrompt(article: {
  title: string;
  description: string;
  heroSummary: string;
  keyTakeaways: string[];
  topic: string;
}): string {
  return `Generate SEO metadata for this PAYTH Playbook article.

Topic: ${article.topic}
Title: ${article.title}
Description: ${article.description}
Hero summary: ${article.heroSummary}
Key takeaways: ${article.keyTakeaways.join("; ")}

Return JSON:

{
  "seo": {
    "title": "",
    "description": "",
    "keywords": [],
    "ogTitle": "",
    "ogDescription": ""
  }
}

Requirements:
- seo.title: max 60 characters, include primary keyword
- seo.description: max 155 characters, compelling and specific
- keywords: 5-10 relevant search terms
- ogTitle: can be slightly more engaging than seo.title
- ogDescription: can be slightly longer than meta description, max 200 characters`;
}
