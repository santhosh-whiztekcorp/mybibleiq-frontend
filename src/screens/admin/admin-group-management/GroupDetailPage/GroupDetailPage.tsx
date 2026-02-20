"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Flag, Activity, Settings, Shield, Users, Megaphone } from "lucide-react";
import { useRouter } from "next/navigation";
import { ADMIN_ROUTES } from "@/constants/routes/admin.routes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGroupDetailPage } from "./GroupDetailPage.hooks";

// Sub-Views
import { GroupReportsView } from "./GroupReportsView/GroupReportsView";
import { GroupAnnouncementsView } from "./GroupAnnouncementsView/GroupAnnouncementsView";
import { GroupActivityLogView } from "./GroupActivityLogView/GroupActivityLogView";
import { GroupMembersView } from "./GroupMembersView/GroupMembersView";
import { GroupSettingsView } from "./GroupSettingsView/GroupSettingsView";
import { GroupModerateView } from "./GroupModerateView/GroupModerateView";

// Tab Components
import { GroupHomeTab } from "./GroupHomeTab/GroupHomeTab";
import { GroupAssignmentsTab } from "./GroupAssignmentsTab/GroupAssignmentsTab";
import { GroupLeaderboardTab } from "./GroupLeaderboardTab/GroupLeaderboardTab";

export function GroupDetailPage() {
  const router = useRouter();
  const { view, group } = useGroupDetailPage();
  const groupName = group?.name || "Group";
  const memberCount = group?.memberCount || 0;
  const membersText = memberCount === 1 ? "Member" : "Members";

  const handleBack = () => {
    router.back();
  };

  const renderSubView = () => {
    switch (view) {
      case "reports":
        return <GroupReportsView />;
      case "announcements":
        return <GroupAnnouncementsView />;
      case "activity-log":
        return <GroupActivityLogView />;
      case "manage-members":
        return <GroupMembersView />;
      case "settings":
        return <GroupSettingsView />;
      case "moderate":
        return <GroupModerateView />;
      default:
        return null;
    }
  };

  // If a valid sub-view is selected, render it with a back button
  if (view && ["reports", "announcements", "activity-log", "manage-members", "settings", "moderate"].includes(view)) {
    return (
      <div className="w-full flex flex-col gap-6">
        {/* Header with Back Button */}
        <div className="w-full flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger />
            <Button variant="ghost" size="icon" onClick={handleBack} className="shrink-0">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-black">Group Details</h1>
            </div>
          </div>
          <div className="">
            {(() => {
              const getHeaderContent = () => {
                switch (view) {
                  case "reports":
                    return {
                      title: `User Reports – ${groupName}`,
                      description: "Review and take action on user-submitted reports for this group",
                      icon: (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFE1E1] border border-[#FFE1E1] mr-3">
                          <Flag className="h-4 w-4 text-[#E7000B]" />
                        </div>
                      ),
                    };

                  case "announcements":
                    return {
                      title: `Review Announcements – ${groupName}`,
                      description: "Monitor and moderate all announcements posted by group leaders",
                      icon: (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E7FF] border border-[#F3E7FF] mr-3">
                          <Megaphone className="h-4 w-4 text-[#9810FA]" />
                        </div>
                      ),
                    };

                  case "activity-log":
                    return {
                      title: `Activity Log – ${groupName}`,
                      description: "Complete history of all group activities and admin actions",
                      icon: (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DBE9FF] border border-[#DBE9FF] mr-3">
                          <Activity className="h-4 w-4 text-[#165DFC]" />
                        </div>
                      ),
                    };

                  case "manage-members":
                    return {
                      title: "Manage Members",
                      description: `${groupName}  •  ${memberCount} ${membersText}`,
                      icon: (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#DBFCE5] border border-[#DBFCE5] mr-3">
                          <Users className="h-4 w-4 text-[#00A63E]" />
                        </div>
                      ),
                    };

                  case "settings":
                    return {
                      title: `Group Settings – ${groupName}`,
                      description: "Modify group information and configuration (Admin Override)",
                      icon: (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFF9C1] border border-[#FFF9C1] mr-3">
                          <Settings className="h-4 w-4 text-[#CF8700]" />
                        </div>
                      ),
                    };

                  case "moderate":
                    return {
                      title: `Moderate Group – ${groupName}`,
                      description: "Administration tools and disciplinary actions",
                      icon: (
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFECD4] border border-[#FFECD4] mr-3">
                          <Shield className="h-4 w-4 text-[#F54800]" />
                        </div>
                      ),
                    };

                  default:
                    return {
                      title: "",
                      description: null,
                      icon: null,
                    };
                }
              };

              const content = getHeaderContent();

              return (
                <div>
                  <div className="flex items-start">
                    {content.icon}
                    <div className="flex flex-col">
                      <h1 className="text-lg font-bold text-black">{content.title}</h1>
                      {content.description && <p className="text-xs text-slate-500 mt-1">{content.description}</p>}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>

        {renderSubView()}
      </div>
    );
  }

  // Default: Render Tabs (Home, Assignments, Leaderboard)
  return (
    <div className="w-full flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center gap-3">
        <SidebarTrigger />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push(ADMIN_ROUTES.GROUP_MANAGER)}
          className="shrink-0"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-bold text-black">Group Details</h1>
        </div>
      </div>

      <Tabs defaultValue="home">
        <TabsList variant="adminQuaternary" className="w-full max-w-xl">
          <TabsTrigger variant="adminQuaternary" value="home">
            Home
          </TabsTrigger>
          <TabsTrigger variant="adminQuaternary" value="assignments">
            Assignments
          </TabsTrigger>
          <TabsTrigger variant="adminQuaternary" value="leaderboard">
            Leaderboard
          </TabsTrigger>
        </TabsList>

        <div className="w-full mt-3">
          <TabsContent value="home">
            <GroupHomeTab />
          </TabsContent>
          <TabsContent value="assignments">
            <GroupAssignmentsTab />
          </TabsContent>
          <TabsContent value="leaderboard">
            <GroupLeaderboardTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
