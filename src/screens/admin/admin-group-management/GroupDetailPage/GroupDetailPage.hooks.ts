import { useSearchParams } from "next/navigation";
import { useGetAdminGroupManagementDetail } from "@/resources/admin-group-management/admin-group-management.hooks";
import { type UseGroupDetailPageReturn } from "./GroupDetailPage.types";

export const useGroupDetailPage = (): UseGroupDetailPageReturn => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId") || "";
  const view = searchParams.get("view");

  const { data: group } = useGetAdminGroupManagementDetail(groupId);

  return {
    groupId,
    view,
    group,
  };
};
