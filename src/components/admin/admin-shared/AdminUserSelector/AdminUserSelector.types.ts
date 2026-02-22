import type { AdminUserListItem } from "@/resources/admin-user-management/admin-user-management.types";

export type AdminUserSelectorProps = {
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  error?: string;
  label?: string;
  disabled?: boolean;
};

export type AdminUserSelectorHookReturn = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  allUsers: AdminUserListItem[];
  selectedUsers: AdminUserListItem[];
  isLoading: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  fetchNextPage: () => void;
  handleToggleUser: (userId: string) => void;
  handleRemoveUser: (userId: string, e: React.MouseEvent) => void;
};
