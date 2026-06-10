"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import PaythButton from "@/components/payth/PaythButton";
import PaythHeader from "@/components/payth/PaythHeader";
import { BodyText, PageTitle, SectionTitle, SmallText } from "@/components/payth/Typography";
import { getDeepQuestions } from "@/lib/assessment/deepRegistry";
import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import type {
  DeepAnswer,
  DeepPhase,
  StoredAssessmentResult,
} from "@/lib/assessment/types";
import {
  DEEP_SESSION_STORAGE_KEY,
  SESSION_STORAGE_KEY,
} from "@/lib/assessment/types";
import AssessmentProgress from "./AssessmentProgress";
import DeepQuestionScreen from "./DeepQuestionScreen";
import LoadingScreen from "./LoadingScreen";

const AUTO_ADVANCE_MS = 300;

export default function DeepAssessmentWizard() {
  const router = useRouter();
  const [phase, setPhase] = useState<DeepPhase>("intro");
  const [firstLayerData, setFirstLayerData] = useState<StoredAssessmentResult | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [deepAnswers, setDeepAnswers] = useState<DeepAnswer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isApiDone, setIsApiDone] = useState(false);
  const [checking, setChecking] = useState(true);

  const businessType = firstLayerData?.businessType ?? null;
  const questions = businessType ? getDeepQuestions(businessType) : [];
  const currentQuestion = questions[currentIndex] ?? null;
  const currentAnswer = deepAnswers.find((a) => a.questionId === currentQuestion?.id)?.answer ?? "";

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) {
      router.replace("/assessment");
      return;
    }
    try {
      const parsed = JSON.parse(stored) as StoredAssessmentResult;
      setFirstLayerData(parsed);
    } catch {
      router.replace("/assessment");
      return;
    }
    setChecking(false);
  }, [router]);

  const goToLoading = useCallback(
    async (finalAnswers: DeepAnswer[]) => {
      if (!firstLayerData) return;

      setPhase("loading");
      setIsApiDone(false);
      setError(null);

      try {
        const response = await fetch("/api/assessment/deep", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            businessType: firstLayerData.businessType,
            firstLayerAnswers: firstLayerData.answers,
            deepAnswers: finalAnswers,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(data.error ?? "Failed to generate deep assessment");
        }

        const result: DeepAssessmentResult = await response.json();

        sessionStorage.setItem(
          DEEP_SESSION_STORAGE_KEY,
          JSON.stringify({
            businessType: firstLayerData.businessType,
            firstLayerAnswers: firstLayerData.answers,
            deepAnswers: finalAnswers,
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
    [firstLayerData],
  );

  const handleSelect = (option: string) => {
    if (!currentQuestion || !firstLayerData) return;

    const updated = [
      ...deepAnswers.filter((a) => a.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, answer: option },
    ];
    setDeepAnswers(updated);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        goToLoading(updated);
      }
    }, AUTO_ADVANCE_MS);
  };

  const handleLoadingComplete = () => {
    router.push("/results/deep");
  };

  if (checking || !firstLayerData) {
    return (
      <div className="flex h-screen items-center justify-center bg-payth-bg">
        <p className="text-payth-muted">Loading...</p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-payth-bg">
      <PaythHeader
        className="shrink-0"
        secondaryAction={{ href: "/results", label: "Exit" }}
      />

      {phase === "question" && (
        <AssessmentProgress
          currentStep={currentIndex + 1}
          totalSteps={questions.length}
        />
      )}

      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col overflow-hidden px-6 py-8">
        {phase === "intro" && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-payth-border bg-white/70 px-4 py-2 shadow-sm">
              <Sparkles size={16} className="text-payth-blue" strokeWidth={2} />
              <span className="text-payth-label font-bold uppercase tracking-[0.08em] text-payth-indigo">
                Quick Assessment Ready
              </span>
            </div>
            <PageTitle>Want deeper insights?</PageTitle>
            <BodyText className="mt-4 max-w-md">
              Answer {questions.length} more questions to get specific recommendations.
            </BodyText>
            <SmallText className="mt-2">
              Uncover cost, conversion, and risk opportunities tailored to your business.
            </SmallText>
            <PaythButton
              onClick={() => setPhase("question")}
              className="mt-10 px-8 py-4"
            >
              Unlock Deeper Insights <ArrowRight size={20} />
            </PaythButton>
          </div>
        )}

        {phase === "question" && currentQuestion && (
          <DeepQuestionScreen
            question={currentQuestion}
            selected={currentAnswer}
            onSelect={handleSelect}
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
              onClick={() => goToLoading(deepAnswers)}
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
