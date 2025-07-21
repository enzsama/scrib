import { auth } from "@/lib/auth";
import CustomTable from "./CustomTable";
import { headers } from "next/headers";
import { getUserCollaborationsNotes } from "@/lib/queryDB";
import NewNoteRowButton from "./CustomTable/NewNoteRowButton";

const NoteListPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) return <div></div>;

  const userInfo = {
    id: session.user.id,
    name: session.user.name,
  };

  const notes = await getUserCollaborationsNotes(userInfo.id);

  return (
    <section className="max-w-7xl py-8 mx-auto px-4">
      <h1 className="text-3xl font-extrabold text-neutral-800 mb-8">Notes</h1>
      {notes.length !== 0 ? (
        <CustomTable notes={notes} userId={userInfo.id} />
      ) : (
        <div className="flex flex-col items-center space-y-4">
          <p className="pt-6 text-neutral-600">
            Notes you contribute to will show here
          </p>
          <NewNoteRowButton ownerId={userInfo.id} />
        </div>
      )}
    </section>
  );
};

export default NoteListPage;
