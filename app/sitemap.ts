import type { MetadataRoute } from "next";
import { listPlaybooks } from "@/lib/content/registry";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://payth.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const playbooks = await listPlaybooks("published");

  const playbookEntries: MetadataRoute.Sitemap = playbooks.map((playbook) => ({
    url: `${SITE_URL}/playbooks/${playbook.slug}`,
    lastModified: new Date(playbook.generatedAt),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/playbooks`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/assessment`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...playbookEntries,
  ];
}
