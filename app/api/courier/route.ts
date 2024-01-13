import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const courierId = searchParams.get("courier");
  const status = searchParams.get("status");
  const brand = searchParams.get("brand");
  const date = searchParams.get("date");
  let query = `?courierId=${courierId}`;
  if (status) {
    query += `&status=${status}`;
  }
  if (brand) {
    query += `&brand=${brand}`;
  }
  if (date) {
    query += `&date=${date}`;
  }
  return await fetch(`${process.env.API_URL}couriers/courierExcel${query}`, {
    method: "GET",
    headers: {
      Authorization: `${cookies().get("token")?.value}`,
    },
  });
}
