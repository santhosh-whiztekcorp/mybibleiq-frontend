import { AdminGroupReport } from "@/resources/admin-group-management/admin-group-management.types";

export type ReportCardProps = {
  report: AdminGroupReport;
  onDismissReport?: (reportId: string) => void;
  onWarnLeader?: (reportId: string) => void;
};
