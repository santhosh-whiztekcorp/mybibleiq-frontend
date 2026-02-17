import {
  AdminFlashcardGroupSummary,
  FlashcardGroupStatusAction,
} from "@/resources/admin-flashcard-group/admin-flashcard-group.types";

export type FlashcardGroupStatusActionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: AdminFlashcardGroupSummary | null;
  action: FlashcardGroupStatusAction | null;
  onConfirm: () => void;
  isLoading?: boolean;
};
