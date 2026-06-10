import { MessageCircle } from "lucide-react";
import { SectionTitle } from "@/components/payth/Typography";

export default function PlaybookProviderQuestions({
  questions,
}: {
  questions: string[];
}) {
  return (
    <section className="rounded-payth-card border border-payth-border bg-white p-6 shadow-payth-card md:p-8">
      <div className="mb-4 flex items-center gap-2">
        <MessageCircle size={22} className="text-payth-blue" strokeWidth={2} />
        <SectionTitle as="h2" className="md:text-[28px]">
          What To Ask Your Provider
        </SectionTitle>
      </div>

      <ol className="space-y-3">
        {questions.map((question, index) => (
          <li
            key={question}
            className="rounded-payth-card border border-payth-border bg-slate-50 p-4 text-[16px] leading-[1.6] text-[#334155]"
          >
            <span className="font-mono font-bold text-payth-blue">{index + 1}. </span>
            <span className="font-semibold text-payth-navy">{question}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
