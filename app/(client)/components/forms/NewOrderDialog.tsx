"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/custom/auth-dialog";
import {
  Form,
  FormControl,
  FormDescription,
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
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { newOrderFormSchema } from "@/validations/newOrderFormSchema";
import { useEffect, useState } from "react";
import { addNewOrderAction, getGovernorateFeesAction } from "@/lib/actions";
import { GovernorateType } from "@/types/governorate";
import { Loader2, Trash2Icon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";

interface INewOrderProps {
  children: JSX.Element;
}

export function NewOrderDialog({ children }: INewOrderProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [isPromotional, setIsPromotional] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formError, setFormError] = useState({ error: false, message: "" });
  const [products, setProducts] = useState<
    {
      UID: string;
      quantity: number;
      price: number;
    }[]
  >([]);
  const [governorates, setGovernorates] = useState<GovernorateType[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [fees, setFees] = useState<number>(0);
  const form = useForm<z.infer<typeof newOrderFormSchema>>({
    resolver: zodResolver(newOrderFormSchema),
    defaultValues: {
      UID: "",
      quantity: "0",
      price: "0",
      clientName: "",
      clientPhone: "",
      governorate: "",
      address: "",
      notes: "",
    },
  });

  // Add a new product to the list
  function handleProductAdd(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    if (form.getValues()) {
      const { UID, quantity, price } = form.getValues();
      if (UID?.length === 0) {
        form.setError("UID", { message: "UID is required" });
        return;
      }
      if (parseInt(quantity ?? "0") === 0) {
        form.setError("quantity", { message: "Quantity is required" });
        return;
      }
      if (parseFloat(price ?? "0") === 0) {
        form.setError("price", { message: "Price is required" });
        return;
      }
      if (UID && quantity && price) {
        setProducts([
          ...products,
          {
            UID,
            quantity: parseInt(quantity ?? "0"),
            price: parseFloat(price ?? "0"),
          },
        ]);
        form.reset({ UID: "", quantity: "0", price: "0" });
      }
    }
  }

  function handleRemoveProduct(UID: string) {
    const newProducts = products.filter((product) => product.UID !== UID);
    setProducts(newProducts);
  }

  function handleGovernorateChange(value: string) {
    const selectedGov = governorates.find((g) => g.name === value);
    form.setValue("governorate", value);
    if (selectedGov) {
      setFees(selectedGov.fee);
    }
  }

  useEffect(() => {
    if (isPromotional) {
      setTotal(subTotal);
    } else {
      setTotal(subTotal + fees);
    }
  }, [isPromotional, subTotal, fees]);

  // Get fees for each governorate on initial render
  useEffect(() => {
    getGovernorateFeesAction().then((data) => {
      setGovernorates(data);
    });

    return () => {
      setGovernorates([]);
    };
  }, []);

  // Recalculate the subtotal & total
  // When a new product is added or a different governorate is selected
  useEffect(() => {
    let sum: number = 0;
    if (products.length > 0) {
      products.forEach((product) => {
        const tempSub = product.quantity * product.price;
        sum += tempSub;
      });
    }
    setSubTotal(sum);
    setTotal(sum + fees);

    return () => {
      setSubTotal(0);
      setTotal(0);
    };
  }, [products, fees, setTotal, setSubTotal]);

  async function onSubmit(values: z.infer<typeof newOrderFormSchema>) {
    setLoading(true);
    setFormError({ error: false, message: "" });
    if (products.length === 0) {
      setLoading(false);
      setFormError({
        error: true,
        message: "You must add at least one product",
      });
      return;
    }
    const customer = {
      name: values.clientName,
      phone: values.clientPhone,
      address: values.address,
      governorate: values.governorate,
    };
    const { error } = await addNewOrderAction({
      customer,
      products,
      notes: values.notes ?? "",
    });
    if (error) {
      setFormError({ error: true, message: error });
      setLoading(false);
      return;
    }
    setLoading(false);
    setOpen(false);
    setProducts([]);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="overflow-y-scroll max-h-[80svh] lg:max-h-full lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-accent/80 text-xl uppercase mb-5">
            add new order
          </DialogTitle>
          <DialogDescription>
            {formError.error && (
              <Alert className="bg-red-500 text-accent border-red-500">
                <AlertTitle className="capitalize">
                  Unable to create new order
                </AlertTitle>
                <AlertDescription>{formError.message}</AlertDescription>
              </Alert>
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex lg:flex-row flex-col gap-5 w-full"
          >
            <div className="flex flex-col gap-5 lg:w-2/3">
              <div className="grid grid-cols-12 gap-5 border-b border-accent/10 pb-5">
                {/* Section */}
                <div className="col-span-12 flex items-center justify-between">
                  {/* Section Header */}
                  <h3 className="text-base font-bold uppercase text-accent/50">
                    product details
                  </h3>
                  {/* Add Button */}
                  <div className="col-span-1 flex items-start justify-end h-auto">
                    <button
                      className="bg-transparent size-5 flex items-center justify-center rounded-full"
                      onClick={(e) => handleProductAdd(e)}
                    >
                      <PlusCircleIcon className="size-5 text-accent" />
                    </button>
                  </div>
                </div>
                {/* Product ID */}
                <FormField
                  control={form.control}
                  name="UID"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Product ID
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-accent placeholder:text-accent/50"
                          placeholder="Enter Product ID"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                {/* Quantity */}
                <FormField
                  control={form.control}
                  name="quantity"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Quantity
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-accent placeholder:text-accent/50"
                          placeholder="0"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                {/* Product Price */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Product Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-accent placeholder:text-accent/50"
                          placeholder="0"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
              <div className="grid grid-cols-12 gap-5 border-b border-accent/10 pb-5 lg:border-none lg:pb-0">
                <div className="col-span-12 flex items-center justify-between">
                  {/* Section Header */}
                  <h3 className="text-base font-bold uppercase text-accent/50">
                    client details
                  </h3>
                </div>
                {/* Client Name */}
                <FormField
                  control={form.control}
                  name="clientName"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Client Name
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-accent placeholder:text-accent/50"
                          placeholder="Enter Client Name"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                {/* Client Phone Number */}
                <FormField
                  control={form.control}
                  name="clientPhone"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Client Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-accent placeholder:text-accent/50"
                          placeholder="Enter Client Phone Number"
                          type="tel"
                          minLength={11}
                          maxLength={11}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                {/* Governorate */}
                <FormField
                  control={form.control}
                  name="governorate"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-4 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Governorate
                      </FormLabel>
                      <Select onValueChange={handleGovernorateChange}>
                        <FormControl>
                          <SelectTrigger className="text-accent">
                            <SelectValue
                              className="text-accent"
                              placeholder="Select a Governorate"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent align="end" position="item-aligned">
                          {governorates.map((gov) => (
                            <SelectItem
                              className="text-accent"
                              key={gov._id.toString()}
                              value={gov.name}
                            >
                              {gov.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                {/* Address */}
                <FormField
                  control={form.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem className="col-span-12 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Address
                      </FormLabel>
                      <FormControl>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={6}
                          placeholder="Enter Shipping Address"
                          className="resize-none bg-transparent text-accent placeholder:text-accent/50 border border-secondary-500 rounded-xl px-3 py-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
                {/* Notes */}
                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem className="col-span-12 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Notes
                      </FormLabel>
                      <FormControl>
                        <TextareaAutosize
                          minRows={3}
                          maxRows={6}
                          placeholder="Enter Shipping Notes"
                          className="resize-none bg-transparent text-accent placeholder:text-accent/50 border border-secondary-500 rounded-xl px-3 py-1"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-col lg:items-start gap-5 lg:border-l border-accent/10 lg:pl-5 lg:w-1/3">
              <div className="flex items-center justify-between">
                {/* Section Header */}
                <h3 className="text-base font-bold uppercase text-accent/50">
                  order summary
                </h3>
              </div>
              {/* Added Items */}
              <div className="flex flex-col justify-start gap-2 w-full border-b border-accent/10 pb-5">
                {products.length > 0 &&
                  products.map((product) => (
                    <div className="flex items-center gap-5" key={product.UID}>
                      <h3 className="text-sm text-accent">
                        x{product.quantity}
                      </h3>
                      <h3 className="text-sm text-accent uppercase font-bold flex-grow">
                        {product.UID}
                      </h3>
                      <div className="flex items-center gap-5">
                        <h3 className="text-sm text-accent uppercase">
                          {product.price} EGP
                        </h3>
                        <button
                          onClick={() => handleRemoveProduct(product.UID)}
                        >
                          <Trash2Icon className="size-4 text-accent/50 hover:text-red-500" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
              {/* Summary */}
              <div className="flex flex-col gap-3 w-full border-b border-accent/10 pb-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-accent text-sm">Sub Total</h3>
                  <span className="font-bold text-accent text-sm">
                    {subTotal} EGP
                  </span>
                </div>
                <div className="flex flex-col gap-3 border-y border-accent/10 py-5">
                  <div
                    className={`flex ${
                      isPromotional ? "items-start" : "items-center"
                    } justify-between`}
                  >
                    <h3 className="text-accent text-sm">Shipping</h3>
                    <div className="flex flex-col gap-0">
                      <span
                        className={`font-bold text-accent text-sm ${
                          isPromotional && "line-through"
                        }`}
                      >
                        {fees} EGP
                      </span>
                      {isPromotional && (
                        <span className={`font-bold text-red-500 text-sm`}>
                          -{fees} EGP
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="promotional"
                      className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-accent"
                    >
                      Is this a promotional order?
                    </label>
                    <Checkbox
                      id="promotional"
                      checked={isPromotional}
                      onCheckedChange={(value: boolean) =>
                        setIsPromotional(value)
                      }
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <h3 className="text-accent text-sm">Total</h3>
                  <span className="font-bold text-accent text-sm">
                    {total} EGP
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-end w-full">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 lg:w-44 h-10 p-1 rounded-xl bg-secondary-500 text-accent flex items-center justify-center disabled:bg-gray-500"
                >
                  {loading ? (
                    <Loader2 className="size-5 animate-spin text-accent" />
                  ) : (
                    "Place Order"
                  )}
                </button>
              </div>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
