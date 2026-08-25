import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";


export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey().notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  subject: varchar("subject", { length: 100 }).notNull(),
  content: varchar("content", { length: 500 }).notNull(),
  deviceHash: varchar("device_hash", { length: 500 }),
  rating: integer("rating").default(3),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
