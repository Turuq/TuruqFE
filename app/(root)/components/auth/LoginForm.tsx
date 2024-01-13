"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { loginAction, registerAction } from "@/lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Cookies from "js-cookie";
import * as z from "zod";
import { loginFormSchema } from "@/validations/loginFormSchema";
import { Loader2 } from "lucide-react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/auth-dialog";

export default function LoginForm({
  changeView,
}: {
  changeView: (value: "login" | "register" | "forgot") => void;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
  });
  const [formError, setFormError] = useState({ error: false, message: "" });
  async function onSubmit(values: z.infer<typeof loginFormSchema>) {
    setLoading(true);
    const { email, password } = values;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      if (data.message) {
        setFormError({ error: true, message: data.message });
        return;
      }
      if (data.client) {
        Cookies.set("token", data.token);
        Cookies.set("client", JSON.stringify(data.client));
        router.push("/client");
      } else if (data.admin) {
        Cookies.set("token", data.token);
        Cookies.set("admin", JSON.stringify(data.admin));
        router.push("/admin");
      }
    }
    // const { error, type } = await loginAction({ ...values });
    // if (type === "client") {
    //   router.push("/client");
    // } else if (type === "admin") {
    //   router.push("/admin");
    // }
    setLoading(false);
    // if (error || !type) {
    //   setFormError({ error: true, message: error ?? "" });
    //   return;
    // }
  }
  return (
    <DialogContent className="flex flex-col gap-10 items-start w-full lg:max-w-xl">
      <DialogHeader className="w-full">
        <div className="flex items-center justify-center">
          <Image
            src={"/assets/images/dark blue logo.png"}
            alt="Turuq.co"
            width={80}
            height={80}
            priority
            aria-label="Turuq"
            className="w-20 h-auto"
          />
        </div>
        <DialogTitle className="uppercase text-accent font-bold lg:text-base text-sm flex justify-center">
          Sign in to your account
        </DialogTitle>
        <DialogDescription>
          {formError.error && (
            <Alert className="bg-red-500 text-white border-red-500">
              <AlertTitle className="capitalize">Unable to sign in</AlertTitle>
              <AlertDescription>{formError.message}</AlertDescription>
            </Alert>
          )}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-5 w-full"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                <FormLabel className="text-accent text-sm uppercase">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email"
                    type="email"
                    className="text-accent placeholder:text-accent/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                <FormLabel className="text-accent text-sm uppercase">
                  Password
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Your Email"
                    type="password"
                    className="text-accent placeholder:text-accent/50"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-700" />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-5">
            <button
              type="submit"
              autoFocus
              className="text-sm flex items-center justify-center w-40 px-5 h-7 rounded-md font-bold uppercase border border-secondary-500 bg-secondary-500 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
            >
              {loading ? (
                <Loader2 className="size-5 text-white animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                changeView("forgot");
              }}
              className="text-accent/80 text-sm hover:underline hover:underline-offset-8"
            >
              Forgot password?
            </button>
          </div>
          <div className="flex items-center justify-between gap-5 border-t border-accent/10 pt-5">
            <span className="text-accent/80 text-sm font-semibold">
              {"Don't have an account?"}
            </span>
            <button
              onClick={() => changeView("register")}
              className="text-sm flex items-center justify-center w-40 px-5 h-7 rounded-md font-bold uppercase border border-accent bg-white text-accent hover:bg-accent hover:text-white transition-colors ease-linear duration-300 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent"
            >
              Sign up
            </button>
          </div>
        </form>
      </Form>
    </DialogContent>
  );
}
