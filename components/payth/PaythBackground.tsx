type PaythBackgroundProps = {
  className?: string;
};

export default function PaythBackground({ className = "" }: PaythBackgroundProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute -left-24 -top-24 h-[480px] w-[480px] rounded-full opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(37,99,235,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute -right-24 -top-16 h-[480px] w-[480px] rounded-full opacity-100"
        style={{
          background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
        }}
      />
    </div>
  );
}
