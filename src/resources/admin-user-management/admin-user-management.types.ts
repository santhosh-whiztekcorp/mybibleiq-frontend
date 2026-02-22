import z from "zod";
import {
  UserStatusEnum,
  BadgeRarityEnum,
  FeedbackStatusEnum,
  AdminUserListInputSchema,
  AdminUserBadgesListInputSchema,
  AdminUserFeedbackListInputSchema,
  AdminUserSavedVersesListInputSchema,
  AdminUserSuspendInputSchema,
  AdminUserDeleteInputSchema,
} from "./admin-user-management.schemas";

/* ---- Enum Types ---- */
export type UserStatus = z.infer<typeof UserStatusEnum>;
export type BadgeRarity = z.infer<typeof BadgeRarityEnum>;
export type FeedbackStatus = z.infer<typeof FeedbackStatusEnum>;

/* ---- Input Types ---- */
export type AdminUserListInput = z.infer<typeof AdminUserListInputSchema>;
export type AdminUserBadgesListInput = z.infer<typeof AdminUserBadgesListInputSchema>;
export type AdminUserFeedbackListInput = z.infer<typeof AdminUserFeedbackListInputSchema>;
export type AdminUserSavedVersesListInput = z.infer<typeof AdminUserSavedVersesListInputSchema>;
export type AdminUserSuspendInput = z.infer<typeof AdminUserSuspendInputSchema>;
export type AdminUserDeleteInput = z.infer<typeof AdminUserDeleteInputSchema>;

/* ---- Response Types ---- */
export type AdminUserProfile = {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string | null;
  status: UserStatus;
  joinedAt: string;
  lastActive: string;
  location?: string | null;
  email?: string | null;
  phone?: string | null;
};

export type AdminUserStats = {
  totalXp: number;
  globalRank: number;
  dayStreak: number;
};

export type AdminUserActivity = {
  questsCompleted: number;
  quizzesCompleted: number;
  swordDrillPlayed: number;
};

export type AdminUserSettings = {
  notifications: boolean;
  soundEffects: boolean;
  showEmail?: boolean;
  language?: string;
};

export type AdminUserSpiritFood = {
  savedVerses: number;
  deliveryTime: string;
  deliveryPreferences: {
    smsNotifications: boolean;
    emailDevotion: boolean;
    pushNotifications: boolean;
  };
};

export type AdminUserProfileResponse = {
  profile: AdminUserProfile;
  stats: AdminUserStats;
};

export type AdminUserActivityResponse = {
  activity: AdminUserActivity;
};

export type AdminUserSettingsResponse = AdminUserSettings;

export type AdminUserSpiritFoodResponse = AdminUserSpiritFood;

export type AdminUserBadge = {
  id: string;
  name: string;
  description: string;
  rarity: BadgeRarity;
  iconUrl: string;
  earnedAt: string;
};

export type AdminUserFeedback = {
  id: string;
  message: string;
  category: string;
  status: FeedbackStatus;
  createdAt: string;
  updatedAt: string;
};

export type AdminUserSavedVerse = {
  id: string;
  verseReference: string;
  verseText: string;
  savedAt: string;
};

/* ---- List Response Types ---- */
export type AdminUserListItem = {
  id: string;
  username: string;
  name: string;
  avatarUrl?: string | null;
  status: UserStatus;
  joinedAt: string;
  location?: string | null;
  email?: string | null;
};

export type AdminUserListResponse = {
  items: AdminUserListItem[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminUserStatsResponse = {
  totalUsers: number;
  activeUsers: number;
  suspendedUsers: number;
};

export type AdminUserBadgesListResponse = {
  items: AdminUserBadge[];
  totalEarned: number;
  page: number;
  pageSize: number;
};

export type AdminUserFeedbackListResponse = {
  items: AdminUserFeedback[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminUserSavedVersesListResponse = {
  items: AdminUserSavedVerse[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminUserSuspendResponse = {
  id: string;
  status: UserStatus;
  suspendedAt: string;
  suspendedBy: string;
  reason: string;
  suspendUntil?: string;
};

export type AdminUserActivateResponse = {
  id: string;
  status: UserStatus;
  activatedAt: string;
  activatedBy: string;
};

/* ---- Filter types ---- */
export type AdminUserFilterActions = {
  setFilters: (filters: Partial<AdminUserListInput>) => void;
  resetFilters: () => void;
};

export type AdminUserFilterStore = Omit<AdminUserListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminUserListInput, "page" | "pageSize" | "sort">> &
  AdminUserFilterActions;

export type AdminUserBadgesFilterActions = {
  setFilters: (filters: Partial<AdminUserBadgesListInput>) => void;
  resetFilters: () => void;
};

export type AdminUserBadgesFilterStore = Omit<AdminUserBadgesListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminUserBadgesListInput, "page" | "pageSize" | "sort">> &
  AdminUserBadgesFilterActions;

export type AdminUserFeedbackFilterActions = {
  setFilters: (filters: Partial<AdminUserFeedbackListInput>) => void;
  resetFilters: () => void;
};

export type AdminUserFeedbackFilterStore = Omit<AdminUserFeedbackListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminUserFeedbackListInput, "page" | "pageSize" | "sort">> &
  AdminUserFeedbackFilterActions;

export type AdminUserSavedVersesFilterActions = {
  setFilters: (filters: Partial<AdminUserSavedVersesListInput>) => void;
  resetFilters: () => void;
};

export type AdminUserSavedVersesFilterStore = Omit<AdminUserSavedVersesListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminUserSavedVersesListInput, "page" | "pageSize" | "sort">> &
  AdminUserSavedVersesFilterActions;
