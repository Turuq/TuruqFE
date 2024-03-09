import { getAllOrders } from "@/lib/actions";

export default async function Page() {
  const data = await getAllOrders();
  return (
    <pre>
      <code>{JSON.stringify(data, null, 2)}</code>
    </pre>
  );
}
