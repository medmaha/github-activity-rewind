import { NextResponse } from "next/server";
import { arcjetMiddleware } from "../utils";

export async function GET(req: Request) {
  const decision = await arcjetMiddleware.protect(req);

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return NextResponse.json(
        { error: "Too Many Requests", reason: decision.reason },
        { status: 429 }
      );
    } else if (decision.reason.isBot()) {
      return NextResponse.json(
        { error: "No bots allowed", reason: decision.reason },
        { status: 403 }
      );
    } else {
      return NextResponse.json(
        { error: "Forbidden", reason: decision.reason },
        { status: 403 }
      );
    }
  }

  // Arcjet Pro plan verifies the authenticity of common bots using IP data.
  // Verification isn't always possible, so we recommend checking the decision
  // separately.
  // https://docs.arcjet.com/bot-protection/reference#bot-verification
  if (decision.reason.isBot() && decision.reason.isSpoofed()) {
    return NextResponse.json(
      { error: "Forbidden", reason: decision.reason },
      { status: 403 }
    );
  }

  return NextResponse.json({ message: "Hello world" });
}
