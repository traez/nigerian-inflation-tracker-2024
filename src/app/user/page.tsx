import { Metadata } from "next";
import { getSession } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "View by User - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function ViewByUserPage() {
  const session = await getSession();

  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold mb-4">View By User Page</h2>
    </div>
  );
}