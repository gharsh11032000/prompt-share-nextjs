"use client";

import Link from "next/link";
import AuthContext from "../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { FaSignInAlt, FaSignOutAlt, FaPlus, FaUser } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { NEXT_URL } from "../config";
import axios from "axios";
import { useRouter, usePathname } from "next/navigation";

export default function SignInOutButtons() {
  const [loading, setLoading] = useState(false);
  const { user, saveUser } = useContext(AuthContext);

  const router = useRouter();
  const path = usePathname();

  const handleSignOut = async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${NEXT_URL}/signout`);

      if (data.status === 200) {
        saveUser(null);
        setLoading(false);
        toast.success(data.data.message);
        router.push("/signin");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <>
      {user ? (
        <div className="flex items-center gap-2 md:gap-3">
          <Link
            href="/create"
            className="btn btn-primary flex gap-2 items-center"
          >
            <FaPlus />
            <span className="hidden md:flex">Create</span>
          </Link>
          <Link
            href="/profile"
            className="btn btn-outline flex gap-2 items-center lowercase"
          >
            <FaUser />
            <span className="hidden md:flex"> {user.username}</span>
          </Link>
          <button
            className="btn btn-outline flex items-center gap-2"
            onClick={handleSignOut}
          >
            <FaSignOutAlt />
            <span>{loading ? "Signing Out..." : "Sign Out"}</span>
          </button>
        </div>
      ) : (
        <Link
          href={path === "/signin" ? "/signup" : "/signin"}
          className="btn btn-primary flex items-center gap-2"
        >
          <FaSignInAlt />
          <span>{path === "/signin" ? "Sign Up" : "Sign In"}</span>
        </Link>
      )}
    </>
  );
}
