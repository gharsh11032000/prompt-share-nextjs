import QueryString from "qs";
import axios from "axios";
import { API_URL } from "@/app/config";
import CardsContainer from "../components/CardsContainer";

async function fetchPrompts(search) {
  try {
    const query = QueryString.stringify({
      filters: {
        $or: [
          { prompt: { $containsi: search } },
          { category: { $containsi: search } },
        ],
      },
      populate: "*",
    });

    const data = await axios.get(`${API_URL}/prompts?${query}`);

    return { prompts: data.data.data };
  } catch (error) {
    console.log(error);
    return { prompts: [] };
  }
}

export default async function SearchPage({ searchParams: { search } }) {
  const { prompts } = await fetchPrompts(search);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10 mb-4">
        Search Results for "{search}"
      </h1>
      {prompts.length === 0 && (
        <div className="flex items-center justify-center mt-8">
          <h1 className="text-xl font-bold bg-white dark:bg-neutral dark:text-neutral-content p-6 rounded-xl">
            No prompts found! Try searching for something else.
          </h1>
        </div>
      )}
      <CardsContainer prompts={prompts} />
    </div>
  );
}
