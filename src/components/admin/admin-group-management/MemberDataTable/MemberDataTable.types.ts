import type { AdminGroupMember } from "@/resources/admin-group-management";

export type MemberDataTableProps = {
  data: AdminGroupMember[];
  isLoading: boolean;
  total: number;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onManage: (member: AdminGroupMember) => void;
};
