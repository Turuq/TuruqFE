import { ClientType } from "@/types/client";
import { useState } from "react";
import {
  DotIcon,
  Loader2Icon,
  MailIcon,
  MailPlusIcon,
  MapPinIcon,
  MoreVerticalIcon,
  PencilIcon,
  PhoneCallIcon,
  PhoneIcon,
  Trash2Icon,
  User2,
  UserRoundSearchIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/custom/auth-dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { deleteClientAction, editClientAction } from "@/lib/actions";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { editClientFormSchema } from "@/validations/editClientFormSchema";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function AdminClientCard({
  client,
  layout,
}: {
  client: ClientType;
  layout: "grid" | "list";
}) {
  const router = useRouter();
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAlertOpen, setDialogAlertOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<z.infer<typeof editClientFormSchema>>({
    resolver: zodResolver(editClientFormSchema),
    defaultValues: {
      email: client.email,
      name: client.name,
      businessName: client.companyName,
      businessLocation: client.companyLocation,
      service:
        client.servicesOffered.length === 1
          ? client.servicesOffered[0]
          : "both",
      phone: client.phone,
    },
  });

  async function onSubmit(values: z.infer<typeof editClientFormSchema>) {
    setFormError({ error: false, message: "" });
    setLoading(true);
    const { error, message } = await editClientAction({ ...values });
    setLoading(false);
    if (message) {
      toast({
        title: "Client Edited Successfully",
        description:
          "A new client has been edited successfully, you can now manage their account from the clients tab.",
      });
      setDialogOpen(false);
    }
    if (error) {
      setFormError({
        error: true,
        message: error,
      });
      return;
    }
  }
  function handleEditClient(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setDialogOpen(true);
    setDropDownOpen(false);
  }

  function handleDeleteClient(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    e.preventDefault();
    setDialogAlertOpen(true);
    setDropDownOpen(false);
  }
  async function handleClientDelete() {
    const { error, message } = await deleteClientAction({
      clientId: client._id.toString(),
    });
    if (message) {
      toast({
        title: "Client Deleted Successfully",
        variant: "destructive",
      });
      setDialogAlertOpen(false);
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
    <div
      className={`bg-white rounded-xl ${
        layout === "grid"
          ? "col-span-12 lg:col-span-4 h-40 lg:h-44"
          : "col-span-12 h-44 lg:h-auto"
      } lg:p-5 flex flex-col gap-2`}
    >
      <div className="flex flex-col-reverse lg:flex-row lg:items-center justify-between">
        <div
          className={`flex ${
            layout === "list" && "flex-row px-3 lg:px-0 gap-5"
          } ${
            layout === "grid" &&
            "lg:flex-row lg:items-center flex-col px-3 lg:px-0 gap-2 lg:gap-5"
          }`}
        >
          <h1 className="text-sm lg:text-xl font-bold text-accent/50 uppercase">
            {client.companyName}
          </h1>
          <div className="flex items-center gap-2 z-20">
            <DropdownMenu open={dropDownOpen} onOpenChange={setDropDownOpen}>
              <DropdownMenuTrigger>
                <MoreVerticalIcon className="size-4 text-accent" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <div
                    className="flex items-center justify-between gap-2 text-accent"
                    onClick={() =>
                      router.push(`/admin/clients/${client._id.toString()}`)
                    }
                  >
                    <UserRoundSearchIcon className="size-4 text-inherit" />
                    <h3>View Client</h3>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <div
                    className="flex items-center justify-between gap-2 text-accent"
                    onClick={(e) => handleEditClient(e)}
                  >
                    <PencilIcon className="size-4 text-inherit" />
                    <h3>Edit Client</h3>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <div
                    className="flex items-center justify-between gap-2 text-red-500"
                    onClick={(e) => handleDeleteClient(e)}
                  >
                    <Trash2Icon className="size-4 text-inherit" />
                    <h3>Delete Client</h3>
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <Badge
          variant={client.active ? "active" : "inactive"}
          className={`hidden lg:flex items-center self-end lg:self-start lg:justify-start capitalize text-[10px] font-bold w-auto lg:w-20`}
        >
          <div className="flex items-center justify-center w-full bg-inherit text-inherit">
            <DotIcon className="size-5 text-inherit mr-1 animate-pulse" />
            <span className="hidden lg:flex">
              {client.active ? "active" : "inactive"}
            </span>
          </div>
        </Badge>
        <DotIcon
          className={`flex self-end lg:hidden size-5 mr-1 animate-pulse ${
            client.active ? "text-green-700" : "text-amber-500"
          }`}
        />
      </div>
      <div className={`flex flex-col gap-2 px-3 lg:px-0`}>
        <div className="flex items-center text-sm gap-1 text-accent">
          <User2 className="size-4 text-inherit" />
          <h3>{client.name}</h3>
        </div>
        <Link
          href={`tel:${client.phone}`}
          className="text-sm hover:underline underline-offset-4 text-accent group"
        >
          <div className="flex items-center text-sm gap-1 text-accent">
            <PhoneIcon className="size-4 text-inherit group-hover:hidden" />
            <PhoneCallIcon className="size-4 text-inherit hidden group-hover:flex animate-pulse" />
            <h3>{client.phone}</h3>
          </div>
        </Link>
        <Link
          href={`mailto:${client.email}`}
          className="text-sm hover:underline underline-offset-4 text-accent group"
        >
          <div className="flex items-center gap-1">
            <MailIcon className="size-4 text-inherit group-hover:hidden" />
            <MailPlusIcon className="size-4 text-inherit hidden group-hover:flex animate-pulse" />
            <h3>{client.email}</h3>
          </div>
        </Link>
        <div className="flex items-center text-sm gap-1 text-accent">
          <MapPinIcon className="size-4 text-inherit" />
          <h3>{client.companyLocation}</h3>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="lg:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="uppercase text-accent font-bold">
              Edit Client
            </DialogTitle>
            <DialogDescription>
              {formError.error && (
                <Alert className="bg-red-500 text-white border-red-500">
                  <AlertTitle className="capitalize">
                    Unable to Update Client
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
              <div className="col-span-12 lg:col-span-6">
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
              <div className="col-span-12 lg:col-span-6">
                <FormField
                  control={form.control}
                  name="service"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Services Offered</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
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
                    "Edit Client"
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AlertDialog open={dialogAlertOpen} onOpenChange={setDialogAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {formError.error && (
                <Alert className="bg-red-500 text-white border-red-500">
                  <AlertTitle className="capitalize">
                    Unable to Delete Client
                  </AlertTitle>
                  <AlertDescription>{formError.message}</AlertDescription>
                </Alert>
              )}
              This action cannot be undone. This will permanently delete this
              client and remove their data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-700 hover:bg-red-500"
              onClick={handleClientDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
