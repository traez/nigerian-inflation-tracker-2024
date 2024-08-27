import { getSession } from "@/lib/getSession";
import AllFormEntry from "@/components/AllFormEntry";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="">
        <h1>Home Page Trae</h1>
        {session?.user && (
          <div className="mt-6">
            <p className="text-lg">Email: {session.user.email}</p>
            <p className="text-lg">
              Expires: {new Date(session.expires).toLocaleString()}
            </p>
          </div>
        )}
      </div>
      <AllFormEntry user={session?.user || null} />
    </main>
  );
}
