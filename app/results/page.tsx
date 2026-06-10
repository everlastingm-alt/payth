"use client";

import { useEffect, useState } from "react";
import PaythButton from "@/components/payth/PaythButton";
import PaythHeader from "@/components/payth/PaythHeader";
import { SectionTitle, SmallText } from "@/components/payth/Typography";
import ResultsDashboard from "@/components/results/ResultsDashboard";
import type { AssessmentResult } from "@/lib/assessment/schema";
import { SESSION_STORAGE_KEY, type StoredAssessmentResult } from "@/lib/assessment/types";

export default function ResultsPage() {
  const [data, setData] = useState<StoredAssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored) as StoredAssessmentResult);
      } catch {
        setData(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-payth-bg">
        <p className="text-payth-muted">Loading results...</p>
      </div>
    );
  }

  if (!data?.result) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-payth-bg px-6 text-center">
        <SectionTitle>No assessment found</SectionTitle>
        <SmallText className="mt-3">
          Complete the assessment to see your personalized recommendations.
        </SmallText>
        <PaythButton href="/assessment" className="mt-8 px-8 py-4">
          Start Assessment
        </PaythButton>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-payth-bg text-payth-navy">
      <PaythHeader
        secondaryAction={{ href: "/assessment", label: "New Assessment" }}
      />

      <main className="mx-auto max-w-5xl px-6 py-10">
        <ResultsDashboard result={data.result as AssessmentResult} />
      </main>
    </div>
  );
}
