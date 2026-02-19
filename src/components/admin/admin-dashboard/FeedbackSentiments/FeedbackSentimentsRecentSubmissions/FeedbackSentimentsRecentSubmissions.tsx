"use client";

import { useRecentFeedback } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { Skeleton } from "@/components/ui/skeleton";
import { Star, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { FEEDBACK_CATEGORY_LABELS } from "@/resources/admin-dashboard";

const RatingStars = ({ rating }: { rating: number | null }) => {
  if (rating === null) return null;
  return (
    <div className="flex gap-1 mt-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} className={`h-4 w-4 ${star <= rating ? "text-[#FBBF24] fill-[#FBBF24]" : "text-[#E2E8F0]"}`} />
      ))}
    </div>
  );
};

export function FeedbackSentimentsRecentSubmissions() {
  const { data, isLoading } = useRecentFeedback({ pageSize: 5 });

  if (isLoading) {
    return (
      <Card className="rounded-[16px] border-[#E2E8F0] shadow-none p-4">
        <div className="flex flex-col gap-4">
          <Skeleton className="h-6 w-1/2" />
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-[120px] w-full rounded-[16px]" />
            ))}
          </div>
        </div>
      </Card>
    );
  }

  const submissions = data?.pages.flatMap((page) => page.items) || [];

  if (submissions.length === 0) {
    return (
      <Card className="rounded-[16px] border-[#E2E8F0] shadow-none p-4 text-center py-10 text-[#64748B] font-medium">
        No items found
      </Card>
    );
  }

  const getBadgeStyles = (category: string) => {
    switch (category) {
      case "bug_report":
        return "bg-[#FFF1F0] border-[#FFA39E] text-[#EC4242]";
      case "feature_request":
        return "bg-[#FFF1F2] border-[#FECDD3] text-[#EC4899]";
      case "general":
        return "bg-[#F5F3FF] border-[#DABBF1] text-[#8B5CF6]";
      case "other":
        return "bg-[#FFF9E6] border-[#FDE68A] text-[#FBBF24]";
      default:
        return "bg-[#F5F3FF] border-[#DABBF1] text-[#8B5CF6]";
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-[#E2E8F0] rounded-[16px] text-left">
      <div>
        <h3 className="text-[16px] font-bold text-[#1E293B]">
          Recent Feedback {data?.pages[0]?.total === 1 ? "Submission" : "Submissions"}
        </h3>
        <p className="text-[12px] font-medium text-[#64748B] mt-1">Latest user feedback with sentiment indicators</p>
      </div>

      <div className="flex flex-col gap-4">
        {submissions.map((item) => {
          const isBug = item.category === "bug_report";
          return (
            <Card
              key={item.feedbackId}
              className={`shadow-none rounded-[16px] border-[1px] p-4 flex flex-col gap-3 relative ${
                isBug ? "border-[#FECDD3]" : "border-[#E2E8F0]"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex flex-col">
                  <span className="font-bold text-[16px] text-[#1E293B] leading-tight">{item.userName}</span>
                  <span className="text-[12px] font-medium text-[#94A3B8] mt-1.5">
                    {format(new Date(item.date), "MMM d, yyyy - hh:mm a").replace("am", "AM").replace("pm", "PM")}
                  </span>
                  <RatingStars rating={item.rating} />
                </div>
                <div
                  className={`px-2 py-1 rounded-[8px] border text-[10px] font-bold ${getBadgeStyles(item.category)}`}
                >
                  {FEEDBACK_CATEGORY_LABELS[item.category] || item.categoryLabel}
                </div>
              </div>

              <div className="flex items-end gap-3 min-h-[40px]">
                <p className="text-[14px] font-medium text-[#475569] leading-[20px] flex-1">{item.message}</p>
                {isBug && (
                  <div className="pb-0.5">
                    <AlertTriangle className="h-6 w-6 text-[#EF4444]" />
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
