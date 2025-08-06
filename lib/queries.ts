import { db } from "@/db/drizzle";
import { user } from "@/db/schema/auth-schema";
import { note, noteCollaborator } from "@/db/schema/note-schema";
import { and, eq } from "drizzle-orm";

const getOwnerName = async (ownerId: string) => {
  const [{ name }] = await db
    .select({ name: user.name })
    .from(user)
    .where(eq(user.id, ownerId))
    .limit(1);

  return name;
};

export const getUserCollaborationsNotes = async (userId: string) => {
  const collaborations = await db
    .select()
    .from(noteCollaborator)
    .where(eq(noteCollaborator.userId, userId));

  const collaborationNotes = await Promise.all(
    collaborations.map(async (collab) => {
      const [collabNote] = await db
        .select({
          id: note.id,
          ownerId: note.ownerId,
          title: note.title,
          updatedAt: note.updatedAt,
        })
        .from(note)
        .where(eq(note.id, collab.noteId))
        .limit(1);

      const owner = await getOwnerName(collabNote.ownerId);
      return { ...collabNote, owner };
    })
  );

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
