import { ArrowRight } from "lucide-react";
import type { AssessmentQuestion } from "@/lib/assessment/types";
import OptionCard from "./OptionCard";

interface QuestionScreenProps {
  question: AssessmentQuestion;
  selected: string | string[];
  onSelect: (optionId: string) => void;
  onContinue?: () => void;
}

export default function QuestionScreen({
  question,
  selected,
  onSelect,
  onContinue,
}: QuestionScreenProps) {
  const selectedArray = Array.isArray(selected) ? selected : selected ? [selected] : [];
  const canContinue = question.multiSelect && selectedArray.length > 0;

  return (
    <div className="flex h-full flex-col">
      <h2 className="text-3xl font-black leading-tight tracking-tight text-payth-navy md:text-4xl">
        {question.title}
      </h2>

      <div className="mt-8 flex flex-1 flex-col gap-3 overflow-y-auto pb-4">
        {question.options.map((option) => {
          const isSelected = question.multiSelect
            ? selectedArray.includes(option.id)
            : selected === option.id;

          return (
            <OptionCard
              key={option.id}
              label={option.label}
              emoji={option.emoji}
              selected={isSelected}
              onClick={() => onSelect(option.id)}
            />
          );
        })}
      </div>

      {question.multiSelect && (
        <div className="mt-4 shrink-0 pb-2">
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-payth-purple to-payth-blue px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue <ArrowRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
