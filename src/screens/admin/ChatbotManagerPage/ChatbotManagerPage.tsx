"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { MessageSquare } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useChatbotManagerPage } from "./ChatbotManagerPage.hooks";

import { ChatbotAnalyticsTab } from "./ChatbotAnalyticsTab/ChatbotAnalyticsTab";
import { ChatbotConfigurationTab } from "./ChatbotConfigurationTab/ChatbotConfigurationTab";
import { ChatbotConversationLogsTab } from "./ChatbotConversationLogsTab/ChatbotConversationLogsTab";
import { ChatbotQuickActionsTab } from "./ChatbotQuickActionsTab/ChatbotQuickActionsTab";
import { ChatbotResponseLibraryTab } from "./ChatbotResponseLibraryTab/ChatbotResponseLibraryTab";
import { ScrollArea } from "@/components/ui/scroll-area";

export function ChatbotManagerPage() {
  const { activeTab, handleTabChange } = useChatbotManagerPage();

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <MessageSquare width={20} height={20} className="text-black" />
            <h1 className="text-xl font-bold">Chatbot Manager</h1>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <ScrollArea className="w-full pb-2" orientation="horizontal">
          <TabsList variant="adminQuaternary">
            <TabsTrigger variant="adminQuaternary" value="configuration">
              Configuration
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="quick-actions">
              Quick Actions
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="library">
              Response Library
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="logs">
              Conversation Logs
            </TabsTrigger>
            <TabsTrigger variant="adminQuaternary" value="analytics">
              Analytics
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
        <div className="mt-1">
          <TabsContent value="configuration">
            <ChatbotConfigurationTab active={activeTab === "configuration"} />
          </TabsContent>
          <TabsContent value="quick-actions">
            <ChatbotQuickActionsTab active={activeTab === "quick-actions"} />
          </TabsContent>
          <TabsContent value="library">
            <ChatbotResponseLibraryTab active={activeTab === "library"} />
          </TabsContent>
          <TabsContent value="logs">
            <ChatbotConversationLogsTab active={activeTab === "logs"} />
          </TabsContent>
          <TabsContent value="analytics">
            <ChatbotAnalyticsTab active={activeTab === "analytics"} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
