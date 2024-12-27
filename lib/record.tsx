import "server only";
import DB from "./db";
import { rewinds } from "./db/schema";
import { eq } from "drizzle-orm";

export async function recordUserActivity(username: string, email?: string) {
  const _username = username.trim().toLowerCase();
  const rewind = await DB.query.rewinds.findFirst({
    columns: {
      emailAddress: true,
      rewindCount: true,
    },
    where(fields, operators) {
      return operators.eq(fields.username, _username);
    },
  });

  if (rewind) {
    await DB.update(rewinds)
      .set({
        rewindCount: rewind.rewindCount + 1,
        emailAddress: email || rewind.emailAddress,
      })
      .where(eq(rewinds.username, _username));
    return;
  } else {
    await DB.insert(rewinds).values({
      username: _username,
      emailAddress: email,
    });
  }
}
