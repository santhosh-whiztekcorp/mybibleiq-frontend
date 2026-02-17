import type { AdminUserListItem } from "@/resources/admin-user-management/admin-user-management.types";

export type UserCardProps = {
  item: AdminUserListItem;
  onView?: (item: AdminUserListItem) => void;
};
