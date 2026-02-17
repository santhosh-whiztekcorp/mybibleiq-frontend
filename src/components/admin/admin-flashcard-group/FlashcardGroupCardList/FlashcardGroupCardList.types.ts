import { AdminFlashcardGroupSummary } from "@/resources/admin-flashcard-group/admin-flashcard-group.types";

export type FlashcardGroupCardListProps = {
  items: AdminFlashcardGroupSummary[];
  onEdit?: (item: AdminFlashcardGroupSummary) => void;
  onDelete?: (item: AdminFlashcardGroupSummary) => void;
  onPublish?: (groupId: string) => void;
  onArchive?: (groupId: string) => void;
  onClone?: (item: AdminFlashcardGroupSummary) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
