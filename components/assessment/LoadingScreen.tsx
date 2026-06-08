"use client";

import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const MESSAGES = [
  "Analyzing your business...",
  "Reviewing payment patterns...",
  "Evaluating growth opportunities...",
  "Building recommendations...",
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
      <div className="mb-8 flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50">
        <Loader2 className="h-8 w-8 animate-spin text-payth-indigo" />
      </div>
      <p className="text-2xl font-black text-payth-navy md:text-3xl">
        {MESSAGES[messageIndex]}
      </p>
      <p className="mt-3 text-payth-muted">This usually takes a few seconds</p>
    </div>
  );
}
