import { Button } from "@/components/ui/button";
import Link from "next/link";

const EmailVerifiedPage = () => {
  return (
    <section className="flex flex-col items-center h-screen mt-16">
      <h1 className="mb-4 text-2xl font-bold text-black">Email verified</h1>
      <p className="text-gray-600">Your email has been successfully verified</p>
      <Link href={"/"}>
        <Button className="mt-4">Go to home</Button>
      </Link>
    </section>
  );
};
export default EmailVerifiedPage;
