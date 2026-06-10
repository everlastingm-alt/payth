import type { PlaybookArticle } from "@/lib/content/schema";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://payth.com";

export default function PlaybookJsonLd({
  article,
}: {
  article: PlaybookArticle;
}) {
  const url = `${SITE_URL}/playbooks/${article.slug}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.imagePath
      ? `${SITE_URL}${article.imagePath}`
      : undefined,
    datePublished: article.generatedAt,
    dateModified: article.generatedAt,
    author: {
      "@type": "Organization",
      name: "PAYTH",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "PAYTH",
      url: SITE_URL,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: article.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
