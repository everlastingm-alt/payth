"use client";

import { Fragment, useEffect, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  ClipboardCheck,
  SearchCheck,
  Store,
} from "lucide-react";

export type PathMotifProps = {
  steps?: string[];
  activeStep?: number;
  variant?: "horizontal" | "vertical" | "loading" | "roadmap";
  showLabels?: boolean;
  className?: string;
  icons?: LucideIcon[];
  align?: "start" | "center";
};

const DEFAULT_STEPS = ["Assessment", "Insight", "Action", "Growth"];

const LOADING_STEPS = ["Business", "Assessment", "Insights", "Action Plan"];
const LOADING_ICONS = [Store, SearchCheck, BarChart3, ClipboardCheck];

const LINE_WIDTH = "w-8 sm:w-12 md:w-16";

function Dot({
  active,
  completed,
  size = "default",
}: {
  active: boolean;
  completed: boolean;
  size?: "default" | "small";
}) {
  const sizeClass = active ? (size === "small" ? "h-3 w-3" : "h-3 w-3") : "h-2.5 w-2.5";
  const colorClass = completed
    ? "bg-payth-cyan"
    : active
      ? "bg-payth-blue payth-active-dot"
      : "bg-payth-border";

  return <div className={`rounded-full ${sizeClass} ${colorClass}`} />;
}

function LineSegment({
  active,
  completed,
  className = "",
}: {
  active: boolean;
  completed: boolean;
  className?: string;
}) {
  if (completed || active) {
    return (
      <div
        className={`h-0.5 shrink-0 rounded-full payth-flow-line ${LINE_WIDTH} ${active ? "opacity-100" : "opacity-70"} ${className}`}
        style={{
          background: "linear-gradient(90deg, #2563EB, #06B6D4)",
        }}
      />
    );
  }
  return (
    <div
      className={`h-0.5 shrink-0 rounded-full bg-[#DBEAFE] opacity-35 ${LINE_WIDTH} ${className}`}
    />
  );
}

function VerticalLine({ active, completed }: { active: boolean; completed: boolean }) {
  if (completed || active) {
    return (
      <div
        className="w-0.5 flex-1 rounded-full payth-flow-line opacity-70"
        style={{
          background: "linear-gradient(180deg, #2563EB, #06B6D4)",
          minHeight: "24px",
        }}
      />
    );
  }
  return (
    <div
      className="w-0.5 flex-1 rounded-full bg-[#DBEAFE] opacity-35"
      style={{ minHeight: "24px" }}
    />
  );
}

export default function PathMotif({
  steps = DEFAULT_STEPS,
  activeStep = 0,
  variant = "horizontal",
  showLabels = true,
  className = "",
  icons,
  align = "center",
}: PathMotifProps) {
  const [loadingStep, setLoadingStep] = useState(0);
  const isLoading = variant === "loading";
  const resolvedSteps = isLoading ? LOADING_STEPS : steps;
  const resolvedIcons = isLoading ? LOADING_ICONS : icons;
  const currentActive = isLoading ? loadingStep : activeStep;

  useEffect(() => {
    if (!isLoading) return;
    const interval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % resolvedSteps.length);
    }, 800);
    return () => clearInterval(interval);
  }, [isLoading, resolvedSteps.length]);

  if (variant === "vertical" || variant === "roadmap") {
    return (
      <div className={`flex flex-col ${className}`}>
        {resolvedSteps.map((step, index) => {
          const isActive = index === currentActive;
          const isCompleted = index < currentActive;
          const Icon = resolvedIcons?.[index];

          return (
            <div key={step} className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="flex h-6 w-6 items-center justify-center">
                  {Icon ? (
                    <div
                      className={`flex h-6 w-6 items-center justify-center rounded-full ${
                        isActive || isCompleted ? "bg-payth-blueSoft" : "bg-slate-100"
                      }`}
                    >
                      <Icon
                        size={14}
                        strokeWidth={2}
                        className={
                          isActive
                            ? "text-payth-blue"
                            : isCompleted
                              ? "text-payth-cyan"
                              : "text-payth-muted"
                        }
                      />
                    </div>
                  ) : (
                    <Dot active={isActive} completed={isCompleted} size="small" />
                  )}
                </div>
                {index < resolvedSteps.length - 1 && (
                  <VerticalLine active={isActive} completed={isCompleted} />
                )}
              </div>
              {showLabels && (
                <p
                  className={`pb-4 text-payth-body-sm font-medium ${
                    isActive ? "text-payth-blue" : isCompleted ? "text-payth-cyan" : "text-payth-muted"
                  }`}
                >
                  {step}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  const outerClass =
    align === "start"
      ? `flex w-full items-start ${className}`
      : `inline-flex items-start justify-center ${className}`;

  return (
    <div className={outerClass}>
      {resolvedSteps.map((step, index) => {
        const isActive = index === currentActive;
        const isCompleted = index < currentActive;
        const Icon = resolvedIcons?.[index];
        const hasIcon = Boolean(Icon);
        const lineOffset = hasIcon ? "mt-5" : "mt-1";

        return (
          <Fragment key={step}>
            <div className="flex shrink-0 flex-col items-center gap-1.5">
              {Icon ? (
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full ${
                    isActive || isCompleted ? "bg-payth-blueSoft" : "bg-slate-100"
                  } ${isActive ? "payth-active-dot" : ""}`}
                >
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className={
                      isActive
                        ? "text-payth-blue"
                        : isCompleted
                          ? "text-payth-cyan"
                          : "text-payth-muted"
                    }
                  />
                </div>
              ) : (
                <Dot active={isActive} completed={isCompleted} />
              )}
              {showLabels && (
                <span
                  className={`max-w-[72px] text-center text-[11px] font-medium leading-tight sm:max-w-none ${
                    isActive ? "text-payth-blue" : isCompleted ? "text-payth-cyan" : "text-payth-muted"
                  }`}
                >
                  {step}
                </span>
              )}
            </div>
            {index < resolvedSteps.length - 1 && (
              <LineSegment
                active={isActive}
                completed={isCompleted}
                className={lineOffset}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
