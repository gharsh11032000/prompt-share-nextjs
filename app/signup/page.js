"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import ButtonGoogle from "../components/ButtonGoogle";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn } from "../config/animation";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const { saveUser, user } = useAuth();

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

      if (username === "" || email === "" || password === "") {
        toast.error("Please fill in all fields");
        return;
      }

      setLoading(true);

      const data = await axios.post(
        `/api/signup`,
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
      <motion.div
        variants={fadeInUp}
        animate="show"
        initial="hidden"
        className="flex flex-col gap-10 items-center justify-center"
      >
        <motion.h1
          variants={fadeIn}
          className="text-3xl sm:text-4xl text-center font-bold"
        >
          Welcome to Prompt Verse!
        </motion.h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center w-80 sm:w-96 resize-none"
        >
          <motion.input
            variants={fadeIn}
            type="text"
            placeholder="Username"
            className="input w-full"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
          />
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
          <motion.input
            variants={fadeIn}
            type="password"
            placeholder="Confirm Password"
            className="input w-full"
            value={confirmPassword}
            name="confirm-password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <motion.div variants={fadeIn} className="w-full">
            <button type="submit" className="btn btn-primary w-full">
              {loading ? "Signing up..." : "Sign up"}
            </button>
          </motion.div>
        </form>
        <motion.div
          variants={fadeIn}
          className="flex flex-col gap-6 items-center justify-center"
        >
          <div className="flex items-center justify-between gap-2">
            <p>Already have an account?</p>
            <Link href={"/signin"} className="link link-primary">
              Sign in
            </Link>
          </div>
          <ButtonGoogle>Sign up with Google</ButtonGoogle>
        </motion.div>
      </motion.div>
    </div>
  );
}
