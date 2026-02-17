import { AdminMediaSummary } from "@/resources/admin-media/admin-media.types";

export type MediaDataTableProps = {
  items: AdminMediaSummary[];
  isLoading?: boolean;
  total?: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  onEdit?: (item: AdminMediaSummary) => void;
  onDelete?: (item: AdminMediaSummary) => void;
  onPublish?: (item: AdminMediaSummary) => void;
  onArchive?: (item: AdminMediaSummary) => void;
  onClone?: (item: AdminMediaSummary) => void;
  onPreview?: (item: AdminMediaSummary) => void;
};
