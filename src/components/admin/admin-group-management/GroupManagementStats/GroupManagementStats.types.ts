import type { AdminGroupStats } from "@/resources/admin-group-management/admin-group-management.types";

export type GroupManagementStatsProps = {
  stats: AdminGroupStats | null;
  isLoading: boolean;
};

export type UseGroupManagementStatsProps = {
  stats: AdminGroupStats | null;
};
