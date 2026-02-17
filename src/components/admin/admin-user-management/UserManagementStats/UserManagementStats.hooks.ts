import { useMemo } from "react";
import type { AdminUserStatsResponse } from "@/resources/admin-user-management/admin-user-management.types";

export const useUserManagementStats = (stats?: AdminUserStatsResponse) => {
  const items = useMemo(() => {
    const defaultStats = [
      { label: "Active Users", value: 0, className: "bg-[#BEF7D3] border-[#3E995F]" },
      { label: "Suspended Users", value: 0, className: "bg-[#FEBEBE] border-[#DC8C8C]" },
      { label: "Total Users", value: 0, className: "bg-[#F4F4F4] border-[#D4D4D4]" },
    ];

    if (!stats) return defaultStats;

    return [
      { label: "Active Users", value: stats.activeUsers, className: "bg-[#BEF7D3] border-[#3E995F]" },
      { label: "Suspended Users", value: stats.suspendedUsers, className: "bg-[#FEBEBE] border-[#DC8C8C]" },
      { label: "Total Users", value: stats.totalUsers, className: "bg-[#F4F4F4] border-[#D4D4D4]" },
    ];
  }, [stats]);

  return { items };
};
