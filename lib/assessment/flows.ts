import type { AssessmentQuestion, BusinessFlow, BusinessType } from "./types";

export const step1Question: AssessmentQuestion = {
  id: "businessType",
  title: "What kind of business do you run?",
  multiSelect: false,
  options: [
    { id: "restaurant", label: "Restaurant", iconKey: "restaurant" },
    { id: "ecommerce", label: "Ecommerce", iconKey: "ecommerce" },
    { id: "saas", label: "SaaS", iconKey: "saas" },
    { id: "retail", label: "Retail", iconKey: "retail" },
    { id: "other", label: "Other", iconKey: "other" },
  ],
};

const restaurantSteps: AssessmentQuestion[] = [
  {
    id: "locations",
    title: "How many locations do you operate?",
    multiSelect: false,
    options: [
      { id: "one", label: "One location" },
      { id: "2-5", label: "2-5 locations" },
      { id: "6+", label: "6+ locations" },
    ],
  },
  {
    id: "customers",
    title: "Who are most of your customers?",
    multiSelect: false,
    options: [
      { id: "local", label: "Local Residents" },
      { id: "students", label: "Students" },
      { id: "office", label: "Office Workers" },
      { id: "tourists", label: "Tourists" },
      { id: "international", label: "International Visitors" },
    ],
  },
  {
    id: "improvements",
    title: "What are you trying to improve?",
    multiSelect: true,
    options: [
      { id: "lower-costs", label: "Lower Costs" },
      { id: "increase-sales", label: "Increase Sales" },
      { id: "faster-checkout", label: "Faster Checkout" },
      { id: "more-options", label: "More Payment Options" },
      { id: "reduce-issues", label: "Reduce Payment Issues" },
    ],
  },
  {
    id: "currentProvider",
    title: "What do you currently use?",
    multiSelect: false,
    options: [
      { id: "toast", label: "Toast" },
      { id: "clover", label: "Clover" },
      { id: "square", label: "Square" },
      { id: "other-pos", label: "Other POS" },
      { id: "not-sure", label: "Not Sure" },
    ],
  },
];

const ecommerceSteps: AssessmentQuestion[] = [
  {
    id: "sellWhere",
    title: "Where do you sell?",
    multiSelect: false,
    options: [
      { id: "shopify", label: "Shopify" },
      { id: "woocommerce", label: "WooCommerce" },
      { id: "amazon", label: "Amazon" },
      { id: "custom", label: "Custom Website" },
      { id: "multiple", label: "Multiple Channels" },
    ],
  },
  {
    id: "customerRegion",
    title: "Where are your customers?",
    multiSelect: false,
    options: [
      { id: "mostly-us", label: "Mostly US" },
      { id: "us-canada", label: "US & Canada" },
      { id: "international", label: "International" },
    ],
  },
  {
    id: "improvements",
    title: "What are you trying to improve?",
    multiSelect: true,
    options: [
      { id: "conversion", label: "Increase Conversion" },
      { id: "lower-costs", label: "Lower Costs" },
      { id: "expand", label: "Expand Internationally" },
      { id: "chargebacks", label: "Reduce Chargebacks" },
      { id: "payouts", label: "Faster Payouts" },
    ],
  },
  {
    id: "currentProvider",
    title: "What do you currently use?",
    multiSelect: false,
    options: [
      { id: "shopify-payments", label: "Shopify Payments" },
      { id: "stripe", label: "Stripe" },
      { id: "paypal", label: "PayPal" },
      { id: "square", label: "Square" },
      { id: "other", label: "Other" },
      { id: "not-sure", label: "Not Sure" },
    ],
  },
];

const saasSteps: AssessmentQuestion[] = [
  {
    id: "paymentModel",
    title: "How do customers pay?",
    multiSelect: false,
    options: [
      { id: "one-time", label: "One-Time" },
      { id: "subscription", label: "Subscription" },
      { id: "both", label: "Both" },
    ],
  },
  {
    id: "customerRegion",
    title: "Where are your customers?",
    multiSelect: false,
    options: [
      { id: "mostly-us", label: "Mostly US" },
      { id: "international", label: "International" },
    ],
  },
  {
    id: "improvements",
    title: "What are you trying to improve?",
    multiSelect: true,
    options: [
      { id: "conversion", label: "Increase Conversion" },
      { id: "international", label: "International Growth" },
      { id: "lower-costs", label: "Lower Costs" },
      { id: "payouts", label: "Faster Payouts" },
      { id: "failed-payments", label: "Reduce Failed Payments" },
    ],
  },
  {
    id: "currentProvider",
    title: "What do you currently use?",
    multiSelect: false,
    options: [
      { id: "stripe", label: "Stripe" },
      { id: "paddle", label: "Paddle" },
      { id: "paypal", label: "PayPal" },
      { id: "other", label: "Other" },
      { id: "not-sure", label: "Not Sure" },
    ],
  },
];

const retailSteps: AssessmentQuestion[] = [
  {
    id: "stores",
    title: "How many stores do you operate?",
    multiSelect: false,
    options: [
      { id: "1", label: "1" },
      { id: "2-5", label: "2-5" },
      { id: "6+", label: "6+" },
    ],
  },
  {
    id: "customers",
    title: "Who are most of your customers?",
    multiSelect: false,
    options: [
      { id: "local", label: "Local Residents" },
      { id: "tourists", label: "Tourists" },
      { id: "international", label: "International Visitors" },
      { id: "mixed", label: "Mixed" },
    ],
  },
  {
    id: "improvements",
    title: "What are you trying to improve?",
    multiSelect: true,
    options: [
      { id: "increase-sales", label: "Increase Sales" },
      { id: "lower-costs", label: "Lower Costs" },
      { id: "checkout-speed", label: "Improve Checkout Speed" },
      { id: "more-options", label: "Add Payment Options" },
    ],
  },
  {
    id: "currentProvider",
    title: "What do you currently use?",
    multiSelect: false,
    options: [
      { id: "square", label: "Square" },
      { id: "clover", label: "Clover" },
      { id: "shopify-pos", label: "Shopify POS" },
      { id: "other", label: "Other" },
      { id: "not-sure", label: "Not Sure" },
    ],
  },
];

const otherSteps: AssessmentQuestion[] = [
  {
    id: "paymentChannel",
    title: "How do you primarily accept payments?",
    multiSelect: false,
    options: [
      { id: "online", label: "Online" },
      { id: "in-person", label: "In-Person" },
      { id: "both", label: "Both" },
    ],
  },
  {
    id: "customerRegion",
    title: "Where are your customers?",
    multiSelect: false,
    options: [
      { id: "mostly-us", label: "Mostly US" },
      { id: "international", label: "International" },
    ],
  },
  {
    id: "improvements",
    title: "What are you trying to improve?",
    multiSelect: true,
    options: [
      { id: "conversion", label: "Increase Conversion" },
      { id: "lower-costs", label: "Lower Costs" },
      { id: "expand", label: "Expand Internationally" },
      { id: "chargebacks", label: "Reduce Chargebacks" },
      { id: "payouts", label: "Faster Payouts" },
    ],
  },
  {
    id: "currentProvider",
    title: "What do you currently use?",
    multiSelect: false,
    options: [
      { id: "stripe", label: "Stripe" },
      { id: "square", label: "Square" },
      { id: "paypal", label: "PayPal" },
      { id: "other", label: "Other" },
      { id: "not-sure", label: "Not Sure" },
    ],
  },
];

export const businessFlows: Record<BusinessType, BusinessFlow> = {
  restaurant: {
    businessType: "restaurant",
    label: "Restaurant",
    iconKey: "restaurant",
    steps: restaurantSteps,
  },
  ecommerce: {
    businessType: "ecommerce",
    label: "Ecommerce",
    iconKey: "ecommerce",
    steps: ecommerceSteps,
  },
  saas: {
    businessType: "saas",
    label: "SaaS",
    iconKey: "saas",
    steps: saasSteps,
  },
  retail: {
    businessType: "retail",
    label: "Retail",
    iconKey: "retail",
    steps: retailSteps,
  },
  other: {
    businessType: "other",
    label: "Other",
    iconKey: "other",
    steps: otherSteps,
  },
};

export function getQuestionForStep(
  businessType: BusinessType | null,
  step: number,
): AssessmentQuestion | null {
  if (step === 1) return step1Question;
  if (!businessType) return null;
  const flow = businessFlows[businessType];
  return flow.steps[step - 2] ?? null;
}

export function getOptionLabel(
  question: AssessmentQuestion,
  optionId: string,
): string {
  const option = question.options.find((o) => o.id === optionId);
  if (!option) return optionId;
  return option.label;
}

export function formatAnswersForPrompt(
  businessType: BusinessType,
  answers: Record<string, string | string[]>,
): string {
  const flow = businessFlows[businessType];
  const lines: string[] = [];

  const businessLabel = step1Question.options.find((o) => o.id === businessType)?.label ?? businessType;
  lines.push(`Business Type: ${businessLabel}`);

  for (const step of flow.steps) {
    const value = answers[step.id];
    if (!value) continue;
    if (Array.isArray(value)) {
      const labels = value.map((id) => getOptionLabel(step, id));
      lines.push(`${step.title}: ${labels.join(", ")}`);
    } else {
      lines.push(`${step.title}: ${getOptionLabel(step, value)}`);
    }
  }

  return lines.join("\n");
}
