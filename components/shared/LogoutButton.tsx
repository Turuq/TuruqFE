"use client";

import { logoutAction } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function LogoutButton({ type }: { type: "client" | "admin" }) {
  const router = useRouter();

  async function handleLogout() {
    await logoutAction({ type });
    router.push("/");
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center px-3 my-1 gap-3 text-white"
    >
      <div className={""}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          className="size-5 text-inherit"
        >
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" x2="9" y1="12" y2="12" />
        </svg>
      </div>
      <div>
        <h3 className="text-sm text-inherit">Logout</h3>
      </div>
    </button>
  );
}
