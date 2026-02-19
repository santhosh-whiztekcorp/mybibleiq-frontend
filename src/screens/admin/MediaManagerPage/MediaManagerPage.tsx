"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { QuestionManagerPage } from "@/screens/admin/QuestionManagerPage";
import { MediaLibraryManagerPage } from "@/screens/admin/MediaLibraryManagerPage";
import { FlashcardManagerPage } from "@/screens/admin/FlashcardManagerPage";
import { BadgeManagerPage } from "@/screens/admin/BadgeManagerPage";
import { TagManagerPage } from "@/screens/admin/TagManagerPage";
import { BookOpenIcon } from "@/assets";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useMediaManagerPage } from "./MediaManagerPage.hooks";

export function MediaManagerPage() {
  const { activeTab, handleTabChange } = useMediaManagerPage();

  return (
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <SidebarTrigger />
          <div className="flex items-center gap-2">
            <BookOpenIcon width={20} height={20} className="text-black" />
            <h1 className="text-xl font-bold">Media Manager</h1>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList variant="adminQuaternary">
          <TabsTrigger variant="adminQuaternary" value="questions">
            Questions
          </TabsTrigger>
          <TabsTrigger variant="adminQuaternary" value="media-library">
            Media Library
          </TabsTrigger>
          <TabsTrigger variant="adminQuaternary" value="flashcards">
            Flash Cards
          </TabsTrigger>
          <TabsTrigger variant="adminQuaternary" value="badges">
            Badges
          </TabsTrigger>
          <TabsTrigger variant="adminQuaternary" value="tags">
            Tags
          </TabsTrigger>
        </TabsList>
        <TabsContent value="questions">
          <QuestionManagerPage />
        </TabsContent>
        <TabsContent value="media-library">
          <MediaLibraryManagerPage />
        </TabsContent>
        <TabsContent value="flashcards">
          <FlashcardManagerPage />
        </TabsContent>
        <TabsContent value="badges">
          <BadgeManagerPage />
        </TabsContent>
        <TabsContent value="tags">
          <TagManagerPage />
        </TabsContent>
      </Tabs>
    </div>
  );
}
