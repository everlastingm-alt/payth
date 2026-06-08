import { z } from "zod";

const impactLevel = z.enum(["High", "Medium", "Low"]);
const complexityLevel = z.enum(["Low", "Medium", "High"]);
const depthLevel = z.enum(["Basic", "Specific", "Advanced"]);
const effortLevel = z.enum(["15 minutes", "30 minutes", "1 hour", "A few hours"]);

export const deepAssessmentResultSchema = z.object({
  businessProfile: z.object({
    summary: z.string(),
    businessType: z.string(),
    stage: z.string(),
    currentProvider: z.string(),
    paymentComplexity: complexityLevel,
  }),
  keyInsights: z.array(
    z.object({
      title: z.string(),
      metric: z.string(),
      finding: z.string(),
      whyItMatters: z.string(),
      recommendedAction: z.string(),
      depthLevel: depthLevel,
    }),
  ),
  benchmarkComparison: z.object({
    segment: z.string(),
    summary: z.string(),
    strongAreas: z.array(z.string()),
    improvementAreas: z.array(z.string()),
    gapsToCheck: z.array(
      z.object({
        gap: z.string(),
        whyItMatters: z.string(),
        howToCheck: z.string(),
      }),
    ),
    typicalSetup: z.array(z.string()),
    nextCommonUpgrade: z.string(),
  }),
  biggestOpportunity: z.object({
    title: z.string(),
    impact: impactLevel,
    why: z.string(),
    action: z.string(),
  }),
  biggestRisk: z.object({
    title: z.string(),
    severity: impactLevel,
    why: z.string(),
    action: z.string(),
  }),
  actionPlaybook: z.array(
    z.object({
      priority: impactLevel,
      action: z.string(),
      why: z.string(),
      howToDoIt: z.array(z.string()),
      whoToContact: z.string(),
      questionsToAsk: z.array(z.string()),
      negotiationTips: z.array(z.string()).optional(),
      providerFeaturesToReview: z.array(z.string()).optional(),
      successMetric: z.string(),
      estimatedEffort: effortLevel,
    }),
  ),
  whatToAskProvider: z.object({
    provider: z.string(),
    questions: z.array(
      z.object({
        question: z.string(),
        whyAsk: z.string(),
      }),
    ),
  }),
  investigateNext: z.array(
    z.object({
      question: z.string(),
      why: z.string(),
      howToCheck: z.string(),
    }),
  ),
  notNeededYet: z.array(
    z.object({
      item: z.string(),
      reason: z.string(),
    }),
  ),
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

export type DeepAssessmentResult = z.infer<typeof deepAssessmentResultSchema>;
