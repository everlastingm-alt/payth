import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { PlaybookArticle } from "@/lib/content/schema";
import { CardTitle, SectionTitle, SmallText } from "@/components/payth/Typography";

export default function RelatedPlaybooks({
  playbooks,
}: {
  playbooks: PlaybookArticle[];
}) {
  if (playbooks.length === 0) return null;

  return (
    <section className="rounded-payth-card border border-payth-border bg-white p-6 shadow-payth-card md:p-8">
      <SectionTitle as="h2" className="mb-6 md:text-[28px]">
        Related Playbooks
      </SectionTitle>

      <div className="grid gap-4 md:grid-cols-3">
        {playbooks.map((playbook) => (
          <Link
            key={playbook.slug}
            href={`/playbooks/${playbook.slug}`}
            className="group rounded-payth-card border border-payth-border bg-slate-50 p-5 transition hover:border-payth-blue hover:shadow-payth-card"
          >
            <CardTitle as="h3" className="group-hover:text-payth-blue">
              {playbook.title}
            </CardTitle>
            <SmallText className="mt-2 line-clamp-2">{playbook.description}</SmallText>
            <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-payth-blue">
              Read playbook <ArrowRight size={14} />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
