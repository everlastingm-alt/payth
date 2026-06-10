import { config } from "dotenv";
import { resolve } from "path";
import { runContentPipeline, runImageOnlyPipeline } from "../lib/content/pipeline";
import {
  getAllTopics,
  getTopicsForCluster,
  type TopicCluster,
  topicClusters,
} from "../lib/content/topics";

config({ path: resolve(process.cwd(), ".env.local") });

function parseArgs(argv: string[]) {
  const args: {
    topic?: string;
    cluster?: TopicCluster;
    slug?: string;
    all?: boolean;
    skipImage?: boolean;
    withImage?: boolean;
    publish?: boolean;
    imageOnly?: boolean;
  } = {};

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--all") args.all = true;
    else if (arg === "--skip-image") args.skipImage = true;
    else if (arg === "--with-image") args.withImage = true;
    else if (arg === "--publish") args.publish = true;
    else if (arg === "--image-only") args.imageOnly = true;
    else if (arg === "--topic" && argv[i + 1]) {
      args.topic = argv[++i];
    } else if (arg === "--slug" && argv[i + 1]) {
      args.slug = argv[++i];
    } else if (arg === "--cluster" && argv[i + 1]) {
      const cluster = argv[++i] as TopicCluster;
      if (!(cluster in topicClusters)) {
        console.error(`Unknown cluster: ${cluster}`);
        console.error(`Valid clusters: ${Object.keys(topicClusters).join(", ")}`);
        process.exit(1);
      }
      args.cluster = cluster;
    }
  }

  return args;
}

async function main() {
  const args = parseArgs(process.argv.slice(2));

  if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not set. Add it to .env.local");
    process.exit(1);
  }

  if (args.imageOnly) {
    if (!args.slug) {
      console.error("--image-only requires --slug <playbook-slug>");
      process.exit(1);
    }

    try {
      const result = await runImageOnlyPipeline({ slug: args.slug });
      console.log(`Image regen done: ${result.article.slug}`);
      if (result.imageError) {
        console.warn(`Image warning: ${result.imageError}`);
        process.exit(1);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed: ${message}`);
      process.exit(1);
    }
    return;
  }

  let topics: { topic: string; cluster: TopicCluster }[] = [];

  if (args.all) {
    topics = getAllTopics();
  } else if (args.topic) {
    const all = getAllTopics();
    const match = all.find((t) => t.topic === args.topic);
    if (!match) {
      console.error(`Topic not found in registry: ${args.topic}`);
      process.exit(1);
    }
    topics = [match];
  } else if (args.cluster) {
    topics = getTopicsForCluster(args.cluster).map((topic) => ({
      topic,
      cluster: args.cluster!,
    }));
  } else {
    console.log(`Usage:
  npm run content:generate -- --topic "Do You Know Your Processing Rate?"
  npm run content:generate -- --cluster paymentVisibility
  npm run content:generate:all
  npm run content:generate -- --topic "..." --publish
  npm run content:generate -- --topic "..." --with-image
  npm run content:generate -- --image-only --slug do-you-know-your-approval-rate

Options:
  --topic <string>     Generate a single playbook
  --cluster <name>     Generate all topics in a cluster
  --all                Generate all topics
  --with-image         Enable image generation (off by default)
  --skip-image         Skip image generation (default, kept for compatibility)
  --publish            Set status to published
  --image-only         Regenerate image only (requires --slug)`);
    process.exit(0);
  }

  console.log(`Generating ${topics.length} playbook(s)...`);

  const results = [];
  for (const { topic, cluster } of topics) {
    try {
      const skipImage = args.withImage ? false : (args.skipImage ?? true);

      const result = await runContentPipeline({
        topic,
        cluster,
        skipImage,
        status: args.publish ? "published" : "draft",
      });
      results.push({ topic, slug: result.article.slug, success: true });
      if (result.imageError) {
        console.warn(`  Image warning for ${result.article.slug}: ${result.imageError}`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`Failed: ${topic} — ${message}`);
      results.push({ topic, success: false, error: message });
    }
  }

  const succeeded = results.filter((r) => r.success).length;
  console.log(`\nDone: ${succeeded}/${results.length} succeeded`);
  if (succeeded < results.length) process.exit(1);
}

main();
