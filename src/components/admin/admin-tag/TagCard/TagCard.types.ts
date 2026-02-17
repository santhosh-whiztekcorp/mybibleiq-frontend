import { AdminTagSummary } from "@/resources/admin-tag";

export type TagCardProps = {
  item: AdminTagSummary;
  onEdit?: (tag: AdminTagSummary) => void;
  onDelete?: (tag: AdminTagSummary) => void;
};
