"use client";

import React from "react";
import { Bell, Volume2, Mail, Globe } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetAdminUserManagementSettings } from "@/resources/admin-user-management";

type UserSettingsTabProps = {
  userId: string;
};

export function UserSettingsTab({ userId }: UserSettingsTabProps) {
  const { data: settings, isLoading, error } = useGetAdminUserManagementSettings(userId);

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
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        Failed to load user settings
      </div>
    );
  }

  if (!settings) {
    return (
      <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-destructive">
        User settings not found
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Bell className="h-5 w-5 text-[#656A73]" />
            <div>
              <p className="text-sm font-medium">Notification</p>
              <p className="text-xs text-[#656A73]">Receive app notifications</p>
            </div>
          </div>
          <span className={settings.notifications ? "text-green-600 font-medium" : "text-[#656A73]"}>
            {settings.notifications ? "Enabled" : "Disabled"}
          </span>
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Volume2 className="h-5 w-5 text-[#656A73]" />
            <div>
              <p className="text-sm font-medium">Sound Effects</p>
              <p className="text-xs text-[#656A73]">Play sound in games</p>
            </div>
          </div>
          <span className={settings.soundEffects ? "text-green-600 font-medium" : "text-[#656A73]"}>
            {settings.soundEffects ? "Enabled" : "Disabled"}
          </span>
        </div>
        {settings.showEmail !== undefined && (
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Mail className="h-5 w-5 text-[#656A73]" />
              <div>
                <p className="text-sm font-medium">Show Email</p>
                <p className="text-xs text-[#656A73]">Display email on profile</p>
              </div>
            </div>
            <span className={settings.showEmail ? "text-green-600 font-medium" : "text-[#656A73]"}>
              {settings.showEmail ? "Enabled" : "Disabled"}
            </span>
          </div>
        )}
        {settings.language && (
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-3">
              <Globe className="h-5 w-5 text-[#656A73]" />
              <div>
                <p className="text-sm font-medium">Language</p>
              </div>
            </div>
            <span className="font-medium">{settings.language}</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
