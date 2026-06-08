import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import LevelBadge from "../LevelBadge";
import ResultSection from "../ResultSection";

type PlaybookItem = DeepAssessmentResult["actionPlaybook"][number];

export default function ActionPlaybook({
  actions,
}: {
  actions: DeepAssessmentResult["actionPlaybook"];
}) {
  return (
    <ResultSection title="Action Playbook">
      <DynamicCardGrid count={actions.length}>
        {actions.map((item) => (
          <DynamicCardGridItem key={item.action}>
            <PlaybookCard item={item} />
          </DynamicCardGridItem>
        ))}
      </DynamicCardGrid>
    </ResultSection>
  );
}

function PlaybookCard({ item }: { item: PlaybookItem }) {
  return (
    <div className="flex h-full flex-col rounded-xl border border-payth-border bg-slate-50 p-5">
      <div className="flex flex-wrap items-center gap-3">
        <LevelBadge level={item.priority} />
        <span className="text-xs font-semibold text-payth-muted">{item.estimatedEffort}</span>
      </div>

      <h4 className="mt-3 text-lg font-black text-payth-navy">{item.action}</h4>

      <p className="mt-2 text-sm leading-6 text-slate-600">
        <span className="font-semibold text-payth-navy">Why: </span>
        {item.why}
      </p>

      <div className="mt-4">
        <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">How to do it</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {item.howToDoIt.map((step) => (
            <li key={step} className="text-sm text-slate-600">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-4 text-sm text-slate-600">
        <span className="font-semibold text-payth-navy">Who to contact: </span>
        {item.whoToContact}
      </p>

      {item.questionsToAsk.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">Ask</p>
          <ul className="mt-2 space-y-1">
            {item.questionsToAsk.map((q) => (
              <li key={q} className="flex items-start gap-2 text-sm text-slate-600">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-payth-indigo" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.negotiationTips && item.negotiationTips.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">
            Negotiation tips
          </p>
          <ul className="mt-2 space-y-1">
            {item.negotiationTips.map((tip) => (
              <li key={tip} className="text-sm text-slate-600">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.providerFeaturesToReview && item.providerFeaturesToReview.length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-wide text-payth-muted">
            Features to review
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.providerFeaturesToReview.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-payth-indigo"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      <p className="mt-4 text-sm text-slate-600">
        <span className="font-semibold text-payth-navy">Success metric: </span>
        {item.successMetric}
      </p>
    </div>
  );
}
