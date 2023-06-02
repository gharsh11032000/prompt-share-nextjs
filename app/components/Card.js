import Link from "next/link";
import CopyButton from "./CopyButton";

export default function Card({ prompt }) {
  const { prompt: promptText, category } = prompt.attributes;

  const { username, email } =
    prompt.attributes.users_permissions_user.data.attributes;

  return (
    <>
      {prompt && (
        <div className="card sm:w-96 w-80 bg-base-100 min-h-full shadow-xl fade-in">
          <div className="card-body gap-4">
            <div className="flex justify-between items-center">
              <Link
                href={`/search?search=${category}`}
                className="badge badge-primary flex-grow-0"
              >
                {category}
              </Link>
              <CopyButton text={promptText} />
            </div>
            <p>{promptText}</p>
            <div className="card-actions flex justify-between items-center mt-4">
              <div className="flex gap-2 sm:gap-4 items-center">
                <div className="avatar placeholder">
                  <div className="bg-base-200 mask mask-squircle w-12">
                    <span className=" text-lg font-bold">
                      {username.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col">
                  <p className="font-bold text-sm capitalize">{username}</p>
                  <p className="text-xs md:text-sm opacity-80">{email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
