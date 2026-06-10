import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import { deepResultIcons } from "@/lib/assessment/iconMap";
import { LabelText, SmallText } from "@/components/payth/Typography";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import ResultSection from "../ResultSection";

export default function BenchmarkGaps({
  benchmark,
}: {
  benchmark: DeepAssessmentResult["benchmarkComparison"];
}) {
  return (
    <ResultSection title="Benchmark Gaps" icon={deepResultIcons.benchmarkGaps}>
      <p className="font-bold text-payth-navy">{benchmark.segment}</p>
      <SmallText className="mt-2">{benchmark.summary}</SmallText>

      <LabelText className="mt-4 block">Strong areas</LabelText>
      <ul className="mt-2 space-y-1">
        {benchmark.strongAreas.map((area) => (
          <li key={area} className="text-payth-body-sm leading-[1.45] text-payth-muted">
            {area}
          </li>
        ))}
      </ul>

      <LabelText className="mt-4 block">Improvement areas</LabelText>
      <ul className="mt-2 space-y-1">
        {benchmark.improvementAreas.map((area) => (
          <li key={area} className="text-payth-body-sm leading-[1.45] text-payth-muted">
            {area}
          </li>
        ))}
      </ul>

      <LabelText className="mt-4 block">Businesses like yours usually track</LabelText>
      <div className="mt-2 flex flex-wrap gap-2">
        {benchmark.typicalSetup.map((item) => (
          <span
            key={item}
            className="rounded-full bg-payth-blueSoft px-3 py-1 text-sm font-semibold text-payth-blue"
          >
            {item}
          </span>
        ))}
      </div>

      {benchmark.gapsToCheck.length > 0 && (
        <div className="mt-6">
          <LabelText>Possible gaps</LabelText>
          <DynamicCardGrid count={benchmark.gapsToCheck.length} className="mt-3">
            {benchmark.gapsToCheck.map((gap) => (
              <DynamicCardGridItem key={gap.gap}>
                <div className="h-full rounded-xl border border-payth-risk/30 bg-payth-riskBg/50 p-4">
                  <p className="font-bold text-payth-navy">{gap.gap}</p>
                  <SmallText className="mt-1">{gap.whyItMatters}</SmallText>
                  <SmallText className="mt-2">
                    <span className="font-semibold text-payth-navy">How to check: </span>
                    {gap.howToCheck}
                  </SmallText>
                </div>
              </DynamicCardGridItem>
            ))}
          </DynamicCardGrid>
        </div>
      )}

      <SmallText className="mt-4">
        <span className="font-semibold text-payth-navy">Most common next upgrade: </span>
        {benchmark.nextCommonUpgrade}
      </SmallText>
    </ResultSection>
  );
}
