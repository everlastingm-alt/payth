import Image from "next/image";
import { BookOpen } from "lucide-react";
import type { PlaybookArticle } from "@/lib/content/schema";
import { clusterLabels } from "@/lib/content/topics";
import { BodyText, DisplayTitle, LabelText } from "@/components/payth/Typography";

export default function PlaybookHero({ article }: { article: PlaybookArticle }) {
  return (
    <section className="overflow-hidden rounded-payth-card border border-payth-border bg-white shadow-payth-card">
      {article.imagePath && (
        <div className="relative aspect-[16/9] w-full bg-payth-blueSoft">
          <Image
            src={article.imagePath}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 896px) 100vw, 896px"
            priority
          />
        </div>
      )}

      <div className="p-6 md:p-10">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-payth-border bg-payth-blueSoft px-3 py-1">
          <BookOpen size={14} className="text-payth-blue" strokeWidth={2} />
          <LabelText className="text-payth-blue">{clusterLabels[article.cluster]}</LabelText>
        </div>

        <DisplayTitle className="max-md:text-payth-page max-md:text-[32px] md:text-[40px] md:leading-[1.12]">
          {article.title}
        </DisplayTitle>

        <BodyText className="mt-4 max-w-[720px] text-payth-body-lg">
          {article.heroSummary}
        </BodyText>

        {article.keyTakeaways.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.keyTakeaways.map((takeaway) => (
              <span
                key={takeaway}
                className="rounded-full border border-payth-border bg-payth-mintSoft/50 px-3 py-1 text-payth-body-sm font-medium text-payth-navy"
              >
                {takeaway}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
