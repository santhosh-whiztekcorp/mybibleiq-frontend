import { AdminGroupReport } from "@/resources/admin-group-management/admin-group-management.types";
import { AdminGroupReportStatus } from "@/resources/admin-group-management/admin-group-management.types";

export type UseGroupReportsViewReturn = {
  reports: AdminGroupReport[];
  total: number;
  isLoading: boolean;
  isError: boolean;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  handleLoadMore: () => void;
  handlePaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  handleStatusChange: (value: string) => void;
  triggerDismissReport: (reportId: string) => void;
  triggerWarnLeader: (reportId: string, message: string) => void;
  status?: AdminGroupReportStatus;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
};
