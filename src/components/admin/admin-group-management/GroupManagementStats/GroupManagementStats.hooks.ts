import { useMemo } from "react";
import { Users, UserPlus, Activity, AlertTriangle } from "lucide-react";
import type { UseGroupManagementStatsProps } from "./GroupManagementStats.types";

export const useGroupManagementStats = ({ stats }: UseGroupManagementStatsProps) => {
  const items = useMemo(() => {
    if (!stats) return [];
    return [
      {
        label: "Total Groups",
        value: stats.totalGroups,
        subtext: `${stats.activeGroups} active`,
        icon: Users,
        className: "bg-[#EFF6FF] border-[#BFDBFE]", // Blue-50/Blue-200 equivalent
        iconColor: "text-[#2563EB]", // Blue-600
      },
      {
        label: "Total Members",
        value: stats.totalMembers,
        subtext: "Across all groups",
        icon: UserPlus,
        className: "bg-[#F8FAFC] border-[#E2E8F0]", // Slate-50/Slate-200
        iconColor: "text-[#64748B]", // Slate-500
      },
      {
        label: "Avg Activity Score",
        value: `${stats.avgActivityScore}%`,
        subtext: "Platform average",
        icon: Activity,
        className: "bg-[#F0FDF4] border-[#BBF7D0]", // Green-50/Green-200
        iconColor: "text-[#16A34A]", // Green-600
      },
      {
        label: "Suspended Group",
        value: stats.suspendedGroups,
        subtext: "Action required",
        icon: AlertTriangle,
        className: "bg-[#FEF2F2] border-[#FECACA]", // Red-50/Red-200
        iconColor: "text-[#DC2626]", // Red-600
      },
    ];
  }, [stats]);

  return { items };
};
