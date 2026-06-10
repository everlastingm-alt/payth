type Level = "High" | "Medium" | "Low";

const styles: Record<Level, string> = {
  High: "bg-payth-redSoft text-payth-critical",
  Medium: "bg-payth-amberSoft text-payth-risk",
  Low: "bg-payth-mintSoft text-payth-opportunity",
};

export default function LevelBadge({ level }: { level: Level }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 font-mono text-xs font-bold uppercase tracking-wide ${styles[level]}`}
    >
      {level}
    </span>
  );
}
