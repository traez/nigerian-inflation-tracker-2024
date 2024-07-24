import Link from "next/link";
import { logout } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import ModeToggle from "./ModeToggle";
import GithubLogin from "./GithubLogin";
import GoogleLogin from "./GoogleLogin";

export default function Navbar() {
  return (
    <>
      <nav className="p-1 flex justify-between border-b">
        <menu className="flex justify-start">
          <Link
            href="/"
            className="text-2xl hover:underline hover:text-blue-600 "
          >
            Nigerian Inflation Tracker 2024
          </Link>
        </menu>
        <menu className="flex justify-end items-center">
          <GithubLogin />
          <GoogleLogin />
          <form action={logout}>
            <Button type="submit" variant="default" size="smallt">
              Logout
            </Button>
          </form>
          <Link
            href="/faq"
            className="hover:underline hover:text-blue-600 font-bold px-1"
          >
            FAQ
          </Link>
          <Link
            href="/category"
            className="hover:underline hover:text-blue-600 font-bold px-1"
          >
            Category
          </Link>
          <ModeToggle />
        </menu>
      </nav>
      <nav className="flex justify-end border-b">
        <Link
          href="/profile"
          className="hover:underline hover:text-blue-600 font-bold px-1"
        >
          Profile
        </Link>
        <Link
          href="/post"
          className="hover:underline hover:text-blue-600 font-bold px-1"
        >
          Post
        </Link>
      </nav>
    </>
  );
}
