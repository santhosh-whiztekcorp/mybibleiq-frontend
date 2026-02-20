import {
  type AdminGroupListItem,
  type AdminGroupListInput,
  type AdminGroupStats,
} from "@/resources/admin-group-management/admin-group-management.types";

export type UseGroupManagerPageReturn = {
  groups: AdminGroupListItem[];
  total: number;
  stats: AdminGroupStats | null;
  isStatsLoading: boolean;
  filterStore: {
    status: string | undefined;
    type: string | undefined;
    privacy: string | undefined;
    q: string | undefined;
    page: number | undefined;
    pageSize: number | undefined;
    sort: AdminGroupListInput["sort"];
  };
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleSearchChange: (value: string) => void;
  handleStatusFilterChange: (value: string | undefined) => void;
  handleTypeFilterChange: (value: string | undefined) => void;
  handlePaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  handleSortChange: (value: AdminGroupListInput["sort"]) => void;
  sortOptions: { label: string; value: string }[];
  handleLoadMore: () => void;
  handleViewGroup: (groupId: string) => void;
};
