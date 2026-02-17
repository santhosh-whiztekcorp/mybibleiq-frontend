import type { AdminUserListItem } from "@/resources/admin-user-management/admin-user-management.types";

export type UserCardListProps = {
  items: AdminUserListItem[];
  isLoading?: boolean;
  onView?: (item: AdminUserListItem) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
