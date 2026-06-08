import type { DeepQuestion } from "./types";

export const restaurantDeepQuestions: DeepQuestion[] = [
  {
    id: "monthly_card_volume",
    question: "Roughly how much card payment volume do you process each month?",
    type: "single_select",
    whyWeAsk: "This helps us estimate whether processing cost optimization is meaningful.",
    options: ["Under $20K", "$20K - $50K", "$50K - $100K", "$100K+", "Not sure"],
  },
  {
    id: "effective_processing_rate",
    question: "Do you know your average processing rate?",
    type: "single_select",
    whyWeAsk: "Restaurants often find savings by reviewing their effective rate.",
    options: ["Under 2.5%", "2.5% - 3.0%", "3.0% - 3.5%", "Above 3.5%", "Not sure"],
  },
  {
    id: "wallet_acceptance",
    question: "Do you accept Apple Pay or tap-to-pay at every terminal?",
    type: "single_select",
    whyWeAsk: "Contactless payments can improve speed and customer experience.",
    options: ["Yes", "No", "Some terminals", "Not sure"],
  },
  {
    id: "payout_speed",
    question: "How quickly do you usually receive payouts?",
    type: "single_select",
    whyWeAsk: "Payout speed can affect cash flow for restaurants.",
    options: ["Same day", "Next day", "2-3 business days", "Longer", "Not sure"],
  },
  {
    id: "payment_issue",
    question: "What payment issue happens most often?",
    type: "single_select",
    whyWeAsk: "This helps us prioritize the most practical improvement.",
    options: [
      "High fees",
      "Slow checkout",
      "Payment declines",
      "Disputes or chargebacks",
      "Reconciliation issues",
      "Not sure",
    ],
  },
];

export const ecommerceDeepQuestions: DeepQuestion[] = [
  {
    id: "checkout_conversion_rate",
    question: "Do you know your checkout conversion rate?",
    type: "single_select",
    whyWeAsk:
      "This helps identify whether checkout friction is a bigger issue than provider choice.",
    options: ["Under 2%", "2% - 3%", "3% - 5%", "Above 5%", "Not sure"],
  },
  {
    id: "international_sales_share",
    question: "What percentage of sales come from customers outside your home market?",
    type: "single_select",
    whyWeAsk: "International sales can change which payment methods matter most.",
    options: ["Under 10%", "10% - 25%", "25% - 50%", "Above 50%", "Not sure"],
  },
  {
    id: "wallet_acceptance",
    question: "Do you offer Apple Pay or Google Pay at checkout?",
    type: "single_select",
    whyWeAsk: "Wallets can reduce checkout friction, especially on mobile.",
    options: ["Yes", "No", "Not sure"],
  },
  {
    id: "chargeback_rate",
    question: "Do you know your chargeback rate?",
    type: "single_select",
    whyWeAsk: "Chargebacks can affect costs, approval risk, and account stability.",
    options: ["Under 0.5%", "0.5% - 1%", "Above 1%", "Not sure"],
  },
  {
    id: "approval_rate",
    question: "Do you know your payment approval rate?",
    type: "single_select",
    whyWeAsk: "Low approval rates can quietly reduce revenue.",
    options: ["Above 95%", "90% - 95%", "Under 90%", "Not sure"],
  },
];

export const saasDeepQuestions: DeepQuestion[] = [
  {
    id: "billing_model",
    question: "How do most customers pay you?",
    type: "single_select",
    whyWeAsk: "Subscription and one-time billing have different payment risks.",
    options: [
      "Monthly subscription",
      "Annual subscription",
      "One-time payments",
      "Mix of subscription and one-time",
    ],
  },
  {
    id: "failed_payment_rate",
    question: "Do you know your failed payment rate?",
    type: "single_select",
    whyWeAsk: "Failed payments can directly increase churn.",
    options: ["Under 3%", "3% - 7%", "Above 7%", "Not sure"],
  },
  {
    id: "recovery_process",
    question: "Do you have an automated payment recovery process?",
    type: "single_select",
    whyWeAsk: "Dunning and retry logic can recover subscription revenue.",
    options: ["Yes", "No", "Basic email reminders", "Not sure"],
  },
  {
    id: "international_customers",
    question: "Do you have customers in multiple countries?",
    type: "single_select",
    whyWeAsk: "Global customers may require stronger billing and tax support.",
    options: [
      "Mostly one country",
      "Several countries",
      "Global customer base",
      "Not sure",
    ],
  },
];

export const retailDeepQuestions: DeepQuestion[] = [
  {
    id: "monthly_card_volume",
    question: "Roughly how much card payment volume do you process each month?",
    type: "single_select",
    whyWeAsk: "This helps determine whether rate negotiation may be worthwhile.",
    options: ["Under $20K", "$20K - $50K", "$50K - $100K", "$100K+", "Not sure"],
  },
  {
    id: "tap_to_pay",
    question: "Do you accept tap-to-pay and mobile wallets?",
    type: "single_select",
    whyWeAsk: "Contactless options can speed up checkout.",
    options: ["Yes", "No", "Some terminals", "Not sure"],
  },
  {
    id: "tourist_customers",
    question: "Do you serve many tourists or international visitors?",
    type: "single_select",
    whyWeAsk: "Tourist-heavy retail may benefit from additional wallet options.",
    options: ["Rarely", "Sometimes", "Often", "Not sure"],
  },
  {
    id: "biggest_store_issue",
    question: "What payment issue happens most often?",
    type: "single_select",
    whyWeAsk: "This helps prioritize the highest-impact improvement.",
    options: [
      "High fees",
      "Slow checkout",
      "Payment declines",
      "Refund issues",
      "Reconciliation issues",
      "Not sure",
    ],
  },
];
