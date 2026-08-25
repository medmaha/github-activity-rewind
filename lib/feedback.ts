"use server";
import { userAgent } from "next/server";
import DB from "./db";
import { feedbacks } from "./db/schema";
import { enforceRateLimit } from "./rate-limit.server";
import { headers } from "next/headers";
import { createHash } from "node:crypto";

export async function createFeedback(data: typeof feedbacks.$inferInsert) {
    try {
        await enforceRateLimit("feedback");
        const ua = userAgent({ headers: await headers() });
        data.deviceHash = await hashUserAgent(ua);
        await DB.insert(feedbacks).values(data);
        return true;
    } catch (error: any) {
        throw new Error(error.message);
    }
}

async function hashUserAgent(ua: ReturnType<typeof userAgent>): Promise<string> {
    return createHash("sha256").update(JSON.stringify(ua)).digest("hex");
}
