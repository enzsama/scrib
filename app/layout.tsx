import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import GlobalLayout from "./GlobalLayout";

export const metadata: Metadata = {
  title: "Scrib",
  description: "A document and note-taking app",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <GlobalLayout>{children}</GlobalLayout>
      </body>
    </html>
  );
}
