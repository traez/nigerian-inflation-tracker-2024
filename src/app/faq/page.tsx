import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ Page - Nigerian Inflation Tracker 2024",
  description: "Created by Trae Zeeofor",
};

const FaqPage = () => {
  return (
    <div className="flex min-h-screen flex-col justify-start gap-4 sm:gap-8 p-4">
      <h1 className="text-base sm:text-2xl font-bold text-center border rounded-md">
        Frequently Asked Questions Essay
      </h1>
      <aside className="flex flex-col justify-around gap-3 sm:gap-6 text-sm sm:text-lg">
        <p>
          Welcome to <span className="font-bold underline text-amber-900">nigerianinflationtracker2024.com</span>. This website is my first <span className="font-bold underline text-amber-900">full-stack app</span> and a pet project, built out of love and with the
          intention of using code to solve real-world problems.
        </p>
        <p>
          This platform uses <span className="font-bold underline text-amber-900">crowdsourced</span> data to provide real-time insights
          into <span className="font-bold underline text-amber-900">Nigeria&apos;s inflation</span>, empowering citizens with the knowledge
          to make smarter financial decisions. By tracking inflation trends, I
          aim to <span className="font-bold underline text-amber-900">boost financial literacy</span> and <span className="font-bold underline text-amber-900">support policymakers</span> in addressing
          economic challenges. Together, we can navigate the rising cost of
          living and contribute to a more informed, <span className="font-bold underline text-amber-900">resilient Nigeria</span>.
        </p>
        <p>
          Please feel free to explore the website and view crowdsourced data on
          inflation on the <span className="font-bold underline text-amber-900">homepage</span>. You can take a closer look and view
          inflation data by <span className="font-bold underline text-amber-900">category</span> (purchase purpose) and by <span className="font-bold underline text-amber-900">Nigerian State</span>.
          You can also view data by <span className="font-bold underline text-amber-900">user</span> to see individual reporting trends.
        </p>
        <p>
          Please log in with <span className="font-bold underline text-amber-900">GitHub</span> or <span className="font-bold underline text-amber-900">Google</span> to add your own listings, and <span className="font-bold underline text-amber-900">edit</span> or <span className="font-bold underline text-amber-900">delete</span> your data as needed.
        </p>
        <p>
          You can view the site in either <span className="font-bold underline text-amber-900">light</span> or <span className="font-bold underline text-amber-900">dark</span> theme, based on your
          preference. At the website footer, click on the link to <span className="font-bold underline text-amber-900">view the
          project source code</span>, as well as other projects and the general body of
          work by the website admin, myself, Trae Zeeofor.
        </p>
        <p>Thank you for visiting!</p>
      </aside>
    </div>
  );
};

export default FaqPage;
