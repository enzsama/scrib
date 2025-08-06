"use client";
import { createNote } from "@/actions/note-actions";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "@/lib/auth-client";
import { NotebookPen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const NewNoteButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [pending, startTransition] = useTransition();
  const { data, isPending } = useSession();

  if (isPending) return <Skeleton className="h-32 w-38" />;
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
    <button disabled={pending} onClick={handleClick} className="cursor-pointer">
      <Card className="shadow-none hover:shadow-sm transition-shadow h-32 w-38 text-neutral-600">
        <CardContent>
          <NotebookPen />
          <hr className="mt-2 mb-1" />
          <h3 className="text-sm font-semibold text-left">
            {pending ? "Creating" : "New note"}
          </h3>
        </CardContent>
      </Card>
    </button>
  );
};

export default NewNoteButton;
