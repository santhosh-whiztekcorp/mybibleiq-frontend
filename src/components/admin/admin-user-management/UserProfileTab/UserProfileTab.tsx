"use client";

import { Trophy, Globe, Flame, Ban, Trash2, CheckCircle } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminUserActionModal, AdminConfirmationModal } from "@/components/admin/admin-shared";
import { formatDateString, formatTimeAgo } from "@/utils/formatting/formatting";
import { USER_STATUS_LABELS } from "@/resources/admin-user-management";
import { useUserProfileTab } from "./UserProfileTab.hooks";
import { useAuthStore } from "@/resources/auth/auth.hooks";

type UserProfileTabProps = {
  userId: string;
};

export function UserProfileTab({ userId }: UserProfileTabProps) {
  const { user } = useAuthStore();
  const {
    profile,
    stats,
    isLoading,
    error,
    isActionModalOpen,
    modalAction,
    isConfirmationModalOpen,
    confirmationAction,
    showSuspendModal,
    showActivateConfirmation,
    showDeleteModal,
    handleConfirmAction,
    handleConfirmActivation,
    handleActionModalOpenChange,
    handleConfirmationModalOpenChange,
    isSuspending,
    isActivating,
    isDeleting,
  } = useUserProfileTab(userId);

  // Check if viewing own profile
  const isCurrentUser = user?.id === userId;

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
        <Skeleton className="h-24 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-24 w-full rounded-lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Failed to load user profile
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        User profile not found
      </div>
    );
  }

  const statusVariant = profile.status === "active" ? "statusActive" : "statusSuspended";

  return (
    <div className="flex flex-col gap-5">
      {/* Profile Section */}
      <Card>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            {profile.avatarUrl ? (
              <Image
                src={profile.avatarUrl}
                alt={profile.name}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#E2E8F0]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#E2E8F0] flex items-center justify-center border-2 border-[#E2E8F0]">
                <span className="text-xl font-bold text-[#656A73]">
                  {profile.name
                    .split(" ")
                    .map((n) => n.charAt(0))
                    .join("")
                    .toUpperCase()
                    .slice(0, 2)}
                </span>
              </div>
            )}
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-black">{profile.name}</h2>
                <Badge variant={statusVariant} size="sm">
                  {USER_STATUS_LABELS[profile.status]}
                </Badge>
              </div>
              <p className="text-sm text-[#656A73]">@{profile.username}</p>
            </div>
          </div>

          <div className="flex flex-row gap-8 lg:gap-14 flex-wrap">
            <div>
              <p className="text-xs font-medium text-[#656A73]">Joined</p>
              <p className="text-sm font-medium">{formatDateString(profile.joinedAt)}</p>
            </div>
            {profile.lastActive && (
              <div>
                <p className="text-xs font-medium text-[#656A73]">Last Active</p>
                <p className="text-sm font-medium">{formatTimeAgo(profile.lastActive)}</p>
              </div>
            )}
            {profile.location && (
              <div>
                <p className="text-xs font-medium text-[#656A73]">Location</p>
                <p className="text-sm font-medium">{profile.location}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-3 md:grid-cols-1 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2">
                <Trophy className="h-8 w-8 text-[#656A73]" />
                <p className="text-2xl font-bold">{stats.totalXp.toLocaleString()}</p>
                <p className="text-xs font-medium text-[#656A73]">Total IQ</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2">
                <Flame className="h-8 w-8 text-[#656A73]" />
                <p className="text-2xl font-bold">{stats.dayStreak}</p>
                <p className="text-xs font-medium text-[#656A73]">Day Streak</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-2">
                <Globe className="h-8 w-8 text-[#656A73]" />
                <p className="text-2xl font-bold">#{stats.globalRank}</p>
                <p className="text-xs font-medium text-[#656A73]">Global Rank</p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Action Buttons - Hidden for current user */}
      {!isCurrentUser && (
        <div className="flex flex-wrap gap-3">
          {profile.status === "suspended" ? (
            <Button
              variant="outline"
              className="border-green-500 text-green-600 hover:bg-green-50"
              onClick={showActivateConfirmation}
              disabled={isActivating || isDeleting}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Activate User
            </Button>
          ) : (
            <Button
              variant="outline"
              className="border-destructive text-destructive hover:bg-destructive/10"
              onClick={showSuspendModal}
              disabled={isSuspending || isDeleting}
            >
              <Ban className="mr-2 h-4 w-4" />
              Suspend User
            </Button>
          )}
          <Button
            variant="outline"
            className="border-destructive text-destructive hover:bg-destructive/10"
            onClick={showDeleteModal}
            disabled={isSuspending || isActivating || isDeleting}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Delete User
          </Button>
        </div>
      )}

      {/* Modals */}
      {modalAction && (
        <AdminUserActionModal
          open={isActionModalOpen}
          onOpenChange={handleActionModalOpenChange}
          action={modalAction}
          userName={profile.name}
          onConfirm={handleConfirmAction}
          isLoading={isSuspending || isDeleting}
        />
      )}
      {confirmationAction && (
        <AdminConfirmationModal
          open={isConfirmationModalOpen}
          onOpenChange={handleConfirmationModalOpenChange}
          action={confirmationAction}
          entityName="User"
          onConfirm={handleConfirmActivation}
          isLoading={isActivating}
        />
      )}
    </div>
  );
}
