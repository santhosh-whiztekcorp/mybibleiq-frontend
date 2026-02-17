import type { AdminFlashcardSummary } from "@/resources/admin-flashcard/admin-flashcard.types";

export type FlashcardDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminFlashcardSummary | null;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
};
