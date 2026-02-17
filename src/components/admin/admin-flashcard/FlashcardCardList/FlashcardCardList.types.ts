import { AdminFlashcardSummary } from "@/resources/admin-flashcard/admin-flashcard.types";

export type FlashcardCardListProps = {
  items: AdminFlashcardSummary[];
  onEdit?: (item: AdminFlashcardSummary) => void;
  onDelete?: (item: AdminFlashcardSummary) => void;
  onPublish?: (flashcardId: string) => void;
  onArchive?: (flashcardId: string) => void;
  onClone?: (item: AdminFlashcardSummary) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
