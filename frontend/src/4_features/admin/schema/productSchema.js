import { z } from "zod";

export const productSchema = z
  .object({
    category_id: z.coerce
      .number({
        required_error: "Category is required.",
        invalid_type_error: "Please select a category.",
      })
      .int()
      .positive("Please select a category."),

    name: z
      .string()
      .trim()
      .min(
        2,
        "Product name must contain at least 2 characters."
      )
      .max(
        150,
        "Product name cannot exceed 150 characters."
      ),

    slug: z
      .string()
      .trim()
      .min(2, "Slug is required.")
      .max(
        170,
        "Slug cannot exceed 170 characters."
      )
      .regex(
        /^[a-z0-9-]+$/,
        "Slug may contain only lowercase letters, numbers and hyphens."
      ),

    description: z
      .string()
      .trim()
      .max(
        2000,
        "Description cannot exceed 2000 characters."
      )
      .nullable()
      .optional(),

    price: z.coerce
      .number()
      .positive("Price must be greater than zero."),

    discount_price: z
      .union([
        z.coerce.number().nonnegative(),
        z.literal(""),
        z.null(),
      ])
      .optional(),

    is_veg: z.boolean(),

    spice_level: z.enum([
      "None",
      "Mild",
      "Medium",
      "Hot",
    ]),

    prep_time: z.coerce
      .number()
      .int()
      .min(
        1,
        "Preparation time must be at least 1 minute."
      )
      .max(
        600,
        "Preparation time looks unrealistic."
      ),

    is_available: z.boolean(),

    is_featured: z.boolean(),

    is_best_seller: z.boolean(),

    display_order: z.coerce
      .number()
      .int()
      .min(0)
      .max(
        999,
        "Display order is too large."
      ),
  })
  .superRefine((data, ctx) => {
    if (
      data.discount_price !== "" &&
      data.discount_price !== null &&
      data.discount_price !== undefined
    ) {
      if (data.discount_price >= data.price) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["discount_price"],
          message:
            "Discount price must be less than the regular price.",
        });
      }
    }
  });