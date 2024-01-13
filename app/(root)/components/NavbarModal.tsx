"use client";

import { Dialog, DialogTrigger } from "@/components/custom/auth-dialog";

import { useEffect, useState } from "react";

import LoginForm from "./auth/LoginForm";
import RegisterForm from "./auth/RegisterForm";
import ForgotPasswordForm from "./auth/ForgotPasswordForm";

export default function NavbarModal() {
  const [view, setView] = useState<"login" | "register" | "forgot">("login");
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!open) {
      setView("login");
    }

    return () => {
      setView("login");
    };
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center justify-between px-5 w-auto h-8 font-bold uppercase rounded-lg border border-accent bg-white text-accent hover:bg-white hover:text-accent transition-colors ease-linear duration-300">
        <span className="text-inherit text-center">Sign In</span>
      </DialogTrigger>
      {view === "login" ? (
        <LoginForm changeView={setView} />
      ) : view === "register" ? (
        <RegisterForm changeView={setView} />
      ) : (
        <ForgotPasswordForm changeView={setView} />
      )}
    </Dialog>
  );
}
