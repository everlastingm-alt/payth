import { CheckSquare } from "lucide-react";
import { SectionTitle, SmallText } from "@/components/payth/Typography";

export default function PlaybookActionChecklist({
  items,
}: {
  items: string[];
}) {
  return (
    <section className="rounded-payth-card border border-payth-border bg-white p-6 shadow-payth-card md:p-8">
      <div className="mb-4 flex items-center gap-2">
        <CheckSquare size={22} className="text-payth-blue" strokeWidth={2} />
        <SectionTitle as="h2" className="md:text-[28px]">
          Action Checklist
        </SectionTitle>
      </div>

      <ul className="space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-3 rounded-payth-card border border-payth-border bg-slate-50 p-4"
          >
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 border-payth-blue bg-white" />
            <SmallText className="text-[16px] leading-[1.6] text-[#334155]">{item}</SmallText>
          </li>
        ))}
      </ul>
    </section>
  );
}
