import type { CreateAdminQuizInput, AdminQuizFilterStore, AdminQuizListInput } from "./admin-quiz.types";

/* ---- Default Form Values ---- */
export const defaultCreateQuizFormValues: CreateAdminQuizInput = {
  title: "",
  description: "",
  difficulty: "EASY",
  tags: [],
  timeLimitType: "None",
  timeLimitValue: undefined,
  randomization: "None",
  subsetCount: undefined,
  questions: [],
  isSwordDrillEnabled: false,
  swordDrillConfig: undefined,
};

/* ---- Default Filter Values ---- */
export const defaultAdminQuizFilters: Pick<AdminQuizFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminQuizListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  difficulty: undefined,
  tags: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
