import { ArrowRight, RefreshCw, ShieldCheck } from "lucide-react";
import PaythButton from "@/components/payth/PaythButton";
import { deepResultIcons } from "@/lib/assessment/iconMap";
import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import { LabelText, SmallText } from "@/components/payth/Typography";
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
        <SmallText>{result.businessProfile.summary}</SmallText>
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

      <ResultSection title="What To Investigate Next" icon={deepResultIcons.investigateNext}>
        <DynamicCardGrid count={result.investigateNext.length}>
          {result.investigateNext.map((item) => (
            <DynamicCardGridItem key={item.question}>
              <div className="h-full rounded-xl border border-payth-border bg-slate-50 p-4">
                <h4 className="font-bold text-payth-navy">{item.question}</h4>
                <SmallText className="mt-2">{item.why}</SmallText>
                <SmallText className="mt-2 text-payth-muted">{item.howToCheck}</SmallText>
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
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-payth-border" />
                <div className="text-payth-body-sm leading-[1.45] text-payth-muted">
                  <span className="font-bold text-payth-navy">{item.item}</span>
                  <span> — {item.reason}</span>
                </div>
              </div>
            </DynamicCardGridItem>
          ))}
        </DynamicCardGrid>
      </ResultSection>

      {result.growthRoadmap.length > 0 && (
        <ResultSection title="Growth Roadmap" icon={deepResultIcons.growthRoadmap}>
          <div className="space-y-1">
            {result.growthRoadmap.map((phase, index) => (
              <div key={phase.trigger} className="flex gap-4">
                <div className="flex flex-col items-center pt-1">
                  <div
                    className={`h-2.5 w-2.5 rounded-full ${
                      index === 0 ? "bg-payth-blue payth-active-dot" : "bg-payth-border"
                    }`}
                  />
                  {index < result.growthRoadmap.length - 1 && (
                    <div
                      className="mt-1 w-0.5 flex-1 bg-[#DBEAFE] opacity-35"
                      style={{ minHeight: "24px" }}
                    />
                  )}
                </div>
                <div className="pb-4">
                  <LabelText>{phase.trigger}</LabelText>
                  <h4 className="mt-1 text-payth-card font-bold text-payth-navy">{phase.focus}</h4>
                  <ul className="mt-2 space-y-1">
                    {phase.actions.map((action) => (
                      <li
                        key={action}
                        className="flex items-start gap-2 text-payth-body-sm leading-[1.45] text-payth-muted"
                      >
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
      )}

      <div className="flex flex-col items-center gap-4 rounded-payth-card border border-payth-border bg-payth-blueSoft/40 p-6 text-center shadow-payth-card">
        <div className="flex items-center gap-2">
          <ShieldCheck className="text-payth-blue" size={20} strokeWidth={2} />
          <LabelText>Recommendation Confidence</LabelText>
        </div>
        <LevelBadge level={result.confidence.level} />
        <SmallText className="max-w-xl">{result.confidence.reason}</SmallText>
      </div>

      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <PaythButton variant="secondary" href="/results" className="px-6 py-3">
          View Quick Result
        </PaythButton>
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
