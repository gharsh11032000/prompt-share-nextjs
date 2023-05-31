"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Search() {
  const [search, setSearch] = useState("");

  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search === "") {
      toast.error("Please enter a search term");
      return;
    }
    toast.success(`Searching for ${search}`);
    router.push(`/search?search=${search}`);
  };

  return (
    <>
      <form className="form-control" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            placeholder="Search Prompts..."
            className="input input-bordered"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn btn-square" type="submit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
    </>
  );
}
