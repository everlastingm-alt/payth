import OpenAI from "openai";

export function getOpenAIClient(): OpenAI {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }
  return new OpenAI({ apiKey });
}

export function getChatModel(): string {
  return process.env.OPENAI_MODEL ?? "gpt-4o-mini";
}

export async function callJsonModel<T>(
  systemPrompt: string,
  userPrompt: string,
  temperature = 0.7,
): Promise<T> {
  const openai = getOpenAIClient();
  const model = getChatModel();

  const completion = await openai.chat.completions.create({
    model,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature,
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from AI");
  }

  return JSON.parse(content) as T;
}
