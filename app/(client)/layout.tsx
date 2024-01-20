import "@/app/globals.css";
// import ClientNavbar from "./components/navigation/ClientNavbar";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
// import ClientLeftSideBar from "./components/navigation/ClientLeftSidebar";
import { cookies } from "next/headers";
import { ClientType } from "@/types/client";
import NavbarLoader from "./components/loaders/NavbarLoader";
import SidebarLoader from "./components/loaders/SidebarLoader";

import dynamic from "next/dynamic";
import { NotificationType } from "@/types/response";

const ClientLeftSideBar = dynamic(
  () => import("./components/navigation/ClientLeftSidebar"),
  {
    ssr: false,
    loading: () => <SidebarLoader />,
  },
);
const ClientNavbar = dynamic(
  () => import("./components/navigation/ClientNavbar"),
  {
    ssr: false,
    loading: () => <NavbarLoader />,
  },
);

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Turuq | Client",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = cookies();
  let client: ClientType;
  const cookieValue = cookieStore.get("client")?.value;
  if (!cookieValue) {
    throw new Error("Unauthorized");
  }
  client = JSON.parse(cookieValue) as ClientType;
  const clientId = client?._id;
  const res = await fetch(`${process.env.API_URL}client/home/${clientId}`, {
    next: { revalidate: 300 },
    headers: {
      Authorization: `${cookieStore.get("token")?.value}`,
    },
  });
  const data = await res.json();

  const notificationRes = await fetch(
    `${process.env.API_URL}notification/${clientId}`,
    {
      headers: {
        Authorization: `${cookieStore.get("token")?.value}`,
      },
    },
  );
  const notificationData = (await notificationRes.json()) as NotificationType[];
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-200 h-auto`}>
        <div className="p-5 lg:p-10">
          <ClientNavbar data={data.client} notifications={notificationData} />
        </div>
        <main className="p-5 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
            <ClientLeftSideBar data={data} />
            <div className="col-span-1 lg:col-span-10">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
}
