import { Metadata } from "next";
import StateFormEntry from "@/components/StateFormEntry";

export const metadata: Metadata = {
  title: "View by State - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

export default async function ViewByStatePage() {

  return (
    <div className="min-h-screen">
      <h2 className="text-2xl font-bold mb-4">View By State Page</h2>
      <StateFormEntry />
    </div>
  );
};


