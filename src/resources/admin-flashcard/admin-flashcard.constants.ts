import { AdminFlashcardStatusEnum, FlashcardStatusActionEnum } from "./admin-flashcard.schemas";
import type { AdminFlashcardStatus, FlashcardStatusAction, AdminFlashcardListInput } from "./admin-flashcard.types";

/* ---- Flashcard Status Options ---- */
export const FLASHCARD_STATUS_OPTIONS = AdminFlashcardStatusEnum.options;
export const FLASHCARD_STATUS_LABELS: Record<AdminFlashcardStatus, string> = {
  Draft: "Draft",
  Published: "Published",
  Archived: "Archived",
};

/* ---- Flashcard Status Actions ---- */
export const FLASHCARD_STATUS_ACTIONS = FlashcardStatusActionEnum.options;
export const FLASHCARD_STATUS_ACTION_LABELS: Record<FlashcardStatusAction, string> = {
  Publish: "Publish",
  Archive: "Archive",
  Unarchive: "Unarchive",
  CloneFromPublished: "Clone from Published",
};

/* ---- Query Keys ---- */
export const adminFlashcardQueryKeys = {
  all: ["admin-flashcards"] as const,
  lists: () => [...adminFlashcardQueryKeys.all, "list"] as const,
  list: (filters: AdminFlashcardListInput) => [...adminFlashcardQueryKeys.lists(), filters] as const,
  details: () => [...adminFlashcardQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...adminFlashcardQueryKeys.details(), id] as const,
  stats: () => [...adminFlashcardQueryKeys.all, "stats"] as const,
  statsStatus: () => [...adminFlashcardQueryKeys.stats(), "status"] as const,
};
