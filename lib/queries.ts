import { db } from "@/db/drizzle";
import { user } from "@/db/schema/auth-schema";
import { note, noteCollaborator } from "@/db/schema/note-schema";
import { and, desc, eq } from "drizzle-orm";

export const getUserDetails = async (userId: string) => {
  const [currentUser] = await db
    .select({ name: user.name, email: user.email, image: user.image })
    .from(user)
    .where(eq(user.id, userId))
    .limit(1);

  return currentUser;
};

export const getUserRecentNotes = async (userId: string) => {
  const recentNotes = await db
    .select({ id: note.id, title: note.title, updatedAt: note.updatedAt })
    .from(noteCollaborator)
    .innerJoin(note, eq(note.id, noteCollaborator.noteId))
    .where(eq(noteCollaborator.userId, userId))
    .orderBy(desc(note.updatedAt))
    .limit(8);

  return recentNotes;
};

export const getUserCollaborationsNotes = async (userId: string) => {
  const collaborationNotes = await db
    .select({
      id: note.id,
      ownerId: note.ownerId,
      title: note.title,
      updatedAt: note.updatedAt,
      owner: user.name,
    })
    .from(noteCollaborator)
    .innerJoin(note, eq(note.id, noteCollaborator.noteId))
    .innerJoin(user, eq(user.id, note.ownerId))
    .where(eq(noteCollaborator.userId, userId))
    .orderBy(desc(note.updatedAt));

  return collaborationNotes;
};

export const checkNote = async (noteId: string) => {
  const [foundNote] = await db
    .select()
    .from(note)
    .where(eq(note.id, noteId))
    .limit(1);

  if (foundNote) return true;
  return false;
};

export const checkCollaborator = async (userId: string, noteId: string) => {
  const [collaboration] = await db
    .select()
    .from(noteCollaborator)
    .where(
      and(
        eq(noteCollaborator.noteId, noteId),
        eq(noteCollaborator.userId, userId)
      )
    )
    .limit(1);

  if (collaboration) return true;
  return false;
};
