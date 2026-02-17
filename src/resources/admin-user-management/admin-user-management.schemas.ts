import { z } from "zod";

/* ---- Enums ---- */
export const UserStatusEnum = z.enum(["active", "suspended"]);
export const BadgeRarityEnum = z.enum(["Common", "Rare", "Epic", "Legendary", "Special"]);
export const FeedbackStatusEnum = z.enum(["open", "in_progress", "resolved", "closed"]);

/* ---- Admin User List Input Schema ---- */
export const AdminUserListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  sort: z.string().optional(),
  q: z.string().optional(),
  status: z.string().optional(),
});

/* ---- Admin User Badges List Input Schema ---- */
export const AdminUserBadgesListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  sort: z.string().optional(),
  rarity: z.string().optional(),
});

/* ---- Admin User Feedback List Input Schema ---- */
export const AdminUserFeedbackListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  sort: z.string().optional(),
});

/* ---- Admin User Saved Verses List Input Schema ---- */
export const AdminUserSavedVersesListInputSchema = z.object({
  page: z.number().min(1).optional(),
  pageSize: z.number().min(1).optional(),
  sort: z.string().optional(),
});

/* ---- Admin User Suspend Input Schema ---- */
export const AdminUserSuspendInputSchema = z.object({
  reason: z.string().min(1, "Reason is required"),
  suspendUntil: z.string().optional(),
});

/* ---- Admin User Delete Input Schema ---- */
export const AdminUserDeleteInputSchema = z.object({
  reason: z.string().optional(),
  deleteData: z.boolean().optional(),
});
