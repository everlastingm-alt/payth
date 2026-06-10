import type { ReactNode } from "react";

type PaythCardProps = {
  children: ReactNode;
  className?: string;
};

export default function PaythCard({ children, className = "" }: PaythCardProps) {
  return (
    <div
      className={`rounded-payth-card border border-payth-border bg-white shadow-payth-card ${className}`}
    >
      {children}
    </div>
  );
}
