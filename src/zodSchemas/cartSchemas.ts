import { z } from "zod";

export const cartSchema = z.object({
  id: z.number().int().optional(),
  productId: z.number().int().positive(),
  quantity: z
    .number()
    .int()
    .positive({ message: "Quantity must be 1 or more" }),
});
