import type {
  AdminGroupMember,
  AdminGroupMemberRole,
} from "@/resources/admin-group-management/admin-group-management.types";

export type UseGroupMembersViewReturn = {
  members: AdminGroupMember[];
  isLoading: boolean;
  totalMembers: number;
  searchQuery: string;
  handleSearchChange: (query: string) => void;
  selectedMember: AdminGroupMember | null;
  isDetailSheetOpen: boolean;
  setIsDetailSheetOpen: (isOpen: boolean) => void;
  triggerManageMember: (member: AdminGroupMember) => void;
  triggerBanMember: (memberId: string) => void;
  triggerRemoveMember: (memberId: string) => void;
  triggerChangeRole: (memberId: string, role: AdminGroupMemberRole) => void;
  isActionLoading: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
  handleLoadMore: () => void;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  handlePaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
};
