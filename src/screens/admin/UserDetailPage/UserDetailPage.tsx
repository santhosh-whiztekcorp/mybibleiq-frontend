"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  UserProfileTab,
  UserActivityTab,
  UserSpiritFoodTab,
  UserSettingsTab,
  UserFeedbackTab,
} from "@/components/admin/admin-user-management";
import { useUserDetailPage } from "./UserDetailPage.hooks";

export function UserDetailPage() {
  const userId = useSearchParams().get("userId") as string;
  const router = useRouter();
  useUserDetailPage(userId);

  return (
    <div className="w-full space-y-4 md:space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="shrink-0">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-black">User Details</h1>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="profile" className="w-full max-w-5xl mx-auto">
        <div className="w-full overflow-x-auto -mx-1 px-1">
          <TabsList variant="adminQuaternary" className="flex flex-nowrap h-auto gap-1 p-1 w-full">
            <TabsTrigger variant="adminQuaternary" value="profile" className="shrink-0">
              Profile
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="activity" className="shrink-0">
              Activity
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="spirit-food" className="shrink-0">
              Spirit Food
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="settings" className="shrink-0">
              Settings
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="feedback" className="shrink-0">
              Feedback
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="mt-4">
          <UserProfileTab userId={userId} />
        </TabsContent>
        <TabsContent value="activity" className="mt-4">
          <UserActivityTab userId={userId} />
        </TabsContent>
        <TabsContent value="spirit-food" className="mt-4">
          <UserSpiritFoodTab userId={userId} />
        </TabsContent>
        <TabsContent value="settings" className="mt-4">
          <UserSettingsTab userId={userId} />
        </TabsContent>
        <TabsContent value="feedback" className="mt-4">
          <UserFeedbackTab userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
