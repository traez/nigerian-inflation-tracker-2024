import { getSession } from "@/lib/getSession";
import AllFormEntry from "@/components/AllFormEntry";

export default async function Home() {
  const session = await getSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4">
      <div className="">
        <h1 className="text-xl text-center border rounded-md">Track inflation. Empower Nigerians. Shape Policy</h1>
        <h2 className="text-lg text-center border rounded-md">Data-driven inflation tracker for financial resilience in Nigeria</h2>
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
