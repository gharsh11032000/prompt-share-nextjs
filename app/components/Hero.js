"use client";

import { motion } from "framer-motion";
import Search from "./Search";
import { fadeIn, fadeInUp } from "../config/animation";

export default function Hero() {
  return (
    <>
      <div className="hero px-4 md:px-4 py-16">
        <div className="hero-content text-center p-0 md:p-4">
          <motion.div
            className="max-w-4xl flex items-center justify-center flex-col"
            variants={fadeInUp}
            animate="show"
            initial="hidden"
          >
            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-5xl font-bold leading-tight"
            >
              <span className="changing-text mr-3 underline underline-offset-2"></span>
              <span>Engaging Prompts.</span>
            </motion.h1>
            <motion.p variants={fadeIn} className="py-6 max-w-lg">
              Unleash your imagination and inspire others at Prompt Verse, the
              ultimate platform for prompt sharing.
            </motion.p>
            <motion.div variants={fadeIn}>
              <Search />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
