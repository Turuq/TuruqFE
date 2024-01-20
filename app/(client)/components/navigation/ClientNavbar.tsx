import Image from "next/image";
import Link from "next/link";
import { ClientType } from "@/types/client";
import ClientDropDown from "@/components/shared/ClientDropDown";
import ClientNotificationCard from "@/app/(client)/components/cards/ClientNotificationCard";
import { NotificationType } from "@/types/response";

export default async function ClientNavbar({
  data,
  notifications,
}: {
  data: ClientType;
  notifications: NotificationType[];
}) {
  return (
    <nav className="sticky z-30 bg-transparent rounded-lg w-full h-14 grid grid-cols-2 justify-between items-center">
      {/* Brand Logo */}
      <Link href="/" className={"w-20"}>
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
        <ClientNotificationCard notifications={notifications} />
      </div>
    </nav>
  );
}
