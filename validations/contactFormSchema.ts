import * as z from "zod";

export const contactFormSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().min(2).max(50),
  phone: z.string().min(11).max(11),
  email: z.string().email(),
  message: z.string().min(10).max(500),
});
