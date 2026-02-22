import type { GlobalUpdateSummary } from "@/resources/admin-global-updates";

export type GlobalUpdateDataTableProps = {
  items: GlobalUpdateSummary[];
  isLoading: boolean;
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (page: number, pageSize: number) => void;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDeliver?: (id: string) => void;
  onDelete?: (id: string) => void;
};
