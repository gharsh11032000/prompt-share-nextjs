import CardsContainer from "@/app/components/CardsContainer";
import { API_URL } from "@/app/config";
import QueryString from "qs";
import { PER_PAGE } from "@/app/config";
import axios from "axios";
import Pagination from "@/app/components/Pagination";

export const generateStaticParams = async () => {
  const count = await axios.get(`${API_URL}/prompts/count`);

  const totalPages = Math.ceil(count.data / PER_PAGE);

  const params = [];

  for (let i = 1; i <= totalPages; i++) {
    params.push({ params: { page: i.toString() } });
  }

  return params;
};

async function getPrompts(page) {
  const query = QueryString.stringify({
    sort: ["createdAt:DESC"],
    populate: "*",
    pagination: {
      page: page,
      pageSize: PER_PAGE,
    },
  });

  const prompts = await axios.get(`${API_URL}/prompts?${query}`, {
    next: { revalidate: 10 },
  });

  const count = await axios.get(`${API_URL}/prompts/count`, {
    next: {
      revalidate: 60,
    },
  });

  return {
    prompts: prompts.data.data,
    count: count.data,
  };
}

export default async function PromptsPage({ params }) {
  let currentPage = parseInt((params && params.page) || 1);

  const { prompts, count } = await getPrompts(currentPage);

  const totalPages = Math.ceil(count / PER_PAGE);

  return (
    <div>
      <h1 className="text-4xl font-bold text-center mt-10 mb-4">Prompts</h1>
      <CardsContainer prompts={prompts} />
      <Pagination totalPages={totalPages} page={currentPage} />
    </div>
  );
}
