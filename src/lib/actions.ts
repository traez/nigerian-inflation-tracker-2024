"use server";
import { signIn, signOut } from "@/auth";

const socialLogin = async (formData: FormData) => {
  const action = formData.get("action");
  await signIn(action as string, { redirectTo: "/" });
};

const logout = async () => {
  console.log("logging out");
  await signOut({ redirectTo: "/" });
};

export { socialLogin, logout };
