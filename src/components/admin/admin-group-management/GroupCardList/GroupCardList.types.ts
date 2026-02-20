import type { AdminGroupListItem } from "@/resources/admin-group-management/admin-group-management.types";

export type GroupCardListProps = {
  items: AdminGroupListItem[];
  isLoading: boolean;
  onView: (id: string) => void;
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};

export type UseGroupCardListProps = Pick<GroupCardListProps, "onLoadMore" | "hasNextPage" | "isFetchingNextPage">;
