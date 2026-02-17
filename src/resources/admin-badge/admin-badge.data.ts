import type {
  CreateAdminBadgeInput,
  BadgeTriggerConfig,
  AdminBadgeFilterStore,
  AdminBadgeListInput,
} from "./admin-badge.types";

/* ---- Default Form Values ---- */
export const defaultCreateBadgeFormValues: CreateAdminBadgeInput = {
  name: "",
  description: "",
  iconMediaId: "",
  rarity: "Common",
  category: "Consistency",
  assignmentType: "Manual",
  tags: [],
  triggerConfig: undefined,
};

export const defaultTriggerConfig: BadgeTriggerConfig = {
  triggerType: "CountBased",
  metric: {
    type: "TotalQuizzes",
  },
  operator: "GreaterThanOrEqual",
  threshold: 1,
};

/* ---- Default Filter Values ---- */
export const defaultAdminBadgeFilters: Pick<AdminBadgeFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminBadgeListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  category: undefined,
  rarity: undefined,
  assignmentType: undefined,
  tags: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
