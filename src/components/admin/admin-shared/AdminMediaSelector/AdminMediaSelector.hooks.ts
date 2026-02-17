import * as React from "react";
import { useAdminMediaList, useAdminMediaDetail } from "@/resources/admin-media";
import { useDebounce } from "@/hooks/useDebounce";
import type { AdminMediaSummary, AdminMediaListInput } from "@/resources/admin-media/admin-media.types";

export const useAdminMediaSelector = (
  value: string | undefined,
  onChange: (value: string | undefined) => void,
  filters: Omit<AdminMediaListInput, "page" | "pageSize" | "sort"> = {}
) => {
  const [searchValue, setSearchValue] = React.useState("");
  const debouncedSearch = useDebounce(searchValue, 300);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useAdminMediaList({
    ...filters,
    q: debouncedSearch || undefined,
    pageSize: 20,
  });

  const { data: selectedMedia } = useAdminMediaDetail(value ?? "", !!value);

  const allMedia = React.useMemo(() => {
    return data?.pages.flatMap((page) => page.items) || [];
  }, [data]);

  const handleSelect = (item: AdminMediaSummary) => {
    onChange(item.id);
  };

  const handleClear = () => {
    onChange(undefined);
  };

  return {
    searchValue,
    setSearchValue,
    allMedia,
    selectedMedia,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleSelect,
    handleClear,
  };
};
