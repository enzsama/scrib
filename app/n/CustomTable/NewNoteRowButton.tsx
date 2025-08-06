"use client";
import { createNote } from "@/actions/note-actions";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/auth-client";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NewNoteRowButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const { data, isPending } = useSession();

  if (isPending) return <Skeleton className="h-8 w-24" />;
  if (!data || !data.user) return null;

  const handleClick = () => {
    startTransition(async () => {
      try {
        const newNote = await createNote(data.user.id);
        if (newNote) router.push(`${newNote.id}`);
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
      disabled={pending}
      className="bg-neutral-300 hover:bg-neutral-500"
      onClick={handleClick}
    >
      <Plus />
      {pending ? "Creating" : "New note"}
    </Button>
  );
};

export default NewNoteRowButton;
