import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get("variant");
  const date = searchParams.get("date");
  return await fetch(`${process.env.API_URL}order/${variant}/${date}`, {
    method: "GET",
    headers: {
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
}

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const variant = searchParams.get("variant");
  const date = searchParams.get("date");
  const body = await request.json();
  return await fetch(`${process.env.API_URL}order/${variant}Filtered/${date}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${cookies().get("token")?.value}`,
    },
    body: JSON.stringify(body),
  });
}
