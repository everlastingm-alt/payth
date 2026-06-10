export function renderContentParagraphs(content: string): string[] {
  return content
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function isBulletList(paragraph: string): boolean {
  return /^[-*•]\s/m.test(paragraph) || /^\d+\.\s/m.test(paragraph);
}

export function parseListItems(paragraph: string): string[] {
  return paragraph
    .split(/\n/)
    .map((line) => line.replace(/^[-*•]\s+/, "").replace(/^\d+\.\s+/, "").trim())
    .filter(Boolean);
}
