import { AlertTriangle } from "lucide-react";
import { SectionTitle, SmallText } from "@/components/payth/Typography";

export default function PlaybookCommonMistakes({
  mistakes,
}: {
  mistakes: string[];
}) {
  return (
    <section className="rounded-payth-card border border-payth-risk/30 bg-payth-riskBg/30 p-6 shadow-payth-card md:p-8">
      <div className="mb-4 flex items-center gap-2">
        <AlertTriangle size={22} className="text-payth-risk" strokeWidth={2} />
        <SectionTitle as="h2" className="md:text-[28px]">
          Common Mistakes
        </SectionTitle>
      </div>

      <ul className="space-y-3">
        {mistakes.map((mistake) => (
          <li key={mistake} className="flex items-start gap-3">
            <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-payth-risk" />
            <SmallText className="text-[16px] leading-[1.6] text-[#334155]">{mistake}</SmallText>
          </li>
        ))}
      </ul>
    </section>
  );
}
