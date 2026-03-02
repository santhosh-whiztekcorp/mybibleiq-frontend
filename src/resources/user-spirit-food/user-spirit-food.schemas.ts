import { z } from "zod";

/* ---- Query Schemas ---- */
export const TodaysSpiritFoodQuerySchema = z.object({
  tz: z.string({ message: "Timezone is required" }).min(1, { message: "Timezone cannot be empty" }),
});

export const SavedVersesQuerySchema = z.object({
  cursor: z.string({ message: "Cursor must be a string" }).optional(),
  limit: z
    .number({ message: "Limit must be a number" })
    .int({ message: "Limit must be a whole number" })
    .min(1, { message: "Limit must be 1 or greater" })
    .max(50, { message: "Limit must be 50 or less" })
    .optional(),
});

export const RecentMessagesQuerySchema = z.object({
  limit: z
    .number({ message: "Limit must be a number" })
    .int({ message: "Limit must be a whole number" })
    .min(1, { message: "Limit must be 1 or greater" })
    .max(20, { message: "Limit must be 20 or less" })
    .optional(),
});

/* ---- Delivery Preferences Schemas ---- */
export const DeliveryChannelEnum = z.enum(["sms", "email", "inapp"], {
  message: "Delivery channel must be one of: SMS, Email, or In-App",
});

export const UpdateDeliveryPreferencesRequestSchema = z.object({
  deliveryMethods: z
    .array(DeliveryChannelEnum, { message: "Please provide delivery methods" })
    .min(1, { message: "At least one delivery method is required" }),
  deliveryTime: z.string({ message: "Delivery time is required" }).regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "Delivery time must be in HH:MM format (24-hour)",
  }),
  timezone: z.string({ message: "Timezone is required" }).min(1, { message: "Timezone cannot be empty" }),
  isEnabled: z.boolean({ message: "Please specify if delivery notifications are enabled" }),
});
