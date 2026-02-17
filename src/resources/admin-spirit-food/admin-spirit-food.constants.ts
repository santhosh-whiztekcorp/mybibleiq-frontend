import { AdminSpiritFoodStatusEnum } from "./admin-spirit-food.schemas";
import type { AdminSpiritFoodStatus, AdminSpiritFoodListInput } from "./admin-spirit-food.types";

/* ---- Spirit Food Status Options ---- */
export const SPIRIT_FOOD_STATUS_OPTIONS = AdminSpiritFoodStatusEnum.options;
export const SPIRIT_FOOD_STATUS_LABELS: Record<AdminSpiritFoodStatus, string> = {
  InProgress: "In Progress",
  InReview: "In Review",
  Scheduled: "Scheduled",
  Delivered: "Delivered",
  PendingDelete: "Pending Delete",
  Deleted: "Deleted",
};

/* ---- Query Keys ---- */
export const adminSpiritFoodQueryKeys = {
  all: ["admin-spirit-food"] as const,
  lists: () => [...adminSpiritFoodQueryKeys.all, "list"] as const,
  list: (filters: AdminSpiritFoodListInput) => [...adminSpiritFoodQueryKeys.lists(), filters] as const,
  details: () => [...adminSpiritFoodQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminSpiritFoodQueryKeys.details(), id] as const,
  stats: () => [...adminSpiritFoodQueryKeys.all, "stats"] as const,
  imports: () => [...adminSpiritFoodQueryKeys.all, "import"] as const,
  importPreview: (uploadId: string) => [...adminSpiritFoodQueryKeys.imports(), "preview", uploadId] as const,
  importReport: (uploadId: string, format?: string) =>
    [...adminSpiritFoodQueryKeys.imports(), "report", uploadId, format] as const,
};

export const SAMPLE_SPIRIT_FOOD_CSV = `scheduledDate,verseReference,bibleVersion,verseText,reflectionText
2025-02-01,"John 3:16",NIV,"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.","This verse reminds us of God's incredible love and the gift of salvation through Jesus Christ."
2025-02-02,"Philippians 4:13",NIV,"I can do all this through him who gives me strength.","Through Christ, we have the strength to face any challenge."
2025-02-03,"Jeremiah 29:11",NIV,"For I know the plans I have for you, declares the Lord, plans to prosper you and not to harm you, plans to give you hope and a future.","God has a purpose for each of our lives, filled with hope and promise."`;
