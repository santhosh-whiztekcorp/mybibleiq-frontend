import type { AdminGroupLeaderboardEntry } from "@/resources/admin-group-management/admin-group-management.types";

export type LeaderboardCardListProps = {
  items: AdminGroupLeaderboardEntry[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading?: boolean;
};

export type UseLeaderboardCardListProps = {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
