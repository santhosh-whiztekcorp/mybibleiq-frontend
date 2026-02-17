import { z } from "zod";

/* ---- Enums ---- */
export const AdminFlashcardStatusEnum = z.enum(["Draft", "Published", "Archived"], {
  message: "Flashcard status must be one of: Draft, Published, or Archived",
});

export const FlashcardStatusActionEnum = z.enum(["Publish", "Archive", "Unarchive", "CloneFromPublished"], {
  message: "Flashcard status action must be one of: Publish, Archive, Unarchive, or CloneFromPublished",
});

/* ---- Request Schemas ---- */
export const CreateAdminFlashcardRequestSchema = z.object({
  word: z
    .string({ message: "Word is required" })
    .min(1, { message: "Word cannot be empty" })
    .max(255, { message: "Word must be 255 characters or less" }),
  definition: z
    .string({ message: "Definition is required" })
    .min(1, { message: "Definition cannot be empty" })
    .max(2000, { message: "Definition must be 2000 characters or less" }),
  reference: z
    .string({ message: "Reference must be a string" })
    .min(1, { message: "Reference cannot be empty" })
    .max(255, { message: "Reference must be 255 characters or less" })
    .optional(),
  tags: z
    .array(z.string({ message: "Tag is required" }).min(1, { message: "Tag cannot be empty" }), {
      message: "Please provide valid tags",
    })
    .optional(),
});

export const UpdateAdminFlashcardRequestSchema = CreateAdminFlashcardRequestSchema;

export const UpdateAdminFlashcardStatusSchema = z.object({
  action: FlashcardStatusActionEnum,
});
