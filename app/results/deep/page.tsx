"use client";

import { useEffect, useState } from "react";
import PaythButton from "@/components/payth/PaythButton";
import PaythHeader from "@/components/payth/PaythHeader";
import PathMotif from "@/components/payth/PathMotif";
import { LabelText, PageTitle, SectionTitle, SmallText } from "@/components/payth/Typography";
import DeepResultsDashboard from "@/components/results/deep/DeepResultsDashboard";
import type { DeepAssessmentResult } from "@/lib/assessment/deepSchema";
import {
  DEEP_SESSION_STORAGE_KEY,
  type StoredDeepAssessmentResult,
} from "@/lib/assessment/types";

export default function DeepResultsPage() {
  const [data, setData] = useState<StoredDeepAssessmentResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = sessionStorage.getItem(DEEP_SESSION_STORAGE_KEY);
    if (stored) {
      try {
        setData(JSON.parse(stored) as StoredDeepAssessmentResult);
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
        <SectionTitle>No deep assessment found</SectionTitle>
        <SmallText className="mt-3">
          Complete the quick assessment first, then unlock deeper insights.
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
        secondaryAction={{ href: "/assessment/deep", label: "New Deep Assessment" }}
      />

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 text-center">
          <LabelText className="text-payth-blue">Deep Assessment Result</LabelText>
          <PageTitle className="mt-2">Your Payment Insights</PageTitle>
          <div className="mx-auto mt-6 max-w-md px-4">
            <PathMotif
              steps={["Assessment", "Insights", "Actions"]}
              activeStep={2}
              showLabels
              className="opacity-70"
            />
          </div>
        </div>
        <DeepResultsDashboard result={data.result as DeepAssessmentResult} />
      </main>
    </div>
  );
}
