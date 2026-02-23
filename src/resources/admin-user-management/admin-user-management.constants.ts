import { UserStatusEnum, BadgeRarityEnum, FeedbackStatusEnum } from "./admin-user-management.schemas";
import type {
  UserStatus,
  BadgeRarity,
  FeedbackStatus,
  AdminUserListInput,
  AdminUserBadgesListInput,
  AdminUserFeedbackListInput,
  AdminUserSavedVersesListInput,
} from "./admin-user-management.types";

export type SelectOption = {
  label: string;
  value: string;
};

/* ---- User Status Options ---- */
export const USER_STATUS_OPTIONS = UserStatusEnum.options;
export const USER_STATUS_LABELS: Record<UserStatus, string> = {
  active: "Active",
  suspended: "Suspended",
};
export const USER_STATUS_SELECT_OPTIONS: SelectOption[] = [
  { label: "All", value: "" },
  ...USER_STATUS_OPTIONS.map((status) => ({
    label: USER_STATUS_LABELS[status],
    value: status,
  })),
];

/* ---- Badge Rarity Options ---- */
export const BADGE_RARITY_OPTIONS = BadgeRarityEnum.options;
export const BADGE_RARITY_LABELS: Record<BadgeRarity, string> = {
  Common: "Common",
  Rare: "Rare",
  Epic: "Epic",
  Legendary: "Legendary",
  Special: "Special",
};
export const BADGE_RARITY_SELECT_OPTIONS: SelectOption[] = [
  { label: "All", value: "" },
  ...BADGE_RARITY_OPTIONS.map((rarity) => ({
    label: BADGE_RARITY_LABELS[rarity],
    value: rarity,
  })),
];

/* ---- Feedback Status Options ---- */
export const FEEDBACK_STATUS_OPTIONS = FeedbackStatusEnum.options;
export const FEEDBACK_STATUS_LABELS: Record<FeedbackStatus, string> = {
  open: "Open",
  in_progress: "In Progress",
  resolved: "Resolved",
  closed: "Closed",
};
export const FEEDBACK_STATUS_SELECT_OPTIONS: SelectOption[] = [
  { label: "All", value: "" },
  ...FEEDBACK_STATUS_OPTIONS.map((status) => ({
    label: FEEDBACK_STATUS_LABELS[status],
    value: status,
  })),
];

/* ---- Feedback Category Labels ---- */
export const FEEDBACK_CATEGORY_LABELS: Record<string, string> = {
  bug_report: "Bug Report",
  feature_request: "Feature Request",
  general: "General Feedback",
  other: "Other",
};

/* ---- Query Keys ---- */
export const adminUserManagementQueryKeys = {
  all: ["admin-user-management"] as const,
  lists: () => [...adminUserManagementQueryKeys.all, "list"] as const,
  list: (input?: AdminUserListInput) => [...adminUserManagementQueryKeys.lists(), input] as const,
  stats: () => [...adminUserManagementQueryKeys.all, "stats"] as const,
  detail: (userId: string) => [...adminUserManagementQueryKeys.all, "detail", userId] as const,
  profile: (userId: string) => [...adminUserManagementQueryKeys.detail(userId), "profile"] as const,
  activity: (userId: string) => [...adminUserManagementQueryKeys.detail(userId), "activity"] as const,
  settings: (userId: string) => [...adminUserManagementQueryKeys.detail(userId), "settings"] as const,
  spiritFood: (userId: string) => [...adminUserManagementQueryKeys.detail(userId), "spirit-food"] as const,
  badges: (userId: string) => [...adminUserManagementQueryKeys.detail(userId), "badges"] as const,
  badgesList: (userId: string, params?: AdminUserBadgesListInput) =>
    [...adminUserManagementQueryKeys.badges(userId), params] as const,
  feedback: (userId: string) => [...adminUserManagementQueryKeys.detail(userId), "feedback"] as const,
  feedbackList: (userId: string, params?: AdminUserFeedbackListInput) =>
    [...adminUserManagementQueryKeys.feedback(userId), params] as const,
  savedVerses: (userId: string) => [...adminUserManagementQueryKeys.detail(userId), "saved-verses"] as const,
  savedVersesList: (userId: string, params?: AdminUserSavedVersesListInput) =>
    [...adminUserManagementQueryKeys.savedVerses(userId), params] as const,
};
