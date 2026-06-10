import fs from "fs/promises";
import path from "path";
import { playbookArticleSchema, type PlaybookArticle } from "./schema";

const CONTENT_PLAYBOOKS_DIR = path.join(process.cwd(), "content", "playbooks");

export async function ensurePlaybooksContentDir(): Promise<void> {
  await fs.mkdir(CONTENT_PLAYBOOKS_DIR, { recursive: true });
}

export function getPlaybookPath(slug: string): string {
  return path.join(CONTENT_PLAYBOOKS_DIR, `${slug}.json`);
}

export async function playbookExists(slug: string): Promise<boolean> {
  try {
    await fs.access(getPlaybookPath(slug));
    return true;
  } catch {
    return false;
  }
}

export async function savePlaybook(article: PlaybookArticle): Promise<void> {
  await ensurePlaybooksContentDir();
  const validated = playbookArticleSchema.parse(article);
  await fs.writeFile(
    getPlaybookPath(validated.slug),
    JSON.stringify(validated, null, 2),
    "utf-8",
  );
}

export async function getPlaybookBySlug(
  slug: string,
): Promise<PlaybookArticle | null> {
  try {
    const raw = await fs.readFile(getPlaybookPath(slug), "utf-8");
    return playbookArticleSchema.parse(JSON.parse(raw));
  } catch {
    return null;
  }
}

export async function listPlaybooks(
  status?: "draft" | "published",
): Promise<PlaybookArticle[]> {
  await ensurePlaybooksContentDir();

  let files: string[];
  try {
    files = await fs.readdir(CONTENT_PLAYBOOKS_DIR);
  } catch {
    return [];
  }

  const articles: PlaybookArticle[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const raw = await fs.readFile(
      path.join(CONTENT_PLAYBOOKS_DIR, file),
      "utf-8",
    );
    const article = playbookArticleSchema.parse(JSON.parse(raw));
    if (!status || article.status === status) {
      articles.push(article);
    }
  }

  return articles.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getRelatedPlaybooks(
  slug: string,
  limit = 3,
): Promise<PlaybookArticle[]> {
  const current = await getPlaybookBySlug(slug);
  if (!current) return [];

  const all = await listPlaybooks("published");
  return all
    .filter((a) => a.slug !== slug && a.cluster === current.cluster)
    .slice(0, limit);
}
