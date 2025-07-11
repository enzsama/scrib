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
  const isAuthPath =
    pathname.startsWith("/email-verified") ||
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  if (isAuthPath) return <>{children}</>;

  return (
    <section className="flex min-h-screen">
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <CustomTrigger />
          {children}
        </main>
      </SidebarProvider>
    </section>
  );
}
