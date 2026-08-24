"use server";
import DB from "./db";
import { feedbacks } from "./db/schema";
import { enforceRateLimit } from "./rate-limit.server";

export async function createFeedback(data: typeof feedbacks.$inferInsert) {
	try {
		await enforceRateLimit("feedback")
	} catch (error: any) {
		throw new Error(error.message);
	}
	await DB.insert(feedbacks).values(data);
	return true;
}
