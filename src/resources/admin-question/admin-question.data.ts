import type {
  CreateAdminQuestionInput,
  AdminQuestionFilterStore,
  AdminQuestionListInput,
} from "./admin-question.types";

/* ---- Default Form Values ---- */
export const defaultCreateQuestionFormValues: CreateAdminQuestionInput = {
  questionText: "",
  type: "MCQ",
  tags: [],
  shuffle: true,
  mcq: undefined,
  trueFalse: undefined,
  matching: undefined,
  fillBlank: undefined,
  oneWord: undefined,
  order: undefined,
};

/* ---- Default Filter Values ---- */
export const defaultAdminQuestionFilters: Pick<AdminQuestionFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminQuestionListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  type: undefined,
  tags: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
