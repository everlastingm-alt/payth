"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PaythLogo from "@/components/PaythLogo";
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
        <p className="text-2xl font-black text-payth-navy">No deep assessment found</p>
        <p className="mt-3 text-payth-muted">
          Complete the quick assessment first, then unlock deeper insights.
        </p>
        <Link
          href="/assessment"
          className="mt-8 rounded-xl bg-gradient-to-r from-payth-purple to-payth-blue px-8 py-4 font-bold text-white shadow-lg"
        >
          Start Assessment
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-payth-bg text-payth-navy">
      <header className="border-b border-slate-200/70 bg-white/80 px-6 py-4 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link href="/" aria-label="PAYTH home">
            <PaythLogo />
          </Link>
          <Link
            href="/assessment/deep"
            className="text-sm font-semibold text-payth-indigo transition hover:text-payth-purple"
          >
            New Deep Assessment
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-payth-indigo">
            Deep Assessment Result
          </p>
          <h1 className="mt-2 text-3xl font-black text-payth-navy md:text-4xl">
            Your Payment Insights
          </h1>
        </div>
        <DeepResultsDashboard result={data.result as DeepAssessmentResult} />
      </main>
    </div>
  );
}
