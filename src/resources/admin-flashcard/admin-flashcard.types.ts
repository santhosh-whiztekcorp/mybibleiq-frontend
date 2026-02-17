import { z } from "zod";
import {
  AdminFlashcardStatusEnum,
  FlashcardStatusActionEnum,
  CreateAdminFlashcardRequestSchema,
  UpdateAdminFlashcardRequestSchema,
  UpdateAdminFlashcardStatusSchema,
} from "./admin-flashcard.schemas";

/* ---- Enum Types ---- */
export type AdminFlashcardStatus = z.infer<typeof AdminFlashcardStatusEnum>;
export type FlashcardStatusAction = z.infer<typeof FlashcardStatusActionEnum>;

/* ---- Flashcard Types ---- */
export type AdminFlashcardSummary = {
  id: string;
  word: string;
  definition: string;
  reference?: string;
  status: AdminFlashcardStatus;
  tags: string[];
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminFlashcardDetail = {
  id: string;
  word: string;
  definition: string;
  reference?: string;
  status: AdminFlashcardStatus;
  tags: string[];
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

/* ---- Response Types ---- */
export type AdminFlashcardStatusStatsResponse = {
  draft: number;
  published: number;
  archived: number;
};

export type AdminFlashcardListResponse = {
  items: AdminFlashcardSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminFlashcardResponse = AdminFlashcardDetail;
export type CreateAdminFlashcardResponse = AdminFlashcardDetail;
export type UpdateAdminFlashcardResponse = AdminFlashcardDetail;

export type UpdateAdminFlashcardStatusResponse =
  | { status: AdminFlashcardStatus }
  | { status: AdminFlashcardStatus; id: string };

/* ---- Input Types ---- */
export type AdminFlashcardListInput = {
  status?: AdminFlashcardStatus;
  tag?: string | string[];
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
};

export type CreateAdminFlashcardInput = z.infer<typeof CreateAdminFlashcardRequestSchema>;
export type UpdateAdminFlashcardInput = z.infer<typeof UpdateAdminFlashcardRequestSchema>;
export type UpdateAdminFlashcardStatusInput = z.infer<typeof UpdateAdminFlashcardStatusSchema>;

/* ---- Filter Store Types ---- */
export type AdminFlashcardFilterActions = {
  setFilters: (filters: Partial<AdminFlashcardListInput>) => void;
  resetFilters: () => void;
};

export type AdminFlashcardFilterStore = Omit<AdminFlashcardListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminFlashcardListInput, "page" | "pageSize" | "sort">> &
  AdminFlashcardFilterActions;
