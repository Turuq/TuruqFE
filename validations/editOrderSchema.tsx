import * as z from "zod";

export const editOrderSchema = z.object({
  UID: z.string().optional(),
  quantity: z.string().optional(),
  price: z.string().optional(),
  clientName: z.string().min(1, { message: "Client name cannot be empty" }),
  clientPhone: z
    .string()
    .min(1, { message: "Client phone cannot be empty or less than 11 digits" })
    .max(11, { message: "Client phone cannot be longer than 11 digits" }),
  governorate: z.string().min(1, { message: "Governorate cannot be empty" }),
  address: z.string().min(1, { message: "Address cannot be empty" }),
  notes: z.string().optional(),
});
