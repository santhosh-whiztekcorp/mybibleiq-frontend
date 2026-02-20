import type { AdminGroupAnnouncement } from "@/resources/admin-group-management/admin-group-management.types";

export type AnnouncementCardProps = {
  announcement: AdminGroupAnnouncement;
  onRejectAnnouncement?: (id: string) => void;
  onViewReports?: (announcement: AdminGroupAnnouncement) => void;
};
