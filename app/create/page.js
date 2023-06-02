"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "../config/animation";

export default function CreatePage() {
  const [promptValue, setPromptValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/signin");
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (promptValue === "" || categoryValue === "") {
        toast.error("Please fill in all fields");
        return;
      }

      if (promptValue.length > 160) {
        toast.error("Prompt must be less than 160 characters");
        return;
      }

      if (categoryValue.length > 20) {
        toast.error("Category must be less than 20 characters");
        return;
      }

      setLoading(true);
      const data = await axios.post(
        `/api/create`,
        {
          data: {
            prompt: promptValue,
            category: categoryValue,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (data.status === 200) {
        toast.success(data.data.message);
        setPromptValue("");
        setCategoryValue("");
        setLoading(false);
        router.push("/profile");
      }
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message);
      setLoading(false);
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
          className="text-3xl md:text-4xl text-center font-bold"
        >
          Create a prompt 🥳
        </motion.h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 items-center w-80 sm:w-96 resize-none"
        >
          <motion.textarea
            variants={fadeIn}
            className="textarea  w-full resize-none h-48"
            placeholder="Write your prompt here..."
            name="prompt"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
          ></motion.textarea>
          <motion.input
            variants={fadeIn}
            type="text"
            placeholder="Enter a category"
            className="input  w-full"
            value={categoryValue}
            name="category"
            onChange={(e) => setCategoryValue(e.target.value)}
          />
          <motion.button variants={fadeIn} className="w-full">
            <button className="btn btn-primary w-full">
              {loading ? "Creating Prompt..." : "Create Prompt"}
            </button>
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
}
