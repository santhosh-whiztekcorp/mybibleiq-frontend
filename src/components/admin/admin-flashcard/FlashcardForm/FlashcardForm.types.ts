import type { AdminFlashcardSummary } from "@/resources/admin-flashcard/admin-flashcard.types";

export type FlashcardFormMode = "create" | "edit";

export type FlashcardFormProps = {
  mode: FlashcardFormMode;
  flashcard?: AdminFlashcardSummary;
  onClose?: () => void;
  onSuccess?: () => void;
};
