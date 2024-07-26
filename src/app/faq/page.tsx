import { Metadata } from "next";
import ReduxTFormEntry from "@/components/ReduxTFormEntry";

export const metadata: Metadata = {
  title: "FAQ Page - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

const FaqPage = () => {
  return (
    <div className="min-h-screen">
      <h1>FaqPage</h1>
      <ReduxTFormEntry/>
    </div>
  );
};

export default FaqPage;
