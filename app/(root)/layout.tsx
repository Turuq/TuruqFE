import "@/app/globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  style: ["italic", "normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Turuq | Home",
  description:
    "Welcome to Turuq, your premier destination for all your shipping, storage, and packaging needs. With our comprehensive range of services, unwavering commitment to customer satisfaction, and innovative solutions, we are proud to be at the forefront of the industry.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${montserrat.className} bg-gradient-to-b from-primary-950 via-primary-900 to-primary-950 text-white h-auto`}
      >
        {process.env.NODE_ENV === "development" && (
          <div
            className={
              "absolute top-0 left-0 p-2 bg-emerald-700 text-white uppercase font-bold z-30"
            }
          >
            development
          </div>
        )}
        <div className="p-5 lg:p-10">
          <Navbar />
        </div>
        <main className={`${montserrat.className} `}>{children}</main>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
