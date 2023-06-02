"use client";

import { toast } from "react-hot-toast";
import { FaCopy } from "react-icons/fa";

export default function CopyButton({ text }) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard"))
      .catch((err) => toast.error("Failed to copy to clipboard"));
  };

  return (
    <div className="tooltip " data-tip="Copy to clipboard">
      <button
        className="p-3 bg-base-200 hover:bg-base-300 rounded-full cursor-pointer active:scale-90 transition-all"
        onClick={handleCopy}
      >
        <FaCopy className="dark:text-gray-400 h-5 w-5" />
      </button>
    </div>
  );
}
