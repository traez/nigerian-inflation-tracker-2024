import { Metadata } from "next";
import UserListFormEntry from "@/components/UserListFormEntry";

export const metadata: Metadata = {
  title: "View by User - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function ViewByUserPage() {

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">View By User Page</h2>
      <UserListFormEntry />
    </div>
  );
}
