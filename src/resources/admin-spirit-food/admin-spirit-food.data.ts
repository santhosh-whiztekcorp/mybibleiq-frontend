import type {
  CreateAdminSpiritFoodInput,
  AdminSpiritFoodFilterStore,
  AdminSpiritFoodListInput,
} from "./admin-spirit-food.types";

/* ---- Default Form Values ---- */
export const defaultCreateSpiritFoodFormValues: CreateAdminSpiritFoodInput = {
  scheduledDate: "",
  verseReference: "",
  bibleVersion: "",
  verseText: "",
  reflectionText: undefined,
};

/* ---- Default Filter Values ---- */
export const defaultAdminSpiritFoodFilters: Pick<AdminSpiritFoodFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminSpiritFoodListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  q: undefined,
  scheduledFrom: undefined,
  scheduledTo: undefined,
  scheduledOnly: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
