import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";

type Insight = DeepAssessmentResult["keyInsights"][number];

const depthStyles: Record<Insight["depthLevel"], string> = {
  Basic: "bg-slate-100 text-slate-600",
  Specific: "bg-indigo-50 text-payth-indigo",
  Advanced: "bg-violet-100 text-violet-700",
};

export default function InsightCard({ insight }: { insight: Insight }) {
  return (
    <div className="h-full rounded-xl border border-payth-border bg-slate-50 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">
          {insight.metric}
        </p>
        <span
          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${depthStyles[insight.depthLevel]}`}
        >
          {insight.depthLevel}
        </span>
      </div>

      <h4 className="mt-1 font-bold text-payth-navy">{insight.title}</h4>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        <span className="font-semibold text-payth-navy">Finding: </span>
        {insight.finding}
      </p>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        <span className="font-semibold text-payth-navy">Why it matters: </span>
        {insight.whyItMatters}
      </p>

      <p className="mt-2 text-sm text-slate-600">
        <span className="font-semibold text-payth-navy">Recommended action: </span>
        {insight.recommendedAction}
      </p>
    </div>
  );
}
