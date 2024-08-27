import { auth } from "@/auth";
import { cache } from "react";
import { User, Session } from "./typeGetSession";

export const getSession = cache(async (): Promise<Session | null> => {
  const session = await auth();

  if (session && session.user) {
    const user: User = {
      name: session.user.name ?? "Anonymous", 
      email: session.user.email ?? "no-email@example.com", 
      image: session.user.image ?? "", 
    };

    return {
      user,
      expires: session.expires,
    };
  }

  return null;
});
