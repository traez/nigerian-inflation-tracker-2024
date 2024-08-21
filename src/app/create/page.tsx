import { Metadata } from "next";
import { getSession } from "@/lib/getSession";
import CreateFormEntry from "@/components/CreateFormEntry";

export const metadata: Metadata = {
  title: "Create Page - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function CreatePage() {
  const session = await getSession();
  const userEmail = session?.user?.email;

  return (
    <div className="min-h-screen">
      {session?.user ? (
        <>
          <h1 className="text-2xl font-bold mb-4">Create a New Entry</h1>
          <CreateFormEntry userEmail={userEmail} />
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sign In Required</h1>
          <p className="mb-4">
            Please log in with GitHub or Google to create a new post.
          </p>
        </div>
      )}
    </div>
  );
}
