"use client";

import * as React from "react";
import { useAdminUserManagementList } from "@/resources/admin-user-management/admin-user-management.hooks";
import type { AdminUserSelectorHookReturn } from "./AdminUserSelector.types";
import { useDebounce } from "@/hooks/useDebounce";

export function useAdminUserSelector(
  value: string[],
  onChange: (value: string[]) => void
): AdminUserSelectorHookReturn {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAdminUserManagementList({
    q: debouncedSearch || undefined,
    pageSize: 20,
  });

  const allUsers = data?.pages.flatMap((page) => page.items) || [];

  // In a real app, we might need to fetch the selected users if they are not in the current list
  // For simplicity and matching existing patterns, we'll filter from all loaded users
  // or just show the IDs if they are not found (though UX-wise it's better to have names)
  const selectedUsers = allUsers.filter((user) => value.includes(user.id));

  const handleToggleUser = (userId: string) => {
    const newValue = value.includes(userId) ? value.filter((id) => id !== userId) : [...value, userId];
    onChange(newValue);
  };

  const handleRemoveUser = (userId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((id) => id !== userId));
  };

  return {
    searchValue,
    setSearchValue,
    allUsers,
    selectedUsers,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleToggleUser,
    handleRemoveUser,
  };
}
