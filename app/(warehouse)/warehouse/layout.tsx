import "@/app/globals.css";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import WarehouseNavbar from "@/app/(warehouse)/components/navigation/WarehouseNavbar";
import WarehouseLeftSidebar from "../components/navigation/WarehouseLeftSidebar";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Turuq | Warehouse",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-200 text-black h-auto`}>
        {process.env.NODE_ENV === "development" && (
          <div
            className={
              "fixed top-0 left-0 p-2 bg-emerald-700 text-white uppercase font-bold z-30"
            }
          >
            development
          </div>
        )}
        <main className="p-5 lg:p-10">
          <WarehouseNavbar />
          <div className="grid grid-cols-5 gap-10 w-full">
            <div className={"col-span-1 hidden lg:flex"}>
              <WarehouseLeftSidebar />
            </div>
            <div className="col-span-5 lg:col-span-4 w-full">{children}</div>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
