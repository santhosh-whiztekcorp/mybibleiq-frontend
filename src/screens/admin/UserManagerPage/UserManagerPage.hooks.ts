import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { ADMIN_ROUTES } from "@/constants/routes/admin.routes";
import {
  useAdminUserManagementFilterStore,
  useAdminUserManagementList,
  useGetAdminUserManagementStats,
} from "@/resources/admin-user-management";
import type { AdminUserListInput } from "@/resources/admin-user-management/admin-user-management.types";

export const useUserManagerPage = () => {
  const router = useRouter();
  const { status, q, page, pageSize, sort, setFilters } = useAdminUserManagementFilterStore();

  const debouncedQ = useDebounce(q ?? "", 500);

  const filters = useMemo(
    () => ({
      status,
      q: debouncedQ || undefined,
      pageSize,
      sort,
    }),
    [status, debouncedQ, pageSize, sort]
  );

  const {
    data: listData,
    isLoading: isListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminUserManagementList(filters);
  const { data: statusStats, isLoading: isStatusStatsLoading } = useGetAdminUserManagementStats();

  const users = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
  const total = useMemo(() => listData?.pages[0]?.total ?? 0, [listData]);

  // Handlers
  const handleSearchChange = useCallback(
    (value: string) => {
      setFilters({ q: value });
    },
    [setFilters]
  );

  const handleStatusFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ status: value || undefined });
    },
    [setFilters]
  );

  const handlePaginationChange = useCallback(
    (pagination: { pageIndex: number; pageSize: number }) => {
      setFilters({ page: pagination.pageIndex + 1, pageSize: pagination.pageSize });
    },
    [setFilters]
  );

  const handleSortChange = useCallback(
    (value: AdminUserListInput["sort"]) => {
      setFilters({ sort: value });
    },
    [setFilters]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleViewUser = useCallback(
    (userId: string) => {
      router.push(ADMIN_ROUTES.USER_MANAGER_DETAIL(userId));
    },
    [router]
  );

  const sortOptions = useMemo(
    () => [
      { label: "Newest First", value: "-createdAt" as const },
      { label: "Oldest First", value: "createdAt" as const },
      { label: "Name (A-Z)", value: "name" as const },
      { label: "Name (Z-A)", value: "-name" as const },
    ],
    []
  );

  return {
    users,
    total,
    statusStats,
    isStatusStatsLoading,
    filterStore: { status, q, page, pageSize, sort },
    isLoading: isListLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleSearchChange,
    handleStatusFilterChange,
    handlePaginationChange,
    handleSortChange,
    sortOptions,
    handleLoadMore,
    handleViewUser,
  };
};
