"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { pngIcons } from "@/assets";
import { useGetAdminUserManagementActivity, useAdminUserManagementBadges } from "@/resources/admin-user-management";
import { BADGE_RARITY_LABELS } from "@/resources/admin-user-management";

export function UserActivityTab({ userId }: { userId: string }) {
  const { data: activityData, isLoading, error } = useGetAdminUserManagementActivity(userId);
  const {
    data: badgesData,
    isLoading: isBadgesLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useAdminUserManagementBadges(userId, {
    pageSize: 20,
    sort: "-earnedAt",
  });

  const activity = activityData?.activity;
  const badges = badgesData?.pages.flatMap((p) => p?.items ?? []) ?? [];
  const totalBadges = badgesData?.pages[0]?.totalEarned ?? 0;

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
        Failed to load user activity
      </div>
    );
  }

  if (!activity) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        User activity not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Activity Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Activity Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
              <Image
                src={pngIcons.questMap}
                alt="Quests Completed"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <p className="text-2xl font-bold">{activity.questsCompleted.toLocaleString()}</p>
              <p className="text-xs font-medium text-[#656A73]">Quests Completed</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
              <Image
                src={pngIcons.bulbGlowning}
                alt="Quizzes Completed"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <p className="text-2xl font-bold">{activity.quizzesCompleted.toLocaleString()}</p>
              <p className="text-xs font-medium text-[#656A73]">Quizzes Completed</p>
            </div>
            <div className="flex flex-col items-center gap-2 rounded-lg border p-4">
              <Image
                src={pngIcons.swordDrill}
                alt="Sword Drill Played"
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <p className="text-2xl font-bold">{activity.swordDrillPlayed.toLocaleString()}</p>
              <p className="text-xs font-medium text-[#656A73]">Sword Drill Played</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badges Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-base">Badges Earned</CardTitle>
            {totalBadges > 0 && <span className="text-sm text-[#656A73]">{totalBadges} earned</span>}
          </div>
        </CardHeader>
        <CardContent>
          {isBadgesLoading ? (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-24 rounded-lg" />
              ))}
            </div>
          ) : badges.length === 0 ? (
            <p className="py-8 text-center text-sm text-[#656A73]">No badges earned yet</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {badges.map((badge) => {
                const rarityLabel = BADGE_RARITY_LABELS[badge.rarity];
                const badgeVariant = `rarity${badge.rarity}` as
                  | "rarityCommon"
                  | "rarityRare"
                  | "rarityEpic"
                  | "rarityLegendary"
                  | "raritySpecial";
                return (
                  <div key={badge.id} className="flex flex-col items-center gap-2 rounded-lg border p-4 text-center">
                    {badge.iconUrl ? (
                      <Image
                        src={badge.iconUrl}
                        alt={badge.name}
                        width={48}
                        height={48}
                        className="h-12 w-12 object-contain"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full bg-[#E2E8F0]" />
                    )}
                    <Badge variant={badgeVariant} size="sm">
                      {rarityLabel}
                    </Badge>
                    <p className="text-sm font-medium line-clamp-2">{badge.name}</p>
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
                Load more badges
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
