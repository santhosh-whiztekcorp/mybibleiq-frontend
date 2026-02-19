"use client";

import { Card } from "@/components/ui/card";
import { useFeedbackCategoryBreakdown } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { FEEDBACK_CATEGORY_LABELS } from "@/resources/admin-user-management";
import type { FeedbackCategoryBreakdownResponse } from "@/resources/admin-dashboard/admin-dashboard.types";

const FEEDBACK_CATEGORY_COLORS: Record<string, string> = {
  bug_report: "#EC4242",
  feature_request: "#EC4899",
  general: "#8B5CF6",
  other: "#FBBF24",
};

export function FeedbackSentimentsCategoryBreakdown() {
  const { data, isLoading } = useFeedbackCategoryBreakdown();

  if (isLoading) {
    return (
      <Card className="rounded-[16px] border-[#E2E8F0] shadow-none p-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-4 pt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between">
                  <Skeleton className="h-4 w-1/4" />
                  <Skeleton className="h-4 w-1/6" />
                </div>
                <Skeleton className="h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const categories = data?.categories || [];

  if (categories.length === 0) {
    return (
      <Card className="rounded-[16px] border-[#E2E8F0] shadow-none p-4">
        <h3 className="text-[16px] font-bold text-[#1E293B]">Category Breakdown</h3>
        <div className="flex h-32 items-center justify-center text-[#64748B] text-sm font-medium">No items found</div>
      </Card>
    );
  }

  const totalCount = categories.reduce(
    (sum: number, cat: FeedbackCategoryBreakdownResponse["categories"][number]) => sum + cat.count,
    0
  );

  return (
    <Card className="rounded-[16px] border-[#E2E8F0] shadow-none p-4">
      <div className="flex flex-col gap-4 text-left">
        <div>
          <h3 className="text-[16px] font-bold text-[#1E293B]">Category Breakdown</h3>
          <p className="text-[14px] font-medium text-[#64748B] mt-0.5">Detailed feedback counts</p>
        </div>

        <div className="flex flex-col gap-4 mt-2">
          {categories.map((item: FeedbackCategoryBreakdownResponse["categories"][number], index: number) => {
            const percentage = totalCount > 0 ? (item.count / totalCount) * 100 : 0;
            const color = FEEDBACK_CATEGORY_COLORS[item.category] || "#64748B";
            return (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="text-[14px] font-bold text-[#1E293B]">
                    {FEEDBACK_CATEGORY_LABELS[item.category] || item.label || item.category}
                  </span>
                  <span className="text-[14px] font-bold text-[#1E293B]">
                    {`${item.count.toLocaleString()} ${item.count === 1 ? "submission" : "submissions"}`}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-[#F1F5F9]">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
}
