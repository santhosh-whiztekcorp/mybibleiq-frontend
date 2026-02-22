import type { GlobalUpdateSummary } from "@/resources/admin-global-updates";

export type GlobalUpdateCardListProps = {
  items: GlobalUpdateSummary[];
  isLoading: boolean;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDeliver?: (id: string) => void;
  onDelete?: (id: string) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
