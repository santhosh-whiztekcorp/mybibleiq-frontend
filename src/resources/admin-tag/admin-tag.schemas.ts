import { z } from "zod";

/* ---- Request Schemas ---- */
export const CreateAdminTagRequestSchema = z.object({
  name: z
    .string({ message: "Tag name is required" })
    .min(1, { message: "Tag name cannot be empty" })
    .max(100, { message: "Tag name must be 100 characters or less" })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Tag name can only contain lowercase letters, numbers, and hyphens (e.g., "bible-study", "prayer-101")',
    }),
  categoryId: z.uuid({ message: "Category is required" }),
  description: z
    .string()
    .max(500, { message: "Description must be 500 characters or less" })
    .optional()
    .or(z.literal("")),
});

export const UpdateAdminTagRequestSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Tag name cannot be empty" })
    .max(100, { message: "Tag name must be 100 characters or less" })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Tag name can only contain lowercase letters, numbers, and hyphens (e.g., "bible-study", "prayer-101")',
    })
    .optional(),
  categoryId: z.uuid({ message: "Please select a valid category" }).optional(),
  description: z
    .string()
    .max(500, { message: "Description must be 500 characters or less" })
    .optional()
    .or(z.literal("")),
});

export const CreateCategoryRequestSchema = z.object({
  name: z
    .string({ message: "Category name is required" })
    .min(1, { message: "Category name cannot be empty" })
    .max(100, { message: "Category name must be 100 characters or less" }),
  color: z
    .string({ message: "Color is required" })
    .min(1, { message: "Color is required" })
    .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Color must be a valid hex color code (e.g., #FF5733)" }),
});

export const UpdateCategoryRequestSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Category name cannot be empty" })
    .max(100, { message: "Category name must be 100 characters or less" })
    .optional(),
  color: z
    .string()
    .min(1, { message: "Color cannot be empty" })
    .regex(/^#[0-9A-Fa-f]{6}$/, { message: "Color must be a valid hex color code (e.g., #FF5733)" })
    .optional(),
});
