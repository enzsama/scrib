"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import CustomTrigger from "./CustomTrigger";

export default function GlobalLayout({
  children,
  userDetails,
}: {
  children: React.ReactNode;
  userDetails: { name: string; email: string; image: string | null };
}) {
  const pathname = usePathname();
  const authpathnames = [
    "/email-verified",
    "/forgot-password",
    "/login",
    "/reset-password",
    "/signup",
  ];
  const isAuthPath = authpathnames.some((authpath) =>
    pathname.startsWith(authpath)
  );

  if (isAuthPath) return <>{children}</>;

  return (
    <main className="flex">
      <SidebarProvider>
        <AppSidebar userDetails={userDetails} />
        <div className="flex-1">
          <CustomTrigger />
          <div>{children}</div>
        </div>
      </SidebarProvider>
    </main>
  );
}
