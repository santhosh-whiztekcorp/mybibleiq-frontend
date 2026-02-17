import type { AdminFlashcardGroupSummary } from "@/resources/admin-flashcard-group/admin-flashcard-group.types";

export type FlashcardGroupDataTableProps = {
  items: AdminFlashcardGroupSummary[];
  isLoading?: boolean;
  total?: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onEdit?: (item: AdminFlashcardGroupSummary) => void;
  onDelete?: (item: AdminFlashcardGroupSummary) => void;
  onPublish?: (groupId: string) => void;
  onArchive?: (groupId: string) => void;
  onClone?: (item: AdminFlashcardGroupSummary) => void;
};
