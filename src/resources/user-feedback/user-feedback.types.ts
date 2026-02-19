import z from "zod";
import { SubmitFeedbackInputSchema, FeedbackResponseSchema, FeedbackCategoryEnum } from "./user-feedback.schemas";

/* ---- User Feedback Types ---- */
export type FeedbackCategory = z.infer<typeof FeedbackCategoryEnum>;
export type SubmitFeedbackInput = z.infer<typeof SubmitFeedbackInputSchema>;
export type FeedbackResponse = z.infer<typeof FeedbackResponseSchema>;
