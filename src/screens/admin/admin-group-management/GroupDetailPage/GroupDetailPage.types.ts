import { type AdminGroupDetail } from "@/resources/admin-group-management/admin-group-management.types";

export type UseGroupDetailPageReturn = {
  groupId: string;
  view: string | null;
  group: AdminGroupDetail | undefined;
};
