"use client";
import { createNote } from "@/actions/note-actions";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NewNoteButton = ({ ownerId }: { ownerId: string }) => {
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
    <button
      disabled={isPending}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="shadow-none hover:shadow-sm transition-shadow h-32 w-38 text-neutral-600">
        <CardContent>
          <NotebookPen />
          <hr className="mt-2 mb-1" />
          <h3 className="text-sm font-semibold text-left">
            {isPending ? "Creating" : "New note"}
          </h3>
        </CardContent>
      </Card>
    </button>
  );
};

export default NewNoteButton;
