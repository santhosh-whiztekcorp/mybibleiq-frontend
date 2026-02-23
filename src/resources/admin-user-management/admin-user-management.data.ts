import type {
  AdminUserListInput,
  AdminUserFilterStore,
  AdminUserBadgesListInput,
  AdminUserBadgesFilterStore,
  AdminUserFeedbackListInput,
  AdminUserFeedbackFilterStore,
  AdminUserSavedVersesListInput,
  AdminUserSavedVersesFilterStore,
} from "./admin-user-management.types";

/* ---- Default Values ---- */
export const defaultAdminUserListInput: AdminUserListInput = {
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};

export const defaultAdminUserBadgesListInput: AdminUserBadgesListInput = {
  page: 1,
  pageSize: 20,
  sort: "-earnedAt",
};

export const defaultAdminUserFeedbackListInput: AdminUserFeedbackListInput = {
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};

export const defaultAdminUserSavedVersesListInput: AdminUserSavedVersesListInput = {
  page: 1,
  pageSize: 20,
  sort: "-savedAt",
};

/* ---- Default Filter Values ---- */
export const defaultAdminUserManagementFilters: Pick<AdminUserFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminUserListInput, "page" | "pageSize" | "sort"> = {
  q: undefined,
  status: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};

export const defaultAdminUserBadgesFilters: Pick<AdminUserBadgesFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminUserBadgesListInput, "page" | "pageSize" | "sort"> = {
  rarity: undefined,
  page: 1,
  pageSize: 20,
  sort: "-earnedAt",
};

export const defaultAdminUserFeedbackFilters: Pick<AdminUserFeedbackFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminUserFeedbackListInput, "page" | "pageSize" | "sort"> = {
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};

export const defaultAdminUserSavedVersesFilters: Pick<AdminUserSavedVersesFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminUserSavedVersesListInput, "page" | "pageSize" | "sort"> = {
  page: 1,
  pageSize: 20,
  sort: "-savedAt",
};
