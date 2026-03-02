import { useState, useCallback } from "react";
import { useDebounce } from "@/hooks/useDebounce";
import { useAdminRolesInfiniteList } from "@/resources/admin-role-management/admin-role-management.hooks";
import type { UseAdminUserRolesModalProps } from "./AdminUserRolesModal.types";

export const useAdminUserRolesModal = (props: UseAdminUserRolesModalProps) => {
  const { userRoles, onToggleRole } = props;

  const [searchValue, setSearchValue] = useState("");
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data, isLoading, isRefetching, isFetchingNextPage, hasNextPage, fetchNextPage } = useAdminRolesInfiniteList({
    search: debouncedSearch || undefined,
    isActive: true,
  });

  const allRoles = data?.pages.flatMap((page) => page?.items ?? []) ?? [];

  const handleLoadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const isRoleAssigned = (roleId: string) => userRoles.some((ur) => ur.roleId === roleId);

  const handleToggle = (roleId: string) => {
    const assigned = isRoleAssigned(roleId);
    onToggleRole(roleId, assigned);
  };

  return {
    isRoleAssigned,
    handleToggle,
    searchValue,
    setSearchValue,
    allRoles,
    isLoading,
    isRefetching,
    isFetchingNextPage,
    handleLoadMore,
  };
};
