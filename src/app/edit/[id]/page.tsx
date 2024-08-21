import { Metadata } from "next";
import { getSession } from "@/lib/getSession";
import EditFormEntry from "@/components/EditFormEntry";

export const metadata: Metadata = {
  title: "Edit Page - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function EditPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen">
      {session?.user ? (
        <>
          <EditFormEntry />
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
