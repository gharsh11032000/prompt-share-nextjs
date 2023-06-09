import cookie from "cookie";

export async function GET() {
  try {
    return new Response(JSON.stringify({ message: "Sign out succesfully!" }), {
      headers: {
        "Set-Cookie": cookie.serialize("token", "", {
          secure: process.env.NODE_ENV !== "development",
          maxAge: new Date(0),
          sameSite: "strict",
          path: "/",
          httpOnly: true,
        }),
      },
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify(
        { message: "Something went wrong!" },
        {
          status: 500,
        }
      )
    );
  }
}
