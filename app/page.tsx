import { ArrowRight, Sparkles } from "lucide-react";
import PaythBackground from "@/components/payth/PaythBackground";
import PaythButton from "@/components/payth/PaythButton";
import PaythHeader from "@/components/payth/PaythHeader";
import LandingPathMotif from "@/components/payth/LandingPathMotif";
import { BodyText, DisplayTitle } from "@/components/payth/Typography";

export default function HomePage() {
  return (
    <main className="relative flex min-h-screen flex-col bg-payth-bg text-payth-navy">
      <PaythBackground />
      <PaythHeader />

      <section className="relative flex flex-1 items-center overflow-hidden px-6 py-16">
        <div className="mx-auto w-full max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-payth-border bg-white/70 px-4 py-2 shadow-sm">
            <Sparkles size={16} className="text-payth-blue" strokeWidth={2} />
            <span className="text-payth-label font-bold uppercase tracking-[0.08em] text-payth-indigo">
              AI-powered payments advisor
            </span>
          </div>

          <DisplayTitle>
            Is Your Payment Setup{" "}
            <span className="payth-gradient-text">Holding You Back?</span>
          </DisplayTitle>

          <BodyText className="mx-auto mt-6 max-w-[680px] text-payth-body-lg">
            Get a personalized payment assessment in under 60 seconds.
          </BodyText>

          <BodyText className="mx-auto mt-3 max-w-[680px]">
            Discover opportunities to increase sales, reduce costs, and prepare for growth.
          </BodyText>

          <div className="mx-auto mt-8 max-w-lg">
            <LandingPathMotif />
          </div>

          <div className="mt-10">
            <PaythButton href="/assessment" className="px-8 py-4 text-[15px]">
              Get My Free Assessment <ArrowRight size={20} />
            </PaythButton>
          </div>
        </div>
      </section>
    </main>
  );
}
