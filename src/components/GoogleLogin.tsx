import { socialLogin } from "@/lib/actions";
import { FcGoogle } from "react-icons/fc";

const GoogleLogin = () => {
  return (
    <form action={socialLogin} className=" hover:rotate-[20deg]">
      <button
        className="flex items-center justify-center h-full w-full rounded-md"
        type="submit"
        name="action"
        value="google"
      >
        <FcGoogle size="36px"/>
      </button>
    </form>
  );
};

export default GoogleLogin;
