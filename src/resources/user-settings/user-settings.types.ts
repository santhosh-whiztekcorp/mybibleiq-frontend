import { z } from "zod";
import { AboutResponseSchema, TermsResponseSchema, PrivacyResponseSchema } from "./user-settings.schemas";

/* ---- About, Terms, Privacy Types ---- */
export type AboutResponse = z.infer<typeof AboutResponseSchema>;
export type TermsResponse = z.infer<typeof TermsResponseSchema>;
export type PrivacyResponse = z.infer<typeof PrivacyResponseSchema>;
