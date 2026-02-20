import type { AdminGroupAnnouncement } from "@/resources/admin-group-management/admin-group-management.types";

export type AnnouncementDataTableProps = {
  data: AdminGroupAnnouncement[];
  isLoading: boolean;
  total: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (pagination: { pageIndex: number; pageSize: number }) => void;
  onRejectAnnouncement?: (id: string) => void;
  onViewReports?: (announcement: AdminGroupAnnouncement) => void;
};

export type UseAnnouncementDataTableColumnsProps = {
  onRejectAnnouncement?: (id: string) => void;
  onViewReports?: (announcement: AdminGroupAnnouncement) => void;
};
