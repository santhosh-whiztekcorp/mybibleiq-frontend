import type { AdminGroupLeaderboardEntry } from "@/resources/admin-group-management/admin-group-management.types";
import type { AdminGroupLeaderboardPeriod } from "@/resources/admin-group-management/admin-group-management.constants";

export type UseGroupLeaderboardTabReturn = {
  leaderboard: AdminGroupLeaderboardEntry[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleLoadMore: () => void;
  handlePaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  handlePeriodChange: (value: string) => void;
  period?: AdminGroupLeaderboardPeriod;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
};
