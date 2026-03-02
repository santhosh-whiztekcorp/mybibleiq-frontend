"use client";

import { Trophy, Globe, Flame, Ban, Trash2, CheckCircle, Shield } from "lucide-react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AdminUserActionModal, AdminConfirmationModal } from "@/components/admin/admin-shared";
import { AdminUserRolesModal } from "@/components/admin/admin-user-management";
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
    isRolesModalOpen,
    showSuspendModal,
    showActivateConfirmation,
    showDeleteModal,
    showRolesModal,
    handleConfirmAction,
    handleConfirmActivation,
    handleActionModalOpenChange,
    handleConfirmationModalOpenChange,
    handleRolesModalOpenChange,
    handleToggleRole,
    isSuspending,
    isActivating,
    isDeleting,
    isAssigningRole,
    isRevokingRole,
    userRoles,
    isRolesLoading,
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
                alt={profile.name || profile.username}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full object-cover border-2 border-[#E2E8F0]"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-[#E2E8F0] flex items-center justify-center border-2 border-[#E2E8F0]">
                <span className="text-xl font-bold text-[#656A73]">
                  {(profile.name || profile.username || "U")
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
                <h2 className="text-lg font-bold text-black">{profile.name || profile.username}</h2>
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
            <div>
              <p className="text-xs font-medium text-[#656A73]">Roles</p>
              <div className="flex flex-wrap gap-1 mt-1">
                {userRoles.length > 0 ? (
                  userRoles.map((ur) => (
                    <Badge
                      key={ur.id}
                      variant="secondary"
                      size="sm"
                      className="bg-slate-100 text-slate-700 hover:bg-slate-100"
                    >
                      {ur.roleName}
                    </Badge>
                  ))
                ) : (
                  <p className="text-sm font-medium text-slate-400 italic">No roles assigned</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Section */}
      {stats && (
        <div className="grid grid-cols-3 gap-4">
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
              className="flex-1 sm:flex-initial bg-[#D1FAE5] border-[#3E995F] text-[#125440] hover:bg-[#D1FAE5]/80 font-bold h-auto py-2 px-4 rounded-[10px]"
              onClick={showActivateConfirmation}
              disabled={isActivating || isDeleting}
            >
              <CheckCircle className="h-4 w-4 text-[#125440]" />
              Activate User
            </Button>
          ) : (
            <Button
              variant="outline"
              className="flex-1 sm:flex-initial bg-[#FEE2E2] border-[#EF4444] text-[#EF4444] hover:bg-[#FEE2E2]/80 font-bold h-auto py-2 px-4 rounded-[10px]"
              onClick={showSuspendModal}
              disabled={isSuspending || isDeleting}
            >
              <Ban className="h-4 w-4 text-[#EF4444]" />
              Suspend User
            </Button>
          )}
          <Button
            variant="outline"
            className="flex-1 sm:flex-initial bg-[#FEE2E2] border-[#EF4444] text-[#EF4444] hover:bg-[#FEE2E2]/80 font-bold h-auto py-2 px-4 rounded-[10px]"
            onClick={showDeleteModal}
            disabled={isSuspending || isActivating || isDeleting}
          >
            <Trash2 className="h-4 w-4 text-[#EF4444]" />
            Delete User
          </Button>

          <Button
            variant="outline"
            className="w-full md:w-auto bg-[#E0F2FE] border-[#0369A1] text-[#0369A1] hover:bg-[#E0F2FE]/80 font-bold h-auto py-2 px-4 rounded-[10px]"
            onClick={showRolesModal}
            disabled={isSuspending || isActivating || isDeleting || isRolesLoading}
          >
            <Shield className="h-4 w-4 text-[#0369A1]" />
            Manage Roles
          </Button>
        </div>
      )}

      {/* Modals */}
      {modalAction && (
        <AdminUserActionModal
          open={isActionModalOpen}
          onOpenChange={handleActionModalOpenChange}
          action={modalAction}
          userName={profile.name || profile.username}
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

      <AdminUserRolesModal
        open={isRolesModalOpen}
        onOpenChange={handleRolesModalOpenChange}
        userName={profile.name || profile.username}
        userRoles={userRoles}
        isProcessing={isAssigningRole || isRevokingRole}
        onToggleRole={handleToggleRole}
      />
    </div>
  );
}
