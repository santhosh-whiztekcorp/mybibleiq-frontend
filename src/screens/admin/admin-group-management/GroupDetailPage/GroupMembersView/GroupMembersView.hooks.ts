import { useState, useMemo, useCallback } from "react";
import { useGroupDetailPage } from "../GroupDetailPage.hooks";
import { useDebounce } from "@/hooks/useDebounce";
import {
  useAdminGroupManagementMembers,
  useBanAdminGroupMember,
  useRemoveAdminGroupMember,
  useChangeAdminGroupMemberRole,
  useAdminGroupMembersFilterStore,
} from "@/resources/admin-group-management";
import type { AdminGroupMember, AdminGroupMemberRole } from "@/resources/admin-group-management";
import type { UseGroupMembersViewReturn } from "./GroupMembersView.types";

export const useGroupMembersView = (): UseGroupMembersViewReturn => {
  const { groupId: rawGroupId } = useGroupDetailPage();
  const groupId = rawGroupId || "";

  const { page, pageSize, setFilters } = useAdminGroupMembersFilterStore();

  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const [selectedMember, setSelectedMember] = useState<AdminGroupMember | null>(null);
  const [isDetailSheetOpen, setIsDetailSheetOpen] = useState(false);

  // Queries
  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } = useAdminGroupManagementMembers(groupId, {
    pageSize,
    q: debouncedSearchQuery || undefined,
  });

  const members = useMemo(() => data?.pages.flatMap((page) => page.items) || [], [data]);
  const totalMembers = data?.pages[0]?.total || 0;

  // Mutations
  const { mutate: banMember, isPending: isBanning } = useBanAdminGroupMember();
  const { mutate: removeMember, isPending: isRemoving } = useRemoveAdminGroupMember();
  const { mutate: changeRole, isPending: isChangingRole } = useChangeAdminGroupMemberRole();

  const handlePaginationChange = (pagination: { pageIndex: number; pageSize: number }) => {
    setFilters({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    });
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  const triggerManageMember = useCallback((member: AdminGroupMember) => {
    setSelectedMember(member);
    setIsDetailSheetOpen(true);
  }, []);

  const triggerBanMember = useCallback(
    (memberId: string) => {
      banMember(
        { groupId, memberId },
        {
          onSuccess: () => {
            setIsDetailSheetOpen(false);
            setSelectedMember(null);
          },
        }
      );
    },
    [groupId, banMember]
  );

  const triggerRemoveMember = useCallback(
    (memberId: string) => {
      removeMember(
        { groupId, memberId },
        {
          onSuccess: () => {
            setIsDetailSheetOpen(false);
            setSelectedMember(null);
          },
        }
      );
    },
    [groupId, removeMember]
  );

  const triggerChangeRole = useCallback(
    (memberId: string, role: AdminGroupMemberRole) => {
      changeRole(
        { groupId, userId: memberId, input: { role } },
        {
          onSuccess: () => {
            // Update the selected member in state so the UI reflects the new role instantly
            setSelectedMember((prev) => (prev ? { ...prev, role } : null));
          },
        }
      );
    },
    [groupId, changeRole]
  );

  return {
    members,
    isLoading,
    totalMembers,
    searchQuery,
    handleSearchChange,
    selectedMember,
    isDetailSheetOpen,
    setIsDetailSheetOpen,
    triggerManageMember,
    triggerBanMember,
    triggerRemoveMember,
    triggerChangeRole,
    isActionLoading: isBanning || isRemoving || isChangingRole,
    isFetchingNextPage,
    hasNextPage,
    handleLoadMore: fetchNextPage,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    handlePaginationChange,
  };
};
