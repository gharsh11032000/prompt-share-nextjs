import { API_URL } from "@/app/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function GET(request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;

    console.log(token);

    const data = await axios.get(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.statusText === "OK") {
      return new Response(JSON.stringify(data.data), {
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 403,
    });
  }
}
