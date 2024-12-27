import arcjet, { detectBot, shield, fixedWindow, request } from "@arcjet/next";

export const arcjetMiddlewareAI = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    fixedWindow({
      mode: "LIVE",
      window: "60s", // 5 minutes fixed window
      max: 2, // allow a maximum of 3 requests
    }),
  ],
});
export const arcjetMiddlewareFeedback = arcjet({
  key: process.env.ARCJET_KEY!,
  characteristics: ["ip.src"],
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({
      mode: "LIVE",
      allow: ["CATEGORY:SEARCH_ENGINE"],
    }),
    fixedWindow({
      mode: "LIVE",
      window: "60s", // 5 minutes fixed window
      max: 2, // allow a maximum of 3 requests
    }),
  ],
});

export async function protectRequest() {
  const req = await request();
  const decision = await arcjetMiddlewareAI.protect(req);
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new Error("You've hit the rate limit please try again in 2mins");
    } else if (decision.reason.isBot()) {
      throw new Error("No bots allowed");
    } else {
      throw new Error("Forbidden");
    }
  }
  return decision;
}
