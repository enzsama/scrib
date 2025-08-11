import { auth } from "@/lib/auth";
import { getUserRecentNotes } from "@/lib/queries";
import { getFirstName } from "@/lib/utils";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import CustomCarousel from "./CustomCarousel";

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const userInfo = {
    id: session.user.id,
    name: session.user.name,
  };
  const userRecentNotes = await getUserRecentNotes(userInfo.id);

  return (
    <section className="max-w-4xl py-8 mx-auto px-4">
      <header className="mb-12 flex justify-center">
        <h1>Hello, {getFirstName(userInfo.name)}</h1>
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

export default HomePage;
