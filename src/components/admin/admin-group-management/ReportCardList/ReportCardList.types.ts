import { AdminGroupReport } from "@/resources/admin-group-management/admin-group-management.types";

export type ReportCardListProps = {
  items: AdminGroupReport[];
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
  isLoading: boolean;
  onDismissReport?: (reportId: string) => void;
  onWarnLeader?: (reportId: string) => void;
};

export type UseReportCardListProps = {
  onLoadMore: () => void;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
};
