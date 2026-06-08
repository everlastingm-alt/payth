interface ResultSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export default function ResultSection({
  title,
  children,
  className = "",
}: ResultSectionProps) {
  return (
    <section
      className={`rounded-2xl border border-payth-border bg-white p-6 shadow-sm ${className}`}
    >
      <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-payth-muted">
        {title}
      </h3>
      {children}
    </section>
  );
}
