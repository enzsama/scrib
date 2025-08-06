import {
  pgTable,
  primaryKey,
  text,
  integer,
  timestamp,
  customType,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { sql } from "drizzle-orm";

const bytea = customType<{
  data: Uint8Array<ArrayBufferLike>;
  notNull: true;
  default: true;
}>({
  dataType() {
    return "bytea";
  },
  toDriver(value) {
    return value;
  },
  fromDriver(value) {
    return new Uint8Array<ArrayBufferLike>(value as ArrayBufferLike);
  },
});

// TODO: NEED TO ADD A FIELD FOR NOTE TYPE: COLLABORATIVE OR PERSONAL, ALSO WHETHER IT'S PUBLIC OR PRIVATE
export const note = pgTable("note", {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull().default("Untitled"),
  content: bytea("content")
    .notNull()
    .default(sql`'\\x'`),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const noteVersion = pgTable("note_version", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  noteId: text("note_id")
    .notNull()
    .references(() => note.id),
  content: bytea("content")
    .notNull()
    .default(sql`'\\x'`),
  createdBy: text("created_by")
    .notNull()
    .references(() => user.id),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const noteCollaborator = pgTable(
  "note_collaborator",
  {
    noteId: text("note_id")
      .notNull()
      .references(() => note.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    role: text("role").default("editor").notNull(),
  },
  (table) => [primaryKey({ columns: [table.noteId, table.userId] })]
);
