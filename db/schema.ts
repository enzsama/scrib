import {
  integer,
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  emailVerifiedAt: timestamp({ withTimezone: true }),
  password: varchar({ length: 255 }),
  provider: varchar({ length: 50 }),
  providerId: varchar({ length: 255 }),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const verificationTokensTable = pgTable(
  "verification_tokens",
  {
    identifier: varchar({ length: 255 }).primaryKey(),
    token: varchar({ length: 255 }).notNull(),
    expiresAt: timestamp({ withTimezone: true }).notNull(),
  },
  (table) => [primaryKey({ columns: [table.identifier, table.token] })]
);

// DOCUMENT TABLE: Stores document metadata and current document
export const documentsTable = pgTable("documents", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ownerId: integer()
    .notNull()
    .references(() => usersTable.id),
  title: varchar({ length: 255 }).notNull(),
  content: text().notNull(),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

// DOCUMENT VERSIONS TABLE: Stores historical data for each document
export const documentVersionsTable = pgTable("document_versions", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  documentId: integer()
    .notNull()
    .references(() => documentsTable.id),
  content: text().notNull(),
  createdBy: integer()
    .notNull()
    .references(() => usersTable.id),
  createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

// DOCUMENT COLLABORATORS TABLE: Join table to maintain a many-to-many relationship between documents and users(collaborators)
export const documentCollaboratorsTable = pgTable(
  "document_collaborators",
  {
    documentId: integer()
      .notNull()
      .references(() => documentsTable.id),
    role: varchar({ length: 255 }).notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.documentId, table.role] }),
  })
);
