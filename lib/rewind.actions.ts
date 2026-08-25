"use server";

import { z } from "zod";

import { buildRewind } from "./github.server";
import { enforceRateLimit } from "./rate-limit.server";
import { generateInsights } from "./ai-insights";
import { rewindInputSchema, insightsInputSchema } from "./rewind-schemas";

export const analyzeGithub = async (payload: unknown) => {
    const data = rewindInputSchema.parse(payload);
    await enforceRateLimit("api");
    return buildRewind(data.username, data.year, data.token || undefined);
};

export const getAiInsights = async (payload: unknown) => {
    const data = insightsInputSchema.parse(payload);
    await enforceRateLimit("insights");
    return generateInsights(data.summary as z.infer<typeof insightsInputSchema>["summary"]);
};
