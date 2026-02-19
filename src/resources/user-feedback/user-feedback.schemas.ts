import { z } from "zod";

/* ---- Feedback Category Enum ---- */
export const FeedbackCategoryEnum = z.enum(["bug_report", "feature_request", "general", "other"]);

/* ---- Submit Feedback Input Schema ---- */
export const SubmitFeedbackInputSchema = z.object({
  message: z.string().min(1),
  category: FeedbackCategoryEnum,
  rating: z.number().min(1).max(5).optional(),
});

/* ---- Feedback Response Schema ---- */
export const FeedbackResponseSchema = z.object({
  id: z.string(),
  message: z.string(),
  category: FeedbackCategoryEnum,
  rating: z.number().min(1).max(5).optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
