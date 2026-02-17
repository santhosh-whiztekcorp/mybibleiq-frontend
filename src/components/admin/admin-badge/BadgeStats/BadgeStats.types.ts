import type { AdminBadgeStatusStatsResponse } from "@/resources/admin-badge";

export type BadgeStatsProps = {
  stats?: AdminBadgeStatusStatsResponse;
  isLoading: boolean;
};
