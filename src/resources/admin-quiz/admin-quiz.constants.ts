import {
  AdminQuizStatusEnum,
  QuizDifficultyEnum,
  QuizRandomizationEnum,
  TimeLimitTypeEnum,
  QuestionKindEnum,
  QuestionDifficultyEnum,
  QuizStatusActionEnum,
} from "./admin-quiz.schemas";
import type {
  AdminQuizStatus,
  QuizDifficulty,
  QuizRandomization,
  TimeLimitType,
  QuestionKind,
  QuestionDifficulty,
  QuizStatusAction,
  AdminQuizListInput,
} from "./admin-quiz.types";

/* ---- Quiz Status Options ---- */
export const QUIZ_STATUS_OPTIONS = AdminQuizStatusEnum.options;
export const QUIZ_STATUS_LABELS: Record<AdminQuizStatus, string> = {
  Draft: "Draft",
  Scheduled: "Scheduled",
  Published: "Published",
  Archived: "Archived",
};

/* ---- Quiz Difficulty Options ---- */
export const QUIZ_DIFFICULTY_OPTIONS = QuizDifficultyEnum.options;
export const QUIZ_DIFFICULTY_LABELS: Record<QuizDifficulty, string> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

/* ---- Quiz Randomization Options ---- */
export const QUIZ_RANDOMIZATION_OPTIONS = QuizRandomizationEnum.options;
export const QUIZ_RANDOMIZATION_LABELS: Record<QuizRandomization, string> = {
  None: "None",
  ShuffleAll: "Shuffle All",
  RandomSubset: "Random Subset",
};

/* ---- Time Limit Type Options ---- */
export const TIME_LIMIT_TYPE_OPTIONS = TimeLimitTypeEnum.options;
export const TIME_LIMIT_TYPE_LABELS: Record<TimeLimitType, string> = {
  None: "None",
  TotalQuizTime: "Total Quiz Time",
  PerQuestion: "Per Question",
};

/* ---- Question Kind Options ---- */
export const QUESTION_KIND_OPTIONS = QuestionKindEnum.options;
export const QUESTION_KIND_LABELS: Record<QuestionKind, string> = {
  MCQ: "Multiple Choice",
  TRUE_FALSE: "True/False",
  MATCH: "Matching",
  FILL_BLANK: "Fill in the Blank",
  ONE_WORD: "One Word",
  ORDER: "Order",
};

/* ---- Question Difficulty Options ---- */
export const QUESTION_DIFFICULTY_OPTIONS = QuestionDifficultyEnum.options;
export const QUESTION_DIFFICULTY_LABELS: Record<QuestionDifficulty, string> = {
  EASY: "Easy",
  MEDIUM: "Medium",
  HARD: "Hard",
};

/* ---- Question Difficulty Points Range ---- */
export const QUESTION_DIFFICULTY_POINTS_RANGE: Record<QuestionDifficulty, { min: number; max: number }> = {
  EASY: { min: 5, max: 10 },
  MEDIUM: { min: 10, max: 15 },
  HARD: { min: 15, max: 20 },
};

/* ---- Quiz Status Actions ---- */
export const QUIZ_STATUS_ACTIONS = QuizStatusActionEnum.options;
export const QUIZ_STATUS_ACTION_LABELS: Record<QuizStatusAction, string> = {
  Schedule: "Schedule",
  Unschedule: "Unschedule",
  Publish: "Publish",
  Clone: "Clone",
  Archive: "Archive",
};

/* ---- Query Keys ---- */
export const adminQuizQueryKeys = {
  all: ["admin-quizzes"] as const,
  lists: () => [...adminQuizQueryKeys.all, "list"] as const,
  list: (filters: AdminQuizListInput) => [...adminQuizQueryKeys.lists(), filters] as const,
  details: () => [...adminQuizQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminQuizQueryKeys.details(), id] as const,
  stats: () => [...adminQuizQueryKeys.all, "stats"] as const,
};
