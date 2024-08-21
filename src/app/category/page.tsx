import { Metadata } from "next";
import CategoryFormEntry from "@/components/CategoryFormEntry";

export const metadata: Metadata = {
  title: "View by Category - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function ViewByCategoryPage() {

  return (
    <div className="min-h-screen p-4">
      <h2 className="text-2xl font-bold mb-4">View By Category Page</h2>
      <CategoryFormEntry />
    </div>
  );
}
