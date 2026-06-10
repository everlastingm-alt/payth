import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import { quickResultIcons } from "@/lib/assessment/iconMap";
import { CardTitle, SmallText } from "@/components/payth/Typography";
import LevelBadge from "../LevelBadge";
import ResultSection from "../ResultSection";

export default function RiskCard({
  data,
}: {
  data: DeepAssessmentResult["biggestRisk"];
}) {
  return (
    <ResultSection
      title="Biggest Risk"
      icon={quickResultIcons.risk}
      iconTone="amber"
      accent="amber"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <CardTitle as="h4">{data.title}</CardTitle>
        <LevelBadge level={data.severity} />
      </div>
      <SmallText>{data.why}</SmallText>
      <p className="mt-3 text-[15px] font-semibold text-payth-risk">
        <span className="font-bold text-payth-navy">Action: </span>
        {data.action}
      </p>
    </ResultSection>
  );
}
