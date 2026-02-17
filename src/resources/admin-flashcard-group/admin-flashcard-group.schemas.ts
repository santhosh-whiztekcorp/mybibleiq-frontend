import { z } from "zod";

/* ---- Enums ---- */
export const AdminFlashcardGroupStatusEnum = z.enum(["Draft", "Published", "Archived"], {
  message: "Flashcard group status must be one of: Draft, Published, or Archived",
});

export const FlashcardGroupStatusActionEnum = z.enum(["Publish", "Archive", "Unarchive", "CloneFromPublished"], {
  message: "Flashcard group status action must be one of: Publish, Archive, Unarchive, or CloneFromPublished",
});

/* ---- Request Schemas ---- */
export const CreateAdminFlashcardGroupRequestSchema = z.object({
  name: z
    .string({ message: "Group name is required" })
    .min(1, { message: "Group name cannot be empty" })
    .max(255, { message: "Group name must be 255 characters or less" }),
  description: z.string().max(1000, { message: "Group description must be 1000 characters or less" }).optional(),
  tags: z
    .array(z.string({ message: "Tag is required" }).min(1, { message: "Tag cannot be empty" }), {
      message: "Please provide valid tags",
    })
    .optional(),
  flashcards: z
    .array(
      z.object({
        flashcardId: z.uuid({ message: "Please provide a valid flashcard ID" }),
        order: z.number().int().min(0, { message: "Order must be a non-negative integer" }),
      }),
      { message: "Please provide valid flashcards" }
    )
    .optional(),
});

export const UpdateAdminFlashcardGroupRequestSchema = CreateAdminFlashcardGroupRequestSchema;

export const UpdateAdminFlashcardGroupFlashcardsSchema = z.object({
  items: z.array(
    z.object({
      flashcardId: z.uuid({ message: "Please provide a valid flashcard ID" }),
      order: z.number().int().min(0, { message: "Order must be a non-negative integer" }),
    }),
    { message: "Please provide valid flashcards" }
  ),
});

export const UpdateAdminFlashcardGroupStatusSchema = z.object({
  action: FlashcardGroupStatusActionEnum,
});
