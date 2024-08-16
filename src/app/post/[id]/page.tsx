import { Metadata } from "next";
import { getSession } from "@/lib/getSession";

export const metadata: Metadata = {
  title: "Post Page - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function PostPage() {
  const session = await getSession();


  return (
    <div className="min-h-screen">
      <h1>PostPage for Id</h1>
    </div>
  );
};


