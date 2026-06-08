import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import ResultSection from "../ResultSection";
import InsightCard from "./InsightCard";

export default function InsightList({
  insights,
}: {
  insights: DeepAssessmentResult["keyInsights"];
}) {
  return (
    <ResultSection title="What We Found">
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
