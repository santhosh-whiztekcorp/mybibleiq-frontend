import type { AdminUserListItem } from "@/resources/admin-user-management/admin-user-management.types";

export type UserDataTableProps = {
  items: AdminUserListItem[];
  isLoading?: boolean;
  total?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onView?: (item: AdminUserListItem) => void;
};
