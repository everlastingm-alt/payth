import type { ElementType, ReactNode } from "react";

type TypographyProps = {
  children: ReactNode;
  className?: string;
  as?: ElementType;
};

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function DisplayTitle({
  children,
  className = "",
  as: Tag = "h1",
}: TypographyProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-payth-display max-md:text-payth-display-mobile font-extrabold tracking-tight text-payth-ink",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function PageTitle({
  children,
  className = "",
  as: Tag = "h1",
}: TypographyProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-payth-page max-md:text-payth-page-mobile font-bold text-payth-ink",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionTitle({
  children,
  className = "",
  as: Tag = "h2",
}: TypographyProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-payth-section font-bold text-payth-navy",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function CardTitle({
  children,
  className = "",
  as: Tag = "h3",
}: TypographyProps) {
  return (
    <Tag
      className={cn(
        "font-heading text-payth-card font-bold text-payth-navy",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

export function BodyText({
  children,
  className = "",
  as: Tag = "p",
}: TypographyProps) {
  return (
    <Tag className={cn("text-payth-body text-payth-muted leading-[1.55]", className)}>
      {children}
    </Tag>
  );
}

export function SmallText({
  children,
  className = "",
  as: Tag = "p",
}: TypographyProps) {
  return (
    <Tag className={cn("text-payth-body-sm text-payth-muted leading-[1.45]", className)}>
      {children}
    </Tag>
  );
}

export function LabelText({
  children,
  className = "",
  as: Tag = "span",
}: TypographyProps) {
  return (
    <Tag
      className={cn(
        "text-payth-label uppercase font-bold tracking-[0.08em] text-payth-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
