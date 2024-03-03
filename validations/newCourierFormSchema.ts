import * as z from "zod";

export const newCourierFormSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters long" }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" }),
  phone: z
    .string()
    .min(11, { message: "Phone number must be at least 11 characters long" })
    .max(11, { message: "Phone number must be at most 11 characters long" }),
  zone: z
    .string()
    .min(2, { message: "Zone must be at least 2 characters long" }),
  picture: z.string().optional(),
  salary: z.string().min(0, { message: "Salary must be at least 0" }),
});
