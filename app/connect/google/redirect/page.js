"use client";

import { API_URL } from "@/app/config";
import AuthContext from "@/app/context/AuthContext";
import axios from "axios";
import { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

export default function Redirect({ searchParams }) {
  const { saveUser } = useContext(AuthContext);
  const access_token = searchParams.access_token;
  const router = useRouter();

  useEffect(() => {
    if (!access_token) router.push("/");

    const sendToken = async () => {
      try {
        const data = await axios.get(
          `${API_URL}/auth/google/callback?access_token=${access_token}`
        );

        if (data.status === 200) {
          saveUser(data.data.user);
          toast.success("Signed in successfully!");
          Cookies.set("token", data.data.jwt, {
            expires: 7,
            path: "/",
            sameSite: "strict",
            secure: process.env.NODE_ENV !== "development",
          });
          router.push("/");
        }
      } catch (error) {
        console.log(error.response.data.message);
        toast.error("Something went wrong!");
      }
    };

    sendToken();
  }, []);

  return (
    <>
      <div className="flex items-center justify-center px-4 py-16">
        <h1 className="text-xl font-bold bg-white dark:bg-neutral dark:text-neutral-content p-6 rounded-xl">
          {access_token
            ? "Please wait we are signing you in..."
            : "Not Authorized! Redirecting to homepage..."}
        </h1>
      </div>
    </>
  );
}
