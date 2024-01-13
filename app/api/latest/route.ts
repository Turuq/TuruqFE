import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const clientId = searchParams.get("client");
  console.log(clientId);
  return await fetch(`${process.env.API_URL}client/latestSheet/${clientId}`, {
    method: "GET",
    headers: {
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
}
