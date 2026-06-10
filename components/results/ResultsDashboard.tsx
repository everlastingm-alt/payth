import { ArrowRight, Ban, RefreshCw, ShieldCheck } from "lucide-react";
import PaythButton from "@/components/payth/PaythButton";
import { CardTitle, LabelText, PageTitle, SmallText } from "@/components/payth/Typography";
import { quickResultIcons } from "@/lib/assessment/iconMap";
import type { AssessmentResult } from "@/lib/assessment/schema";
import LevelBadge from "./LevelBadge";
import ResultSection from "./ResultSection";

interface ResultsDashboardProps {
  result: AssessmentResult;
}

export default function ResultsDashboard({ result }: ResultsDashboardProps) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <PageTitle>{result.executiveSummary.headline}</PageTitle>
        <SmallText className="mx-auto mt-4 max-w-2xl text-[15px] leading-[1.55]">
          {result.executiveSummary.summary}
        </SmallText>
      </div>

      <ResultSection title="Business Profile">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <ProfileItem label="Stage" value={result.businessProfile.stage} />
          <ProfileItem label="Environment" value={result.businessProfile.environment} />
          <ProfileItem label="Market Focus" value={result.businessProfile.marketFocus} />
          <ProfileItem label="Complexity" value={result.businessProfile.complexity} />
        </div>
      </ResultSection>

      <ResultSection title="What's Working Well">
        <CardTitle as="h4">{result.workingWell.title}</CardTitle>
        <SmallText className="mt-2">{result.workingWell.description}</SmallText>
      </ResultSection>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultSection
          title="Biggest Opportunity"
          icon={quickResultIcons.opportunity}
          iconTone="mint"
          accent="mint"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="text-[20px] font-bold leading-[1.3] text-payth-navy">
              {result.biggestOpportunity.title}
            </h4>
            <LevelBadge level={result.biggestOpportunity.impact} />
          </div>
          <SmallText>{result.biggestOpportunity.description}</SmallText>
          <p className="mt-3 text-[15px] font-semibold text-payth-opportunity">
            {result.biggestOpportunity.whyItMatters}
          </p>
        </ResultSection>

        <ResultSection
          title="Biggest Risk"
          icon={quickResultIcons.risk}
          iconTone="amber"
          accent="amber"
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="text-[20px] font-bold leading-[1.3] text-payth-navy">
              {result.biggestRisk.title}
            </h4>
            <LevelBadge level={result.biggestRisk.severity} />
          </div>
          <SmallText>{result.biggestRisk.description}</SmallText>
          <p className="mt-3 text-[15px] font-semibold text-payth-risk">
            {result.biggestRisk.whyItMatters}
          </p>
        </ResultSection>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultSection title="Do Now" icon={quickResultIcons.doNow} iconTone="blue">
          <ul className="space-y-4">
            {result.recommendedNow.map((item) => (
              <li key={item.title} className="border-b border-payth-border pb-4 last:border-0 last:pb-0">
                <h4 className="font-bold text-payth-navy">{item.title}</h4>
                <SmallText className="mt-1">{item.reason}</SmallText>
              </li>
            ))}
          </ul>
        </ResultSection>

        <ResultSection title="Do Later" icon={quickResultIcons.doLater} iconTone="blue">
          <ul className="space-y-4">
            {result.recommendedLater.map((item) => (
              <li
                key={item.recommendation}
                className="border-b border-payth-border pb-4 last:border-0 last:pb-0"
              >
                <LabelText>When: {item.trigger}</LabelText>
                <h4 className="mt-1 font-bold text-payth-navy">{item.recommendation}</h4>
                <SmallText className="mt-1">{item.reason}</SmallText>
              </li>
            ))}
          </ul>
        </ResultSection>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultSection title="Quick Wins">
          {result.quickWins.length > 0 ? (
            <div className="space-y-3">
              {result.quickWins.map((win) => (
                <div
                  key={win.action}
                  className="rounded-xl border border-payth-border bg-slate-50 p-4"
                >
                  <h4 className="font-bold text-payth-navy">{win.action}</h4>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <LevelBadge level={win.impact} />
                    <span className="rounded-full bg-slate-200 px-3 py-1 font-mono text-xs font-bold text-slate-600">
                      Effort: {win.effort}
                    </span>
                  </div>
                  <SmallText className="mt-2">{win.expectedBenefit}</SmallText>
                </div>
              ))}
            </div>
          ) : (
            <SmallText>No quick wins identified for your profile yet.</SmallText>
          )}
        </ResultSection>

        <ResultSection
          title="Not Needed Yet"
          icon={quickResultIcons.notNeededYet}
          iconTone="blue"
        >
          <ul className="space-y-3">
            {result.notNeededYet.map((item) => (
              <li key={item.item} className="flex gap-3">
                <Ban size={16} className="mt-0.5 shrink-0 text-payth-muted" strokeWidth={2} />
                <div className="text-payth-body-sm leading-[1.45] text-payth-muted">
                  <span className="font-bold text-payth-navy">{item.item}</span>
                  <span> — {item.reason}</span>
                </div>
              </li>
            ))}
          </ul>
        </ResultSection>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultSection title="Businesses Like Yours">
          <p className="font-bold text-payth-navy">{result.peerBenchmark.segment}</p>
          <LabelText className="mt-3 block">Commonly used</LabelText>
          <div className="mt-2 flex flex-wrap gap-2">
            {result.peerBenchmark.commonlyUsed.map((provider) => (
              <span
                key={provider}
                className="rounded-full bg-payth-blueSoft px-3 py-1 text-sm font-semibold text-payth-blue"
              >
                {provider}
              </span>
            ))}
          </div>
          <SmallText className="mt-4">
            <span className="font-semibold text-payth-navy">Most common next upgrade: </span>
            {result.peerBenchmark.mostCommonNextUpgrade}
          </SmallText>
        </ResultSection>

        <ResultSection title="Growth Roadmap">
          <div className="space-y-2">
            {result.growthRoadmap.map((phase, index) => (
              <div key={phase.trigger} className="flex gap-4">
                <div className="flex flex-col items-center pt-1">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      index === 0 ? "bg-payth-blue payth-active-dot" : "bg-payth-border"
                    }`}
                  />
                  {index < result.growthRoadmap.length - 1 && (
                    <div className="mt-1 w-0.5 flex-1 bg-[#DBEAFE] opacity-35" style={{ minHeight: "24px" }} />
                  )}
                </div>
                <div className="pb-4">
                  <LabelText>{phase.trigger}</LabelText>
                  <h4 className="mt-1 text-payth-card font-bold text-payth-navy">{phase.focus}</h4>
                  <ul className="mt-2 space-y-1">
                    {phase.actions.map((action) => (
                      <li key={action} className="flex items-start gap-2 text-payth-body-sm leading-[1.45] text-payth-muted">
                        <ArrowRight size={14} className="mt-0.5 shrink-0 text-payth-blue" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </ResultSection>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-payth-card border border-payth-border bg-payth-blueSoft/40 p-6 text-center shadow-payth-card">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-payth-blue" size={20} strokeWidth={2} />
          <LabelText>Recommendation Confidence</LabelText>
        </div>
        <LevelBadge level={result.confidence.level} />
        <SmallText className="max-w-xl">{result.confidence.reason}</SmallText>
      </div>

      <div className="rounded-payth-card border border-payth-border bg-payth-blueSoft/30 p-8 text-center shadow-payth-card">
        <LabelText className="text-payth-blue">Quick Assessment Ready</LabelText>
        <CardTitle className="mt-2">Want deeper insights?</CardTitle>
        <SmallText className="mx-auto mt-3 max-w-lg">
          Answer 3–5 more questions to get specific recommendations.
        </SmallText>
        <SmallText className="mx-auto mt-1 max-w-lg">
          Answer 4 more questions to uncover cost, conversion, and risk opportunities.
        </SmallText>
        <PaythButton href="/assessment/deep" className="mt-6 px-8 py-4">
          Unlock Deeper Insights <ArrowRight size={18} />
        </PaythButton>
      </div>

      <div className="flex justify-center pt-4">
        <PaythButton variant="secondary" href="/assessment" className="px-6 py-3">
          <RefreshCw size={18} />
          Retake Assessment
        </PaythButton>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <LabelText>{label}</LabelText>
      <p className="mt-1 font-bold text-payth-navy">{value}</p>
    </div>
  );
}
