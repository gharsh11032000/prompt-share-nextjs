"use client";

import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import ButtonGoogle from "../components/ButtonGoogle";
import { toast } from "react-hot-toast";
import { NEXT_URL } from "../config";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { saveUser, user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (password !== confirmPassword) {
        return toast.error("Passwords not matched");
      }

      setLoading(true);

      const data = await axios.post(
        `${NEXT_URL}/signup`,
        {
          identifier: email,
          password,
          username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 200) {
        saveUser(data.data);
        toast.success("Signed up successfully");
        setLoading(false);
        router.push("/");
      }

      setLoading(false);
    } catch (error) {
      saveUser(null);
      setLoading(false);
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <div className="px-4 py-16">
      <div className="flex flex-col gap-10 items-center justify-center">
        <h1 className="text-5xl font-bold">Welcome to PromptVerse!</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center w-96 resize-none"
        >
          <input
            type="text"
            placeholder="Username"
            className="input w-full"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <input
            type="password"
            placeholder="Confirm Password"
            className="input w-full"
            value={confirmPassword}
            name="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary w-full">
            {loading ? "Signing up..." : "Sign up"}
          </button>
        </form>
        <div className="flex flex-col gap-6 items-center justify-center">
          <div className="flex items-center justify-between gap-2">
            <p>Already have an account?</p>
            <Link href={"/signin"} className="link link-primary">
              Sign in
            </Link>
          </div>
          <ButtonGoogle>Sign up with Google</ButtonGoogle>
        </div>
      </div>
    </div>
  );
}
