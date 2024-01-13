import * as z from "zod";

export const editClientFormSchema = z.object({
  name: z.string().min(2, { message: "Name has to be at least 2 characters" }),
  email: z.string().email(),
  phone: z
    .string()
    .min(11, { message: "Phone Number can't be less than 11 digits" })
    .max(11, { message: "Phone Number can't be more than 11 digits" }),
  businessName: z.string(),
  businessLocation: z.string(),
  service: z.string(),
});
