import type { AdminTagListInput, AdminTagFilterStore, CreateAdminTagInput } from "./admin-tag.types";

/* ---- Default Filter Values ---- */
export const defaultAdminTagFilters: Pick<AdminTagFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminTagListInput, "page" | "pageSize" | "sort"> = {
  categoryId: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
  sort: "-usageCount", // Most Popular
};

/* ---- Default Form Values ---- */
export const defaultCreateTagFormValues: Partial<CreateAdminTagInput> & { name: string } = {
  name: "",
  categoryId: undefined,
  description: undefined,
};
