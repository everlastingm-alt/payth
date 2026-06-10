import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import PlaybookHeader from "@/components/playbooks/PlaybookHeader";
import IconCircle from "@/components/payth/IconCircle";
import PaythBackground from "@/components/payth/PaythBackground";
import { CardTitle, DisplayTitle, LabelText, SectionTitle, SmallText } from "@/components/payth/Typography";
import { listPlaybooks } from "@/lib/content/registry";
import {
  clusterLabels,
  topicClusters,
  type TopicCluster,
} from "@/lib/content/topics";

export const metadata = {
  title: "Payment Playbooks — PAYTH",
  description:
    "Practical payment guides for SMB owners. Learn how to review costs, track metrics, and make smarter payment decisions.",
};

export default async function PlaybooksIndexPage() {
  const playbooks = await listPlaybooks("published");
  const clusters = Object.keys(topicClusters) as TopicCluster[];

  const grouped = clusters.map((cluster) => ({
    cluster,
    label: clusterLabels[cluster],
    articles: playbooks.filter((p) => p.cluster === cluster),
  }));

  return (
    <main className="relative min-h-screen bg-payth-bg text-payth-navy">
      <PaythBackground />
      <PlaybookHeader />

      <div className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="mb-10 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-payth-border bg-payth-blueSoft px-4 py-2">
            <BookOpen size={16} className="text-payth-blue" strokeWidth={2} />
            <LabelText className="text-payth-blue">PAYTH Playbooks</LabelText>
          </div>
          <DisplayTitle className="max-md:text-payth-page">
            Practical Payment Guides for SMBs
          </DisplayTitle>
          <SmallText className="mx-auto mt-4 max-w-2xl text-payth-body-lg">
            Actionable playbooks to help you understand costs, track metrics, and make
            confident payment decisions.
          </SmallText>
        </div>

        <div className="space-y-12">
          {grouped.map(({ cluster, label, articles }) => (
            <section key={cluster}>
              <SectionTitle as="h2" className="mb-6">
                {label}
              </SectionTitle>

              {articles.length === 0 ? (
                <SmallText>Coming soon.</SmallText>
              ) : (
                <div className="grid gap-4 md:grid-cols-2">
                  {articles.map((article) => (
                    <Link
                      key={article.slug}
                      href={`/playbooks/${article.slug}`}
                      className="group flex gap-4 rounded-payth-card border border-payth-border bg-white p-6 shadow-payth-card transition hover:border-payth-blue"
                    >
                      <IconCircle icon={BookOpen} size="card" tone="blue" />
                      <div className="min-w-0 flex-1">
                        <CardTitle as="h3" className="group-hover:text-payth-blue">
                          {article.title}
                        </CardTitle>
                        <SmallText className="mt-2">{article.description}</SmallText>
                        <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-payth-blue">
                          Read playbook <ArrowRight size={14} />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
