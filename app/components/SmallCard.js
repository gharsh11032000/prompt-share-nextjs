"use client";
import axios from "axios";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SmallCard({ prompt }) {
  const { prompt: promptText, category, id } = prompt;
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleEdit = () => {
    router.push(`/prompts/edit/${id}`);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      if (!confirm("Are you sure you want to delete this prompt?")) {
        setLoading(false);
        return;
      }

      const data = await axios.delete(`/api/delete/${id}`);

      if (data.status === 200) {
        toast.success(data.data.message);
        setLoading(false);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="card w-80 sm:w-96 bg-base-100 shadow-xl fade-in">
        <div className="card-body justify-between gap-4">
          <div className="flex flex-col gap-4">
            <Link
              href={`/search?search=${category}`}
              className="badge dark:bg-base-200 dark:border-base-200 flex-grow-0"
            >
              {category}
            </Link>
            <p>{promptText}</p>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleEdit}>
              <FaPencilAlt />
            </button>
            <button className="btn btn-ghost" onClick={handleDelete}>
              <FaTrashAlt />
              {loading && <span className="ml-2">Deleting...</span>}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
