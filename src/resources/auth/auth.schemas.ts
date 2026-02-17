import { z } from "zod";

/* ---- Auth Enums ---- */
export const UserRoleEnum = z.enum(["admin", "user"]);
export const AuthClientSchema = z.enum(["web", "mobile"]);
export const AuthProviderEnum = z.enum(["google", "facebook", "apple", "linkedin", "tiktok", "twitter"]);

/* ---- Reusable Validation Rules ---- */
const UsernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters")
  .max(50, "Username must be less than 50 characters");

const FullNameSchema = z.string().min(1, "Full Full is required").max(100, "Full Name must be under 100 characters");
const EmailSchema = z.email("Please enter a valid email address").min(1, "Email address is required");
const PasswordSchema = z.string().min(8, "Password must be at least 8 characters").max(128, "Password is too long");

/* ---- Register Schema ---- */
export const AuthRegisterInputSchema = z
  .object({
    username: UsernameSchema,
    name: FullNameSchema,
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: z.string().min(1, "Confirm Password is required"),
    client: AuthClientSchema.default("web"),
    terms: z.boolean({
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.terms === true, {
    message: "You must agree to the terms and conditions",
    path: ["terms"],
  })
  .strict();

/* ---- Login Schema ---- */
export const AuthLoginInputSchema = z
  .object({
    email: EmailSchema,
    password: z.string().min(1, "Password is required"),
  })
  .strict();

/* ---- OAuth Finalize Schema ---- */
export const OAuthFinalizeInputSchema = z
  .object({
    ephemeralCode: z.string().min(1, "Ephemeral Code is required"),
    clientState: z.string().min(1, "Client State is required"),
  })
  .strict();
