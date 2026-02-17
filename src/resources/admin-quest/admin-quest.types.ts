import { z } from "zod";
import {
  AdminQuestStatusEnum,
  QuestStatusActionEnum,
  AdminQuestListQuerySchema,
  AdminQuestStageListQuerySchema,
  CreateAdminQuestRequestSchema,
  UpdateAdminQuestRequestSchema,
  UpdateAdminQuestStatusSchema,
  CreateAdminQuestStageRequestSchema,
  UpdateAdminQuestStageRequestSchema,
  QuizDifficultyOverrideEnum,
} from "./admin-quest.schemas";
import { QUEST_THEME_KEYS } from "./admin-quest.constants.base";

/* ---- Enum Types ---- */
export type AdminQuestStatus = z.infer<typeof AdminQuestStatusEnum>;
export type QuestStatusAction = z.infer<typeof QuestStatusActionEnum>;
export type QuestTheme = (typeof QUEST_THEME_KEYS)[number];

/* ---- Stage Types ---- */
export type QuizDifficultyOverride = z.infer<typeof QuizDifficultyOverrideEnum>;

export type QuestionOverride = {
  questionId: string;
  difficultyOverride: QuizDifficultyOverride;
  pointsOverride: number;
};

// Response types (what backend returns)
export type QuizContentItem = {
  quizId: string;
  title: string;
  difficultyOverride: QuizDifficultyOverride;
  questionOverrides: QuestionOverride[];
  order: number;
};

export type MediaContentItem = {
  mediaId: string;
  title: string;
  order: number;
  points?: number;
};

export type FlashcardContentItem = {
  flashcardId: string;
  word: string;
  order: number;
  points?: number;
};

export type FlashcardGroupContentItem = {
  flashcardGroupId: string;
  name: string;
  order: number;
  points?: number;
};

// Request types (what we send to backend - includes points)
export type MediaContentItemRequest = {
  mediaId: string;
  order: number;
  points: number;
};

export type FlashcardContentItemRequest = {
  flashcardId: string;
  order: number;
  points: number;
};

export type FlashcardGroupContentItemRequest = {
  flashcardGroupId: string;
  order: number;
  points: number;
};

export type StageVerse = {
  verseText: string;
  verseReference: string;
  commentary: string;
  backgroundImageId?: string;
  backgroundMusicId?: string;
  startButtonText: string;
};

export type StageContent = {
  quiz?: QuizContentItem[];
  media?: MediaContentItem[];
  flashcards?: FlashcardContentItem[];
  flashcardGroups?: FlashcardGroupContentItem[];
};

export type StageSuccessCompletion = {
  passingPoints: number;
  mascotMessage: string;
  stageBadgeId?: string;
  reflectionPrompt: string;
  nextButtonText: string;
};

export type StageFailureCompletion = {
  failureMessage: string;
  mascotEncouragement: string;
  retryButtonText: string;
};

export type StageSummary = {
  id: string;
  order: number;
  title: string;
  description: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
};

export type StageDetail = {
  id: string;
  questId: string;
  order: number;
  title: string;
  description: string;
  tags: string[];
  verse: StageVerse;
  content: StageContent;
  successCompletion: StageSuccessCompletion;
  failureCompletion: StageFailureCompletion;
  createdAt: string;
  updatedAt: string;
};

/* ---- Quest Types ---- */
export type QuestWelcome = {
  title: string;
  description: string;
  backgroundImageId?: string;
  startQuestButtonText: string;
};

export type QuestIntroduction = {
  title: string;
  dialogue: string;
  backgroundImageId?: string;
  backgroundMusicId?: string;
  startStageButtonText: string;
};

export type QuestCompletion = {
  mascotMessage: string;
  completionBadgeId?: string;
  totalPoints: number;
};

export type AdminQuestSummary = {
  id: string;
  title: string;
  description: string;
  status: AdminQuestStatus;
  totalStages: number;
  tags: string[];
  publishAt?: string;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminQuestDetail = {
  id: string;
  title: string;
  description: string;
  tags?: string[];
  theme?: QuestTheme;
  welcome: QuestWelcome;
  introduction: QuestIntroduction;
  completion: QuestCompletion;
  status: AdminQuestStatus;
  publishAt?: string;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

/* ---- Response Types ---- */
export type AdminQuestStatusStatsResponse = {
  status: AdminQuestStatus;
  count: number;
}[];

export type AdminQuestListResponse = {
  items: AdminQuestSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminQuestResponse = AdminQuestDetail;
export type CreateAdminQuestResponse = AdminQuestDetail;
export type UpdateAdminQuestResponse = AdminQuestDetail;

export type UpdateAdminQuestStatusResponse = {
  status: AdminQuestStatus;
  id: string;
};

/* ---- Input Types ---- */
export type AdminQuestListInput = z.infer<typeof AdminQuestListQuerySchema>;
export type CreateAdminQuestInput = z.infer<typeof CreateAdminQuestRequestSchema>;
export type UpdateAdminQuestInput = z.infer<typeof UpdateAdminQuestRequestSchema>;
export type UpdateAdminQuestStatusInput = z.infer<typeof UpdateAdminQuestStatusSchema>;

/* ---- Stage Input Types ---- */
export type AdminQuestStageListInput = z.infer<typeof AdminQuestStageListQuerySchema>;
export type CreateAdminQuestStageInput = z.infer<typeof CreateAdminQuestStageRequestSchema>;
export type UpdateAdminQuestStageInput = z.infer<typeof UpdateAdminQuestStageRequestSchema>;

/* ---- Stage Response Types ---- */
export type AdminQuestStageListResponse = {
  items: StageSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type CreateAdminQuestStageResponse = StageDetail;
export type UpdateAdminQuestStageResponse = StageDetail;

/* ---- Filter Store Types ---- */
export type AdminQuestFilterActions = {
  setFilters: (filters: Partial<AdminQuestListInput>) => void;
  resetFilters: () => void;
};

export type AdminQuestFilterStore = Omit<AdminQuestListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminQuestListInput, "page" | "pageSize" | "sort">> &
  AdminQuestFilterActions;
