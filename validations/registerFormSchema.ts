import * as z from "zod";

export const registerFormSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email" }),
  fullName: z.string().min(1, { message: "Please enter your full name" }),
  password: z.string().min(1, { message: "Password is required" }),
  phone: z
    .string()
    .min(11, { message: "Phone number is required" })
    .max(11, { message: "Phone can't exceed 11 digits" }),
  businessName: z.string().min(1, { message: "Business name is required" }),
  businessLocation: z
    .string()
    .min(1, { message: "Business location is required" }),
});
