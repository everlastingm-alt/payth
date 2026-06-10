import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import { quickResultIcons } from "@/lib/assessment/iconMap";
import LevelBadge from "../LevelBadge";
import ResultSection from "../ResultSection";
import { CardTitle, SmallText } from "@/components/payth/Typography";

export default function OpportunityCard({
  data,
}: {
  data: DeepAssessmentResult["biggestOpportunity"];
}) {
  return (
    <ResultSection
      title="Biggest Opportunity"
      icon={quickResultIcons.opportunity}
      iconTone="mint"
      accent="mint"
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <CardTitle as="h4">{data.title}</CardTitle>
        <LevelBadge level={data.impact} />
      </div>
      <SmallText>{data.why}</SmallText>
      <p className="mt-3 text-[15px] font-semibold text-payth-opportunity">
        <span className="font-bold text-payth-navy">Action: </span>
        {data.action}
      </p>
    </ResultSection>
  );
}
