import type { GlobalUpdateStatsResponse } from "@/resources/admin-global-updates";

export type GlobalUpdateStatsProps = {
  stats: GlobalUpdateStatsResponse | undefined;
  isLoading: boolean;
};
