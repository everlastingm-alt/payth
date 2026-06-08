import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import ResultSection from "../ResultSection";

export default function BenchmarkGaps({
  benchmark,
}: {
  benchmark: DeepAssessmentResult["benchmarkComparison"];
}) {
  return (
    <ResultSection title="Benchmark Gaps">
      <p className="font-bold text-payth-navy">{benchmark.segment}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{benchmark.summary}</p>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-payth-muted">
        Strong areas
      </p>
      <ul className="mt-2 space-y-1">
        {benchmark.strongAreas.map((area) => (
          <li key={area} className="text-sm text-slate-600">
            {area}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-payth-muted">
        Improvement areas
      </p>
      <ul className="mt-2 space-y-1">
        {benchmark.improvementAreas.map((area) => (
          <li key={area} className="text-sm text-slate-600">
            {area}
          </li>
        ))}
      </ul>

      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-payth-muted">
        Businesses like yours usually track
      </p>
      <div className="mt-2 flex flex-wrap gap-2">
        {benchmark.typicalSetup.map((item) => (
          <span
            key={item}
            className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-payth-indigo"
          >
            {item}
          </span>
        ))}
      </div>

      {benchmark.gapsToCheck.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">
            Possible gaps
          </p>
          <DynamicCardGrid count={benchmark.gapsToCheck.length} className="mt-3">
            {benchmark.gapsToCheck.map((gap) => (
              <DynamicCardGridItem key={gap.gap}>
                <div className="h-full rounded-xl border border-amber-200 bg-amber-50 p-4">
                  <p className="font-bold text-payth-navy">{gap.gap}</p>
                  <p className="mt-1 text-sm text-slate-600">{gap.whyItMatters}</p>
                  <p className="mt-2 text-sm text-slate-600">
                    <span className="font-semibold text-payth-navy">How to check: </span>
                    {gap.howToCheck}
                  </p>
                </div>
              </DynamicCardGridItem>
            ))}
          </DynamicCardGrid>
        </div>
      )}

      <p className="mt-4 text-sm text-slate-600">
        <span className="font-semibold text-payth-navy">Most common next upgrade: </span>
        {benchmark.nextCommonUpgrade}
      </p>
    </ResultSection>
  );
}
