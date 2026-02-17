import type { AdminUserStatsResponse } from "@/resources/admin-user-management/admin-user-management.types";

export type UserManagementStatsProps = {
  stats?: AdminUserStatsResponse;
  isLoading?: boolean;
};
