export const topicClusters = {
  costOptimization: [
    "How to Calculate Your Real Processing Cost",
    "What Is an Effective Processing Rate?",
    "Are You Paying Too Much for Card Processing?",
    "How to Review Your Last 3 Processing Statements",
    "When Is It Worth Negotiating Payment Fees?",
    "How to Compare Payment Quotes Without Getting Misled",
    "5 Hidden Payment Fees SMBs Often Miss",
    "Should You Switch Providers to Save Money?",
  ],

  paymentVisibility: [
    "Do You Know Your Processing Rate?",
    "Do You Know Your Approval Rate?",
    "Do You Know Your Chargeback Rate?",
    "The Metrics Most SMBs Never Track",
    "Why 'Not Sure' Is a Business Risk",
    "How to Build a Payment Health Dashboard",
  ],

  decisionFrameworks: [
    "Should You Switch Payment Providers?",
    "When Is a Payment Upgrade Worth It?",
    "Questions to Ask Before Signing a New Payment Contract",
    "What to Ask Your Provider Every Year",
    "How to Avoid Overbuilding Your Payment Stack",
    "Do You Actually Need Payment Orchestration?",
  ],

  growthReadiness: [
    "Is Your Payment Setup Ready for Growth?",
    "What Changes When Revenue Doubles?",
    "How to Prepare for International Customers",
    "The Payment Milestones Growing Businesses Hit",
  ],
} as const;

export type TopicCluster = keyof typeof topicClusters;

export const clusterLabels: Record<TopicCluster, string> = {
  costOptimization: "Cost Optimization",
  paymentVisibility: "Payment Visibility",
  decisionFrameworks: "Decision Frameworks",
  growthReadiness: "Growth Readiness",
};

export const assessmentOptions = [
  "Restaurant Assessment",
  "Ecommerce Assessment",
  "SaaS Assessment",
  "Retail Assessment",
  "General Assessment",
] as const;

export function getAllTopics(): { topic: string; cluster: TopicCluster }[] {
  return (
    Object.entries(topicClusters) as [TopicCluster, readonly string[]][]
  ).flatMap(([cluster, topics]) =>
    topics.map((topic) => ({ topic, cluster })),
  );
}

export function getClusterForTopic(topic: string): TopicCluster | undefined {
  for (const [cluster, topics] of Object.entries(topicClusters) as [
    TopicCluster,
    readonly string[],
  ][]) {
    if (topics.includes(topic)) {
      return cluster;
    }
  }
  return undefined;
}

export function getTopicsForCluster(cluster: TopicCluster): readonly string[] {
  return topicClusters[cluster];
}
