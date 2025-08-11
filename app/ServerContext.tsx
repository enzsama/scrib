import { auth } from "@/lib/auth";
import { getUserDetails } from "@/lib/queries";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import GlobalLayout from "./GlobalLayout";

export default async function ServerContext({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session || !session.user) redirect("/login");

  const userId = session.user.id;
  const userDetails = await getUserDetails(userId);

  return <GlobalLayout userDetails={userDetails}>{children}</GlobalLayout>;
}
