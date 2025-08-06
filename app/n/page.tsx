import { auth } from "@/lib/auth";
import CustomTable from "./CustomTable";
import { headers } from "next/headers";
import { getUserCollaborationsNotes } from "@/lib/queries";
import NewNoteRowButton from "./CustomTable/NewNoteRowButton";

const NoteListPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Add a login markup and perhaps a button to the login page or a return the error page
  if (!session || !session.user) return <div>Please log in</div>;

  const userId = session.user.id;
  const notes = await getUserCollaborationsNotes(userId);

  return (
    <section className="max-w-7xl py-8 mx-auto px-4">
      <h1 className="text-3xl font-extrabold text-neutral-800 mb-8">Notes</h1>
      {notes.length !== 0 ? (
        <CustomTable notes={notes} userId={userId} />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="pt-6 text-neutral-600">
            Notes you contribute to will show here
          </p>
          <NewNoteRowButton />
        </div>
      )}
    </section>
  );
};

export default NoteListPage;
