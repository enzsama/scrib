"use client";
import { deleteNote } from "@/actions/note-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";

const DeleteNoteButton = ({ noteId }: { noteId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await deleteNote(noteId);
        toast({
          description: "Note successfully deleted.",
          variant: "success",
        });
      } catch (error) {
        toast({
          description: `Couldn't delete note, ${error}`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button onClick={handleClick} disabled={isPending} variant="destructive">
      Delete
    </Button>
  );
};

export default DeleteNoteButton;
