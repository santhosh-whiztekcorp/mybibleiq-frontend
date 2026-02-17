import type { AdminFlashcardGroupSummary } from "@/resources/admin-flashcard-group/admin-flashcard-group.types";

export type FlashcardGroupFormMode = "create" | "edit";

export type FlashcardGroupFormProps = {
  mode: FlashcardGroupFormMode;
  group?: AdminFlashcardGroupSummary;
  onClose?: () => void;
  onSuccess?: () => void;
};
