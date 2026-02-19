import type { AdminBadgeSummary } from "@/resources/admin-badge";

export type BadgeDataTableProps = {
  items: AdminBadgeSummary[];
  isLoading?: boolean;
  total?: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onEdit?: (item: AdminBadgeSummary) => void;
  onDelete?: (item: AdminBadgeSummary) => void;
  onPublish?: (item: AdminBadgeSummary) => void;
  onArchive?: (item: AdminBadgeSummary) => void;
  onClone?: (item: AdminBadgeSummary) => void;
};
