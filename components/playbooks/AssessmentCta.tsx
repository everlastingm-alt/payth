import { ArrowRight, Sparkles } from "lucide-react";
import PaythButton from "@/components/payth/PaythButton";
import { LabelText, SectionTitle, SmallText } from "@/components/payth/Typography";

export default function AssessmentCta({
  recommendedAssessments,
}: {
  recommendedAssessments: string[];
}) {
  return (
    <section className="rounded-payth-card border border-payth-border bg-payth-blueSoft/30 p-8 text-center shadow-payth-card md:p-10">
      <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full border border-payth-border bg-white/80 px-4 py-2">
        <Sparkles size={16} className="text-payth-blue" strokeWidth={2} />
        <LabelText className="text-payth-indigo">Free Assessment</LabelText>
      </div>

      <SectionTitle as="h2" className="md:text-[28px]">
        Want to know what applies to your business?
      </SectionTitle>

      <SmallText className="mx-auto mt-3 max-w-xl text-[15px]">
        Run your free PAYTH Assessment and get practical recommendations tailored to your
        business type.
      </SmallText>

      {recommendedAssessments.length > 0 && (
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {recommendedAssessments.map((assessment) => (
            <span
              key={assessment}
              className="rounded-full border border-payth-border bg-white px-3 py-1 text-payth-body-sm font-medium text-payth-navy"
            >
              {assessment}
            </span>
          ))}
        </div>
      )}

      <PaythButton href="/assessment" className="mt-8 px-8 py-4">
        Run Your Free PAYTH Assessment
        <ArrowRight size={20} />
      </PaythButton>
    </section>
  );
}
