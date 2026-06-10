import { NextResponse } from "next/server";
import { runContentPipeline } from "@/lib/content/pipeline";
import {
  getAllTopics,
  getTopicsForCluster,
  type TopicCluster,
  topicClusters,
} from "@/lib/content/topics";

function isAuthorized(request: Request): boolean {
  const secret = process.env.CONTENT_FACTORY_SECRET;
  if (!secret) return process.env.NODE_ENV === "development";
  return request.headers.get("x-content-factory-secret") === secret;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      topic,
      cluster,
      skipImage,
      withImage = false,
      status = "draft",
      all = false,
    } = body as {
      topic?: string;
      cluster?: TopicCluster;
      skipImage?: boolean;
      withImage?: boolean;
      status?: "draft" | "published";
      all?: boolean;
    };

    const shouldSkipImage = withImage ? false : (skipImage ?? true);

    let topics: { topic: string; cluster: TopicCluster }[] = [];

    if (all) {
      topics = getAllTopics();
    } else if (topic) {
      const match = getAllTopics().find((t) => t.topic === topic);
      if (!match) {
        return NextResponse.json(
          { error: `Topic not found: ${topic}` },
          { status: 400 },
        );
      }
      topics = [match];
    } else if (cluster) {
      if (!(cluster in topicClusters)) {
        return NextResponse.json(
          { error: `Unknown cluster: ${cluster}` },
          { status: 400 },
        );
      }
      topics = getTopicsForCluster(cluster).map((t) => ({ topic: t, cluster }));
    } else {
      return NextResponse.json(
        { error: "Provide topic, cluster, or all: true" },
        { status: 400 },
      );
    }

    const results = [];
    for (const item of topics) {
      try {
        const result = await runContentPipeline({
          topic: item.topic,
          cluster: item.cluster,
          skipImage: shouldSkipImage,
          status,
        });
        results.push({
          topic: item.topic,
          slug: result.article.slug,
          success: true,
          imageGenerated: result.imageGenerated,
          imageError: result.imageError,
        });
      } catch (error) {
        results.push({
          topic: item.topic,
          success: false,
          error: error instanceof Error ? error.message : "Generation failed",
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Content generate API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Content generation failed",
      },
      { status: 500 },
    );
  }
}
