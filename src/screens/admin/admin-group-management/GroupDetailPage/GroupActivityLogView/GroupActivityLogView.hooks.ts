import { useState, useMemo } from "react";
import { type PaginationState } from "@tanstack/react-table";
import {
  useAdminGroupManagementActivityLog,
  type AdminGroupActivityLogListInput,
  type AdminGroupActivityLogTimePeriod,
} from "@/resources/admin-group-management";
import { useGroupDetailPage } from "../GroupDetailPage.hooks";
import { startOfDay, endOfDay, subDays } from "date-fns";
import { type UseGroupActivityLogViewReturn } from "./GroupActivityLogView.types";

export const useGroupActivityLogView = (): UseGroupActivityLogViewReturn => {
  const { groupId } = useGroupDetailPage();
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });

  const [timeFilter, setTimeFilter] = useState<AdminGroupActivityLogTimePeriod>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const dateRange = useMemo(() => {
    const now = new Date();
    switch (timeFilter) {
      case "today":
        return { from: startOfDay(now), to: endOfDay(now) };
      case "last_7_days":
        return { from: startOfDay(subDays(now, 7)), to: endOfDay(now) };
      case "last_30_days":
        return { from: startOfDay(subDays(now, 30)), to: endOfDay(now) };
      default:
        return {};
    }
  }, [timeFilter]);

  const filters: Omit<AdminGroupActivityLogListInput, "page"> = useMemo(() => {
    return {
      pageSize: pagination.pageSize,
      type: typeFilter === "all" ? undefined : typeFilter,
      dateFrom: dateRange.from?.toISOString(),
      dateTo: dateRange.to?.toISOString(),
    };
  }, [pagination.pageSize, typeFilter, dateRange]);

  const { data, isLoading } = useAdminGroupManagementActivityLog(groupId, filters);

  const flatData = useMemo(() => {
    return data?.pages.flatMap((page) => page.items) ?? [];
  }, [data]);

  const total = data?.pages[0]?.total ?? 0;

  return {
    data: flatData,
    isLoading,
    total,
    pagination,
    setPagination,
    timeFilter,
    setTimeFilter,
    typeFilter,
    setTypeFilter,
  };
};
