import type { AdminGroupAssignment } from "@/resources/admin-group-management/admin-group-management.types";

export type AssignmentCardListProps = {
  items: AdminGroupAssignment[];
  isLoading: boolean;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
