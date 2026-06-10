"use client";

import PathMotif from "@/components/payth/PathMotif";
import { ClipboardCheck, SearchCheck, Store } from "lucide-react";

export default function LandingPathMotif() {
  return (
    <div className="flex justify-center">
      <PathMotif
        steps={["Business", "Assessment", "Action Playbook"]}
        activeStep={0}
        icons={[Store, SearchCheck, ClipboardCheck]}
        showLabels
        className="opacity-80"
      />
    </div>
  );
}
