import { DeliveryChannelEnum } from "./user-spirit-food.schemas";
import type { DeliveryChannel } from "./user-spirit-food.types";

/* ---- Delivery Channel Options ---- */
export const DELIVERY_CHANNEL_OPTIONS = DeliveryChannelEnum.options;
export const DELIVERY_CHANNEL_LABELS: Record<DeliveryChannel, string> = {
  sms: "SMS",
  email: "Email",
  inapp: "In-App",
};

/* ---- Query Keys ---- */
export const userSpiritFoodQueryKeys = {
  all: ["user-spirit-food"] as const,
  todays: (tz: string) => [...userSpiritFoodQueryKeys.all, "today", tz] as const,
  saved: (cursor?: string, limit?: number) => [...userSpiritFoodQueryKeys.all, "saved", cursor, limit] as const,
  detail: (id: string) => [...userSpiritFoodQueryKeys.all, "detail", id] as const,
  recentMessages: (limit?: number) => [...userSpiritFoodQueryKeys.all, "recent-messages", limit] as const,
  deliveryPreferences: () => [...userSpiritFoodQueryKeys.all, "delivery-preferences"] as const,
};
