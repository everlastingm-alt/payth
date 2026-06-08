import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import PaythLogo from "@/components/PaythLogo";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col bg-payth-bg text-payth-navy">
      <Header />

      <section className="relative flex flex-1 items-center overflow-hidden px-6 py-16">
        <div className="absolute left-1/2 top-1/3 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-200/40 blur-3xl" />
        <div className="absolute right-0 top-1/4 -z-10 h-[420px] w-[420px] rounded-full bg-blue-200/40 blur-3xl" />

        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-wider text-payth-indigo shadow-sm md:text-sm">
            <Sparkles size={16} />
            AI-powered payments advisor
          </div>

          <h1 className="text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Is Your Payment Setup{" "}
            <span className="bg-gradient-to-r from-payth-purple to-payth-blue bg-clip-text text-transparent">
              Holding You Back?
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-slate-600 md:text-xl">
            Get a personalized payment assessment in under 60 seconds.
          </p>

          <p className="mt-3 text-base leading-7 text-payth-muted md:text-lg">
            Discover opportunities to increase sales, reduce costs, and prepare
            for growth.
          </p>

          <div className="mt-10">
            <Link
              href="/assessment"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-payth-purple to-payth-blue px-8 py-4 text-lg font-bold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95"
            >
              Get My Free Assessment <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

function Header() {
  return (
    <header className="border-b border-slate-200/70 bg-white/80 px-6 py-4 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4">
        <Link href="/" aria-label="PAYTH home">
          <PaythLogo />
        </Link>

        <Link
          href="/assessment"
          className="rounded-xl bg-gradient-to-r from-payth-purple to-payth-blue px-4 py-3 text-sm font-bold text-white shadow-md transition hover:opacity-95 md:px-5"
        >
          Get My Free Assessment
        </Link>
      </div>
    </header>
  );
}
