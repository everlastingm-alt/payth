import type { ReactNode } from "react";

export function getColumnCount(itemCount: number): number {
  if (itemCount <= 1) return 1;
  if (itemCount === 2) return 2;
  return 3;
}

export function gridColsClass(count: number): string {
  const cols = getColumnCount(count);
  if (cols === 1) return "grid-cols-1";
  if (cols === 2) return "grid-cols-1 md:grid-cols-2";
  return "grid-cols-1 md:grid-cols-3";
}

interface DynamicCardGridProps {
  count: number;
  children: ReactNode;
  className?: string;
}

export default function DynamicCardGrid({
  count,
  children,
  className = "",
}: DynamicCardGridProps) {
  return (
    <div className={`grid items-stretch gap-4 ${gridColsClass(count)} ${className}`}>
      {children}
    </div>
  );
}

export function DynamicCardGridItem({ children }: { children: ReactNode }) {
  return <div className="h-full">{children}</div>;
}
