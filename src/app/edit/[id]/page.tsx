import { Metadata } from "next";
import { getSession } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Edit Page - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function EditPage() {
  const session = await getSession();


  return (
    <div className="min-h-screen">
      <h1>EditPage for Id</h1>
    </div>
  );
};


