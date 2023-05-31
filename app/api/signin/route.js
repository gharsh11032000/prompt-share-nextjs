import { API_URL } from "@/app/config";
import axios from "axios";
import cookie from "cookie";

export async function POST(request) {
  try {
    const { identifier, password } = await request.json();

    const data = await axios.post(`${API_URL}/auth/local`, {
      identifier,
      password,
    });

    if (data.status === 200) {
      return new Response(JSON.stringify(data.data.user), {
        headers: {
          "Set-Cookie": cookie.serialize("token", data.data.jwt, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7, // 1 week
            sameSite: "strict",
            path: "/",
          }),
        },
      });
    }
  } catch (error) {
    console.log(error.response.data.error.message);
    return new Response(
      JSON.stringify({ message: error.response.data.error.message }),
      { status: error.response.data.error.status }
    );
  }
}
