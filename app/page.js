import QueryString from "qs";
import CardsContainer from "./components/CardsContainer";
import Hero from "./components/Hero";
import { API_URL, HOMEPAGE_PAGINATION_LIMIT } from "./config";
import Link from "next/link";
import axios from "axios";

async function getPrompts() {
  const query = QueryString.stringify({
    sort: ["createdAt:DESC"],
    populate: "*",
    pagination: {
      page: 1,
      pageSize: HOMEPAGE_PAGINATION_LIMIT,
    },
  });

  const data = await axios.get(`${API_URL}/prompts?${query}`, {
    next: { revalidate: 10 },
  });

  return data.data.data;
}

export default async function Home() {
  const fetchedPrompts = await getPrompts();

  return (
    <>
      <Hero />
      {fetchedPrompts.length === 0 ? (
        <>
          <div className="flex items-center justify-center mt-8">
            <h1 className="text-xl font-bold bg-white dark:bg-neutral dark:text-neutral-content p-6 rounded-xl">
              No prompts found! Try searching for something else.
            </h1>
          </div>
        </>
      ) : (
        <>
          <h1 className="text-4xl font-bold text-center mt-10 mb-4 fade-in">
            Latest Prompts
          </h1>
          <CardsContainer prompts={fetchedPrompts} />
          <div className="flex items-center justify-center">
            <Link
              href="/prompts/1"
              className="btn btn-primary btn-outline mb-10"
            >
              See More Prompts
            </Link>
          </div>
        </>
      )}
    </>
  );
}
