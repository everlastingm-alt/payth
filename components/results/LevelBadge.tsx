type Level = "High" | "Medium" | "Low";

const styles: Record<Level, string> = {
  High: "bg-orange-100 text-orange-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-emerald-100 text-emerald-700",
};

export default function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${styles[level]}`}
    >
      {level}
    </span>
  );
}
