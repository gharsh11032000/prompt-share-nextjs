"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useAuth } from "@/app/context/AuthContext";
import { API_URL } from "@/app/config";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "@/app/config/animation";

export const generateStaticParams = async () => {
  const prompts = await axios.get(`${API_URL}/prompts`);

  const params = [];

  prompts.data.data.forEach((prompt) => {
    params.push({ params: { id: prompt.id.toString() } });
  });

  return params;
};

export default function EditPage({ params: { id } }) {
  const [promptValue, setPromptValue] = useState("");
  const [categoryValue, setCategoryValue] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user && !id) {
      router.push("/login");
    }

    const getPrompt = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/prompts/${id}`);

        if (data) {
          const { category, prompt } = data.data.attributes;
          setPromptValue(prompt);
          setCategoryValue(category);
        }
      } catch (error) {
        console.log(error);
        toast.error("Prompt not found");
        router.push("/profile");
      }
    };

    getPrompt();
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
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
      const data = await axios.put(
        `/api/edit/${id}`,
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
          className="text-3xl  sm:text-4xl font-bold text-center"
        >
          Edit Prompt ✍️
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
          <motion.div variants={fadeIn} className="w-full">
            <button className="btn btn-primary w-full">
              {loading ? "Updating Prompt..." : "Update Prompt"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
