"use client";

import React from "react";
import { Clock, MessageSquare, Mail, Bell } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  useGetAdminUserManagementSpiritFood,
  useUpdateAdminUserSpiritFood,
  useAdminUserManagementSavedVerses,
  type DeliveryChannel,
} from "@/resources/admin-user-management";
import { formatDateString } from "@/utils/formatting/formatting";

type UserSpiritFoodTabProps = {
  userId: string;
};

export const generateTimeOptions = () => {
  const options = [];
  for (let hour = 6; hour <= 22; hour++) {
    const hour12 = hour % 12 || 12;
    const ampm = hour >= 12 ? "PM" : "AM";
    const time12 = `${hour12}:00 ${ampm}`;
    const time24 = `${hour.toString().padStart(2, "0")}:00`;
    options.push({ value: time24, label: time12 });
  }
  return options;
};

export function UserSpiritFoodTab({ userId }: UserSpiritFoodTabProps) {
  const { data: spiritFoodData, isLoading, error } = useGetAdminUserManagementSpiritFood(userId);
  const { mutate: updateSpiritFood, isPending: isUpdating } = useUpdateAdminUserSpiritFood();

  const timeOptions = React.useMemo(() => generateTimeOptions(), []);

  const handleToggle = (method: DeliveryChannel, currentValue: boolean) => {
    if (!spiritFoodData) return;

    const currentMethods = spiritFoodData.deliveryMethods || [];
    let newMethods = [...currentMethods];

    if (currentValue) {
      newMethods = newMethods.filter((m) => m !== method);
    } else {
      newMethods.push(method);
    }

    updateSpiritFood({
      userId,
      input: {
        deliveryMethods: newMethods,
      },
    });
  };

  const handleTimeChange = (value: string) => {
    updateSpiritFood({
      userId,
      input: {
        deliveryTime: value,
      },
    });
  };

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

  const { deliveryTime, deliveryMethods = [] } = spiritFood;

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
                <span className="text-xs text-[#656A73]">Preferred delivery time</span>
              </div>
            </div>
            <Select value={deliveryTime} onValueChange={handleTimeChange} disabled={isUpdating}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select time" />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#656A73]" />
              <span className="text-sm font-medium">SMS Notifications</span>
            </div>
            <Switch
              checked={deliveryMethods.includes("sms")}
              onCheckedChange={() => handleToggle("sms", deliveryMethods.includes("sms"))}
              disabled={isUpdating}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#656A73]" />
              <span className="text-sm font-medium">Email Devotion</span>
            </div>
            <Switch
              checked={deliveryMethods.includes("email")}
              onCheckedChange={() => handleToggle("email", deliveryMethods.includes("email"))}
              disabled={isUpdating}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="flex items-center gap-2">
              <Bell className="h-4 w-4 text-[#656A73]" />
              <span className="text-sm font-medium">Push Notifications</span>
            </div>
            <Switch
              checked={deliveryMethods.includes("inapp")}
              onCheckedChange={() => handleToggle("inapp", deliveryMethods.includes("inapp"))}
              disabled={isUpdating}
              className="data-[state=checked]:bg-green-500"
            />
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
