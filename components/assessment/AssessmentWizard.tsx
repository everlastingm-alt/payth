"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import PaythButton from "@/components/payth/PaythButton";
import PaythHeader from "@/components/payth/PaythHeader";
import { SectionTitle } from "@/components/payth/Typography";
import { getQuestionForStep } from "@/lib/assessment/flows";
import type {
  AssessmentAnswers,
  AssessmentPhase,
  BusinessType,
  StepIndex,
} from "@/lib/assessment/types";
import { SESSION_STORAGE_KEY } from "@/lib/assessment/types";
import type { AssessmentResult } from "@/lib/assessment/schema";
import AssessmentProgress from "./AssessmentProgress";
import LoadingScreen from "./LoadingScreen";
import QuestionScreen from "./QuestionScreen";

const AUTO_ADVANCE_MS = 300;

export default function AssessmentWizard() {
  const router = useRouter();
  const [phase, setPhase] = useState<AssessmentPhase>("question");
  const [currentStep, setCurrentStep] = useState<StepIndex>(1);
  const [businessType, setBusinessType] = useState<BusinessType | null>(null);
  const [answers, setAnswers] = useState<AssessmentAnswers>({
    businessType: "other",
  });
  const [error, setError] = useState<string | null>(null);
  const [isApiDone, setIsApiDone] = useState(false);

  const question = getQuestionForStep(businessType, currentStep);

  const saveAnswer = useCallback(
    (questionId: string, value: string | string[]) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    [],
  );

  const goToLoading = useCallback(
    async (finalAnswers: AssessmentAnswers) => {
      setPhase("loading");
      setIsApiDone(false);
      setError(null);

      try {
        const response = await fetch("/api/assessment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessType: finalAnswers.businessType,
            answers: finalAnswers,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error ?? "Failed to generate assessment");
        }

        const result: AssessmentResult = await response.json();

        sessionStorage.setItem(
          SESSION_STORAGE_KEY,
          JSON.stringify({
            businessType: finalAnswers.businessType,
            answers: finalAnswers,
            result,
            completedAt: new Date().toISOString(),
          }),
        );

        setIsApiDone(true);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
        setPhase("error");
      }
    },
    [],
  );

  const advanceStep = useCallback(
    (updatedAnswers: AssessmentAnswers) => {
      if (currentStep < 5) {
        setCurrentStep((prev) => (prev + 1) as StepIndex);
      } else {
        goToLoading(updatedAnswers);
      }
    },
    [currentStep, goToLoading],
  );

  const handleSelect = (optionId: string) => {
    if (!question) return;

    if (question.id === "businessType") {
      const type = optionId as BusinessType;
      setBusinessType(type);
      const updated = { ...answers, businessType: type };
      setAnswers(updated);
      setTimeout(() => advanceStep(updated), AUTO_ADVANCE_MS);
      return;
    }

    if (question.multiSelect) {
      const current = (answers[question.id] as string[]) ?? [];
      const updated = current.includes(optionId)
        ? current.filter((id) => id !== optionId)
        : [...current, optionId];
      saveAnswer(question.id, updated);
      return;
    }

    const updated = { ...answers, [question.id]: optionId };
    setAnswers(updated);
    setTimeout(() => advanceStep(updated), AUTO_ADVANCE_MS);
  };

  const handleContinue = () => {
    if (!question?.multiSelect) return;
    const selected = answers[question.id] as string[] | undefined;
    if (!selected?.length) return;
    advanceStep(answers);
  };

  const handleLoadingComplete = () => {
    router.push("/results");
  };

  const getSelectedValue = (): string | string[] => {
    if (!question) return "";
    if (question.id === "businessType") {
      return businessType ?? "";
    }
    const value = answers[question.id];
    if (question.multiSelect) {
      return (value as string[]) ?? [];
    }
    return (value as string) ?? "";
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-payth-bg">
      <PaythHeader
        className="shrink-0"
        secondaryAction={{ href: "/", label: "Exit" }}
      />

      {phase === "question" && <AssessmentProgress currentStep={currentStep} />}

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden px-6 py-8">
        {phase === "question" && question && (
          <QuestionScreen
            question={question}
            selected={getSelectedValue()}
            onSelect={handleSelect}
            onContinue={handleContinue}
          />
        )}

        {phase === "loading" && (
          <LoadingScreen onComplete={handleLoadingComplete} isApiDone={isApiDone} />
        )}

        {phase === "error" && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <SectionTitle>Something went wrong</SectionTitle>
            <p className="mt-3 text-payth-muted">{error}</p>
            <PaythButton
              onClick={() => goToLoading(answers)}
              className="mt-8 px-8 py-4"
            >
              Try Again
            </PaythButton>
          </div>
        )}
      </main>
    </div>
  );
}
