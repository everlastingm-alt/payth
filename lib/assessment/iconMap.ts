import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Ban,
  Banknote,
  BarChart3,
  CircleEllipsis,
  CircleHelp,
  ClipboardCheck,
  Clock3,
  Compass,
  DollarSign,
  ListChecks,
  MessagesSquare,
  MonitorSmartphone,
  Route,
  ScanSearch,
  SearchCheck,
  ShieldAlert,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Store,
  TrendingUp,
  TriangleAlert,
  Utensils,
  WalletCards,
} from "lucide-react";

export const businessTypeIcons: Record<string, LucideIcon> = {
  restaurant: Utensils,
  ecommerce: ShoppingCart,
  saas: MonitorSmartphone,
  retail: Store,
  other: CircleEllipsis,
};

export const assessmentIcons = {
  question: CircleHelp,
  assessment: SearchCheck,
  analysis: ScanSearch,
  result: ClipboardCheck,
} as const;

export const quickResultIcons = {
  opportunity: Sparkles,
  risk: TriangleAlert,
  doNow: ListChecks,
  doLater: Clock3,
  notNeededYet: Ban,
} as const;

export const deepResultIcons = {
  whatWeFound: SearchCheck,
  benchmarkGaps: BarChart3,
  actionPlaybook: ClipboardCheck,
  providerQuestions: MessagesSquare,
  investigateNext: Compass,
  confidence: ShieldCheck,
  growthRoadmap: Route,
} as const;

export const metricIcons = {
  cost: DollarSign,
  conversion: TrendingUp,
  approvalRate: BadgeCheck,
  chargebacks: ShieldAlert,
  payouts: Banknote,
  walletAdoption: WalletCards,
} as const;

export type IconKey = keyof typeof businessTypeIcons;

export function getBusinessTypeIcon(key: string): LucideIcon | undefined {
  return businessTypeIcons[key];
}
