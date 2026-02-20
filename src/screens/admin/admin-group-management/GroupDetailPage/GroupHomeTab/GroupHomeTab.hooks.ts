import { useRouter, useSearchParams } from "next/navigation";
import { ADMIN_ROUTES } from "@/constants/routes/admin.routes";
import { useGetAdminGroupManagementDetail } from "@/resources/admin-group-management";
import { Users, TrendingUp, Calendar, Flag, Activity, Settings, Shield, Megaphone } from "lucide-react";
import { formatDate } from "@/utils/formatting";
import type { UseGroupHomeTabReturn, GroupHomeStat, GroupHomeQuickAction } from "./GroupHomeTab.types";

export const useGroupHomeTab = (): UseGroupHomeTabReturn => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId") || "";

  const { data: group, isLoading, isError } = useGetAdminGroupManagementDetail(groupId);

  const navigateToView = (view: string) => {
    router.push(ADMIN_ROUTES.GROUP_MANAGER_DETAIL(groupId, view));
  };

  const stats: GroupHomeStat[] = group
    ? [
        { label: group.memberCount === 1 ? "Member" : "Members", value: group.memberCount || 0, icon: Users },
        { label: "Activity", value: `${group.activityScore || 0}%`, icon: TrendingUp },
        { label: "Created", value: formatDate(new Date(group.createdAt), "DD-MM-YYYY"), icon: Calendar },
      ]
    : [];

  const quickActions: GroupHomeQuickAction[] = [
    { id: "reports", label: "View\nReports", icon: Flag, color: "text-[#E7000B]", bg: "bg-[#FFE1E1]" },
    {
      id: "announcements",
      label: "Review\nAnnouncements",
      icon: Megaphone,
      color: "text-[#9810FA]",
      bg: "bg-[#F3E7FF]",
    },
    { id: "activity-log", label: "Activity\nlog", icon: Activity, color: "text-[#165DFC]", bg: "bg-[#DBE9FF]" },
    { id: "manage-members", label: "Manage\nMembers", icon: Users, color: "text-[#00A63E]", bg: "bg-[#DBFCE5]" },
    { id: "settings", label: "Group\nSettings", icon: Settings, color: "text-[#CF8700]", bg: "bg-[#FFF9C1]" },
    { id: "moderate", label: "Moderate\nGroup", icon: Shield, color: "text-[#F54800]", bg: "bg-[#FFECD4]" },
  ];

  return {
    group,
    isLoading,
    isError,
    stats,
    quickActions,
    navigateToView,
  };
};
