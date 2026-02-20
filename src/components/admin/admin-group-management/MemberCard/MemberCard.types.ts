import type { AdminGroupMember } from "@/resources/admin-group-management";

export type MemberCardProps = {
  member: AdminGroupMember;
  onManage: (member: AdminGroupMember) => void;
};
