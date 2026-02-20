import type { AdminGroupMember, AdminGroupMemberRole } from "@/resources/admin-group-management";

export type MemberDetailSheetProps = {
  member: AdminGroupMember | null;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  onBan: (memberId: string) => void;
  onRemove: (memberId: string) => void;
  onChangeRole: (memberId: string, role: AdminGroupMemberRole) => void;
  isActionLoading: boolean;
};
