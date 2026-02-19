"use client";

import { useFeedbackSummary, useAdminDashboardStore } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { ADMIN_DASHBOARD_TIME_PERIOD_LABELS } from "@/resources/admin-dashboard";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export function FeedbackSentimentsSummary() {
  const { data, isLoading } = useFeedbackSummary();
  const timePeriod = useAdminDashboardStore((state) => state.timePeriod);

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 gap-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-full rounded-xl" />
        ))}
      </div>
    );
  }

  if (!data) return null;

  const { totalFeedback, averageRating, bugReportsCount, negativeFeedbackCount } = data;
  const timePeriodLabel = ADMIN_DASHBOARD_TIME_PERIOD_LABELS[timePeriod];

  const cards = [
    {
      title: "Total Feedback",
      value: totalFeedback.toLocaleString(),
      subtitle: timePeriodLabel,
      isNegative: false,
    },
    {
      title: "Average Rating",
      value: averageRating ? averageRating.toFixed(1) : "0",
      subtitle: "Out of 5 stars",
      isNegative: false,
    },
    {
      title: bugReportsCount === 1 ? "Bug Report" : "Bug Reports",
      value: bugReportsCount.toLocaleString(),
      subtitle: "Requires attention",
      isNegative: false,
    },
    {
      title: "Negative Feedback",
      value: negativeFeedbackCount.toLocaleString(),
      isNegative: true,
    },
  ];

  return (
    <div className="grid gap-3 grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card
          key={index}
          className={`shadow-none rounded-xl border py-0 ${
            card.isNegative ? "bg-[#FFF1F2] border-[#E11D48]" : "bg-[#EBF9FF] border-[#528CA7]"
          }`}
        >
          <CardContent className="p-4 flex flex-col gap-1.5 h-full">
            <span className="text-[12px] font-bold font-plus-jakarta-sans text-[#202020] tracking-wider">
              {card.title}
            </span>
            <div
              className={`font-bold ${
                card.isNegative ? "text-[#E11D48] mt-auto text-[24px]" : "text-black text-[20px]"
              }`}
            >
              {card.value}
            </div>
            {card.subtitle && (
              <span className={`text-[12px] font-medium ${card.isNegative ? "text-[#991B1B]" : "text-[#202020]"}`}>
                {card.subtitle}
              </span>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
