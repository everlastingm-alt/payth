import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import IconCircle from "@/components/payth/IconCircle";
import { LabelText } from "@/components/payth/Typography";

interface ResultSectionProps {
  title: string;
  icon?: LucideIcon;
  iconTone?: "blue" | "mint" | "amber" | "red";
  accent?: "default" | "mint" | "amber";
  children: ReactNode;
  className?: string;
}

const accentClasses = {
  default: "border-payth-border bg-white",
  mint: "border-payth-opportunity/20 bg-payth-opportunityBg/30",
  amber: "border-payth-risk/20 bg-payth-riskBg/30",
};

export default function ResultSection({
  title,
  icon,
  iconTone = "blue",
  accent = "default",
  children,
  className = "",
}: ResultSectionProps) {
  return (
    <section
      className={`rounded-payth-card border p-6 shadow-payth-card ${accentClasses[accent]} ${className}`}
    >
      <div className="mb-4 flex items-center gap-3">
        {icon && <IconCircle icon={icon} size="default" tone={iconTone} />}
        <LabelText as="h3">{title}</LabelText>
      </div>
      {children}
    </section>
  );
}
