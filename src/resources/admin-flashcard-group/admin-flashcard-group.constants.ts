import { AdminFlashcardGroupStatusEnum, FlashcardGroupStatusActionEnum } from "./admin-flashcard-group.schemas";
import type {
  AdminFlashcardGroupStatus,
  FlashcardGroupStatusAction,
  AdminFlashcardGroupListInput,
} from "./admin-flashcard-group.types";

/* ---- Flashcard Group Status Options ---- */
export const FLASHCARD_GROUP_STATUS_OPTIONS = AdminFlashcardGroupStatusEnum.options;
export const FLASHCARD_GROUP_STATUS_LABELS: Record<AdminFlashcardGroupStatus, string> = {
  Draft: "Draft",
  Published: "Published",
  Archived: "Archived",
};

/* ---- Flashcard Group Status Actions ---- */
export const FLASHCARD_GROUP_STATUS_ACTIONS = FlashcardGroupStatusActionEnum.options;
export const FLASHCARD_GROUP_STATUS_ACTION_LABELS: Record<FlashcardGroupStatusAction, string> = {
  Publish: "Publish",
  Archive: "Archive",
  Unarchive: "Unarchive",
  CloneFromPublished: "Clone from Published",
};

/* ---- Query Keys ---- */
export const adminFlashcardGroupQueryKeys = {
  all: ["admin-flashcard-groups"] as const,
  lists: () => [...adminFlashcardGroupQueryKeys.all, "list"] as const,
  list: (filters: AdminFlashcardGroupListInput) => [...adminFlashcardGroupQueryKeys.lists(), filters] as const,
  details: () => [...adminFlashcardGroupQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminFlashcardGroupQueryKeys.details(), id] as const,
  stats: () => [...adminFlashcardGroupQueryKeys.all, "stats"] as const,
  statsStatus: () => [...adminFlashcardGroupQueryKeys.stats(), "status"] as const,
  statsTotal: () => [...adminFlashcardGroupQueryKeys.stats(), "total"] as const,
};
