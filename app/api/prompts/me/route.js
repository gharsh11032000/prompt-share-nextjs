import { API_URL } from "@/app/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;

    const data = await axios.get(`${API_URL}/prompts/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.status === 200) {
      return new Response(JSON.stringify([...data.data]));
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Unauthorized",
      }),
      {
        status: 403,
      }
    );
  }
}
