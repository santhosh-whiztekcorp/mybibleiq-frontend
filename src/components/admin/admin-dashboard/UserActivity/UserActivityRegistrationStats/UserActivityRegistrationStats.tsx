"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useRegistrationsAndGrowth, useAdminDashboardStore } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { ADMIN_DASHBOARD_TIME_PERIOD_LABELS } from "@/resources/admin-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { TrendingUp, TrendingDown } from "lucide-react";

export function UserActivityRegistrationStats() {
  const { data, isLoading } = useRegistrationsAndGrowth();
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <Skeleton className="h-[80px] w-full rounded-2xl" />
        <Skeleton className="h-[80px] w-full rounded-2xl" />
      </div>
    );
  }

  if (!data) return null;

  const { newRegistrations, growthRate, currentPeriodNewUsers } = data;

  return (
    <div className="flex flex-col gap-3">
      <Card className="bg-[#FFFDF2] border-[#FDE68A] border-[1.5px] rounded-2xl shadow-none py-0">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-bold text-[#0F172A]">
              {currentPeriodNewUsers === 1 ? "New User Registration" : "New User Registrations"}
            </span>
            <span className="text-xs font-medium text-[#713F12] mt-1">
              {ADMIN_DASHBOARD_TIME_PERIOD_LABELS[timePeriod]}
            </span>
          </div>
          <div className="text-2xl font-bold text-[#1E293B]">{currentPeriodNewUsers.toLocaleString()}</div>
        </CardContent>
      </Card>

      {growthRate !== null && (
        <Card className="bg-[#FFFDF2] border-[#FDE68A] border-[1.5px] rounded-2xl shadow-none py-0">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[#0F172A]">Growth Rate</span>
                <div className="flex items-center gap-1.5">
                  <span className={`text-sm font-bold ${growthRate >= 0 ? "text-[#15803D]" : "text-[#FF0000]"}`}>
                    {growthRate >= 0 ? "+" : ""}
                    {growthRate.toFixed(1)}%
                  </span>
                  {growthRate >= 0 ? (
                    <TrendingUp className="h-4 w-4 text-[#15803D]" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-[#FF0000]" />
                  )}
                </div>
              </div>
              <span className="text-xs font-medium text-[#713F12] mt-1">Period-over-period</span>
            </div>
            <div className="text-2xl font-bold text-[#1E293B]">{newRegistrations.toLocaleString()}</div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
