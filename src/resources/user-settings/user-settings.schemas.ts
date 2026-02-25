import { z } from "zod";

/* ---- About Response Schema ---- */
export const AboutResponseSchema = z.object({
  title: z.string(),
  content: z.string(),
  lastUpdated: z.string(),
});

/* ---- Terms Response Schema ---- */
export const TermsResponseSchema = z.object({
  title: z.string(),
  content: z.string(),
  lastUpdated: z.string(),
});

/* ---- Privacy Response Schema ---- */
export const PrivacyResponseSchema = z.object({
  title: z.string(),
  content: z.string(),
  lastUpdated: z.string(),
});
