import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDebounce } from "@/hooks/useDebounce";
import { ADMIN_ROUTES } from "@/constants/routes/admin.routes";
import {
  useAdminGroupManagementList,
  useAdminGroupManagementFilterStore,
  useGetAdminGroupManagementStats,
} from "@/resources/admin-group-management";
import type { AdminGroupListInput } from "@/resources/admin-group-management/admin-group-management.types";
import { type UseGroupManagerPageReturn } from "./GroupManagerPage.types";

export const useGroupManagerPage = (): UseGroupManagerPageReturn => {
  const router = useRouter();
  const { status, type, privacy, q, page, pageSize, sort, setFilters } = useAdminGroupManagementFilterStore();

  const debouncedQ = useDebounce(q ?? "", 500);

  const filters = useMemo(
    () => ({
      status,
      type,
      privacy,
      q: debouncedQ || undefined,
      pageSize,
      sort,
    }),
    [status, type, privacy, debouncedQ, pageSize, sort]
  );

  const {
    data: listData,
    isLoading: isListLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminGroupManagementList(filters);
  const { data: statsData, isLoading: isStatsLoading } = useGetAdminGroupManagementStats();

  const groups = useMemo(() => listData?.pages.flatMap((page) => page?.items ?? []) ?? [], [listData]);
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

  const handleTypeFilterChange = useCallback(
    (value: string | undefined) => {
      setFilters({ type: value || undefined });
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
    (value: AdminGroupListInput["sort"]) => {
      setFilters({ sort: value });
    },
    [setFilters]
  );

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleViewGroup = useCallback(
    (groupId: string) => {
      router.push(ADMIN_ROUTES.GROUP_MANAGER_DETAIL(groupId));
    },
    [router]
  );

  const sortOptions = useMemo(
    () => [
      { label: "Newest First", value: "-createdAt" as const },
      { label: "Oldest First", value: "createdAt" as const },
      { label: "Name (A-Z)", value: "name" as const },
      { label: "Name (Z-A)", value: "-name" as const },
      { label: "Most Active", value: "-activityScore" as const },
      { label: "Least Active", value: "activityScore" as const },
    ],
    []
  );

  return {
    groups,
    total,
    stats: statsData ?? null,
    isStatsLoading,
    filterStore: { status, type, privacy, q, page, pageSize, sort },
    isLoading: isListLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleSearchChange,
    handleStatusFilterChange,
    handleTypeFilterChange,
    handlePaginationChange,
    handleSortChange,
    sortOptions,
    handleLoadMore,
    handleViewGroup,
  };
};
