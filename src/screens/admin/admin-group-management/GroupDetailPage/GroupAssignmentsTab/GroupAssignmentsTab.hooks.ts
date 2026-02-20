import { useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import {
  useAdminGroupManagementAssignments,
  useAdminGroupAssignmentsFilterStore,
} from "@/resources/admin-group-management";
import type { AdminGroupAssignmentStatus } from "@/resources/admin-group-management/admin-group-management.types";
import type { UseGroupAssignmentsTabReturn } from "./GroupAssignmentsTab.types";

export const useGroupAssignmentsTab = (): UseGroupAssignmentsTabReturn => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId") || "";

  const { status, page, pageSize, setFilters } = useAdminGroupAssignmentsFilterStore();

  const filters = useMemo(
    () => ({
      status: status === "all" ? undefined : status,
      pageSize: pageSize || 10,
    }),
    [status, pageSize]
  );

  const {
    data: listData,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useAdminGroupManagementAssignments(groupId, filters);

  const assignments = useMemo(() => listData?.pages.flatMap((page) => page.items) || [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  const handleStatusChange = useCallback(
    (value: string) => {
      setFilters({ status: value as AdminGroupAssignmentStatus | "all", page: 1 });
    },
    [setFilters]
  );

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      setFilters({ page: pagination.pageIndex + 1, pageSize: pagination.pageSize });
    },
    [setFilters]
  );

  return {
    status: status as AdminGroupAssignmentStatus | "all",
    assignments,
    total,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleStatusChange,
    handlePaginationChange,
    pagination: {
      pageIndex: (page || 1) - 1,
      pageSize: pageSize || 10,
    },
  };
};
