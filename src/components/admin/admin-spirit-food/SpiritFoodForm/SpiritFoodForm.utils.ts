import { format } from "date-fns";
import type { CreateAdminSpiritFoodInput } from "@/resources/admin-spirit-food";
import type { AdminSpiritFoodDetail } from "@/resources/admin-spirit-food";

export type SpiritFoodFormInput = Omit<CreateAdminSpiritFoodInput, "scheduledDate"> & {
  scheduledDate: Date | null;
};

export const mapSpiritFoodToForm = (spiritFood: AdminSpiritFoodDetail): SpiritFoodFormInput => {
  const scheduledDate = spiritFood.scheduledDate ? new Date(spiritFood.scheduledDate) : new Date();

  return {
    scheduledDate,
    verseReference: spiritFood.verseReference,
    bibleVersion: spiritFood.bibleVersion,
    verseText: spiritFood.concatenatedText || "",
    reflectionText: spiritFood.reflectionText || undefined,
  };
};

export const formatDateForSubmission = (date: Date | null): string => {
  if (!date) return "";
  return format(date, "yyyy-MM-dd");
};
