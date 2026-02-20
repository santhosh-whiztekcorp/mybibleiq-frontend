/* ---- Admin Routes ---- */
export const ADMIN_ROUTES = {
  DASHBOARD: "/dashboard",
  SPIRIT_FOOD: "/spirit-food-manager",
  USER_MANAGER: "/user-manager",
  USER_MANAGER_DETAIL: (userId: string) => `/user-manager/user?userId=${userId}`,
  MEDIA_MANAGER: "/media-manager",
  QUEST_MANAGER: "/quest-manager",
  QUIZ_MANAGER: "/quiz-manager",
  GROUP_MANAGER: "/group-manager",
  GROUP_MANAGER_DETAIL: (groupId: string, view?: string) =>
    `/group-manager/group?groupId=${groupId}${view ? "&view=" + view : ""}`,
} as const;
