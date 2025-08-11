import { auth } from "@/lib/auth";
import { checkCollaborator, checkNote } from "@/lib/queries";
import { headers } from "next/headers";
import { notFound, redirect } from "next/navigation";
import Editor from "./Editor";

const NotePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const { id } = await params;
  const noteExists = await checkNote(id);
  if (!noteExists) notFound();
  const userId = session.user.id;
  //TODO: If not a collaborator, return a read-only markup if it's public and a markup and another if it's private
  // const isCollaborator = await checkCollaborator(userId, id);

  return (
    <section className="max-w-5xl py-24 mx-auto px-4">
      <Editor roomId={id} />
    </section>
  );
};

export default NotePage;
