import { z } from "zod";

/* ---- Auth Enums ---- */
export const UserRoleEnum = z.enum(["admin", "user"]);
export const AuthClientSchema = z.enum(["web", "mobile"]);
export const AuthProviderEnum = z.enum(["google", "facebook", "apple", "linkedin", "tiktok", "twitter"]);

/* ---- Reusable Validation Rules ---- */
const UsernameSchema = z
  .string()
  .trim()
  .min(3, { error: "Username must be at least 3 characters" })
  .max(50, { error: "Username must be less than 50 characters" })
  .regex(/^[a-zA-Z0-9._]+$/, {
    error: "Username can only contain letters, numbers, dots and underscores",
  });

const FullNameSchema = z
  .string()
  .trim()
  .min(1, { error: "Full name is required" })
  .max(100, { error: "Full name must be under 100 characters" });

const EmailSchema = z.email({ error: "Please enter a valid email address" }).trim().toLowerCase();

const PasswordSchema = z
  .string()
  .min(8, { error: "Password must be at least 8 characters long" })
  .max(128, { error: "Password must be less than 128 characters" })
  .regex(/[A-Z]/, { error: "Password must contain at least one uppercase letter" })
  .regex(/[a-z]/, { error: "Password must contain at least one lowercase letter" })
  .regex(/[0-9]/, { error: "Password must contain at least one number" })
  .regex(/[^A-Za-z0-9]/, { error: "Password must contain at least one special character" })
  .trim();

/* ---- Forgot Password Schema ---- */
export const ForgotPasswordInputSchema = z
  .object({
    email: EmailSchema,
  })
  .strict();

/* ---- Verify OTP & Reset Password Schema ---- */
export const VerifyOTPInputSchema = z
  .object({
    token: z.string().length(6, "OTP must be 6 digits"),
    newPassword: PasswordSchema,
    confirmPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .strict();

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
