import { AdminFlashcardSummary } from "@/resources/admin-flashcard/admin-flashcard.types";

export type FlashcardCardProps = {
  item: AdminFlashcardSummary;
  onEdit?: (item: AdminFlashcardSummary) => void;
  onDelete?: (item: AdminFlashcardSummary) => void;
  onPublish?: (flashcardId: string) => void;
  onArchive?: (flashcardId: string) => void;
  onClone?: (item: AdminFlashcardSummary) => void;
};
