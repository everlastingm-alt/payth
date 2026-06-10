import Link from "next/link";
import PaythButton from "@/components/payth/PaythButton";
import PaythLogo from "@/components/PaythLogo";

type PaythHeaderProps = {
  activeNav?: "playbooks";
  secondaryAction?: { href: string; label: string };
  className?: string;
};

export default function PaythHeader({
  activeNav,
  secondaryAction,
  className = "",
}: PaythHeaderProps) {
  return (
    <header
      className={`relative border-b border-payth-border bg-white/80 px-6 py-4 backdrop-blur-xl ${className}`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" aria-label="PAYTH home">
          <PaythLogo />
        </Link>

        <nav className="flex items-center gap-3 sm:gap-4">
          {secondaryAction && (
            <Link
              href={secondaryAction.href}
              className="text-sm font-semibold text-payth-muted transition hover:text-payth-blue"
            >
              {secondaryAction.label}
            </Link>
          )}
          <Link
            href="/playbooks"
            className={`text-sm font-semibold transition ${
              activeNav === "playbooks"
                ? "text-payth-blue"
                : "text-payth-muted hover:text-payth-navy"
            }`}
          >
            Playbooks
          </Link>
          <PaythButton href="/assessment" className="px-4 py-3 md:px-5">
            Get My Free Assessment
          </PaythButton>
        </nav>
      </div>
    </header>
  );
}
