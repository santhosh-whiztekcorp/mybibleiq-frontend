import type { AdminTagSummary } from "@/resources/admin-tag";

export type TagDataTableProps = {
  items: AdminTagSummary[];
  isLoading?: boolean;
  total?: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
  onEdit?: (item: AdminTagSummary) => void;
  onDelete?: (item: AdminTagSummary) => void;
};
