import "@/app/globals.css";
import { Metadata } from "next";
import { Montserrat } from "next/font/google";
import AdminNavbar from "../components/navigation/AdminNavbar";
import AdminLeftSideBar from "../components/navigation/AdminLeftSidebar";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Turuq | Admin",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gray-200 h-auto`}>
        {process.env.NODE_ENV === "development" && (
          <div
            className={
              "fixed top-0 left-0 p-2 bg-emerald-700 text-white uppercase font-bold z-30"
            }
          >
            development
          </div>
        )}
        <div className="p-5 lg:p-10">
          <AdminNavbar />
        </div>
        <main className="p-5 lg:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 w-full">
            <AdminLeftSideBar />
            <div className="col-span-1 lg:col-span-10">{children}</div>
          </div>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
