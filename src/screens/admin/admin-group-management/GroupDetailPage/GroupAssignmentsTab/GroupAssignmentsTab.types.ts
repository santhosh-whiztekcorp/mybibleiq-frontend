import type {
  AdminGroupAssignment,
  AdminGroupAssignmentStatus,
} from "@/resources/admin-group-management/admin-group-management.types";

export type UseGroupAssignmentsTabReturn = {
  status: AdminGroupAssignmentStatus | "all";
  assignments: AdminGroupAssignment[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleStatusChange: (value: string) => void;
  handlePaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
};
