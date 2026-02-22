import type { CreateGlobalUpdateInput, GlobalUpdateFilterStore } from "./admin-global-updates.types";

export const defaultGlobalUpdateFilters: Omit<GlobalUpdateFilterStore, "setFilters" | "resetFilters"> = {
  page: 1,
  pageSize: 20,
  search: "",
  type: undefined,
  status: undefined,
};

export const defaultCreateGlobalUpdateFormValues: CreateGlobalUpdateInput = {
  title: "",
  message: "",
  type: "Announcement",
  targetType: "AllUsers",
  targetGroupIds: [],
  targetUserIds: [],
  scheduledAt: null,
};
