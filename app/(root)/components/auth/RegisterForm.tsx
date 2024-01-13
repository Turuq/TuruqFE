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
import { registerAction } from "@/lib/actions";
import { registerFormSchema } from "@/validations/registerFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import * as z from "zod";
import { Loader2 } from "lucide-react";
import { DialogHeader } from "@/components/ui/dialog";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/custom/auth-dialog";

export default function RegisterForm({
  changeView,
}: {
  changeView: (value: "login" | "register" | "forgot") => void;
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
  });
  const [formError, setFormError] = useState({ error: false, message: "" });
  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    setLoading(true);
    const { error, type } = await registerAction({ ...values });
    if (type === "client") {
      router.push("/client");
    } else if (type === "admin") {
      router.push("/admin");
    }

    setLoading(false);
    if (error || !type) {
      setFormError({ error: true, message: error ?? "" });
      return;
    }
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
              <AlertTitle className="capitalize">
                Create your turuq account
              </AlertTitle>
              <AlertDescription>{formError.message}</AlertDescription>
            </Alert>
          )}
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full grid grid-cols-1 lg:grid-cols-12 gap-5 items-center"
        >
          <div className="col-span-12 lg:col-span-6 items-center">
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
          </div>
          <div className="col-span-12 lg:col-span-6 items-center">
            {/* Full Name */}
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                  <FormLabel className="text-accent text-sm uppercase">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Name"
                      type="text"
                      className="text-accent placeholder:text-accent/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 lg:col-span-6 items-center">
            {/* Business Name */}
            <FormField
              control={form.control}
              name="businessName"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                  <FormLabel className="text-accent text-sm uppercase">
                    Business Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Business Name"
                      type="text"
                      className="text-accent placeholder:text-accent/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 lg:col-span-6 items-center">
            {/* Business Location */}
            <FormField
              control={form.control}
              name="businessLocation"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                  <FormLabel className="text-accent text-sm uppercase">
                    Business Location
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Business Location"
                      type="text"
                      className="text-accent placeholder:text-accent/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 lg:col-span-6 items-center">
            {/* Phone Number */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                  <FormLabel className="text-accent text-sm uppercase">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter Your Phone Number"
                      type="tel"
                      maxLength={11}
                      className="text-accent placeholder:text-accent/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-12 lg:col-span-6 items-center">
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
                      placeholder="Enter Your Password"
                      type="password"
                      className="text-accent placeholder:text-accent/50"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-red-700" />
                </FormItem>
              )}
            />
          </div>
          <div className="w-full items-center justify-end">
            <button
              type="submit"
              className="bg-accent w-40 h-10 text-white rounded-xl capitalize p-2 flex items-center justify-center"
            >
              {loading ? (
                <Loader2 className="size-5 text-white animate-spin" />
              ) : (
                "Create account"
              )}
            </button>
          </div>
        </form>
      </Form>
      <div className="flex items-center justify-end w-full gap-5">
        <p className="text-accent text-sm">Already Have an Account?</p>
        <button
          onClick={() => changeView("login")}
          className="bg-accent w-40 h-10 text-white rounded-xl capitalize p-2 flex items-center justify-center"
        >
          sign in
        </button>
      </div>
    </DialogContent>
  );
}
