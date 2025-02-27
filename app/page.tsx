"use client";
import Link from "next/link";
import { Button } from "../components/ui/button";

const recentDocuments = [
  { id: "doc1", title: "AI Generated Report", updatedAt: "2023-10-01" },
  { id: "doc2", title: "Project Plan", updatedAt: "2023-09-25" },
  { id: "doc3", title: "Meeting Notes", updatedAt: "2023-09-20" },
];

const Home = () => {
  return (
    <main className="min-h-screen py-8">
      <div className="max-w-5xl mx-auto px-4">
        {/* Header Section */}
        <header className="mb-12 flex flex-col sm:flex-row items-center justify-between">
          <h1 className="text-4xl font-extrabold text-gray-900">Hello, User</h1>
          <Link href="/doc/new" className="mt-6 sm:mt-0">
            <Button className="p-6 text-lg">New Document</Button>
          </Link>
        </header>

        {/* Recent Documents Section */}
        <section pt-6>
          <h2 className="text-xl font-light text-gray-800 mb-4">
            Recent Documents
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {recentDocuments.map((doc) => (
              <Link key={doc.id} href={`/doc/${doc.id}`}>
                <div className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {doc.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Updated: {doc.updatedAt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Home;
