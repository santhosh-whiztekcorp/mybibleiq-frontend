import type { AdminBadgeSummary } from "@/resources/admin-badge";

export type BadgeCardListProps = {
  items: AdminBadgeSummary[];
  onEdit?: (item: AdminBadgeSummary) => void;
  onDelete?: (item: AdminBadgeSummary) => void;
  onPublish?: (item: AdminBadgeSummary) => void;
  onArchive?: (item: AdminBadgeSummary) => void;
  onClone?: (item: AdminBadgeSummary) => void;
};
