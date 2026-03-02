import { z } from "zod";
import { DeliveryChannelEnum } from "@/resources/user-spirit-food";

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
  reason: z.string().min(1, "Reason is required").min(10, "Reason must be at least 10 characters long"),
  suspendUntil: z.union([z.string(), z.date()]).optional(),
});

/* ---- Admin User Delete Input Schema ---- */
export const AdminUserDeleteInputSchema = z.object({
  reason: z.string().min(1, "Reason is required").min(10, "Reason must be at least 10 characters long"),
  deleteData: z.boolean().optional(),
});

/* ---- Admin User Settings Update Input Schema ---- */
export const AdminUserSettingsUpdateInputSchema = z.object({
  notifications: z.boolean().optional(),
  soundEffects: z.boolean().optional(),
});

/* ---- Admin User Spirit Food Update Input Schema ---- */
export const AdminUserSpiritFoodUpdateInputSchema = z.object({
  deliveryMethods: z.array(DeliveryChannelEnum).optional(),
  deliveryTime: z.string().optional(),
  timezone: z.string().optional(),
  isEnabled: z.boolean().optional(),
});
