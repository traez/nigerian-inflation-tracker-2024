import Link from "next/link";
import { getSession } from "@/lib/getSession";
import { logout } from "@/lib/actionsLoginOut";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";

export default async function Navbar() {
  const session = await getSession();
  const user = session?.user;

  return (
    <>
      <nav className="p-1 flex justify-between border-b bg-[#14141444]">
        <menu className="flex justify-start">
          <Link
            href="/"
            className="text-2xl hover:underline hover:text-blue-600 "
          >
            Nigerian Inflation Tracker 2024
          </Link>
        </menu>
        <menu className="flex justify-end items-center gap-1">
          {!user ? (
            <div className="flex border pl-1 items-center rounded-md">
              <span className="font-bold">Logins:</span>
              <GithubLogin />
              <GoogleLogin />
            </div>
          ) : (
            <form action={logout}>
              <Button type="submit" variant="plain" size="smallt">
                Logout
              </Button>
            </form>
          )}
          <Link
            href="/faq"
            className="hover:underline hover:text-blue-600 font-bold px-1 border rounded-md h-full flex items-center justify-center"
          >
            FAQ
          </Link>
          <ModeToggle />
        </menu>
      </nav>
      <nav className="flex justify-end border-b gap-1 bg-[#14141444]">
        {user && (
          <Link
            href="/create"
            className="hover:underline hover:text-blue-600 font-bold px-1 border rounded-md"
          >
            Create Post
          </Link>
        )}
        <Link
          href="/user"
          className="hover:underline hover:text-blue-600 font-bold px-1 border rounded-md"
        >
          View By User
        </Link>
        <Link
          href="/category"
          className="hover:underline hover:text-blue-600 font-bold px-1 border rounded-md"
        >
          View By Category
        </Link>
        <Link
          href="/state"
          className="hover:underline hover:text-blue-600 font-bold px-1 border rounded-md"
        >
          View By State
        </Link>
      </nav>
    </>
  );
}
