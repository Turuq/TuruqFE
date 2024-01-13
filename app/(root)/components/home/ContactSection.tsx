"use client";

import AnimatedSection from "./AnimatedSection";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { contactFormSchema } from "@/validations/contactFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { submitContactFormAction } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

export default function ContactSection() {
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof contactFormSchema>>({
    resolver: zodResolver(contactFormSchema),
  });

  async function onSubmit(values: z.infer<typeof contactFormSchema>) {
    setLoading(true);
    const { error, data } = await submitContactFormAction({ ...values });
    if (error) {
      toast({
        title: "Your message was not sent",
        description:
          "A problem has occurred while sending your message. Please try again later.",
        variant: "destructive",
      });
    }
    if (data) {
      toast({
        title: "Your message was sent successfully",
        description: "We will get back to you as soon as possible.",
      });
      form.reset();
    }
    setLoading(false);
  }

  return (
    <AnimatedSection id="contact">
      <div className="flex flex-col items-center gap-10 lg:p-10 w-full">
        <h1 className="text-4xl lg:text-6xl font-bold italic uppercase">
          get in touch
        </h1>
        {/* //TODO: change to a form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid grid-cols-12 gap-5 items-center justify-start w-full p-2"
            >
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                {/* First Name */}
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-white text-sm uppercase">
                        First Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your First Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12 lg:col-span-6 flex flex-col gap-2">
                {/* Last Name */}
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-white text-sm uppercase">
                        Last Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Last Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12 flex flex-col gap-2">
                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-white text-sm uppercase">
                        Email
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Email"
                          type="email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12 flex flex-col gap-2">
                {/* Phone Number */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-white text-sm uppercase">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter Your Phone Number"
                          type="tel"
                          maxLength={11}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12 flex flex-col gap-2">
                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-white text-sm uppercase">
                        Message
                      </FormLabel>
                      <FormControl>
                        <TextareaAutosize
                          id="message"
                          minRows={3}
                          maxRows={6}
                          className="resize-none bg-transparent border border-secondary-500 outline-none ring-0 rounded-lg p-1 pl-2"
                          placeholder="Enter your message"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="col-span-12">
                <button
                  type="submit"
                  className="w-44 flex items-center justify-center px-5 h-10 rounded-lg font-bold uppercase border border-secondary-500 bg-secondary-500 text-white focus:outline-none focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                >
                  {loading ? (
                    <Loader2 className="size-4 text-white animate-spin" />
                  ) : (
                    "send"
                  )}
                </button>
              </div>
            </form>
          </Form>
          {/* About Image */}
          <div className="hidden lg:flex justify-end items-center w-full rounded-lg relative">
            <img
              src={"/assets/images/1.jpg"}
              alt="warehouse image"
              width={100}
              height={100}
              className="rounded-lg aspect-square w-[450px] h-[450px] object-cover"
            />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
