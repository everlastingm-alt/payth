import Link from "next/link";
import { ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";
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
        <h1 className="text-3xl font-black text-payth-navy md:text-4xl">
          {result.executiveSummary.headline}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          {result.executiveSummary.summary}
        </p>
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
        <h4 className="text-xl font-black text-payth-navy">{result.workingWell.title}</h4>
        <p className="mt-3 leading-7 text-slate-600">{result.workingWell.description}</p>
      </ResultSection>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultSection title="Biggest Opportunity">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="text-xl font-black text-payth-navy">
              {result.biggestOpportunity.title}
            </h4>
            <LevelBadge level={result.biggestOpportunity.impact} />
          </div>
          <p className="leading-7 text-slate-600">{result.biggestOpportunity.description}</p>
          <p className="mt-3 text-sm font-semibold text-payth-indigo">
            {result.biggestOpportunity.whyItMatters}
          </p>
        </ResultSection>

        <ResultSection title="Biggest Risk">
          <div className="mb-3 flex items-center justify-between gap-2">
            <h4 className="text-xl font-black text-payth-navy">
              {result.biggestRisk.title}
            </h4>
            <LevelBadge level={result.biggestRisk.severity} />
          </div>
          <p className="leading-7 text-slate-600">{result.biggestRisk.description}</p>
          <p className="mt-3 text-sm font-semibold text-payth-indigo">
            {result.biggestRisk.whyItMatters}
          </p>
        </ResultSection>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultSection title="Do Now">
          <ul className="space-y-4">
            {result.recommendedNow.map((item) => (
              <li key={item.title} className="border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                <h4 className="font-bold text-payth-navy">{item.title}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.reason}</p>
              </li>
            ))}
          </ul>
        </ResultSection>

        <ResultSection title="Do Later">
          <ul className="space-y-4">
            {result.recommendedLater.map((item) => (
              <li
                key={item.recommendation}
                className="border-b border-slate-100 pb-4 last:border-0 last:pb-0"
              >
                <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">
                  When: {item.trigger}
                </p>
                <h4 className="mt-1 font-bold text-payth-navy">{item.recommendation}</h4>
                <p className="mt-1 text-sm leading-6 text-slate-600">{item.reason}</p>
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
                    <span className="rounded-full bg-slate-200 px-3 py-1 text-xs font-bold text-slate-600">
                      Effort: {win.effort}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600">{win.expectedBenefit}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-slate-500">
              No quick wins identified for your profile yet.
            </p>
          )}
        </ResultSection>

        <ResultSection title="Not Needed Yet">
          <ul className="space-y-3">
            {result.notNeededYet.map((item) => (
              <li key={item.item} className="flex gap-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                <div>
                  <span className="font-bold text-payth-navy">{item.item}</span>
                  <span className="text-slate-600"> — {item.reason}</span>
                </div>
              </li>
            ))}
          </ul>
        </ResultSection>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <ResultSection title="Businesses Like Yours">
          <p className="font-bold text-payth-navy">{result.peerBenchmark.segment}</p>
          <p className="mt-3 text-sm text-payth-muted">Commonly used:</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {result.peerBenchmark.commonlyUsed.map((provider) => (
              <span
                key={provider}
                className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-payth-indigo"
              >
                {provider}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            <span className="font-semibold text-payth-navy">Most common next upgrade: </span>
            {result.peerBenchmark.mostCommonNextUpgrade}
          </p>
        </ResultSection>

        <ResultSection title="Growth Roadmap">
          <div className="space-y-4">
            {result.growthRoadmap.map((phase) => (
              <div key={phase.trigger} className="border-l-4 border-payth-indigo pl-4">
                <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">
                  {phase.trigger}
                </p>
                <h4 className="mt-1 text-base font-black text-payth-navy">{phase.focus}</h4>
                <ul className="mt-2 space-y-1">
                  {phase.actions.map((action) => (
                    <li key={action} className="flex items-start gap-2 text-sm text-slate-600">
                      <ArrowRight size={14} className="mt-0.5 shrink-0 text-payth-indigo" />
                      {action}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ResultSection>
      </div>

      <div className="flex flex-col items-center gap-4 rounded-2xl border border-payth-border bg-gradient-to-br from-indigo-50 to-blue-50 p-6 text-center">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-payth-indigo" size={20} />
          <span className="text-sm font-bold uppercase tracking-wider text-payth-muted">
            Recommendation Confidence
          </span>
        </div>
        <LevelBadge level={result.confidence.level} />
        <p className="max-w-xl text-slate-600">{result.confidence.reason}</p>
      </div>

      <div className="rounded-2xl border border-payth-border bg-gradient-to-br from-indigo-50 to-blue-50 p-8 text-center">
        <p className="text-sm font-bold uppercase tracking-wider text-payth-indigo">
          Quick Assessment Ready
        </p>
        <h3 className="mt-2 text-2xl font-black text-payth-navy">
          Want deeper insights?
        </h3>
        <p className="mx-auto mt-3 max-w-lg text-slate-600">
          Answer 3–5 more questions to get specific recommendations.
        </p>
        <p className="mx-auto mt-1 max-w-lg text-sm text-payth-muted">
          Answer 4 more questions to uncover cost, conversion, and risk opportunities.
        </p>
        <Link
          href="/assessment/deep"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-payth-purple to-payth-blue px-8 py-4 font-bold text-white shadow-lg shadow-blue-500/20 transition hover:opacity-95"
        >
          Unlock Deeper Insights <ArrowRight size={18} />
        </Link>
      </div>

      <div className="flex justify-center pt-4">
        <Link
          href="/assessment"
          className="inline-flex items-center gap-2 rounded-xl border border-payth-border bg-white px-6 py-3 font-bold text-payth-navy transition hover:bg-slate-50"
        >
          <RefreshCw size={18} />
          Retake Assessment
        </Link>
      </div>
    </div>
  );
}

function ProfileItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">{label}</p>
      <p className="mt-1 font-bold text-payth-navy">{value}</p>
    </div>
  );
}
