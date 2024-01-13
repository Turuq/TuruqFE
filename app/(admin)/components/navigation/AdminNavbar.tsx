import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AdminType } from "@/types/response";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";

export default function AdminNavbar() {
  const admin = JSON.parse(cookies().get("admin")?.value ?? "") as
    | AdminType
    | undefined;
  return (
    <nav className="flex items-center justify-between gap-5">
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
      {admin && (
        <div className="flex items-center justify-end gap-2">
          <Avatar className="size-10">
            <AvatarImage src={admin.picture} />
            <AvatarFallback>{admin.name?.substring(0, 1)}</AvatarFallback>
          </Avatar>
          <Link href={"/admin"}>
            <div className="flex flex-col gap-0">
              <h3 className="text-accent text-sm font-bold">{admin.name}</h3>
              <h3 className="text-accent text-xs">Welcome Admin!</h3>
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
}
