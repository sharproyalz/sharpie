import { z } from "zod";

export const checkoutSchema = z.object({
  id: z.number().int().optional(),
  date: z.string().optional(),
  cart: z.object({
    id: z.number().int().optional(),
    productId: z.number().positive(),
    quantity: z.number().positive(),
  }),
});
