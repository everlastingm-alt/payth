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
      <h2 className="text-3xl font-black leading-tight tracking-tight text-payth-navy md:text-4xl">
        {question.question}
      </h2>

      {question.whyWeAsk && (
        <p className="mt-4 rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm leading-6 text-payth-indigo">
          {question.whyWeAsk}
        </p>
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
