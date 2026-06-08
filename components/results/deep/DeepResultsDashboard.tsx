import Link from "next/link";
import { ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";
import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import LevelBadge from "../LevelBadge";
import ResultSection from "../ResultSection";
import ActionPlaybook from "./ActionPlaybook";
import BenchmarkGaps from "./BenchmarkGaps";
import InsightList from "./InsightList";
import OpportunityCard from "./OpportunityCard";
import ProviderQuestions from "./ProviderQuestions";
import RiskCard from "./RiskCard";

interface DeepResultsDashboardProps {
  result: DeepAssessmentResult;
}

export default function DeepResultsDashboard({ result }: DeepResultsDashboardProps) {
  return (
    <div className="space-y-6">
      <ResultSection title="Business Profile">
        <p className="leading-7 text-slate-600">{result.businessProfile.summary}</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <ProfileItem label="Type" value={result.businessProfile.businessType} />
          <ProfileItem label="Stage" value={result.businessProfile.stage} />
          <ProfileItem label="Provider" value={result.businessProfile.currentProvider} />
          <ProfileItem label="Complexity" value={result.businessProfile.paymentComplexity} />
        </div>
      </ResultSection>

      <div className="grid gap-6 md:grid-cols-2">
        <OpportunityCard data={result.biggestOpportunity} />
        <RiskCard data={result.biggestRisk} />
      </div>

      <InsightList insights={result.keyInsights} />
      <BenchmarkGaps benchmark={result.benchmarkComparison} />

      <ActionPlaybook actions={result.actionPlaybook} />
      <ProviderQuestions data={result.whatToAskProvider} />

      <ResultSection title="What To Investigate Next">
        <DynamicCardGrid count={result.investigateNext.length}>
          {result.investigateNext.map((item) => (
            <DynamicCardGridItem key={item.question}>
              <div className="h-full rounded-xl border border-payth-border bg-slate-50 p-4">
                <h4 className="font-bold text-payth-navy">{item.question}</h4>
                <p className="mt-2 text-sm text-slate-600">{item.why}</p>
                <p className="mt-2 text-xs text-payth-muted">{item.howToCheck}</p>
              </div>
            </DynamicCardGridItem>
          ))}
        </DynamicCardGrid>
      </ResultSection>

      <ResultSection title="Not Needed Yet">
        <DynamicCardGrid count={result.notNeededYet.length}>
          {result.notNeededYet.map((item) => (
            <DynamicCardGridItem key={item.item}>
              <div className="flex h-full gap-3 rounded-xl border border-payth-border bg-slate-50 p-4">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
                <div>
                  <span className="font-bold text-payth-navy">{item.item}</span>
                  <span className="text-slate-600"> — {item.reason}</span>
                </div>
              </div>
            </DynamicCardGridItem>
          ))}
        </DynamicCardGrid>
      </ResultSection>

      {result.growthRoadmap.length > 0 && (
        <div className="rounded-2xl border border-payth-border bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-black uppercase tracking-wider text-payth-muted">
            Growth Roadmap
          </h3>
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
        </div>
      )}

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

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Link
          href="/results"
          className="inline-flex items-center gap-2 rounded-xl border border-payth-border bg-white px-6 py-3 font-bold text-payth-navy transition hover:bg-slate-50"
        >
          View Quick Result
        </Link>
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
