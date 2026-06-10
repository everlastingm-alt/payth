import { ArrowRight } from "lucide-react";
import PaythButton from "@/components/payth/PaythButton";
import { PageTitle } from "@/components/payth/Typography";
import { getBusinessTypeIcon } from "@/lib/assessment/iconMap";
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
      <PageTitle className="leading-[1.12]">{question.title}</PageTitle>

      <div className="mt-8 flex flex-1 flex-col gap-3 overflow-y-auto pb-4">
        {question.options.map((option) => {
          const isSelected = question.multiSelect
            ? selectedArray.includes(option.id)
            : selected === option.id;

          const icon = option.iconKey ? getBusinessTypeIcon(option.iconKey) : undefined;

          return (
            <OptionCard
              key={option.id}
              label={option.label}
              icon={icon}
              selected={isSelected}
              onClick={() => onSelect(option.id)}
            />
          );
        })}
      </div>

      {question.multiSelect && (
        <div className="mt-4 shrink-0 pb-2">
          <PaythButton
            onClick={onContinue}
            disabled={!canContinue}
            className="w-full px-8 py-4 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continue <ArrowRight size={20} />
          </PaythButton>
        </div>
      )}
    </div>
  );
}
