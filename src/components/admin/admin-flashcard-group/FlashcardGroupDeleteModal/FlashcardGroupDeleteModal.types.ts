import type { AdminFlashcardGroupSummary } from "@/resources/admin-flashcard-group/admin-flashcard-group.types";

export type FlashcardGroupDeleteModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminFlashcardGroupSummary | null;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
};
