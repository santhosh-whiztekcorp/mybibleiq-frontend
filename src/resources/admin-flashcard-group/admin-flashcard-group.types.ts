import { z } from "zod";
import {
  AdminFlashcardGroupStatusEnum,
  FlashcardGroupStatusActionEnum,
  CreateAdminFlashcardGroupRequestSchema,
  UpdateAdminFlashcardGroupRequestSchema,
  UpdateAdminFlashcardGroupFlashcardsSchema,
  UpdateAdminFlashcardGroupStatusSchema,
} from "./admin-flashcard-group.schemas";
import type { AdminFlashcardStatus } from "../admin-flashcard/admin-flashcard.types";

/* ---- Enum Types ---- */
export type AdminFlashcardGroupStatus = z.infer<typeof AdminFlashcardGroupStatusEnum>;
export type FlashcardGroupStatusAction = z.infer<typeof FlashcardGroupStatusActionEnum>;

/* ---- Flashcard Group Types ---- */
export type AdminFlashcardGroupSummary = {
  id: string;
  name: string;
  description?: string;
  status: AdminFlashcardGroupStatus;
  tags: string[];
  flashcardCount: number;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminFlashcardGroupFlashcardItem = {
  flashcardId: string;
  order: number;
  flashcard?: {
    id: string;
    word: string;
    definition: string;
    reference?: string;
    status: AdminFlashcardStatus;
  };
};

export type AdminFlashcardGroupDetail = {
  id: string;
  name: string;
  description?: string;
  status: AdminFlashcardGroupStatus;
  tags: string[];
  flashcards: AdminFlashcardGroupFlashcardItem[];
  flashcardCount: number;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

/* ---- Response Types ---- */
export type AdminFlashcardGroupStatusStatsResponse = {
  draft: number;
  published: number;
  archived: number;
};

export type AdminFlashcardGroupTotalStatsResponse = {
  total: number;
};

export type AdminFlashcardGroupListResponse = {
  items: AdminFlashcardGroupSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminFlashcardGroupResponse = AdminFlashcardGroupDetail;
export type CreateAdminFlashcardGroupResponse = AdminFlashcardGroupDetail;
export type UpdateAdminFlashcardGroupResponse = AdminFlashcardGroupDetail;

export type AdminFlashcardGroupFlashcardItemResponse = {
  flashcardId: string;
  order: number;
  flashcard?: {
    id: string;
    word: string;
    definition: string;
    reference?: string;
    status: AdminFlashcardStatus;
  };
};

export type UpdateAdminFlashcardGroupFlashcardsResponse = {
  id: string;
  flashcards: AdminFlashcardGroupFlashcardItemResponse[];
  flashcardCount: number;
  updatedAt: string;
};

export type UpdateAdminFlashcardGroupStatusResponse =
  | { status: AdminFlashcardGroupStatus }
  | { status: AdminFlashcardGroupStatus; id: string };

/* ---- Input Types ---- */
export type AdminFlashcardGroupListInput = {
  status?: AdminFlashcardGroupStatus;
  tag?: string | string[];
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
};

export type CreateAdminFlashcardGroupInput = z.infer<typeof CreateAdminFlashcardGroupRequestSchema>;
export type UpdateAdminFlashcardGroupInput = z.infer<typeof UpdateAdminFlashcardGroupRequestSchema>;
export type UpdateAdminFlashcardGroupFlashcardsInput = z.infer<typeof UpdateAdminFlashcardGroupFlashcardsSchema>;
export type UpdateAdminFlashcardGroupStatusInput = z.infer<typeof UpdateAdminFlashcardGroupStatusSchema>;

/* ---- Filter Store Types ---- */
export type AdminFlashcardGroupFilterActions = {
  setFilters: (filters: Partial<AdminFlashcardGroupListInput>) => void;
  resetFilters: () => void;
};

export type AdminFlashcardGroupFilterStore = Omit<AdminFlashcardGroupListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminFlashcardGroupListInput, "page" | "pageSize" | "sort">> &
  AdminFlashcardGroupFilterActions;
