"use client";

import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import Link from "next/link";
import SmallCard from "../components/SmallCard";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

function ProfilePage() {
  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, []);

  const {
    data: prompts,
    error,
    isLoading,
  } = useSWR(`/api/prompts/me`, fetcher);

  return (
    user && (
      <div className="flex justify-center items-center flex-col px-4 py-16 gap-12">
        <div className="flex flex-col text-center items-center gap-4 justify-center ">
          {/* ------ */}
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content mask mask-squircle w-20">
              <span className="text-2xl font-bold">
                {user.username.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </div>
          {/* ------ */}
          <div className="flex flex-col">
            <p className="text-lg capitalize font-bold">{user.username}</p>
            <p className="text-lg opacity-70">{user.email}</p>
          </div>
        </div>

        {prompts && prompts.length > 0 ? (
          <>
            <h3 className="text-2xl font-bold">My Prompt's 💪</h3>
            <div className="flex justify-center flex-wrap gap-4">
              {prompts
                .sort((a, b) => {
                  return new Date(b.createdAt) - new Date(a.createdAt);
                })
                .map((prompt) => {
                  return <SmallCard prompt={prompt} key={prompt.id} />;
                })}
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 mt-4">
            <p className="text-md md:text-lg text-center">
              You have not created any prompts yet 😔
            </p>
            <Link href="/create">
              <button className="btn btn-primary">
                <FaPlus className="mr-2" />
                Create Prompt
              </button>
            </Link>
          </div>
        )}
      </div>
    )
  );
}

export default ProfilePage;
