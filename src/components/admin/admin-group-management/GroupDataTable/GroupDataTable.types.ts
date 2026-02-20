import type { AdminGroupListItem } from "@/resources/admin-group-management/admin-group-management.types";

export type GroupDataTableProps = {
  items: AdminGroupListItem[];
  isLoading?: boolean;
  total?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onView: (id: string) => void;
};
