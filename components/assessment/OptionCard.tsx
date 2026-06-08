interface OptionCardProps {
  label: string;
  emoji?: string;
  selected: boolean;
  onClick: () => void;
}

export default function OptionCard({
  label,
  emoji,
  selected,
  onClick,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-[56px] w-full items-center gap-3 rounded-2xl border-2 px-5 py-4 text-left text-lg font-semibold transition ${
        selected
          ? "border-payth-indigo bg-indigo-50 text-payth-indigo shadow-sm"
          : "border-payth-border bg-white text-payth-navy hover:border-slate-300 hover:bg-slate-50"
      }`}
    >
      {emoji && <span className="text-2xl">{emoji}</span>}
      <span>{label}</span>
    </button>
  );
}
