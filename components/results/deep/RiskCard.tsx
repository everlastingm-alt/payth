import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import LevelBadge from "../LevelBadge";
import ResultSection from "../ResultSection";

export default function RiskCard({
  data,
}: {
  data: DeepAssessmentResult["biggestRisk"];
}) {
  return (
    <ResultSection title="Biggest Risk">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h4 className="text-xl font-black text-payth-navy">{data.title}</h4>
        <LevelBadge level={data.severity} />
      </div>
      <p className="leading-7 text-slate-600">{data.why}</p>
      <p className="mt-3 text-sm font-semibold text-payth-indigo">
        <span className="font-bold text-payth-navy">Action: </span>
        {data.action}
      </p>
    </ResultSection>
  );
}
