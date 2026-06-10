import PathMotif from "@/components/payth/PathMotif";

interface AssessmentProgressProps {
  currentStep: number;
  totalSteps?: number;
}

const PROGRESS_STEPS = ["Assessment", "Insight", "Action", "Growth"];

export default function AssessmentProgress({
  currentStep,
  totalSteps = 5,
}: AssessmentProgressProps) {
  const motifStep = Math.min(
    PROGRESS_STEPS.length - 1,
    Math.floor(((currentStep - 1) / Math.max(totalSteps - 1, 1)) * (PROGRESS_STEPS.length - 1)),
  );

  return (
    <div className="shrink-0 border-b border-payth-border bg-white px-6 py-3">
      <div className="mx-auto flex max-w-2xl justify-center">
        <PathMotif
          steps={PROGRESS_STEPS}
          activeStep={motifStep}
          showLabels={false}
          className="opacity-80"
        />
      </div>
    </div>
  );
}
