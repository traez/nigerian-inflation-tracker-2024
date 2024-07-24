import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h1>404 - Page Not Found</h1>
      <p>Oops! The page you are looking does not exist</p>
      <Link href="/" className=" underline text-blue-700">Click here</Link><span> to go back to the homepage</span>
    </div>
  );
}
