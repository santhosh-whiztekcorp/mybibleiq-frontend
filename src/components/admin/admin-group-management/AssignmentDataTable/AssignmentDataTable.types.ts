import type { AdminGroupAssignment } from "@/resources/admin-group-management/admin-group-management.types";

export type AssignmentDataTableProps = {
  items: AdminGroupAssignment[];
  isLoading?: boolean;
  total?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onView?: (id: string) => void;
};
