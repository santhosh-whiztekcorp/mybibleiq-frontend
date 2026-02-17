import { AdminFlashcardSummary, FlashcardStatusAction } from "@/resources/admin-flashcard/admin-flashcard.types";

export type FlashcardStatusActionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminFlashcardSummary | null;
  action: FlashcardStatusAction | null;
  onConfirm: () => void;
  isLoading?: boolean;
};
