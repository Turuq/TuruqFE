import { LogOutIcon, User2 } from "lucide-react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { ClientType } from "@/types/client";
import ClientDropDown from "@/components/shared/ClientDropDown";

export default async function ClientNavbar({ data }: { data: ClientType }) {
  return (
    <nav className="sticky z-30 bg-transparent rounded-lg w-full h-14 grid grid-cols-2 justify-between items-center">
      {/* Brand Logo */}
      <Link href="/">
        <Image
          src={"/assets/images/dark blue logo.png"}
          alt="Turuq.co"
          width={80}
          height={80}
          priority
          aria-label="Turuq"
          className="w-20 h-auto"
        />
      </Link>
      {/* LoggedIn Client */}
      <div className="flex items-center justify-end gap-10">
        <ClientDropDown client={data} type="client" variant="dashboard" />
      </div>
    </nav>
  );
}
