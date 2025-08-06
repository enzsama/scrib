import { auth } from "@/lib/auth";
import { getFirstName } from "@/lib/utils";
import { headers } from "next/headers";
import CustomCarousel from "./CustomCarousel";
import { getUserCollaborationsNotes } from "@/lib/queries";

const Home = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Add a login markup and perhaps a button to the login page or a return the error page
  if (!session || !session.user) return <div>Please log in</div>;

  const userInfo = {
    id: session.user.id,
    name: session.user.name,
  };

  const userRecentNotes = await getUserCollaborationsNotes(userInfo.id);

  return (
    <section className="max-w-4xl py-8 mx-auto px-4">
      <header className="mb-12 flex justify-center">
        <h1 className="text-3xl font-extrabold text-neutral-800">
          Hello, {getFirstName(userInfo.name)}
        </h1>
      </header>

      <div>
        <h2 className="font-light text-neutral-800 text-lg mb-4">
          Recent notes
        </h2>
        <div>
          <CustomCarousel notes={userRecentNotes} />
        </div>
      </div>
    </section>
  );
};

export default Home;
