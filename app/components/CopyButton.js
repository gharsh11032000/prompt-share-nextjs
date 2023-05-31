"use client";

import { toast } from "react-hot-toast";

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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="w-5 fill-gray-400"
        >
          <path d="M7 4V2H17V4H20.0066C20.5552 4 21 4.44495 21 4.9934V21.0066C21 21.5552 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5551 3 21.0066V4.9934C3 4.44476 3.44495 4 3.9934 4H7ZM7 6H5V20H19V6H17V8H7V6ZM9 4V6H15V4H9Z"></path>
        </svg>
      </button>
    </div>
  );
}
