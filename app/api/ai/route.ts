import { NextResponse } from "next/server";
import { arcjetMiddleware } from "../utils";
import { AnalyzedData } from "@/lib/types";
import { generateAIInsights } from "@/lib/ai";

export async function POST(req: Request) {
    const decision = await arcjetMiddleware.protect(req);

    if (decision.isDenied()) {
        if (decision.reason.isRateLimit()) {
            return NextResponse.json(
                { error: "Too Many Requests", message: decision.reason },
                { status: 429 },
            );
        } else if (decision.reason.isBot()) {
            return NextResponse.json(
                { error: "No bots allowed", message: decision.reason },
                { status: 403 },
            );
        } else {
            return NextResponse.json(
                { error: "Forbidden", message: decision.reason },
                { status: 403 },
            );
        }
    }

    const data: AnalyzedData = await req.json();

    try {
        const _data = generateAIInsights(data);
        return NextResponse.json(_data);
    } catch (error) {
        return NextResponse.json(
            { error: "Forbidden", message: "Failed to parsed json data" },
            { status: 400 },
        );
    }
}
