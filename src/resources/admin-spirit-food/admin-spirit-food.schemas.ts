import { z } from "zod";

/* ---- Enums ---- */
export const AdminSpiritFoodStatusEnum = z.enum(
  ["InProgress", "InReview", "Scheduled", "Delivered", "PendingDelete", "Deleted"],
  {
    message:
      "Spirit food status must be one of: In Progress, In Review, Scheduled, Delivered, Pending Delete, or Deleted",
  }
);

/* ---- Request Schemas ---- */
export const CreateAdminSpiritFoodRequestSchema = z.object({
  scheduledDate: z
    .string({ message: "Scheduled date is required" })
    .date({ message: "Scheduled date must be a valid date" }),
  verseReference: z
    .string({ message: "Verse reference is required" })
    .min(1, { message: "Verse reference cannot be empty" }),
  bibleVersion: z.string({ message: "Bible version is required" }).min(1, { message: "Bible version cannot be empty" }),
  verseText: z.string({ message: "Verse text is required" }).min(1, { message: "Verse text cannot be empty" }),
  reflectionText: z.string({ message: "Reflection text must be a string" }).optional(),
});

export const UpdateAdminSpiritFoodRequestSchema = CreateAdminSpiritFoodRequestSchema.partial();

export const SubmitAdminSpiritFoodRequestSchema = z.object({
  comment: z.string({ message: "Comment must be a string" }).optional(),
});

export const ApproveAdminSpiritFoodRequestSchema = z.object({
  comment: z.string({ message: "Comment is required" }).min(1, { message: "Comment cannot be empty" }),
  scheduledFor: z.string({ message: "Scheduled for must be a string" }).optional(),
});

export const CancelAdminSpiritFoodRequestSchema = z.object({
  comment: z.string({ message: "Comment must be a string" }).optional(),
});

export const RequestDeleteAdminSpiritFoodRequestSchema = z.object({
  comment: z.string({ message: "Comment must be a string" }).optional(),
});

export const ApproveDeleteAdminSpiritFoodRequestSchema = z.object({
  comment: z.string({ message: "Comment must be a string" }).optional(),
});

export const CancelDeleteAdminSpiritFoodRequestSchema = z.object({
  comment: z.string({ message: "Comment must be a string" }).optional(),
});

export const ForceDeleteAdminSpiritFoodRequestSchema = z.object({
  comment: z.string({ message: "Comment must be a string" }).optional(),
});

/* ---- Import Schemas ---- */
// Note: For web, File objects are accepted directly. For React Native, use { uri, name, type }
export const ImportPreviewAdminSpiritFoodRequestSchema = z.object({
  file: z.union([
    z.instanceof(File), // For web File objects
    z.object({
      uri: z.string({ message: "File URI is required" }).min(1, { message: "File URI cannot be empty" }),
      name: z.string({ message: "File name is required" }).min(1, { message: "File name cannot be empty" }),
      type: z.string({ message: "File type is required" }).min(1, { message: "File type cannot be empty" }),
    }),
  ]),
  submitAfterUpload: z.boolean({ message: "Submit after upload must be a boolean" }).optional(),
});

export const ImportCommitAdminSpiritFoodRequestSchema = z.object({
  uploadId: z.string({ message: "Upload ID is required" }).min(1, { message: "Upload ID cannot be empty" }),
  submitAfterUpload: z.boolean({ message: "Submit after upload must be a boolean" }).optional(),
});

export const ImportReportAdminSpiritFoodRequestSchema = z.object({
  uploadId: z.string({ message: "Upload ID is required" }).min(1, { message: "Upload ID cannot be empty" }),
  format: z.enum(["json", "csv"], { message: "Format must be either json or csv" }).optional(),
});
