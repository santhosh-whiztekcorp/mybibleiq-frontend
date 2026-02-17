import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.email("Please enter a valid email address").min(1, "Email address is required"),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
