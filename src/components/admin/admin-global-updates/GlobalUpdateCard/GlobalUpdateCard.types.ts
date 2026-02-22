import type { GlobalUpdateSummary } from "@/resources/admin-global-updates";

export type GlobalUpdateCardProps = {
  item: GlobalUpdateSummary;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDeliver?: (id: string, name?: string) => void;
  onDelete?: (id: string, name?: string) => void;
};
