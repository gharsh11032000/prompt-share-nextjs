"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import ButtonGoogle from "../components/ButtonGoogle";
import { toast } from "react-hot-toast";
import axios from "axios";
import { fadeIn, fadeInUp, stagger } from "../config/animation";
import { motion } from "framer-motion";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, saveUser } = useAuth();

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
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-10 items-center justify-center"
        >
          <motion.h1
            variants={fadeIn}
            className="text-3xl sm:text-4xl font-bold text-center"
          >
            Welcome back!
          </motion.h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 items-center w-80 sm:w-96 resize-none"
          >
            <motion.input
              variants={fadeIn}
              type="email"
              placeholder="Email"
              className="input  w-full"
              value={email}
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <motion.input
              variants={fadeIn}
              type="password"
              placeholder="Password"
              className="input w-full"
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <motion.div variants={fadeIn} className="w-full">
              <button type="submit" className="btn btn-primary w-full">
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </motion.div>
          </form>
          <motion.div
            variants={fadeIn}
            className="flex flex-col gap-6 items-center justify-center"
          >
            <div className="flex items-center justify-between gap-2">
              <p>Don't have an account?</p>
              <Link href={"/signup"} className="link link-primary">
                Sign up
              </Link>
            </div>
            <ButtonGoogle>Sign in with Google</ButtonGoogle>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
