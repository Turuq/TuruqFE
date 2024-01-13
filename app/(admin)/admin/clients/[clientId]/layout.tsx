import ClientFromAdminNavigation from "@/app/(admin)/components/navigation/ClientFromAdminNavigation";
import { cookies } from "next/headers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default async function ClientFromAdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: {
    clientId: string;
  };
}) {
  const res = await fetch(
    `${process.env.API_URL}client/home/${params.clientId}`,
    {
      method: "GET",
      next: { revalidate: 300 },
      headers: {
        "Content-Type": "application/json",
        Authorization: `${cookies().get("token")?.value}`,
      },
    }
  );
  const data = await res.json();
  return (
    <section className="p-5 bg-accent/10 rounded-xl flex flex-col gap-5">
      <div className="flex items-center justify-between gap-5">
        <ClientFromAdminNavigation
          clientId={params.clientId}
          companyName={data.client.companyName}
        />
        <div className="flex items-center gap-2">
          <Avatar className="size-8 lg:size-10">
            <AvatarImage src="" />
            <AvatarFallback>
              {data.client.companyName.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-0">
            <h3 className="text-xs lg:text-sm text-accent">
              {data.client.name}
            </h3>
            <h3 className="text-xs lg:text-sm text-accent font-bold">
              {data.client.companyName}
            </h3>
          </div>
        </div>
      </div>
      {children}
    </section>
  );
}
