"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import { newCourierFormSchema } from "@/validations/newCourierFormSchema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/auth-dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TruckIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { addNewCourierAction } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { usePathname } from "next/navigation";

export default function NewCourierDialog() {
  const { toast } = useToast();
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const form = useForm<z.infer<typeof newCourierFormSchema>>({
    resolver: zodResolver(newCourierFormSchema),
  });

  async function onSubmit(values: z.infer<typeof newCourierFormSchema>) {
    const data = await addNewCourierAction({ ...values, pathname });
    if (data?.data) {
      setOpen(false);
      form.reset();
      toast({
        title: "Courier Added Successfully",
        description: `${values.firstName} ${values.lastName} has been added as a courier`,
      });
    }
    if (data?.error) {
      toast({
        title: "Failed to Add Courier",
        description: data.error,
        variant: "destructive",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="bg-white p-2 rounded-xl w-auto text-sm text-accent flex items-center">
          <TruckIcon className="size-4 lg:size-5 text-inherit mr-2" />
          <span className="text-xs lg:text-inherit">Add Courier</span>
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="uppercase text-accent font-bold">
            Add a new courier
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-5"
          >
            <div className="col-span-12 ">
              <FormField
                control={form.control}
                name="picture"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Picture</FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-5">
                        <Avatar>
                          <AvatarImage src={field.value} />
                          <AvatarFallback>CP</AvatarFallback>
                        </Avatar>
                        <Input
                          type="file"
                          className="text-accent placeholder:text-accent/50"
                          placeholder="Enter The Courier's Picture"
                          accept="image/*"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Enter The Courier's First Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 lg:col-span-6">
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Enter The Courier's Last Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Courier's Phone Number"
                        type="tel"
                        minLength={11}
                        maxLength={11}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <FormField
                control={form.control}
                name="zone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zone Of Service</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Courier's Zone Of Service"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12 lg:col-span-4">
              <FormField
                control={form.control}
                name="salary"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Salary</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Courier's Salary"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12">
              <Button type="submit">Add Courier</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
