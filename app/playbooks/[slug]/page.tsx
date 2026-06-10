import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PlaybookHeader from "@/components/playbooks/PlaybookHeader";
import PlaybookContent from "@/components/playbooks/PlaybookContent";
import PaythBackground from "@/components/payth/PaythBackground";
import {
  getPlaybookBySlug,
  getRelatedPlaybooks,
  listPlaybooks,
} from "@/lib/content/registry";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://payth.com";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const playbooks = await listPlaybooks("published");
  return playbooks.map((playbook) => ({ slug: playbook.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getPlaybookBySlug(slug);

  if (!article || article.status !== "published") {
    return { title: "Playbook Not Found — PAYTH" };
  }

  const ogImage = article.imagePath
    ? `${SITE_URL}${article.imagePath}`
    : undefined;

  return {
    title: article.seo.title,
    description: article.seo.description,
    keywords: article.seo.keywords,
    openGraph: {
      title: article.seo.ogTitle,
      description: article.seo.ogDescription,
      type: "article",
      url: `${SITE_URL}/playbooks/${article.slug}`,
      images: ogImage ? [{ url: ogImage, width: 1792, height: 1024 }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seo.ogTitle,
      description: article.seo.ogDescription,
      images: ogImage ? [ogImage] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/playbooks/${article.slug}`,
    },
  };
}

export default async function PlaybookPage({ params }: PageProps) {
  const { slug } = await params;
  const article = await getPlaybookBySlug(slug);

  if (!article || article.status !== "published") {
    notFound();
  }

  const relatedPlaybooks = await getRelatedPlaybooks(slug);

  return (
    <main className="relative min-h-screen bg-payth-bg text-payth-navy">
      <PaythBackground />
      <PlaybookHeader />

      <article className="relative mx-auto max-w-4xl px-6 py-10">
        <PlaybookContent
          article={article}
          relatedPlaybooks={relatedPlaybooks}
        />
      </article>
    </main>
  );
}
