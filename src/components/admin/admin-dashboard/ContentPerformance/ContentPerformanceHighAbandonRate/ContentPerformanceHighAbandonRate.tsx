"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useHighAbandonRateQuests } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { QuizCircleCrossIcon } from "@/assets";

export function ContentPerformanceHighAbandonRate() {
  const { data, isLoading } = useHighAbandonRateQuests({ pageSize: 5 });

  if (isLoading) {
    return (
      <Card className="rounded-2xl border-[#FECDD3] shadow-none bg-[#FEF2F2] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-5 w-5 rounded-full" />
          <Skeleton className="h-6 w-[200px]" />
        </div>
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-xl bg-white/50" />
          ))}
        </div>
      </Card>
    );
  }

  const quests = data?.pages.flatMap((page) => page?.items || []) || [];

  if (quests.length === 0) {
    return (
      <Card className="rounded-2xl border-[#FECDD3] shadow-none bg-[#FEF2F2] p-4 text-center space-y-4">
        <div className="flex items-center gap-2">
          <QuizCircleCrossIcon className="w-5 h-5 text-[#991B1B]" />
          <h3 className="text-[16px] font-bold text-[#991B1B]">High Abandon Rate - Needs Attention</h3>
        </div>
        <div className="flex h-32 items-center justify-center text-[#64748B] text-sm font-medium">No items found</div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-[#FECDD3] shadow-none bg-[#FEF2F2] py-0">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center gap-2">
          <QuizCircleCrossIcon className="w-5 h-5 text-[#991B1B]" />
          <h3 className="text-[16px] font-bold text-[#991B1B]">High Abandon Rate - Needs Attention</h3>
        </div>

        <div className="space-y-3">
          {quests.map((quest) => (
            <div
              key={quest.questTypeId}
              className="flex items-center justify-between gap-3 p-4 rounded-xl border border-[#FECDD3] bg-white"
            >
              <span className="text-[14px] font-bold text-[#1E293B] truncate flex-1">{quest.title}</span>
              <div className="bg-[#E11D48] px-2 py-1 rounded-md shrink-0">
                <span className="text-[10px] font-bold text-white">
                  {quest.dropOffPercentage?.toFixed(0)}% drop-off
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#FECDD3] pt-3">
          <p className="text-[12px] font-medium text-[#991B1B] leading-relaxed">
            <span className="font-bold">Action Needed: </span>
            Review quest content and difficulty at common drop-off points.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
