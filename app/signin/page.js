"use client";

import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import { useRouter } from "next/navigation";
import ButtonGoogle from "../components/ButtonGoogle";
import { toast } from "react-hot-toast";
import axios from "axios";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, saveUser } = useContext(AuthContext);

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (!email || !password) {
        toast.error("Please fill in all fields!");
        return;
      }
      setLoading(true);
      const data = await axios.post(
        `/api/signin`,
        {
          identifier: email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 200) {
        saveUser(data.data);
        toast.success("Signed in successfully!");
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      saveUser(null);
      setLoading(false);
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="px-4 py-16">
        <div className="flex flex-col gap-10 items-center justify-center">
          <h1 className="text-5xl font-bold">Welcome back!</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center w-96 resize-none"
          >
            <input
              type="email"
              placeholder="Email"
              className="input  w-full"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="input w-full"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="btn btn-primary w-full">
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <div className="flex flex-col gap-6 items-center justify-center">
            <div className="flex items-center justify-between gap-2">
              <p>Don't have an account?</p>
              <Link href={"/signup"} className="link link-primary">
                Sign up
              </Link>
            </div>
            <ButtonGoogle>Sign in with Google</ButtonGoogle>
          </div>
        </div>
      </div>
    </>
  );
}
