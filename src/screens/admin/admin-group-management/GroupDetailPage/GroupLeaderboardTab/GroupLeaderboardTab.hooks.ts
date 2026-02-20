"use client";

import { useSearchParams } from "next/navigation";
import {
  useAdminGroupManagementLeaderboard,
  useAdminGroupLeaderboardFilterStore,
} from "@/resources/admin-group-management/admin-group-management.hooks";
import type { AdminGroupLeaderboardPeriod } from "@/resources/admin-group-management/admin-group-management.constants";
import type { UseGroupLeaderboardTabReturn } from "./GroupLeaderboardTab.types";

export const useGroupLeaderboardTab = (): UseGroupLeaderboardTabReturn => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId") || "";
  const { page, pageSize, setFilters, period } = useAdminGroupLeaderboardFilterStore();

  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useAdminGroupManagementLeaderboard(groupId, {
      pageSize,
      period,
    });

  const leaderboard = data?.pages.flatMap((page) => page.items) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handlePaginationChange = (pagination: { pageIndex: number; pageSize: number }) => {
    setFilters({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    });
  };

  const handlePeriodChange = (value: string) => {
    setFilters({ period: value as AdminGroupLeaderboardPeriod, page: 1 });
  };

  return {
    leaderboard,
    total,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    handleLoadMore,
    handlePaginationChange,
    handlePeriodChange,
    period,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
  };
};
