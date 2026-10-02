import { z } from "zod";

export const createCustomerSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().max(25, "Phone number is too long").optional().or(z.literal("")),
  }),
});

export const updateCustomerSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid customer ID"),
  }),
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().max(25).optional().or(z.literal("")),
    status: z.enum(["ACTIVE", "INACTIVE"]).optional(),
  }),
});
