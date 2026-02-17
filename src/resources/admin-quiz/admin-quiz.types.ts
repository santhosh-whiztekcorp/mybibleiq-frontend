import { z } from "zod";
import {
  AdminQuizStatusEnum,
  QuizDifficultyEnum,
  QuizRandomizationEnum,
  TimeLimitTypeEnum,
  QuestionKindEnum,
  QuestionDifficultyEnum,
  QuizStatusActionEnum,
  CreateAdminQuizRequestSchema,
  UpdateAdminQuizRequestSchema,
  UpdateAdminQuizStatusSchema,
} from "./admin-quiz.schemas";

/* ---- Enum Types ---- */
export type AdminQuizStatus = z.infer<typeof AdminQuizStatusEnum>;
export type QuizDifficulty = z.infer<typeof QuizDifficultyEnum>;
export type QuizRandomization = z.infer<typeof QuizRandomizationEnum>;
export type TimeLimitType = z.infer<typeof TimeLimitTypeEnum>;
export type QuestionKind = z.infer<typeof QuestionKindEnum>;
export type QuestionDifficulty = z.infer<typeof QuestionDifficultyEnum>;
export type QuizStatusAction = z.infer<typeof QuizStatusActionEnum>;

/* ---- Quiz Question Item Types ---- */
export type QuizQuestionItem = {
  questionId: string;
  questionText: string;
  type: QuestionKind;
  points: number;
  difficulty: QuestionDifficulty;
  order: number;
};

/* ---- Sword Drill Config Types ---- */
export type SwordDrillConfig = {
  timeLimitType: "TotalQuizTime" | "PerQuestion";
  timeLimitValue?: number;
  randomization: "ShuffleAll" | "RandomSubset";
  subsetCount?: number;
  allowSolo: boolean;
  allowMultiplayer: boolean;
  allowQuick: boolean;
  firstRankPoints?: number;
  secondRankPoints?: number;
  thirdRankPoints?: number;
  otherRankPoints?: number;
  pointsForWinner?: number;
  pointsForLoser?: number;
};

/* ---- Quiz Types ---- */
export type AdminQuizSummary = {
  id: string;
  title: string;
  description: string;
  status: AdminQuizStatus;
  difficulty: QuizDifficulty;
  totalQuestions: number;
  totalPoints: number;
  tags: string[];
  publishAt?: string;
  publishedAt?: string;
  isSwordDrillEnabled: boolean;
  createdAt: string;
  updatedAt: string;
};

export type AdminQuizDetail = {
  id: string;
  title: string;
  description: string;
  status: AdminQuizStatus;
  difficulty: QuizDifficulty;
  tags: string[];
  timeLimitType: TimeLimitType;
  timeLimitValue?: number;
  randomization: QuizRandomization;
  subsetCount?: number;
  totalQuestions: number;
  totalPoints: number;
  questions: QuizQuestionItem[];
  isSwordDrillEnabled: boolean;
  swordDrillConfig?: SwordDrillConfig;
  publishAt?: string;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

/* ---- Response Types ---- */
export type AdminQuizStatusStatsResponse = {
  status: AdminQuizStatus;
  count: number;
}[];

export type AdminQuizListResponse = {
  items: AdminQuizSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminQuizResponse = AdminQuizDetail;
export type CreateAdminQuizResponse = AdminQuizDetail;
export type UpdateAdminQuizResponse = AdminQuizDetail;

export type UpdateAdminQuizStatusResponse = {
  id: string;
  status: AdminQuizStatus;
  publishAt?: string;
};

/* ---- Input Types ---- */
export type AdminQuizListInput = {
  status?: AdminQuizStatus;
  difficulty?: QuizDifficulty;
  tags?: string[];
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
};

export type CreateAdminQuizInput = z.infer<typeof CreateAdminQuizRequestSchema>;
export type UpdateAdminQuizInput = z.infer<typeof UpdateAdminQuizRequestSchema>;
export type UpdateAdminQuizStatusInput = z.infer<typeof UpdateAdminQuizStatusSchema>;

/* ---- Filter Store Types ---- */
export type AdminQuizFilterActions = {
  setFilters: (filters: Partial<AdminQuizListInput>) => void;
  resetFilters: () => void;
};

export type AdminQuizFilterStore = Omit<AdminQuizListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminQuizListInput, "page" | "pageSize" | "sort">> &
  AdminQuizFilterActions;
