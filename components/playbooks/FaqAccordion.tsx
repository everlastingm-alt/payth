"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import type { FaqItem } from "@/lib/content/schema";
import { SectionTitle, SmallText } from "@/components/payth/Typography";

export default function FaqAccordion({ faq }: { faq: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="rounded-payth-card border border-payth-border bg-white p-6 shadow-payth-card md:p-8">
      <div className="mb-4 flex items-center gap-2">
        <HelpCircle size={22} className="text-payth-blue" strokeWidth={2} />
        <SectionTitle as="h2">FAQ</SectionTitle>
      </div>

      <div className="space-y-3">
        {faq.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-payth-card border border-payth-border"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-4 bg-slate-50 px-4 py-4 text-left transition hover:bg-slate-100"
              >
                <span className="text-[18px] font-semibold text-payth-navy">
                  {item.question}
                </span>
                <ChevronDown
                  size={20}
                  strokeWidth={2}
                  className={`shrink-0 text-payth-muted transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </button>
              {isOpen && (
                <div className="border-t border-payth-border px-4 py-4">
                  <SmallText className="text-[15px] leading-[1.6]">{item.answer}</SmallText>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
