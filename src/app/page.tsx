import { getSession } from "@/lib/getSession";
import AllFormEntry from "@/components/AllFormEntry";

export default async function Home() {
  const session = await getSession();
  const user = session?.user;
  const expires: string = session?.expires ?? "";

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="">
        <h1>Home Page Trae</h1>
        {user && (
          <div className="mt-6">
            <p className="text-lg">Email: {user.email}</p>
            <p className="text-lg">
              Expires: {new Date(expires).toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <AllFormEntry />
    </main>
  );
}
