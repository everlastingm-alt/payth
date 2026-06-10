import type { ReactNode } from "react";
import {
  isBulletList,
  parseListItems,
  renderContentParagraphs,
} from "@/lib/content/renderContent";

interface PlaybookSectionProps {
  heading: string;
  content: string;
  icon?: ReactNode;
}

export default function PlaybookSection({
  heading,
  content,
  icon,
}: PlaybookSectionProps) {
  const paragraphs = renderContentParagraphs(content);

  return (
    <section className="rounded-payth-card border border-payth-border bg-white p-6 shadow-payth-card md:p-8">
      <div className="mb-4 flex items-center gap-2">
        {icon}
        <h2 className="font-heading text-[28px] font-bold leading-[1.25] text-payth-navy">
          {heading}
        </h2>
      </div>

      <div className="space-y-4">
        {paragraphs.map((paragraph, index) =>
          isBulletList(paragraph) ? (
            <ul
              key={index}
              className="list-disc space-y-2 pl-5 text-[16px] leading-[1.6] text-[#334155]"
            >
              {parseListItems(paragraph).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p key={index} className="text-[16px] leading-[1.7] text-[#334155]">
              {paragraph}
            </p>
          ),
        )}
      </div>
    </section>
  );
}
