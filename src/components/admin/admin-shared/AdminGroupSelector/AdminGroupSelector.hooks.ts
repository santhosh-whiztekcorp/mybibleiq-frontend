"use client";

import * as React from "react";
import { useAdminGroupManagementList } from "@/resources/admin-group-management/admin-group-management.hooks";
import type { AdminGroupSelectorHookReturn } from "./AdminGroupSelector.types";
import { useDebounce } from "@/hooks/useDebounce";

export function useAdminGroupSelector(
  value: string[],
  onChange: (value: string[]) => void
): AdminGroupSelectorHookReturn {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAdminGroupManagementList({
    q: debouncedSearch || undefined,
    pageSize: 20,
  });

  const allGroups = data?.pages.flatMap((page) => page.items) || [];
  const selectedGroups = allGroups.filter((group) => value.includes(group.id));

  const handleToggleGroup = (groupId: string) => {
    const newValue = value.includes(groupId) ? value.filter((id) => id !== groupId) : [...value, groupId];
    onChange(newValue);
  };

  const handleRemoveGroup = (groupId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(value.filter((id) => id !== groupId));
  };

  return {
    searchValue,
    setSearchValue,
    allGroups,
    selectedGroups,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleToggleGroup,
    handleRemoveGroup,
  };
}
