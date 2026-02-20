import { AdminGroupReport } from "@/resources/admin-group-management/admin-group-management.types";

export type ReportDataTableProps = {
  items: AdminGroupReport[];
  total?: number;
  isLoading?: boolean;
  pagination?: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void;
  onDismissReport?: (reportId: string) => void;
  onWarnLeader?: (reportId: string) => void;
};
