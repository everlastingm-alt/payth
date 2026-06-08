"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import PaythLogo from "@/components/PaythLogo";
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
        <p className="text-2xl font-black text-payth-navy">No assessment found</p>
        <p className="mt-3 text-payth-muted">
          Complete the assessment to see your personalized recommendations.
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
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link href="/" aria-label="PAYTH home">
            <PaythLogo />
          </Link>
          <Link
            href="/assessment"
            className="text-sm font-semibold text-payth-indigo transition hover:text-payth-purple"
          >
            New Assessment
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <ResultsDashboard result={data.result as AssessmentResult} />
      </main>
    </div>
  );
}
