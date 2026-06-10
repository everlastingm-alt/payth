import type { LucideIcon } from "lucide-react";
import IconCircle from "@/components/payth/IconCircle";

interface OptionCardProps {
  label: string;
  icon?: LucideIcon;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  label,
  icon,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left transition ${
        selected
          ? "border-payth-blue bg-payth-blueSoft text-payth-blue shadow-sm"
          : "border-payth-border bg-white text-payth-navy hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {icon && <IconCircle icon={icon} size="default" tone="blue" />}
      <span className="text-[17px] font-semibold leading-[1.25]">{label}</span>
    </button>
  );
}
