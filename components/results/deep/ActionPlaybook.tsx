import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import { ClipboardCheck } from "lucide-react";
import { deepResultIcons } from "@/lib/assessment/iconMap";
import { CardTitle, LabelText, SmallText } from "@/components/payth/Typography";
import DynamicCardGrid, { DynamicCardGridItem } from "../DynamicCardGrid";
import LevelBadge from "../LevelBadge";
import ResultSection from "../ResultSection";

type PlaybookItem = DeepAssessmentResult["actionPlaybook"][number];

const priorityBorder: Record<string, string> = {
  High: "border-l-payth-blue",
  Medium: "border-l-payth-risk",
  Low: "border-l-payth-muted",
};

export default function ActionPlaybook({
  actions,
}: {
  actions: DeepAssessmentResult["actionPlaybook"];
}) {
  return (
    <ResultSection title="Action Playbook" icon={deepResultIcons.actionPlaybook}>
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
  const borderClass = priorityBorder[item.priority] ?? "border-l-payth-muted";

  return (
    <div
      className={`flex h-full flex-col rounded-xl border border-payth-border border-l-4 bg-slate-50 p-5 ${borderClass}`}
    >
      <div className="flex flex-wrap items-center gap-3">
        <LevelBadge level={item.priority} />
        <span className="font-mono text-xs font-semibold text-payth-muted">{item.estimatedEffort}</span>
      </div>

      <div className="mt-3 flex items-start gap-3">
        <ClipboardCheck size={20} className="mt-0.5 shrink-0 text-payth-blue" strokeWidth={2} />
        <CardTitle as="h4">{item.action}</CardTitle>
      </div>

      <div className="mt-3">
        <LabelText>Why</LabelText>
        <SmallText className="mt-1">{item.why}</SmallText>
      </div>

      <div className="mt-4">
        <LabelText>How to do it</LabelText>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          {item.howToDoIt.map((step) => (
            <li key={step} className="text-payth-body-sm leading-[1.45] text-payth-muted">
              {step}
            </li>
          ))}
        </ol>
      </div>

      <SmallText className="mt-4">
        <span className="font-semibold text-payth-navy">Who to contact: </span>
        {item.whoToContact}
      </SmallText>

      {item.questionsToAsk.length > 0 && (
        <div className="mt-4">
          <LabelText>Questions to ask</LabelText>
          <ul className="mt-2 space-y-1">
            {item.questionsToAsk.map((q) => (
              <li key={q} className="flex items-start gap-2 text-payth-body-sm leading-[1.45] text-payth-muted">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-payth-blue" />
                {q}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.negotiationTips && item.negotiationTips.length > 0 && (
        <div className="mt-4">
          <LabelText>Negotiation tips</LabelText>
          <ul className="mt-2 space-y-1">
            {item.negotiationTips.map((tip) => (
              <li key={tip} className="text-payth-body-sm leading-[1.45] text-payth-muted">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {item.providerFeaturesToReview && item.providerFeaturesToReview.length > 0 && (
        <div className="mt-4">
          <LabelText>Features to review</LabelText>
          <div className="mt-2 flex flex-wrap gap-2">
            {item.providerFeaturesToReview.map((feature) => (
              <span
                key={feature}
                className="rounded-full bg-payth-blueSoft px-3 py-1 text-sm font-semibold text-payth-blue"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-4">
        <LabelText>Success metric</LabelText>
        <SmallText className="mt-1">{item.successMetric}</SmallText>
      </div>
    </div>
  );
}
