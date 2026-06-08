import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import ResultSection from "../ResultSection";

export default function ProviderQuestions({
  data,
}: {
  data: DeepAssessmentResult["whatToAskProvider"];
}) {
  return (
    <ResultSection title={`What To Ask ${data.provider}`}>
      <p className="mb-4 text-sm text-slate-600">
        Use these questions when contacting your provider.
      </p>
      <DynamicCardGrid count={data.questions.length}>
        {data.questions.map((item, index) => (
          <DynamicCardGridItem key={item.question}>
            <div className="h-full rounded-xl border border-payth-border bg-slate-50 p-4">
              <p className="font-bold text-payth-navy">
                {index + 1}. {item.question}
              </p>
              <p className="mt-2 text-sm text-slate-600">
                <span className="font-semibold text-payth-indigo">Why ask: </span>
                {item.whyAsk}
              </p>
            </div>
          </DynamicCardGridItem>
        ))}
      </DynamicCardGrid>
    </ResultSection>
  );
}
