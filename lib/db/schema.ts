import {
  pgTable,
  serial,
  integer,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const rewinds = pgTable("rewinds", {
  id: serial("id").primaryKey().notNull(),
  username: varchar("username", { length: 100 }).notNull(),
  emailAddress: varchar("email", { length: 100 }),
  rewindCount: integer("rewind_count").default(1).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const feedbacks = pgTable("feedbacks", {
  id: serial("id").primaryKey().notNull(),
  author: varchar("author", { length: 100 }).notNull(),
  subject: varchar("subject", { length: 100 }).notNull(),
  content: varchar("content", { length: 500 }).notNull(),
  rating: integer("rating").default(3),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
