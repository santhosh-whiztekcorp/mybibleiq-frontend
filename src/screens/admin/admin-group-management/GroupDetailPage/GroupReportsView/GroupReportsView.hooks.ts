"use client";

import { useSearchParams } from "next/navigation";
import {
  useAdminGroupManagementReports,
  useAdminGroupReportsFilterStore,
  useDismissGroupReport,
  useWarnGroupLeader,
} from "@/resources/admin-group-management/admin-group-management.hooks";
import type { AdminGroupReportStatus } from "@/resources/admin-group-management/admin-group-management.types";
import type { UseGroupReportsViewReturn } from "./GroupReportsView.types";

export const useGroupReportsView = (): UseGroupReportsViewReturn => {
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId") || "";
  const { page, pageSize, setFilters, status } = useAdminGroupReportsFilterStore();

  const { mutate: dismissReport } = useDismissGroupReport();

  const { data, isLoading, isError, hasNextPage, isFetchingNextPage, fetchNextPage } = useAdminGroupManagementReports(
    groupId,
    {
      pageSize,
      status,
    }
  );

  const reports = data?.pages.flatMap((page) => page.items) ?? [];
  const total = data?.pages[0]?.total ?? 0;

  const handleLoadMore = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const handlePaginationChange = (pagination: { pageIndex: number; pageSize: number }) => {
    setFilters({
      page: pagination.pageIndex + 1,
      pageSize: pagination.pageSize,
    });
  };

  const handleStatusChange = (value: string) => {
    setFilters({ status: value === "all" ? undefined : (value as AdminGroupReportStatus), page: 1 });
  };

  const { mutate: warnLeader } = useWarnGroupLeader();

  const triggerDismissReport = (reportId: string) => {
    dismissReport({ groupId, reportId });
  };

  const triggerWarnLeader = (reportId: string, message: string) => {
    warnLeader({
      groupId,
      input: {
        reportId,
        message,
        notificationType: "push",
      },
    });
  };

  return {
    reports,
    total,
    isLoading,
    isError,
    hasNextPage,
    isFetchingNextPage,
    handleLoadMore,
    handlePaginationChange,
    handleStatusChange,
    triggerDismissReport,
    triggerWarnLeader,
    status: status as AdminGroupReportStatus | undefined,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
  };
};
