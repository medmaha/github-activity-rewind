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
      window: "600s", // 10 minutes fixed window
      max: 1, // allow a maximum of 2 requests
    }),
  ],
});
export const arcjetMiddlewareGithub = arcjet({
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
      window: "60s", // 60 second fixed window
      max: 2, // allow a maximum of 2 requests
    }),
  ],
});

export async function protectRequest() {
  return;
  const req = await request();
  const decision = await arcjetMiddlewareAI.protect(req);
  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      throw new Error("Too Many Requests " + decision.reason.remaining);
    } else if (decision.reason.isBot()) {
      throw new Error("No bots allowed");
    } else {
      throw new Error("Forbidden");
    }
  }
}
