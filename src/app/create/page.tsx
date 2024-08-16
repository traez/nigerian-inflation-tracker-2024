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
      <h1>CreatePage</h1>
      <CreateFormEntry userEmail={userEmail} />
    </div>
  );
}
