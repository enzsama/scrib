"use client";
import { createNote } from "@/actions/note-actions";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NewNoteRowButton = ({ ownerId }: { ownerId: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const handleClick = () => {
    startTransition(async () => {
      try {
        const newNote = await createNote(ownerId);
        if (newNote) router.push(`n/${newNote.id}`);
      } catch (error) {
        toast({
          description: `Couldn't create a new note, ${error}`,
          variant: "destructive",
        });
      }
    });
  };

  return (
    <Button
      disabled={isPending}
      className="bg-neutral-300 hover:bg-neutral-500"
      onClick={handleClick}
    >
      <Plus />
      New note
    </Button>
  );
};

export default NewNoteRowButton;
