"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMostPopularQuests } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

export function ContentPerformanceMostPopularQuests() {
  const { data, isLoading } = useMostPopularQuests({ pageSize: 5 });

  if (isLoading) {
    return (
      <Card className="rounded-2xl border-[#E2E8F0] shadow-none bg-white p-4">
        <Skeleton className="h-6 w-[180px] mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  const quests = data?.pages.flatMap((page) => page?.items || []) || [];

  if (quests.length === 0) {
    return (
      <Card className="rounded-2xl border-[#E2E8F0] shadow-none bg-white p-4">
        <h3 className="text-[16px] font-bold text-[#1E293B] mb-1">Most Popular Quests</h3>
        <div className="flex h-32 items-center justify-center text-[#64748B] text-sm font-medium">No items found</div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-[#E2E8F0] shadow-none bg-white py-0">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-[16px] font-bold text-[#1E293B]">Most Popular Quests</h3>

        {quests.map((quest) => {
          const dropOffPercentage = quest.dropOffPercentage || 0;
          const isHighDropOff = dropOffPercentage >= 20;
          const averageProgress = quest.averageProgress || 0;

          return (
            <div
              key={quest.questTypeId}
              className="flex flex-col gap-3 p-4 rounded-xl border border-[#E2E8F0] bg-[#FCFCFC]"
            >
              <div className="flex justify-between items-start gap-3">
                <div className="flex flex-col gap-1 min-w-0 flex-1">
                  <span className="text-[14px] font-bold text-[#1E293B] truncate">{quest.title}</span>
                  <span className="text-[12px] font-medium text-[#94A3B8]">
                    {quest.completions.toLocaleString()} {quest.completions === 1 ? "completion" : "completions"}
                  </span>
                </div>

                <div className={cn("px-2 py-1 rounded-md shrink-0", isHighDropOff ? "bg-[#FFE4E6]" : "bg-[#DCFCE7]")}>
                  <span className={cn("text-[10px] font-bold", isHighDropOff ? "text-[#E11D48]" : "text-[#166534]")}>
                    {dropOffPercentage}% drop-off
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between items-center">
                  <span className="text-[12px] font-semibold text-[#64748B]">Average Progress</span>
                  <span className="text-[12px] font-bold text-[#1E293B]">{averageProgress.toFixed(0)}%</span>
                </div>
                <div className="h-2 w-full bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#F472B6] rounded-full"
                    style={{ width: `${Math.min(100, Math.max(0, averageProgress))}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
