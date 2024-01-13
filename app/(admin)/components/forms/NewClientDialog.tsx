"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/auth-dialog";
import { ListPlusIcon, Loader2Icon } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { newClientFormSchema } from "@/validations/newClientFormSchema";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addNewClientAction } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NewClientDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof newClientFormSchema>>({
    resolver: zodResolver(newClientFormSchema),
  });

  async function onSubmit(values: z.infer<typeof newClientFormSchema>) {
    setFormError({ error: false, message: "" });
    setLoading(true);
    const { error, message } = await addNewClientAction({ ...values });
    setLoading(false);
    if (message) {
      toast({
        title: "Client Added Successfully",
        description:
          "A new client has been added successfully, you can now manage their account from the clients tab.",
      });
      setOpen(false);
    }
    if (error) {
      setFormError({
        error: true,
        message: error,
      });
      return;
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <div className="bg-white p-2 rounded-xl w-auto text-sm text-accent flex items-center">
          <ListPlusIcon className="size-4 lg:size-5 text-inherit mr-2" />
          <span className="text-xs lg:text-inherit">New Client</span>
        </div>
      </DialogTrigger>
      <DialogContent className="lg:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="uppercase text-accent font-bold">
            Add a new client
          </DialogTitle>
          <DialogDescription>
            {formError.error && (
              <Alert className="bg-red-500 text-white border-red-500">
                <AlertTitle className="capitalize">
                  Unable to create new client
                </AlertTitle>
                <AlertDescription>{formError.message}</AlertDescription>
              </Alert>
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-12 gap-5"
          >
            <div className="col-span-12 lg:col-span-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Enter The Client's Full Name"
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
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        type="email"
                        placeholder="Enter The Client's Email"
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
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        type="tel"
                        placeholder="Enter The Client's Phone Number"
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
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Client's Password"
                        type="password"
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
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Name</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Client's Business Name"
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
                name="businessLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business Location</FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50"
                        placeholder="Client's Business Location"
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
                name="service"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Services Offered</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="text-accent placeholder:text-accent/50">
                          <SelectValue
                            className="text-accent placeholder:text-accent/50"
                            placeholder="Select Offered Services"
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="storage">Storage</SelectItem>
                        <SelectItem value="shipping">Shipping</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-12">
              <Button
                type="submit"
                className="flex items-center justify-center"
              >
                {loading ? (
                  <Loader2Icon className="size-4 text-white animate-spin" />
                ) : (
                  "Add Client"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
