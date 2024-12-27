"use server";
import { request } from "@arcjet/next";
import { arcjetMiddlewareFeedback } from "./req.middleware";
import DB from "./db";
import { feedbacks } from "./db/schema";

export async function createFeedback(data: typeof feedbacks.$inferInsert) {
  const req = await request();
  const decision = await arcjetMiddlewareFeedback.protect(req);
  if (decision.isDenied()) {
    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        throw new Error("You've hit the rate limit please try again in 2mins");
      } else if (decision.reason.isBot()) {
        throw new Error("No bots allowed");
      } else {
        throw new Error("Forbidden");
      }
    }
  }
  await DB.insert(feedbacks).values(data);
  return true;
}
