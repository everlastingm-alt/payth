import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import { deepResultIcons } from "@/lib/assessment/iconMap";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import ResultSection from "../ResultSection";
import InsightCard from "./InsightCard";

export default function InsightList({
  insights,
}: {
  insights: DeepAssessmentResult["keyInsights"];
}) {
  return (
    <ResultSection title="What We Found" icon={deepResultIcons.whatWeFound}>
      <DynamicCardGrid count={insights.length}>
        {insights.map((insight) => (
          <DynamicCardGridItem key={insight.title}>
            <InsightCard insight={insight} />
          </DynamicCardGridItem>
        ))}
      </DynamicCardGrid>
    </ResultSection>
  );
}
