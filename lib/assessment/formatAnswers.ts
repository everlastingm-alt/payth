import { formatAnswersForPrompt } from "./flows";
import { getDeepQuestions } from "./deepRegistry";
import type { AssessmentAnswers, BusinessType, DeepAnswer } from "./types";

export function formatFirstLayerAnswers(
  businessType: BusinessType,
  answers: AssessmentAnswers,
): string {
  return formatAnswersForPrompt(businessType, answers);
}

export function formatDeepAnswers(
  businessType: BusinessType,
  deepAnswers: DeepAnswer[],
): string {
  const questions = getDeepQuestions(businessType);
  const lines: string[] = [];

  for (const answer of deepAnswers) {
    const question = questions.find((q) => q.id === answer.questionId);
    const label = question?.question ?? answer.questionId;
    lines.push(`${label}: ${answer.answer}`);
  }

  return lines.join("\n");
}

export function extractBusinessSize(
  businessType: BusinessType,
  answers: AssessmentAnswers,
): string {
  const sizeKeys: Record<BusinessType, string> = {
    restaurant: "locations",
    ecommerce: "sellWhere",
    saas: "paymentModel",
    retail: "stores",
    other: "paymentChannel",
  };
  const key = sizeKeys[businessType];
  const value = answers[key];
  return typeof value === "string" ? value : "Unknown";
}

export function extractCurrentProvider(answers: AssessmentAnswers): string {
  const value = answers.currentProvider;
  return typeof value === "string" ? value : "Unknown";
}

export function extractGoals(answers: AssessmentAnswers): string {
  const value = answers.improvements;
  if (Array.isArray(value)) return value.join(", ");
  return typeof value === "string" ? value : "Unknown";
}
