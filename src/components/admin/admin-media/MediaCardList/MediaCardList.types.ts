import type { AdminMediaSummary } from "@/resources/admin-media";

export type MediaCardListProps = {
  items: AdminMediaSummary[];
  isLoading?: boolean;
  onEdit?: (item: AdminMediaSummary) => void;
  onDelete?: (item: AdminMediaSummary) => void;
  onPublish?: (item: AdminMediaSummary) => void;
  onArchive?: (item: AdminMediaSummary) => void;
  onClone?: (item: AdminMediaSummary) => void;
  onPreview?: (item: AdminMediaSummary) => void;
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};

export type UseMediaCardListProps = {
  onLoadMore?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage?: boolean;
};
