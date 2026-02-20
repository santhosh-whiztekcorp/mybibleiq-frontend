import type { AdminGroupLeaderboardEntry } from "@/resources/admin-group-management/admin-group-management.types";

export type LeaderboardDataTableProps = {
  items: AdminGroupLeaderboardEntry[];
  isLoading?: boolean;
  total?: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
};
