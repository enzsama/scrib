import { db } from "@/db/drizzle";
import { note, noteCollaborator } from "@/db/schema/note-schema";
import { eq } from "drizzle-orm";

export const getUserCollaborationsNotes = async (userId: string) => {
  const collaborations = await db
    .select()
    .from(noteCollaborator)
    .where(eq(noteCollaborator.userId, userId));

  const collaborationNotes = await Promise.all(
    collaborations.map(async (collab) => {
      const notes = await db
        .select({
          id: note.id,
          title: note.title,
          updatedAt: note.updatedAt,
        })
        .from(note)
        .where(eq(note.id, collab.noteId));

      return notes;
    })
  );

  return collaborationNotes.flat();
};
