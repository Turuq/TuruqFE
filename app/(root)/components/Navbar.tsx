import Image from "next/image";
import NavbarLinks from "./NavbarLinks";
import NavbarModal from "./NavbarModal";

import { Montserrat } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";
import { ClientType } from "@/types/client";
import ClientDropDown from "@/components/shared/ClientDropDown";

const montserrat = Montserrat({
  subsets: ["latin", "latin-ext", "cyrillic", "cyrillic-ext", "vietnamese"],
  style: ["italic", "normal"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

interface NavbarProps {}

export default async function Navbar({}: NavbarProps) {
  const cookieStore = cookies();
  const clientCookie = cookieStore.get("client")?.value;
  const client = clientCookie ? (JSON.parse(clientCookie) as ClientType) : null;
  const adminCookie = cookieStore.get("admin")?.value;
  const type = clientCookie ? "client" : adminCookie ? "admin" : "guest";
  return (
    <nav
      className={`${montserrat.className} sticky z-30 bg-transparent text-white rounded-lg w-full h-14 grid grid-cols-2 justify-between items-center px-2 lg:px-10`}
    >
      {/* Brand Logo */}
      <Link href="/">
        <Image
          src={"/assets/images/navbarlogo1.png"}
          alt="Turuq.co"
          width={80}
          height={80}
          priority
          aria-label="Turuq"
          className="w-20 h-auto"
        />
      </Link>
      {/* Navbar Links & Login Modal*/}
      <div className="hidden lg:grid grid-cols-2 items-center justify-between">
        <NavbarLinks variant="horizontal" />
        <div className="flex items-center justify-end">
          {type === "admin" ? (
            <Link href={"/admin"}>Welcome Admin!</Link>
          ) : type === "client" ? (
            <ClientDropDown client={client} type={type} />
          ) : (
            <NavbarModal />
          )}
        </div>
      </div>
      <div className="flex lg:hidden items-center justify-end">
        <div className="flex items-center justify-end">
          {type === "admin" ? (
            <Link href={"/admin"}>Welcome Admin!</Link>
          ) : type === "client" ? (
            <ClientDropDown client={client} type={type} />
          ) : (
            <NavbarModal />
          )}
        </div>
      </div>
    </nav>
  );
}
