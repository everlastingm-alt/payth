"use client";

import { useEffect, useState } from "react";
import PathMotif from "@/components/payth/PathMotif";
import { SectionTitle, SmallText } from "@/components/payth/Typography";

const MESSAGES = [
  "Reviewing your payment setup",
  "Checking payment gaps",
  "Analyzing key payment metrics",
  "Building your action playbook",
  "Preparing provider questions",
  "Generating recommendations",
];

const MIN_DURATION_MS = 3000;
const MESSAGE_INTERVAL_MS = 750;

interface LoadingScreenProps {
  onComplete: () => void;
  isApiDone: boolean;
}

export default function LoadingScreen({ onComplete, isApiDone }: LoadingScreenProps) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [minTimeElapsed, setMinTimeElapsed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMinTimeElapsed(true), MIN_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % MESSAGES.length);
    }, MESSAGE_INTERVAL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (minTimeElapsed && isApiDone) {
      onComplete();
    }
  }, [minTimeElapsed, isApiDone, onComplete]);

  return (
    <div className="flex h-full flex-col items-center justify-center text-center">
      <div className="mb-10 flex w-full justify-center px-4">
        <PathMotif variant="loading" showLabels className="opacity-90" />
      </div>
      <SectionTitle className="max-w-lg">{MESSAGES[messageIndex]}</SectionTitle>
      <SmallText className="mt-3">This usually takes a minute</SmallText>
    </div>
  );
}
