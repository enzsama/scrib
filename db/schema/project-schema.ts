import {
  pgTable,
  primaryKey,
  text,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth-schema";

export const project = pgTable("project", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

// DOCUMENTS TABLE: stores document metadata and current content
export const document = pgTable("document", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  projectId: integer()
    .notNull()
    .references(() => project.id),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull(),
  content: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

// DOCUMENT VERSIONS TABLE: stores historical versions for each document
export const documentVersion = pgTable("document_version", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  documentId: integer()
    .notNull()
    .references(() => document.id),
  content: text().notNull(), // version content of the document
  createdBy: integer().notNull(), // references usersTable.id
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

// DOCUMENT COLLABORATORS TABLE: join table to maintain a many-to-many relationship between documents and users
export const documentCollaboratorsTable = pgTable(
  "document_collaborators",
  {
    documentId: integer()
      .notNull()
      .references(() => document.id),
    userId: text("user_id")
      .notNull()
      .references(() => user.id),
    role: text("role").default("editor").notNull(),
  },
  (table) => [primaryKey({ columns: [table.documentId, table.userId] })]
);
