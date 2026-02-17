import { AdminMediaSummary } from "@/resources/admin-media/admin-media.types";

export type MediaCardProps = {
  item: AdminMediaSummary;
  onEdit?: (item: AdminMediaSummary) => void;
  onDelete?: (item: AdminMediaSummary) => void;
  onPublish?: (item: AdminMediaSummary) => void;
  onArchive?: (item: AdminMediaSummary) => void;
  onClone?: (item: AdminMediaSummary) => void;
  onPreview?: (item: AdminMediaSummary) => void;
};
