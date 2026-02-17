/* ---- Admin Routes ---- */
export const ADMIN_ROUTES = {
  SPIRIT_FOOD: "/spirit-food-manager",
  USER_MANAGER: "/user-manager",
  USER_MANAGER_DETAIL: (userId: string) => `/user-manager/user?userId=${userId}`,
  MEDIA_MANAGER: "/media-manager",
  QUEST_MANAGER: "/quest-manager",
  QUIZ_MANAGER: "/quiz-manager",
} as const;
