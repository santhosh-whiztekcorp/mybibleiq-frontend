export type UseGroupAnnouncementsViewReturn = {
  announcements: AdminGroupAnnouncement[];
  total: number;
  isLoading: boolean;
  pageCount: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  handlePaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  triggerRejectAnnouncement: (id: string) => void;
  confirmReject: (message: string) => void;
  rejectId: string | null;
  setRejectId: (id: string | null) => void;
  isRejecting: boolean;
  isReportsModalOpen: boolean;
  setIsReportsModalOpen: (open: boolean) => void;
  triggerViewReports: (announcement: AdminGroupAnnouncement) => void;
  selectedAnnouncementForReports: AdminGroupAnnouncement | null;
  reports: AdminGroupAnnouncementReport[];
  isReportsLoading: boolean;
  isReportsFetchingNextPage: boolean;
  hasMoreReports: boolean;
  handleReportsLoadMore: () => void;
};

import type {
  AdminGroupAnnouncement,
  AdminGroupAnnouncementReport,
} from "@/resources/admin-group-management/admin-group-management.types";
