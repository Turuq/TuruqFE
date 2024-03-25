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
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { TextareaAutosize } from "@mui/base/TextareaAutosize";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { newOrderFormSchema } from "@/validations/newOrderFormSchema";
import React, { ChangeEvent, useEffect, useState } from "react";
import {
  addNewOrderAction,
  getClientInventoryAction,
  getGovernorateFeesAction,
} from "@/lib/actions";
import { GovernorateType } from "@/types/governorate";
import {
  InfoIcon,
  Loader2,
  PercentIcon,
  RedoIcon,
  RefreshCcwIcon,
  ShoppingBagIcon,
  Trash2Icon,
  TruckIcon,
  UndoIcon,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { ProductSummaryType } from "@/types/response";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface INewOrderProps {
  children: JSX.Element;
}

export function NewOrderDialog({ children }: INewOrderProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState<boolean>(false);
  const [formError, setFormError] = useState<{
    error: boolean;
    message: string;
  }>({ error: false, message: "" });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
        <DialogContent className="rounded-2xl max-h-[80svh] lg:max-h-full w-full lg:max-w-6xl">
          <DialogHeader className={"flex flex-col gap-5 items-center"}>
            <div className="w-full flex justify-center">
              <Tabs defaultValue="turuq" className={"w-full"}>
                <TabsList>
                  <TabsTrigger className={"w-1/3 rounded-xl"} value="turuq">
                    <div className={"flex items-center gap-5"}>
                      <ShoppingBagIcon className={"size-4 text-inherit"} />
                      <span>Turuq Order</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger className={"w-1/3 rounded-xl"} value="refund">
                    <div className={"flex items-center gap-5"}>
                      <UndoIcon className={"size-4 text-inherit"} />
                      <span>Refund Order</span>
                    </div>
                  </TabsTrigger>
                  <TabsTrigger className={"w-1/3 rounded-xl"} value="exchange">
                    <div className={"flex items-center gap-5"}>
                      <RefreshCcwIcon className={"size-4 text-inherit"} />
                      <span>Exchange Order</span>
                    </div>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="turuq" className={"w-full"}>
                  <NewOrderForm
                    setFormError={setFormError}
                    setOpen={setOpen}
                    type={"turuq"}
                  />
                </TabsContent>
                <TabsContent value="refund">
                  <NewOrderForm
                    setFormError={setFormError}
                    setOpen={setOpen}
                    type={"refund"}
                  />
                </TabsContent>
                <TabsContent value="exchange">
                  <NewOrderForm
                    setFormError={setFormError}
                    setOpen={setOpen}
                    type={"exchange"}
                  />
                </TabsContent>
              </Tabs>
            </div>
            <DialogTitle className="text-accent/80 text-xl uppercase mb-5">
              {/*add new order*/}
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
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild className="cursor-pointer">
        {children}
      </DrawerTrigger>
      <DrawerContent className={""}>
        <DrawerHeader className="text-left">
          <DrawerTitle className="text-accent/80 text-xl uppercase mb-5">
            {/*add new order*/}
          </DrawerTitle>
          <DrawerDescription>
            {formError.error && (
              <Alert className="bg-red-500 text-accent border-red-500">
                <AlertTitle className="capitalize">
                  Unable to create new order
                </AlertTitle>
                <AlertDescription>{formError.message}</AlertDescription>
              </Alert>
            )}
          </DrawerDescription>
        </DrawerHeader>
        <div className={"px-10"}>
          {/*<NewOrderForm setFormError={setFormError} setOpen={setOpen} />*/}
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function NewOrderForm({
  setFormError,
  setOpen,
  type,
}: {
  setFormError: ({
    error,
    message,
  }: {
    error: boolean;
    message: string;
  }) => void;
  setOpen: (value: boolean) => void;
  type: "turuq" | "refund" | "exchange";
}) {
  const [isPromotional, setIsPromotional] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [refundAmount, setRefundAmount] = useState(0);
  const [priceDifference, setPriceDifference] = useState(0);
  const [products, setProducts] = useState<
    {
      UID: string;
      quantity: number;
      price: number;
      type?: string;
    }[]
  >([]);
  const [governorates, setGovernorates] = useState<GovernorateType[]>([]);
  const [subTotal, setSubTotal] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);
  const [fees, setFees] = useState<number>(0);
  const [exchangeType, setExchangeType] = useState("");
  const [handleShipping, setHandleShipping] = useState<"brand" | "customer">(
    "brand",
  );
  const [availableProducts, setAvailableProducts] = useState<
    ProductSummaryType[]
  >([]);
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

  useEffect(() => {
    getClientInventoryAction()
      .then(({ error, products }) => {
        if (products) {
          setAvailableProducts(products);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      setAvailableProducts([]);
    };
  }, []);

  // Add a new product to the list
  function handleProductAdd(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
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
      if (parseFloat(price ?? "0") === 0 && type === "turuq") {
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
            type: type === "exchange" ? exchangeType : undefined,
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

  function handleProductChange(value: string) {
    // const prod = availableProducts.find((p) => p.UID === value);
    form.setValue("UID", value);
  }

  useEffect(() => {
    if (type === "turuq") {
      if (isPromotional) {
        if (total !== 0) {
          setTotal(subTotal);
        }
      } else {
        setTotal(subTotal + fees);
      }
    }
  }, [isPromotional, subTotal, fees, form.getValues("governorate")]);

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
        const tempSub = product.quantity * parseFloat(product.price.toString());
        sum += tempSub;
      });
    }
    switch (type) {
      case "refund":
        setSubTotal(-parseFloat(refundAmount.toFixed(2)));
        break;
      case "turuq":
        setSubTotal(parseFloat(sum.toFixed(2)));
        break;
      case "exchange":
        setSubTotal(parseFloat(priceDifference.toFixed(2)));
        break;
    }

    if (isPromotional) {
      setTotal(parseFloat(sum.toFixed(3)));
    } else {
      switch (type) {
        case "refund":
          handleShipping === "brand"
            ? setTotal(parseFloat(refundAmount.toFixed(3)))
            : setTotal(parseFloat((refundAmount - fees).toFixed(3)));
          break;
        case "turuq":
          setTotal(parseFloat((sum + fees).toFixed(3)));
          break;
        case "exchange":
          handleShipping === "brand"
            ? setTotal(parseFloat(priceDifference.toFixed(3)))
            : setTotal(parseFloat((priceDifference - fees).toFixed(3)));
          break;
      }
    }
    return () => {
      setSubTotal(0);
      setTotal(0);
    };
  }, [
    products,
    fees,
    setTotal,
    setSubTotal,
    refundAmount,
    priceDifference,
    handleShipping,
  ]);

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
      type: isPromotional ? "promotional" : type,
      refundAmount: refundAmount,
      priceDifference: priceDifference,
      handledBy: handleShipping,
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

  function handleShippingOptionChange(
    checked: boolean | string,
    value: string,
  ) {
    if (checked) {
      setHandleShipping(value as "brand" | "customer");
    } else {
      setHandleShipping("brand");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex lg:flex-row flex-col gap-5 w-full mt-5"
      >
        <ScrollArea className="h-[500px] w-full lg:w-2/3 px-2">
          <div className="flex flex-col gap-5 w-full p-1">
            <div className="grid grid-cols-12 items-center gap-2 border-b border-accent/10 pb-5">
              {/* Section */}
              <div className="col-span-12 flex items-center justify-between">
                {/* Section Header */}
                <h3 className="text-base font-bold uppercase text-accent/50">
                  product details
                </h3>
              </div>
              {/* Product ID */}
              <FormField
                control={form.control}
                name="UID"
                render={({ field }) => (
                  <FormItem
                    className={`col-span-12 ${type === "turuq" ? "lg:col-span-12" : type === "exchange" ? "lg:col-span-12" : "lg:col-span-6"} flex flex-col gap-1`}
                  >
                    <FormControl>
                      <Select onValueChange={handleProductChange}>
                        {type === "refund" && (
                          <FormLabel className="text-accent text-sm uppercase">
                            Refunded Product
                          </FormLabel>
                        )}
                        {type === "exchange" && (
                          <FormLabel className="text-accent text-sm uppercase">
                            Exchanged Products
                          </FormLabel>
                        )}
                        <FormControl>
                          <SelectTrigger className="text-accent border-none bg-gray-200 rounded-xl">
                            <SelectValue
                              className="text-accent"
                              placeholder="Select a Product"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent
                          align="end"
                          position="item-aligned"
                          className={"mt-5"}
                        >
                          <ScrollArea className="h-[400px] w-full rounded-xl">
                            {availableProducts.map((prod) => (
                              <SelectItem
                                // className={`${prod.quantity === 0 ? "text-red-500 font-semibold" : "text-accent"}`}
                                className={"text-accent"}
                                key={prod._id.toString()}
                                value={prod.UID}
                              >
                                {`${prod.itemDescription} | ${prod.size} | ${prod.color}`}
                              </SelectItem>
                            ))}
                          </ScrollArea>
                        </SelectContent>
                      </Select>
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
                  <FormItem
                    className={`col-span-12 lg:col-span-6 flex flex-col gap-1`}
                  >
                    <FormLabel className="text-accent text-sm uppercase">
                      Quantity
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50 border-none bg-gray-200 rounded-xl"
                        placeholder="0"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              {type === "exchange" && (
                <FormField
                  // control={form.control}
                  // name="price"
                  name={"product-type"}
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                      <FormLabel className="flex items-center gap-1 text-accent text-sm uppercase">
                        product status
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <InfoIcon className={"size-3 text-accent/80"} />
                            </TooltipTrigger>
                            <TooltipContent className={"rounded-xl"}>
                              <p className={"normal-case"}>
                                Is this product being returned by the customer
                                or added to the order?
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="single"
                          value={exchangeType}
                          onValueChange={(value) => setExchangeType(value)}
                          className={"flex items-center justify-start gap-5"}
                        >
                          <ToggleGroupItem
                            value="return"
                            aria-label="return"
                            variant={"outline"}
                            className={
                              "w-40 text-accent bg-gray-200 rounded-xl"
                            }
                          >
                            <UndoIcon className="h-4 w-4 mr-2" />
                            Returned
                          </ToggleGroupItem>
                          <ToggleGroupItem
                            value="add"
                            aria-label="add"
                            variant={"outline"}
                            className={
                              "w-40 text-accent bg-gray-200 rounded-xl"
                            }
                          >
                            <RedoIcon className="h-4 w-4 mr-2" />
                            To Be Shipped
                          </ToggleGroupItem>
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              )}
              {/* Product Price */}
              {type === "turuq" && (
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Product Price
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-accent placeholder:text-accent/50 border-none bg-gray-200 rounded-xl"
                          placeholder="0"
                          type="number"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              )}
              {/* Add Button */}
              <div className="col-span-12 flex items-start justify-end h-auto">
                <button
                  className="w-40 h-10 text-xs text-white bg-accent disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-black/60 px-3 rounded-xl flex items-center justify-center"
                  onClick={(e) => handleProductAdd(e)}
                  disabled={
                    !form.getValues("UID") ||
                    (type === "exchange" && !exchangeType)
                  }
                >
                  <PlusCircleIcon className="size-4 text-inherit mr-2" />
                  <span>Add Product</span>
                </button>
              </div>
            </div>
            {type === "refund" && (
              <div className="grid grid-cols-12 items-center gap-2 border-b border-accent/10 pb-5">
                <div className="col-span-12 flex items-center justify-between">
                  {/* Section Header */}
                  <h3 className="text-base font-bold uppercase text-accent/50">
                    refund options
                  </h3>
                </div>
                <FormField
                  name="refundedAmount"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Refunded Amount
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-accent placeholder:text-accent/50 border-none bg-gray-200 rounded-xl"
                          placeholder="0"
                          type="number"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setRefundAmount(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
            )}
            {type === "exchange" && (
              <div className="grid grid-cols-12 items-center gap-2 border-b border-accent/10 pb-5">
                <div className="col-span-12 flex items-center justify-between">
                  {/* Section Header */}
                  <h3 className="text-base font-bold uppercase text-accent/50">
                    exchange options
                  </h3>
                </div>
                <FormField
                  name="priceDifference"
                  render={({ field }) => (
                    <FormItem className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                      <FormLabel className="text-accent text-sm uppercase">
                        Price Difference
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="text-accent placeholder:text-accent/50 border-none bg-gray-200 rounded-xl"
                          placeholder="0"
                          type="number"
                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                            setPriceDifference(parseFloat(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage className="text-red-700" />
                    </FormItem>
                  )}
                />
              </div>
            )}
            <div className="grid grid-cols-12 gap-5 border-b border-accent/10 pb-5 lg:border-none lg:pb-0">
              <div className="col-span-12 flex items-center justify-between">
                {/* Section Header */}
                <h3 className="text-base font-bold uppercase text-accent/50">
                  customer details
                </h3>
              </div>
              {/* Customer Name */}
              <FormField
                control={form.control}
                name="clientName"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-12 flex flex-col gap-1">
                    <FormLabel className="text-accent text-sm uppercase">
                      Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50 bg-gray-200 border-none rounded-xl"
                        placeholder="John Doe"
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
              {/* Customer Phone Number */}
              <FormField
                control={form.control}
                name="clientPhone"
                render={({ field }) => (
                  <FormItem className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                    <FormLabel className="text-accent text-sm uppercase">
                      Phone
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="text-accent placeholder:text-accent/50 bg-gray-200 border-none rounded-xl"
                        placeholder="01xxxxxxxxx"
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
                  <FormItem className="col-span-12 lg:col-span-6 flex flex-col gap-1">
                    <FormLabel className="text-accent text-sm uppercase">
                      Governorate
                    </FormLabel>
                    <Select onValueChange={handleGovernorateChange}>
                      <FormControl>
                        <SelectTrigger className="text-accent bg-gray-200 border-none rounded-xl">
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
                        minRows={2}
                        maxRows={4}
                        placeholder="Enter Shipping Address"
                        className="resize-none bg-gray-200 text-accent placeholder:text-accent/50 rounded-xl px-3 py-1"
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
                        minRows={2}
                        maxRows={4}
                        placeholder="Enter Shipping Notes"
                        className="resize-none bg-gray-200 text-accent placeholder:text-accent/50 rounded-xl px-3 py-1"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-700" />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </ScrollArea>
        <div className="flex flex-col lg:items-start gap-5 lg:border-l border-accent/10 lg:pl-2 lg:w-1/3">
          <div className="flex items-center justify-between">
            {/* Section Header */}
            <h3 className="text-base font-bold uppercase text-accent/50">
              order summary
            </h3>
          </div>
          <ScrollArea className="h-[200px] w-full rounded-xl">
            {/* Added Items */}
            <div className="flex flex-col justify-start gap-2 w-full pb-5">
              {products.length > 0 &&
                products.map((product) => (
                  <div
                    className="flex items-center justify-between gap-5 group"
                    key={product.UID}
                  >
                    {type === "exchange" && (
                      <div className={"flex items-center justify-start"}>
                        {product.type === "add" ? (
                          <div className={"text-emerald-500 flex items-center"}>
                            <RedoIcon
                              className={"text-emerald-500 size-4 mr-2"}
                            />{" "}
                            <span
                              className={
                                "text-xs font-bold hidden group-hover:block"
                              }
                            >
                              Added
                            </span>
                          </div>
                        ) : (
                          <div className={"text-red-500 flex items-center"}>
                            <UndoIcon className={"text-red-500 size-4 mr-2"} />{" "}
                            <span
                              className={
                                "text-xs font-bold hidden group-hover:block"
                              }
                            >
                              Returned
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                    <h3 className="text-xs text-center text-accent">
                      x{product.quantity}
                    </h3>
                    <h3 className="text-xs text-left text-accent uppercase font-bold flex-grow">
                      {
                        availableProducts?.find((p) => p.UID === product.UID)
                          ?.itemDescription
                      }
                    </h3>
                    <div className="flex items-center gap-5">
                      {type === "turuq" && (
                        <h3 className="text-xs text-right text-accent uppercase">
                          {product.price} EGP
                        </h3>
                      )}
                      <button onClick={() => handleRemoveProduct(product.UID)}>
                        <Trash2Icon className="size-4 text-accent/50 hover:text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </ScrollArea>
          {/* Summary */}
          <div className="flex flex-col gap-3 w-full">
            <div
              className={`flex ${type !== "turuq" && "flex-col"} ${type === "turuq" && "items-center"} justify-between border-y border-accent/20 my-2 py-2`}
            >
              <label
                htmlFor="promotional"
                className="text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-accent"
              >
                <div className={"flex flex-col items-start gap-1"}>
                  <div className={"flex items-center"}>
                    {type === "turuq" ? (
                      <PercentIcon className={"size-4 text-accent mr-2"} />
                    ) : (
                      <TruckIcon className={"size-4 text-accent mr-2"} />
                    )}
                    <span>
                      {" "}
                      {type === "turuq" ? "Promotional Order" : "Shipping Fees"}
                    </span>
                  </div>
                  <span className={"text-accent/50 text-xs"}>
                    {type === "turuq"
                      ? "Is this a promotional order?"
                      : "Who is covering the shipping fees?"}
                  </span>
                </div>
              </label>
              {type === "turuq" && (
                <Checkbox
                  id="promotional"
                  checked={isPromotional}
                  onCheckedChange={(value: boolean) => setIsPromotional(value)}
                />
              )}
              {type !== "turuq" && (
                <div className={"flex items-center gap-5 mt-2"}>
                  <div className="flex space-x-2 items-center">
                    <Checkbox
                      id="brand"
                      checked={handleShipping === "brand"}
                      onCheckedChange={(checked) =>
                        handleShippingOptionChange(checked, "brand")
                      }
                    />
                    <div className="leading-none flex items-center gap-2">
                      <label
                        htmlFor="brand"
                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Brand
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className={"size-3 text-accent/80"} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Shipping Fees are paid for by the brand</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                  <div className="flex space-x-2 items-center">
                    <Checkbox
                      id="customer"
                      checked={handleShipping === "customer"}
                      onCheckedChange={(checked) =>
                        handleShippingOptionChange(checked, "customer")
                      }
                    />
                    <div className="leading-none flex items-center gap-2">
                      <label
                        htmlFor="customer"
                        className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Customer
                      </label>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <InfoIcon className={"size-3 text-accent/80"} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>
                              Shipping Fees are paid for by the customer
                              receiving the order
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-accent text-sm">Sub Total</h3>
              <span
                className={`font-bold ${subTotal < 0 ? "text-red-500" : "text-accent"} text-sm`}
              >
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
            </div>
            <div className="flex items-center justify-between">
              <h3 className="text-accent text-sm">
                {type === "refund"
                  ? "Total Refunded"
                  : type === "exchange" && total > 0
                    ? "Total Refunded"
                    : type === "exchange" && total < 0
                      ? "Total Collected"
                      : "Total"}
              </h3>
              <span className="font-bold text-accent text-sm">{total} EGP</span>
            </div>
          </div>
          <div className="flex items-center justify-end w-full">
            <button
              type="submit"
              disabled={loading}
              className="w-1/2 lg:w-40 h-10 p-1 rounded-xl bg-accent text-white flex items-center justify-center disabled:bg-gray-200 disabled:text-black/60"
            >
              {loading ? (
                <Loader2 className="size-5 animate-spin text-accent" />
              ) : (
                "Place Order"
              )}
            </button>
          </div>
          {/*<pre>*/}
          {/*  <code>{JSON.stringify(availableProducts, null, 2)}</code>*/}
          {/*</pre>*/}
        </div>
      </form>
    </Form>
  );
}
