"use client";

import { Bell, Volume2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useGetAdminUserManagementSettings, useUpdateAdminUserSettings } from "@/resources/admin-user-management";

type UserSettingsTabProps = {
  userId: string;
};

export function UserSettingsTab({ userId }: UserSettingsTabProps) {
  const { data: settings, isLoading, error } = useGetAdminUserManagementSettings(userId);
  const { mutate: updateSettings, isPending: isUpdating } = useUpdateAdminUserSettings();

  const handleToggle = (field: "notifications" | "soundEffects", currentValue: boolean) => {
    updateSettings({
      userId,
      input: { [field]: !currentValue },
    });
  };

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
      <CardHeader className="pb-2">
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
          <Switch
            checked={settings.notifications}
            onCheckedChange={() => handleToggle("notifications", !!settings.notifications)}
            disabled={isUpdating}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
        <div className="flex items-center justify-between rounded-lg border p-4">
          <div className="flex items-center gap-3">
            <Volume2 className="h-5 w-5 text-[#656A73]" />
            <div>
              <p className="text-sm font-medium">Sound Effects</p>
              <p className="text-xs text-[#656A73]">Play sound in games</p>
            </div>
          </div>
          <Switch
            checked={settings.soundEffects}
            onCheckedChange={() => handleToggle("soundEffects", !!settings.soundEffects)}
            disabled={isUpdating}
            className="data-[state=checked]:bg-green-500"
          />
        </div>
      </CardContent>
    </Card>
  );
}
