"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useAdminUserManagementFeedback } from "@/resources/admin-user-management";
import { FEEDBACK_STATUS_LABELS, FEEDBACK_CATEGORY_LABELS } from "@/resources/admin-user-management";
import { formatDateString } from "@/utils/formatting/formatting";

type UserFeedbackTabProps = {
  userId: string;
};

export function UserFeedbackTab({ userId }: UserFeedbackTabProps) {
  const {
    data: feedbackData,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminUserManagementFeedback(userId, {
    pageSize: 20,
    sort: "-createdAt",
  });

  const feedback = feedbackData?.pages.flatMap((p) => p?.items ?? []) ?? [];
  const totalFeedback = feedbackData?.pages[0]?.total ?? 0;

  if (!userId) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        User ID not found
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Feedback Submission ({totalFeedback})</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className="h-24 rounded-lg" />
            ))}
          </div>
        ) : feedback.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-4xl font-bold text-[#656A73]">0</p>
            <p className="mt-2 text-sm text-[#656A73]">No feedback submission to display</p>
          </div>
        ) : (
          <div className="space-y-4">
            {feedback.map((item) => {
              const statusLabel = FEEDBACK_STATUS_LABELS[item.status];
              const categoryLabel = FEEDBACK_CATEGORY_LABELS[item.category] || item.category;
              const statusVariantMap: Record<
                string,
                "statusOpen" | "statusInProgress" | "statusResolved" | "statusClosed"
              > = {
                Open: "statusOpen",
                "In Progress": "statusInProgress",
                Resolved: "statusResolved",
                Closed: "statusClosed",
              };
              const categoryVariantMap: Record<
                string,
                "categoryBugReport" | "categoryFeatureRequest" | "categoryGeneralFeedback" | "categoryOther"
              > = {
                bug: "categoryBugReport",
                feature: "categoryFeatureRequest",
                general: "categoryGeneralFeedback",
                other: "categoryOther",
              };
              const statusVariant = statusVariantMap[statusLabel] ?? "statusOpen";
              const categoryVariant = categoryVariantMap[item.category] ?? "categoryOther";

              return (
                <div key={item.id} className="rounded-lg border p-4 space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <Badge variant={statusVariant} size="sm">
                      {statusLabel}
                    </Badge>
                    <Badge variant={categoryVariant} size="sm">
                      {categoryLabel}
                    </Badge>
                  </div>
                  <p className="text-sm">{item.message}</p>
                  <div className="text-xs text-[#656A73]">
                    Created: {formatDateString(item.createdAt)}
                    {item.updatedAt !== item.createdAt && <> · Updated: {formatDateString(item.updatedAt)}</>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
        {hasNextPage && !isFetchingNextPage && (
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => fetchNextPage()}
              className="text-sm font-medium text-primary hover:underline"
            >
              Load more feedback
            </button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
