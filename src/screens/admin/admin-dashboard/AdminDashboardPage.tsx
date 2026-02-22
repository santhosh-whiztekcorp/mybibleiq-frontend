"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DashboardIcon } from "@/assets";

import { UserActivity } from "./UserActivity";
import { GroupEngagement } from "./GroupEngagement";
import { ContentPerformance } from "./ContentPerformance";
import { FeedbackSentiments } from "./FeedbackSentiments";
import { useAdminDashboardPage } from "./AdminDashboardPage.hooks";
import { useAdminDashboardStore } from "@/resources/admin-dashboard/admin-dashboard.hooks";
import { TIME_PERIODS } from "@/resources/admin-dashboard/admin-dashboard.constants";
import type { TimePeriod } from "@/resources/admin-dashboard/admin-dashboard.types";
import { ScrollArea } from "@/components/ui/scroll-area";
export function AdminDashboardPage() {
  const { activeTab, handleTabChange } = useAdminDashboardPage();
  const { timePeriod, setTimePeriod } = useAdminDashboardStore();

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <DashboardIcon width={20} height={20} />
            <h1 className="text-xl font-bold">Dashboard</h1>
          </div>
        </div>

        {/* Time Period Selector — mirrors mobile CustomAdminHeader */}
        <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value as TimePeriod)}>
          <SelectTrigger variant="adminPrimary" className="w-[160px]">
            <SelectValue placeholder="Select range" />
          </SelectTrigger>
          <SelectContent>
            {TIME_PERIODS.map((period) => (
              <SelectItem key={period.value} value={period.value}>
                {period.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-[1440px] mx-auto">
        <ScrollArea className="w-full pb-2" orientation="horizontal">
          <TabsList variant="adminQuaternary" className="w-fit justify-start">
            <TabsTrigger variant="adminQuaternary" value="user-activity">
              User Activity
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="group-engagement">
              Group Engagement
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="content-performance">
              Content Performance
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="feedback-sentiments">
              Feedback Sentiments
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
        <div className="mt-4 2xl:bg-gray-50 2xl:border 2xl:rounded-2xl 2xl:p-4">
          <TabsContent value="user-activity">
            <UserActivity />
          </TabsContent>
          <TabsContent value="group-engagement">
            <GroupEngagement />
          </TabsContent>
          <TabsContent value="content-performance">
            <ContentPerformance />
          </TabsContent>
          <TabsContent value="feedback-sentiments">
            <FeedbackSentiments />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
