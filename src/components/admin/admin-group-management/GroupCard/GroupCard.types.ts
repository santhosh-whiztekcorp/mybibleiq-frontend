import type { AdminGroupListItem } from "@/resources/admin-group-management/admin-group-management.types";

export type GroupCardProps = {
  item: AdminGroupListItem;
  onView: (id: string) => void;
};

export type UseGroupCardProps = GroupCardProps;
