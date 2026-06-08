export type ProviderProfile = {
  displayName: string;
  contactMethod: string;
  features: string[];
  optimizationAreas: string[];
  questionsToAsk: string[];
  negotiationTriggers: string[];
};

export const providerProfiles: Record<string, ProviderProfile> = {
  stripe: {
    displayName: "Stripe",
    contactMethod: "Stripe Dashboard Support or your Stripe account manager if assigned",
    features: [
      "Apple Pay",
      "Google Pay",
      "Link",
      "Radar",
      "Adaptive Acceptance",
      "Smart Retries",
      "Revenue Recovery",
      "Card Account Updater",
    ],
    optimizationAreas: [
      "wallet adoption",
      "approval rate by country",
      "dispute rate",
      "failed payment recovery",
      "international payment performance",
    ],
    questionsToAsk: [
      "What is my payment approval rate by country?",
      "What percentage of checkout payments use wallets?",
      "Is Adaptive Acceptance enabled for my account?",
      "What is my dispute rate over the last 90 days?",
      "Are Smart Retries or Revenue Recovery enabled?",
    ],
    negotiationTriggers: [
      "$1M+ annual payment volume",
      "$5M+ annual payment volume",
      "high international volume",
      "strong competing quote",
    ],
  },

  shopify_payments: {
    displayName: "Shopify Payments",
    contactMethod: "Shopify admin support or Shopify partner / agency",
    features: [
      "Shop Pay",
      "Apple Pay",
      "Google Pay",
      "PayPal integration",
      "Shopify Markets",
      "Fraud analysis",
    ],
    optimizationAreas: [
      "Shop Pay adoption",
      "mobile checkout conversion",
      "international market setup",
      "chargeback handling",
    ],
    questionsToAsk: [
      "Is Shop Pay fully enabled and visible on mobile checkout?",
      "What is my checkout conversion rate by device?",
      "What percentage of payments use Shop Pay or wallets?",
      "Are Shopify Markets configured correctly for my target countries?",
      "What are my most common chargeback reasons?",
    ],
    negotiationTriggers: [
      "upgrade to Shopify Plus",
      "high GMV",
      "multi-market expansion",
    ],
  },

  toast: {
    displayName: "Toast",
    contactMethod: "Toast account manager or Toast support",
    features: [
      "Toast Pay",
      "Toast Online Ordering",
      "Toast Loyalty",
      "Toast Gift Cards",
      "Contactless payments",
      "Reporting and analytics",
    ],
    optimizationAreas: [
      "effective processing rate",
      "contactless adoption",
      "payout timing",
      "online ordering",
      "loyalty and gift cards",
    ],
    questionsToAsk: [
      "What is my effective processing rate over the last 6 months?",
      "Can you break down interchange, assessments, and processor markup?",
      "Am I eligible for volume-based pricing?",
      "What percentage of transactions are contactless?",
      "Are there Toast features I am paying for but not using?",
    ],
    negotiationTriggers: [
      "$50K+ monthly card volume",
      "second location opening",
      "competing POS or processing quote",
      "contract renewal",
    ],
  },

  square: {
    displayName: "Square",
    contactMethod: "Square Dashboard Support",
    features: [
      "Square POS",
      "Square Online",
      "Tap to Pay",
      "Invoices",
      "Loyalty",
      "Gift Cards",
      "Instant Transfers",
    ],
    optimizationAreas: [
      "in-person checkout speed",
      "online ordering",
      "instant payout costs",
      "loyalty adoption",
      "invoice payments",
    ],
    questionsToAsk: [
      "Am I eligible for custom processing pricing?",
      "How much am I paying for instant transfers?",
      "What percentage of transactions are tap-to-pay?",
      "Would Square Loyalty or Gift Cards improve repeat purchases?",
      "Are online orders reconciled cleanly with in-store sales?",
    ],
    negotiationTriggers: [
      "$250K+ annual card volume",
      "$50K+ monthly volume",
      "multi-location operations",
      "competing processor quote",
    ],
  },

  clover: {
    displayName: "Clover",
    contactMethod: "Your Clover reseller, bank partner, or Clover support",
    features: [
      "Clover POS",
      "Clover Online Ordering",
      "Gift Cards",
      "Loyalty integrations",
      "Contactless payments",
    ],
    optimizationAreas: [
      "processor pricing",
      "contract terms",
      "hardware fees",
      "contactless adoption",
      "reporting",
    ],
    questionsToAsk: [
      "Who is my actual payment processor?",
      "What is my effective processing rate?",
      "Are there monthly software, hardware, or statement fees?",
      "When does my contract renew?",
      "Am I eligible for better pricing based on volume?",
    ],
    negotiationTriggers: [
      "contract renewal",
      "$50K+ monthly card volume",
      "hardware upgrade",
      "competing quote",
    ],
  },

  paypal: {
    displayName: "PayPal",
    contactMethod: "PayPal Business support",
    features: [
      "PayPal Checkout",
      "Venmo",
      "Pay Later",
      "Dispute management",
    ],
    optimizationAreas: [
      "checkout trust",
      "PayPal button placement",
      "Venmo adoption",
      "dispute rate",
    ],
    questionsToAsk: [
      "What share of checkout volume comes through PayPal?",
      "Is Venmo enabled where available?",
      "What are my dispute reasons and dispute win rate?",
      "Is PayPal button placement optimized for mobile?",
    ],
    negotiationTriggers: [
      "high PayPal volume",
      "enterprise PayPal account",
      "strong alternative checkout options",
    ],
  },

  unknown: {
    displayName: "Current Provider",
    contactMethod: "Your payment provider support or account manager",
    features: [],
    optimizationAreas: [
      "processing rate",
      "payout speed",
      "chargebacks",
      "wallet acceptance",
      "reporting",
    ],
    questionsToAsk: [
      "What is my effective processing rate?",
      "How fast are my payouts?",
      "What payment methods do I currently accept?",
      "What is my dispute or chargeback rate?",
      "Are there features available that I am not using?",
    ],
    negotiationTriggers: [
      "higher monthly volume",
      "contract renewal",
      "competing quote",
    ],
  },
};

const providerIdMap: Record<string, keyof typeof providerProfiles> = {
  toast: "toast",
  square: "square",
  clover: "clover",
  stripe: "stripe",
  "shopify-payments": "shopify_payments",
  paypal: "paypal",
  paddle: "stripe",
  "shopify-pos": "square",
  "other-pos": "unknown",
  other: "unknown",
  "not-sure": "unknown",
};

export function getProviderProfile(providerId: string): ProviderProfile {
  const normalized = providerId.toLowerCase().trim();
  const key = providerIdMap[normalized] ?? "unknown";
  return providerProfiles[key];
}

export function formatProviderProfileForPrompt(profile: ProviderProfile): string {
  return [
    `Display Name: ${profile.displayName}`,
    `Contact Method: ${profile.contactMethod}`,
    `Features: ${profile.features.join(", ") || "N/A"}`,
    `Optimization Areas: ${profile.optimizationAreas.join(", ")}`,
    `Questions To Ask: ${profile.questionsToAsk.join("; ")}`,
    `Negotiation Triggers: ${profile.negotiationTriggers.join("; ")}`,
  ].join("\n");
}
