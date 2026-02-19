"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUsersByLocation } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Skeleton } from "@/components/ui/skeleton";

export function UserActivityUsersByLocation() {
  const { data, isLoading } = useUsersByLocation();

  if (isLoading) {
    return (
      <Card className="rounded-2xl border-[#E2E8F0] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-[#0F172A]">Users by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/3" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const locations = data?.locations || [];

  if (locations.length === 0) {
    return (
      <Card className="rounded-2xl border-[#E2E8F0] shadow-none">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-bold text-[#0F172A]">Users by Location</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-[#64748B] text-sm">No items found</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-[20px] border-[#E2E8F0] shadow-none p-4">
      <div className="flex flex-col gap-4">
        <h3 className="text-[16px] font-bold text-[#111827]">
          {data?.totalUsers === 1 ? "User by Location" : "Users by Location"}
        </h3>
        <div className="flex flex-col gap-4">
          {locations.map((item, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-[14px] font-bold text-[#111827]">{item.location}</span>
                <span className="text-[14px] font-bold text-[#111827]">
                  {`${item.userCount.toLocaleString()} ${item.userCount === 1 ? "user" : "users"} (${item.percentage.toFixed(1)}%)`}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                <div
                  className="h-full bg-[#C7D2FE] rounded-full transition-all duration-500"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
