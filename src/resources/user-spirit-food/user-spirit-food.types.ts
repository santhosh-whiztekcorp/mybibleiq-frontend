import { z } from "zod";
import {
  TodaysSpiritFoodQuerySchema,
  SavedVersesQuerySchema,
  RecentMessagesQuerySchema,
  DeliveryChannelEnum,
  UpdateDeliveryPreferencesRequestSchema,
} from "./user-spirit-food.schemas";

/* ---- Enum Types ---- */
export type DeliveryChannel = z.infer<typeof DeliveryChannelEnum>;

/* ---- Verse Data Types ---- */
export type VerseData = {
  reference: string;
  text: string;
  version: string;
  reflectionText?: string;
  applicationText?: string;
};

/* ---- Response Types ---- */
export type TodaysSpiritFoodResponse = {
  id: string;
  scheduledDate: string;
  verseReference: string;
  bibleVersion: string;
  verseText: string;
  reflectionText?: string;
  applicationText?: string;
  isSaved: boolean;
  localDate: string;
  localTime: string;
};

export type SavedVerseResponse = {
  id: string;
  entryId: string;
  savedAt: string;
  verse: VerseData;
};

export type SavedVersesResponse = {
  items: SavedVerseResponse[];
  nextCursor: string | null;
  hasMore: boolean;
};

export type SpiritFoodDetailResponse = {
  id: string;
  scheduledDate: string;
  verseReference: string;
  bibleVersion: string;
  verseText: string;
  reflectionText?: string;
  applicationText?: string;
  isSaved: boolean;
  status: string;
};

export type RecentMessageResponse = {
  id: string;
  entryId: string;
  deliveredAt: string;
  verse: VerseData;
};

export type SaveVerseResponse = {
  id: string;
  entryId: string;
  savedAt: string;
};

export type DeliveryPreferencesResponse = {
  userId: string;
  deliveryMethods: DeliveryChannel[];
  deliveryTime: string;
  timezone: string | null;
  isEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

/* ---- Input Types ---- */
export type TodaysSpiritFoodInput = z.infer<typeof TodaysSpiritFoodQuerySchema>;
export type SavedVersesInput = z.infer<typeof SavedVersesQuerySchema>;
export type RecentMessagesInput = z.infer<typeof RecentMessagesQuerySchema>;
export type UpdateDeliveryPreferencesInput = z.infer<typeof UpdateDeliveryPreferencesRequestSchema>;
