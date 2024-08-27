import { socialLogin } from "@/lib/actionsLoginOut";
import { LiaGithubSquare } from "react-icons/lia";

const GithubLogin = () => {
  return (
    <form action={socialLogin} className=" hover:rotate-[20deg]">
      <button
        className="flex items-center justify-center h-full w-full rounded-md"
        type="submit"
        name="action"
        value="github"
      >
        <LiaGithubSquare size="40px" />
      </button>
    </form>
  );
};

export default GithubLogin;
