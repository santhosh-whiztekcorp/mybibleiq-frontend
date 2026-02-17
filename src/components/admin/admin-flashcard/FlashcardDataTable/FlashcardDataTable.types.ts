import type { AdminFlashcardSummary } from "@/resources/admin-flashcard/admin-flashcard.types";

export type FlashcardDataTableProps = {
  items: AdminFlashcardSummary[];
  isLoading?: boolean;
  total?: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onEdit?: (item: AdminFlashcardSummary) => void;
  onDelete?: (item: AdminFlashcardSummary) => void;
  onPublish?: (flashcardId: string) => void;
  onArchive?: (flashcardId: string) => void;
  onClone?: (item: AdminFlashcardSummary) => void;
};
