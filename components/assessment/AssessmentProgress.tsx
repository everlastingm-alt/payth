interface AssessmentProgressProps {
  currentStep: number;
  totalSteps?: number;
}

export default function AssessmentProgress({
  currentStep,
  totalSteps = 5,
}: AssessmentProgressProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="h-1 w-full bg-slate-100">
      <div
        className="h-full bg-gradient-to-r from-payth-purple to-payth-blue transition-all duration-500 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
