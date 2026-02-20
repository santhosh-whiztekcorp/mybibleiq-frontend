import { type PaginationState } from "@tanstack/react-table";
import { type AdminGroupActivityLogEntry } from "@/resources/admin-group-management";

export type ActivityLogDataTableProps = {
  data: AdminGroupActivityLogEntry[];
  isLoading: boolean;
  total: number;
  pagination: PaginationState;
  onPaginationChange: (pagination: PaginationState) => void;
};
