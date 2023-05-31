import { API_URL } from "@/app/config";
import axios from "axios";
import { cookies } from "next/headers";

export async function DELETE(request, { params: { id } }) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("token").value;

    const data = await axios.delete(`${API_URL}/prompts/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (data.status === 200) {
      return new Response(
        JSON.stringify({ message: "Prompt Deleted Succesfully!" })
      );
    }
  } catch (error) {
    console.log(error.response.data.error.message);
    return new Response(
      JSON.stringify({ message: error.response.data.error.message }),
      {
        status: error.response.data.error.status,
      }
    );
  }
}
