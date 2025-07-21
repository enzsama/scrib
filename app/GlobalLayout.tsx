"use client";
import { usePathname } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppSidebar from "./AppSidebar";
import CustomTrigger from "./CustomTrigger";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
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
        <AppSidebar />
        <div className="flex-1">
          <CustomTrigger />
          <div>{children}</div>
        </div>
      </SidebarProvider>
    </main>
  );
}
