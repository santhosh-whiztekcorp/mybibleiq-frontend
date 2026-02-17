import { AdminTagSummary } from "@/resources/admin-tag";

export type TagCardListProps = {
  items: AdminTagSummary[];
  onEdit?: (tag: AdminTagSummary) => void;
  onDelete?: (tag: AdminTagSummary) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
