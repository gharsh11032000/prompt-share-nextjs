import { API_URL } from "@/app/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function PUT(request, { params: { id } }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;

    const {
      data: { prompt, category },
    } = await request.json();

    const data = await axios.put(
      `${API_URL}/prompts/${id}`,
      {
        data: {
          prompt,
          category,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (data.status === 200) {
      console.log(data);
      return new Response(JSON.stringify({ message: "Prompt Updated" }));
    }

    return new Response(JSON.stringify({ message: "Unauthorized" }));
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        { message: error.response.data.error.message },
        { status: error.response.data.error.status }
      )
    );
  }
}
