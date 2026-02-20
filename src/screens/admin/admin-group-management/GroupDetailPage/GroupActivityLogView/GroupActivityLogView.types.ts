import { type PaginationState } from "@tanstack/react-table";
import {
  type AdminGroupActivityLogEntry,
  type AdminGroupActivityLogTimePeriod,
} from "@/resources/admin-group-management";

export type UseGroupActivityLogViewReturn = {
  data: AdminGroupActivityLogEntry[];
  isLoading: boolean;
  total: number;
  pagination: PaginationState;
  setPagination: (pagination: PaginationState) => void;
  timeFilter: AdminGroupActivityLogTimePeriod;
  setTimeFilter: (period: AdminGroupActivityLogTimePeriod) => void;
  typeFilter: string;
  setTypeFilter: (type: string) => void;
};
