import type { AdminBadgeSummary } from "@/resources/admin-badge";

export type BadgeCardProps = {
  item: AdminBadgeSummary;
  onEdit?: (item: AdminBadgeSummary) => void;
  onDelete?: (item: AdminBadgeSummary) => void;
  onPublish?: (badgeId: string) => void;
  onArchive?: (badgeId: string) => void;
  onClone?: (item: AdminBadgeSummary) => void;
};
