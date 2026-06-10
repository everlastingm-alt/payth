import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type PaythButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  href?: string;
  children: ReactNode;
  className?: string;
};

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-[15px] font-bold leading-none transition";

const variantClasses = {
  primary:
    "payth-gradient-bg text-white shadow-payth-primary hover:bg-[#1D4ED8] hover:opacity-95",
  secondary:
    "border border-payth-border bg-white text-payth-navy hover:bg-slate-50",
};

export default function PaythButton({
  variant = "primary",
  href,
  children,
  className = "",
  ...props
}: PaythButtonProps) {
  const classes = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
