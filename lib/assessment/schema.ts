import { z } from "zod";

const impactLevel = z.enum(["High", "Medium", "Low"]);
const effortLevel = z.enum(["Low", "Medium", "High"]);

export const assessmentResultSchema = z.object({
  businessProfile: z.object({
    stage: z.string(),
    environment: z.string(),
    marketFocus: z.string(),
    complexity: z.string(),
  }),
  executiveSummary: z.object({
    headline: z.string(),
    summary: z.string(),
  }),
  workingWell: z.object({
    title: z.string(),
    description: z.string(),
  }),
  biggestOpportunity: z.object({
    title: z.string(),
    impact: impactLevel,
    description: z.string(),
    whyItMatters: z.string(),
  }),
  biggestRisk: z.object({
    title: z.string(),
    severity: impactLevel,
    description: z.string(),
    whyItMatters: z.string(),
  }),
  recommendedNow: z.array(
    z.object({
      title: z.string(),
      reason: z.string(),
    }),
  ),
  recommendedLater: z.array(
    z.object({
      trigger: z.string(),
      recommendation: z.string(),
      reason: z.string(),
    }),
  ),
  notNeededYet: z.array(
    z.object({
      item: z.string(),
      reason: z.string(),
    }),
  ),
  quickWins: z.array(
    z.object({
      action: z.string(),
      impact: impactLevel,
      effort: effortLevel,
      expectedBenefit: z.string(),
    }),
  ),
  peerBenchmark: z.object({
    segment: z.string(),
    commonlyUsed: z.array(z.string()),
    mostCommonNextUpgrade: z.string(),
  }),
  growthRoadmap: z.array(
    z.object({
      trigger: z.string(),
      focus: z.string(),
      actions: z.array(z.string()),
    }),
  ),
  confidence: z.object({
    level: impactLevel,
    reason: z.string(),
  }),
});

export type AssessmentResult = z.infer<typeof assessmentResultSchema>;
