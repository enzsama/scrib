"use server";
import { db } from "@/db/drizzle";
import { note, noteVersion, noteCollaborator } from "@/db/schema/note-schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

// POST

export const createNote = async (ownerId: string) => {
  const [newNote] = await db.insert(note).values({ ownerId }).returning();
  await db
    .insert(noteCollaborator)
    .values({ noteId: newNote.id, userId: ownerId, role: "owner" });

  const { content, ...plainDoc } = newNote;
  return plainDoc;
};

export const createNewVersion = async (noteId: string) => {
  const [currentNote] = await db
    .select()
    .from(note)
    .where(eq(note.id, noteId))
    .limit(1);

  if (currentNote)
    await db.insert(noteVersion).values({
      noteId,
      content: currentNote.content,
      createdBy: currentNote.ownerId,
    });
};

export const addCollaborator = async (noteId: string, userId: string) => {
  try {
    await db
      .insert(noteCollaborator)
      .values({ noteId, userId, role: "editor" });
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
};

// PUT | PATCH

export const updateTitle = async (noteId: string, newTitle: string) => {
  const [currentNote] = await db
    .select()
    .from(note)
    .where(eq(note.id, noteId))
    .limit(1);

  if (currentNote)
    await db.update(note).set({ title: newTitle }).where(eq(note.id, noteId));
};

export const updateContent = async (
  noteId: string,
  newContent: Uint8Array<ArrayBufferLike>
) => {
  const [currentNote] = await db
    .select()
    .from(note)
    .where(eq(note.id, noteId))
    .limit(1);

  if (currentNote)
    await db
      .update(note)
      .set({ content: newContent })
      .where(eq(note.id, noteId));
};

// DELETE

export const removeCollaborator = async (noteId: string, userId: string) => {
  try {
    await db
      .delete(noteCollaborator)
      .where(
        and(
          eq(noteCollaborator.noteId, noteId),
          eq(noteCollaborator.userId, userId)
        )
      );
    return { success: true };
  } catch (error) {
    return { success: false, error: error };
  }
};

export const deleteNote = async (noteId: string) => {
  await db.delete(noteCollaborator).where(eq(noteCollaborator.noteId, noteId));
  await db.delete(note).where(eq(note.id, noteId));
  revalidatePath("/n");
};
