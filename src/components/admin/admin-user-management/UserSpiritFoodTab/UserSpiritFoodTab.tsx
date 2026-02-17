"use client";

import React from "react";
import { Clock, MessageSquare, Mail, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useGetAdminUserManagementSpiritFood,
  useAdminUserManagementSavedVerses,
} from "@/resources/admin-user-management";
import { formatTimeString, formatDateString } from "@/utils/formatting/formatting";

type UserSpiritFoodTabProps = {
  userId: string;
};

export function UserSpiritFoodTab({ userId }: UserSpiritFoodTabProps) {
  const { data: spiritFoodData, isLoading, error } = useGetAdminUserManagementSpiritFood(userId);
  const {
    data: versesData,
    isLoading: isVersesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminUserManagementSavedVerses(userId, {
    pageSize: 20,
    sort: "-savedAt",
  });

  const spiritFood = spiritFoodData;
  const savedVerses = versesData?.pages.flatMap((p) => p?.items ?? []) ?? [];
  const totalSavedVerses = versesData?.pages[0]?.total ?? 0;

  if (!userId) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        User ID not found
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Failed to load spirit food information
      </div>
    );
  }

  if (!spiritFood) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Spirit food information not found
      </div>
    );
  }

  const { deliveryTime, deliveryPreferences } = spiritFood;

  return (
    <div className="space-y-6">
      {/* Delivery Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Delivery Preferences</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#656A73]" />
              <div className="flex flex-col">
                <span className="text-sm font-medium">Delivery Time</span>
                <span className="text-xs text-[#656A73]">Time when devotion is delivered</span>
              </div>
            </div>
            <span className="text-sm font-medium text-[#656A73]">{formatTimeString(deliveryTime)}</span>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#656A73]" />
              <span className="text-sm font-medium">SMS Notifications</span>
            </div>
            <span className={deliveryPreferences.smsNotifications ? "text-green-600 font-medium" : "text-[#656A73]"}>
              {deliveryPreferences.smsNotifications ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#656A73]" />
              <span className="text-sm font-medium">Email Devotion</span>
            </div>
            <span className={deliveryPreferences.emailDevotion ? "text-green-600 font-medium" : "text-[#656A73]"}>
              {deliveryPreferences.emailDevotion ? "Enabled" : "Disabled"}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#656A73]" />
              <span className="text-sm font-medium">Push Notifications</span>
            </div>
            <span className={deliveryPreferences.pushNotifications ? "text-green-600 font-medium" : "text-[#656A73]"}>
              {deliveryPreferences.pushNotifications ? "Enabled" : "Disabled"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Saved Verses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Saved Verses ({totalSavedVerses})</CardTitle>
        </CardHeader>
        <CardContent>
          {isVersesLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : savedVerses.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#656A73]">No saved verses yet</p>
          ) : (
            <div className="space-y-4">
              {savedVerses.map((verse) => (
                <div key={verse.id} className="rounded-lg border p-4 space-y-2">
                  <div className="flex justify-between items-start gap-2">
                    <span className="font-semibold text-primary">{verse.verseReference}</span>
                    <span className="text-xs text-[#656A73]">Saved: {formatDateString(verse.savedAt)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">&quot;{verse.verseText}&quot;</p>
                </div>
              ))}
            </div>
          )}
          {hasNextPage && !isFetchingNextPage && (
            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => fetchNextPage()}
                className="text-sm font-medium text-primary hover:underline"
              >
                Load more verses
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
