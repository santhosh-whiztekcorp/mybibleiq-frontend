import { AdminQuestionStatusEnum, QuestionTypeEnum, QuestionStatusActionEnum } from "./admin-question.schemas";
import type {
  AdminQuestionStatus,
  QuestionType,
  QuestionStatusAction,
  AdminQuestionListInput,
} from "./admin-question.types";

/* ---- Question Status Options ---- */
export const QUESTION_STATUS_OPTIONS = AdminQuestionStatusEnum.options;
export const QUESTION_STATUS_LABELS: Record<AdminQuestionStatus, string> = {
  Draft: "Draft",
  Published: "Published",
  Archived: "Archived",
};

/* ---- Question Type Options ---- */
export const QUESTION_TYPE_OPTIONS = QuestionTypeEnum.options;
export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
  MCQ: "Multiple Choice",
  TRUE_FALSE: "True/False",
  MATCH: "Matching",
  FILL_BLANK: "Fill in the Blank",
  ONE_WORD: "One Word",
  ORDER: "Order",
};

/* ---- Question Status Actions ---- */
export const QUESTION_STATUS_ACTIONS = QuestionStatusActionEnum.options;
export const QUESTION_STATUS_ACTION_LABELS: Record<QuestionStatusAction, string> = {
  Publish: "Publish",
  Clone: "Clone",
  Archive: "Archive",
};

/* ---- Query Keys ---- */
export const adminQuestionQueryKeys = {
  all: ["admin-questions"] as const,
  lists: () => [...adminQuestionQueryKeys.all, "list"] as const,
  list: (filters: AdminQuestionListInput) => [...adminQuestionQueryKeys.lists(), filters] as const,
  details: () => [...adminQuestionQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminQuestionQueryKeys.details(), id] as const,
  stats: () => [...adminQuestionQueryKeys.all, "stats"] as const,
  imports: () => [...adminQuestionQueryKeys.all, "import"] as const,
  importReport: (uploadId: string, format?: string) =>
    [...adminQuestionQueryKeys.imports(), "report", uploadId, format] as const,
};
