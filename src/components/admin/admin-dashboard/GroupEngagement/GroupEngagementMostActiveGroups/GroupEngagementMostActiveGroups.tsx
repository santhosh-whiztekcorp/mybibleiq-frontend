"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useMostActiveGroups } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";

export function GroupEngagementMostActiveGroups() {
  const { data, isLoading } = useMostActiveGroups({ pageSize: 5 });
  const { open } = useSidebar();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Most Active Groups</CardTitle>
          <p className="text-sm text-muted-foreground">Highest activity and engagement metrics</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col gap-4 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-[150px]" />
                    <Skeleton className="h-4 w-[100px]" />
                  </div>
                  <Skeleton className="h-6 w-[100px]" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const groups = data?.pages.flatMap((page) => page?.items || []) || [];

  if (groups.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Most Active Groups</CardTitle>
          <p className="text-sm text-muted-foreground">Highest activity and engagement metrics</p>
        </CardHeader>
        <CardContent>
          <div className="flex h-32 items-center justify-center text-muted-foreground">No items found</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-[#E2E8F0] rounded-2xl shadow-none py-4">
      <CardHeader className="gap-0 px-4">
        <CardTitle className="text-[16px] font-bold text-[#111827]">Most Active Groups</CardTitle>
        <p className="text-[12px] font-medium text-[#6B7280]">Groups ranked by activity level and engagement metrics</p>
      </CardHeader>
      <CardContent className="px-4">
        <div
          className={cn(
            "grid grid-cols-1 gap-4",
            open ? "md:grid-cols-1 lg:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"
          )}
        >
          {groups.map((group) => (
            <div
              key={group.groupId}
              className="flex flex-col gap-3 p-4 border border-[#E2E8F0] rounded-2xl bg-white shadow-none"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col flex-1 min-w-0">
                  <h4 className="font-bold text-[16px] text-[#1E293B] truncate leading-tight">{group.groupName}</h4>
                  <span className="text-[12px] font-medium text-[#64748B] mt-0.5">
                    {group.memberCount.toLocaleString()} {group.memberCount === 1 ? "member" : "members"}
                  </span>
                </div>
                <div className="bg-[#818CF8] px-2 py-1 rounded-[8px] shrink-0">
                  <span className="text-[12px] font-bold text-white">Activity Score: {group.activityScore}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {/* Quiz Completions - Pink */}
                <div className="bg-[#FFF1F2] border border-[#FECDD3] px-4 py-3 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0F172A]">Quiz Completions</span>
                    <span className="text-[10px] font-medium text-[#64748B]">Total by group members</span>
                  </div>
                  <span className="text-[18px] font-bold text-black">{group.quizCompletions.toLocaleString()}</span>
                </div>

                {/* Quest Completions - Yellow */}
                <div className="bg-[#FFFBEB] border border-[#FEF3C7] px-4 py-3 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0F172A]">Quest Completions</span>
                    <span className="text-[10px] font-medium text-[#64748B]">Total by group members</span>
                  </div>
                  <span className="text-[18px] font-bold text-black">{group.questCompletions.toLocaleString()}</span>
                </div>

                {/* Assignment Participation - Blue */}
                <div className="bg-[#EFF6FF] border border-[#DBEAFE] px-4 py-3 rounded-xl flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[12px] font-bold text-[#0F172A]">Assignment Participation</span>
                    <span className="text-[10px] font-medium text-[#64748B]">Member completion rate</span>
                  </div>
                  <span className="text-[18px] font-bold text-black">
                    {group.assignmentParticipationRate.toLocaleString()}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
