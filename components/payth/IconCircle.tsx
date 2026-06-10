import type { LucideIcon } from "lucide-react";

type IconCircleProps = {
  icon: LucideIcon;
  size?: "default" | "card" | "hero";
  tone?: "blue" | "mint" | "amber" | "red";
  className?: string;
};

const sizeMap = {
  default: { container: "h-10 w-10", icon: 20 },
  card: { container: "h-12 w-12", icon: 24 },
  hero: { container: "h-14 w-14", icon: 32 },
};

const toneMap = {
  blue: { bg: "bg-payth-blueSoft", text: "text-payth-blue" },
  mint: { bg: "bg-payth-mintSoft", text: "text-payth-opportunity" },
  amber: { bg: "bg-payth-amberSoft", text: "text-payth-risk" },
  red: { bg: "bg-payth-redSoft", text: "text-payth-critical" },
};

export default function IconCircle({
  icon: Icon,
  size = "default",
  tone = "blue",
  className = "",
}: IconCircleProps) {
  const { container, icon } = sizeMap[size];
  const { bg, text } = toneMap[tone];

  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full ${container} ${bg} ${className}`}
    >
      <Icon className={text} size={icon} strokeWidth={2} />
    </div>
  );
}
