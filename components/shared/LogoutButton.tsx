"use client";

import { logoutAction } from "@/lib/actions";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton({ type }: { type: "client" | "admin" }) {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction({ type });
    router.push("/");
  }
  return (
    <button onClick={handleLogout} className="flex items-center text-red-500">
      <LogOutIcon className="size-4 text-red-500 mr-2" />
      Logout
    </button>
  );
}
