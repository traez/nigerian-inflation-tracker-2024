import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ Page - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

const FaqPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-between p-4">
      <h1 className="text-xl text-center border rounded-md">
        Frequently Asked Questions Essay
      </h1>
      <p>
        Welcome to nigerianinflationtracker2024.com. This website is my first
        full-stack app and a pet project, built out of love and with the
        intention of using code to solve real-world problems.
      </p>
      <p>
        This platform uses crowdsourced data to provide real-time insights into
        Nigeria&apos;s inflation, empowering citizens with the knowledge to make
        smarter financial decisions. By tracking inflation trends, I aim to
        boost financial literacy and support policymakers in addressing economic
        challenges. Together, we can navigate the rising cost of living and
        contribute to a more informed, resilient Nigeria.
      </p>
      <p>
        Please feel free to explore the website and view crowdsourced data on
        inflation on the homepage. You can take a closer look and view inflation
        data by category (purchase purpose) and by Nigerian State. You can also
        view data by user to see individual reporting trends.
      </p>
      <p>
        Please log in with GitHub or Google to add your own listings, and edit
        or delete your data as needed.
      </p>
      <p>
        You can view the site in either light or dark theme, based on your
        preference. At the website footer, click on the link to view the project
        source code, as well as other projects and the general body of work by
        the website admin, myself, Trae Zeeofor.
      </p>
      <p>Thank you for visiting!</p>
    </div>
  );
};

export default FaqPage;
