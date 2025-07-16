import {
  pgTable,
  primaryKey,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";
import { sql } from "drizzle-orm";

// FOR YDOC DATA IN THE FUTURE
// const bytea = customType<{ data: Buffer; notNull: true; default: true }>({
//   dataType() {
//     return "bytea";
//   },
// });

// TODO: AFTER SETUP WITH YDOC, BLOCKNOTE AND SOCKET.IO, NEED TO ADD A FIELD FOR NOTE TYPE: COLLABORATIVE OR PERSONAL, ALSO WHETHER IT'S PUBLIC OR PRIVATE
export const note = pgTable("note", {
  id: text()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull().default("Untitled"),
  content: text("string").notNull().default(""),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const noteVersion = pgTable("note_version", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  noteId: text("note_id")
    .notNull()
    .references(() => note.id),
  content: text("string").notNull(),
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
