import { z } from "zod";

/* ---- Enums ---- */
export const AdminMediaStatusEnum = z.enum(["Draft", "Published", "Archived"], {
  message: "Media status must be one of: Draft, Published, or Archived",
});

export const MediaTypeEnum = z.enum(["IMAGE", "AUDIO", "VIDEO"], {
  message: "Media type must be one of: Image, Audio, or Video",
});

export const MediaStatusActionEnum = z.enum(["Publish", "Clone", "Archive"], {
  message: "Media status action must be one of: Publish, Clone, or Archive",
});

/* ---- Request Schemas ---- */
export const CreateAdminMediaRequestSchema = z.object({
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title cannot be empty" })
    .max(200, { message: "Title must be 200 characters or less" }),
  type: MediaTypeEnum,
  caption: z
    .string({ message: "Caption is required" })
    .max(500, { message: "Caption must be 500 characters or less" })
    .optional(),
  tags: z
    .array(z.string({ message: "Tag is required" }).min(1, { message: "Tag cannot be empty" }), {
      message: "Please provide valid tags",
    })
    .optional(),
  sizeBytes: z
    .number({ message: "File size is required" })
    .int({ message: "File size must be a whole number" })
    .min(0, { message: "File size cannot be negative" }),
  duration: z
    .number({ message: "Duration is required" })
    .int({ message: "Duration must be a whole number" })
    .min(1, { message: "Duration must be at least 1 second" })
    .optional(),
  file: z.any().optional(),
});

export const UpdateAdminMediaRequestSchema = CreateAdminMediaRequestSchema;

export const UpdateAdminMediaStatusSchema = z.object({
  action: MediaStatusActionEnum,
});
