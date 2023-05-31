import { API_URL } from "@/app/config";
import axios from "axios";
import cookie from "cookie";

export async function POST(request) {
  try {
    const { identifier, password, username } = await request.json();

    const data = await axios.post(
      `${API_URL}/auth/local/register`,
      {
        email: identifier,
        password,
        username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (data.status === 200) {
      return new Response(JSON.stringify(data.data.user), {
        status: 200,
        headers: {
          "Set-Cookie": cookie.serialize("token", data.data.jwt, {
            secure: process.env.NODE_ENV !== "development",
            maxAge: 60 * 60 * 24 * 7,
            sameSite: "None",
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
