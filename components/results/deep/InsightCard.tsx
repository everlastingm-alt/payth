import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import { LabelText, SmallText } from "@/components/payth/Typography";

type Insight = DeepAssessmentResult["keyInsights"][number];

const depthStyles: Record<Insight["depthLevel"], string> = {
  Basic: "bg-slate-100 text-slate-600",
  Specific: "bg-payth-blueSoft text-payth-blue",
  Advanced: "bg-payth-indigo/10 text-payth-indigo",
};

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div className="h-full rounded-xl border border-payth-border bg-slate-50 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <LabelText>{insight.metric}</LabelText>
        <span
          className={`rounded-full px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wide ${depthStyles[insight.depthLevel]}`}
        >
          {insight.depthLevel}
        </span>
      </div>

      <h4 className="mt-1 font-bold text-payth-navy">{insight.title}</h4>

      <SmallText className="mt-2">
        <span className="font-semibold text-payth-navy">Finding: </span>
        {insight.finding}
      </SmallText>

      <SmallText className="mt-2">
        <span className="font-semibold text-payth-navy">Why it matters: </span>
        {insight.whyItMatters}
      </SmallText>

      <SmallText className="mt-2">
        <span className="font-semibold text-payth-navy">Recommended action: </span>
        {insight.recommendedAction}
      </SmallText>
    </div>
  );
}
