import { cookies } from "next/headers";

export default async function Page() {
  await fetch(
    `${process.env.API_URL}order/deleteOrders/659476ec344347410b7d51a4`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );

  await fetch(
    `${process.env.API_URL}order/deleteOrders/65a3a6be344347410ba05d83`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    },
  );
  return (
    <div>
      <h1>Delete Codi & Frenchee Orders</h1>
    </div>
  );
}
