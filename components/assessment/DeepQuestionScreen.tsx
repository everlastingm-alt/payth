import { BodyText, PageTitle } from "@/components/payth/Typography";
import type { DeepQuestion } from "@/lib/assessment/types";
import OptionCard from "./OptionCard";

interface DeepQuestionScreenProps {
  question: DeepQuestion;
  selected: string;
  onSelect: (option: string) => void;
}

export default function DeepQuestionScreen({
  question,
  selected,
  onSelect,
}: DeepQuestionScreenProps) {
  return (
    <div className="flex h-full flex-col">
      <PageTitle className="leading-[1.12]">{question.question}</PageTitle>

      {question.whyWeAsk && (
        <BodyText className="mt-4 max-w-[560px] rounded-xl border border-payth-blueSoft bg-payth-blueSoft/50 px-4 py-3 leading-[1.45] text-payth-indigo">
          {question.whyWeAsk}
        </BodyText>
      )}

      <div className="mt-8 flex flex-1 flex-col gap-3 overflow-y-auto pb-4">
        {question.options?.map((option) => (
          <OptionCard
            key={option}
            label={option}
            selected={selected === option}
            onClick={() => onSelect(option)}
          />
        ))}
      </div>
    </div>
  );
}
