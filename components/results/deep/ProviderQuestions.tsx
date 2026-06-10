import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import { deepResultIcons } from "@/lib/assessment/iconMap";
import { SmallText } from "@/components/payth/Typography";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import ResultSection from "../ResultSection";

export default function ProviderQuestions({
  data,
}: {
  data: DeepAssessmentResult["whatToAskProvider"];
}) {
  return (
    <ResultSection
      title={`What To Ask ${data.provider}`}
      icon={deepResultIcons.providerQuestions}
    >
      <SmallText className="mb-4">
        Use these questions when contacting your provider.
      </SmallText>
      <DynamicCardGrid count={data.questions.length}>
        {data.questions.map((item, index) => (
          <DynamicCardGridItem key={item.question}>
            <div className="h-full rounded-xl border border-payth-border bg-slate-50 p-4">
              <p className="font-bold text-payth-navy">
                {index + 1}. {item.question}
              </p>
              <SmallText className="mt-2">
                <span className="font-semibold text-payth-blue">Why ask: </span>
                {item.whyAsk}
              </SmallText>
            </div>
          </DynamicCardGridItem>
        ))}
      </DynamicCardGrid>
    </ResultSection>
  );
}
