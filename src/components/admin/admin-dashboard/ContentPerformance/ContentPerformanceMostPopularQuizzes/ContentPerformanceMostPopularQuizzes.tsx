"use client";

import { Card, CardContent } from "@/components/ui/card";
import { useMostPopularQuizzes } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { StarIcon } from "@/assets";

export function ContentPerformanceMostPopularQuizzes() {
  const { data, isLoading } = useMostPopularQuizzes({ pageSize: 5 });

  if (isLoading) {
    return (
      <Card className="rounded-2xl border-[#E2E8F0] shadow-none bg-white p-4">
        <Skeleton className="h-6 w-[180px] mb-4" />
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-20 w-full rounded-xl" />
          ))}
        </div>
      </Card>
    );
  }

  const quizzes = data?.pages.flatMap((page) => page?.items || []) || [];

  if (quizzes.length === 0) {
    return (
      <Card className="rounded-2xl border-[#E2E8F0] shadow-none bg-white p-4">
        <h3 className="text-[16px] font-bold text-[#1E293B] mb-1">Most Popular Quizzes</h3>
        <div className="flex h-32 items-center justify-center text-[#64748B] text-sm font-medium">No items found</div>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl border-[#E2E8F0] shadow-none bg-white py-0">
      <CardContent className="p-4 space-y-3">
        <h3 className="text-[16px] font-bold text-[#1E293B]">Most Popular Quizzes</h3>

        {quizzes.map((quiz) => (
          <div
            key={quiz.quizTypeId}
            className="flex flex-col gap-1 p-4 rounded-xl border border-[#E2E8F0] bg-[#FCFCFC]"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[14px] font-bold text-[#1E293B] truncate">{quiz.title}</span>
              <div className="flex items-center gap-1 shrink-0">
                <StarIcon className="w-3.5 h-3.5 text-[#FBBF24] fill-[#FBBF24]" />
                <span className="text-[12px] font-medium text-[#64748B]">
                  {quiz.averageScore?.toFixed(0) || 0}% avg score
                </span>
              </div>
            </div>

            <span className="text-[12px] font-medium text-[#94A3B8]">
              {quiz.completions.toLocaleString()} {quiz.completions === 1 ? "completion" : "completions"}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
