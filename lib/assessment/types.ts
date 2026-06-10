export type BusinessType =
  | "restaurant"
  | "ecommerce"
  | "saas"
  | "retail"
  | "other";

export type AssessmentPhase = "question" | "loading" | "error";

export type DeepPhase = "intro" | "question" | "loading" | "error";

export type StepIndex = 1 | 2 | 3 | 4 | 5;

export type QuestionType = "single_select" | "multi_select" | "number" | "text";

export interface QuestionOption {
  id: string;
  label: string;
  iconKey?: string;
}

export interface AssessmentQuestion {
  id: string;
  title: string;
  multiSelect: boolean;
  options: QuestionOption[];
}

export interface BusinessFlow {
  businessType: BusinessType;
  label: string;
  iconKey: string;
  steps: AssessmentQuestion[];
}

export interface AssessmentAnswers {
  businessType: BusinessType;
  [key: string]: string | string[] | BusinessType;
}

export type DeepQuestion = {
  id: string;
  question: string;
  type: QuestionType;
  whyWeAsk?: string;
  options?: string[];
};

export type DeepAnswer = {
  questionId: string;
  answer: string;
};

export const SESSION_STORAGE_KEY = "payth-assessment-result";
export const DEEP_SESSION_STORAGE_KEY = "payth-deep-assessment-result";

export interface StoredAssessmentResult {
  businessType: BusinessType;
  answers: AssessmentAnswers;
  result: import("./schema").AssessmentResult;
  completedAt: string;
}

export interface StoredDeepAssessmentResult {
  businessType: BusinessType;
  firstLayerAnswers: AssessmentAnswers;
  deepAnswers: DeepAnswer[];
  result: import("./deepSchema").DeepAssessmentResult;
  completedAt: string;
}
