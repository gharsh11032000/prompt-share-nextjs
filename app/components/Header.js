import Link from "next/link";
import SignInOutButtons from "./SignInOutButtons";

export default function Header() {
  return (
    <>
      <div className="navbar fixed md:max-w-7xl bg-base-200 rounded-xl p-2 md:p-4 left-1/2 -translate-x-1/2 z-10">
        <div className="navbar-start">
          <Link
            href={"/"}
            className="btn btn-ghost normal-case text-lg md:text-xl"
          >
            Prompt Verse
            <span className="text-primary">.</span>
          </Link>
        </div>
        <div className="navbar-end">
          <SignInOutButtons />
        </div>
      </div>
    </>
  );
}
