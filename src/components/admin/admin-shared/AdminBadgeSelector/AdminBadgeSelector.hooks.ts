import * as React from "react";
import { useAdminBadgeList, useAdminBadgeDetail } from "@/resources/admin-badge";
import { useDebounce } from "@/hooks/useDebounce";
import type { AdminBadgeSummary, AdminBadgeListInput } from "@/resources/admin-badge/admin-badge.types";

export const useAdminBadgeSelector = (
  value: string | undefined,
  onChange: (value: string | undefined) => void,
  filters: Omit<AdminBadgeListInput, "page" | "pageSize" | "sort"> = {}
) => {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAdminBadgeList({
    ...filters,
    q: debouncedSearch || undefined,
    pageSize: 20,
    assignmentType: "Manual",
    status: "Published",
  });

  const { data: selectedBadge } = useAdminBadgeDetail(value ?? "", !!value);

  const allBadges = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  const handleSelect = (item: AdminBadgeSummary) => {
    onChange(item.id);
  };

  const handleClear = () => {
    onChange(undefined);
  };

  return {
    searchValue,
    setSearchValue,
    allBadges,
    selectedBadge,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleSelect,
    handleClear,
  };
};
