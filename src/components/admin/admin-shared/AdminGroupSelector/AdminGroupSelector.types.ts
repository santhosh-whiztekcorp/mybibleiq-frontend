import type { AdminGroupListItem } from "@/resources/admin-group-management/admin-group-management.types";

export type AdminGroupSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
};

export type AdminGroupSelectorHookReturn = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  allGroups: AdminGroupListItem[];
  selectedGroups: AdminGroupListItem[];
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleToggleGroup: (groupId: string) => void;
  handleRemoveGroup: (groupId: string, e: React.MouseEvent) => void;
};
