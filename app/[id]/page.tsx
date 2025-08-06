import { auth } from "@/lib/auth";
import { checkCollaborator, checkNote } from "@/lib/queries";
import { headers } from "next/headers";
import Editor from "./Editor";
import { notFound } from "next/navigation";

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Add a login markup and perhaps a button to the login page or a return the error page
  if (!session || !session.user) return <div>Please log in</div>;

  const { id } = await params;
  const userId = session.user.id;
  const noteExists = await checkNote(id);
  if (!noteExists) notFound();
  //TODO: If not a collaborator, return a read-only markup if it's public and a markup and another if it's private
  // const isCollaborator = await checkCollaborator(userId, id);

  return (
    <section className="max-w-5xl py-24 mx-auto px-4">
      <Editor roomId={id} />
    </section>
  );
};

export default NotePage;
