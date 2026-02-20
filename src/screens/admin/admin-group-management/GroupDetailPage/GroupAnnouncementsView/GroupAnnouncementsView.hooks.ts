"use client";

import { useMemo, useState } from "react";
import {
  useAdminGroupManagementAnnouncements,
  useAdminGroupAnnouncementsFilterStore,
  useRejectGroupAnnouncement,
  useAdminGroupAnnouncementReports,
} from "@/resources/admin-group-management/admin-group-management.hooks";
import { useGroupDetailPage } from "../GroupDetailPage.hooks";
import type { UseGroupAnnouncementsViewReturn } from "./GroupAnnouncementsView.types";
import type { AdminGroupAnnouncement } from "@/resources/admin-group-management/admin-group-management.types";

export const useGroupAnnouncementsView = (): UseGroupAnnouncementsViewReturn => {
  const { groupId: rawGroupId } = useGroupDetailPage();
  const groupId = rawGroupId || "";

  const { page, pageSize, setFilters } = useAdminGroupAnnouncementsFilterStore();
  const [rejectId, setRejectId] = useState<string | null>(null);
  const [isReportsModalOpen, setIsReportsModalOpen] = useState(false);
  const [selectedAnnouncementForReports, setSelectedAnnouncementForReports] = useState<AdminGroupAnnouncement | null>(
    null
  );

  const { data, isLoading } = useAdminGroupManagementAnnouncements(groupId, {
    pageSize,
  });

  const {
    data: reportsData,
    isLoading: isReportsLoading,
    isFetchingNextPage: isReportsFetchingNextPage,
    hasNextPage: hasMoreReports,
    fetchNextPage: fetchNextReportsPage,
  } = useAdminGroupAnnouncementReports(groupId, selectedAnnouncementForReports?.id ?? "", { pageSize: 20 });

  const { mutate: rejectAnnouncement, isPending: isRejecting } = useRejectGroupAnnouncement();

  const announcements = useMemo(() => data?.pages.flatMap((page) => page.items) ?? [], [data?.pages]);
  const reports = useMemo(() => reportsData?.pages.flatMap((page) => page.items) ?? [], [reportsData?.pages]);
  const total = data?.pages[0]?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const handleReportsLoadMore = () => {
    if (hasMoreReports && !isReportsFetchingNextPage) {
      fetchNextReportsPage();
    }
  };

  const triggerViewReports = (announcement: AdminGroupAnnouncement) => {
    setSelectedAnnouncementForReports(announcement);
    setIsReportsModalOpen(true);
  };

  const handlePaginationChange = (pagination: { pageIndex: number; pageSize: number }) => {
    setFilters({ page: pagination.pageIndex + 1, pageSize: pagination.pageSize });
  };

  const triggerRejectAnnouncement = (id: string) => {
    setRejectId(id);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const confirmReject = (_message: string) => {
    if (rejectId) {
      // In the future, if the backend accepts a reason, we can pass `_message` to the payload.
      // Currently, we just log it or pass it.
      rejectAnnouncement(
        { groupId, announcementId: rejectId },
        {
          onSuccess: () => setRejectId(null),
        }
      );
    }
  };

  return {
    announcements,
    total,
    isLoading,
    pageCount,
    pagination: {
      pageIndex: page - 1,
      pageSize,
    },
    handlePaginationChange,
    triggerRejectAnnouncement,
    confirmReject,
    rejectId,
    setRejectId,
    isRejecting,
    isReportsModalOpen,
    setIsReportsModalOpen,
    triggerViewReports,
    selectedAnnouncementForReports,
    reports,
    isReportsLoading,
    isReportsFetchingNextPage,
    hasMoreReports: !!hasMoreReports,
    handleReportsLoadMore,
  };
};
