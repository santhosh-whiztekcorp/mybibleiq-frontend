"use client";

import React, { useState } from "react";
import { FormProvider, useWatch } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  InputController,
  TagSelectorController,
  SelectInlineController,
  TextareaController,
  MediaSelectorController,
  BadgeSelectorController,
} from "@/components/form-controllers";
import { QuestStagesPreview } from "../QuestStagesPreview";
import { QUEST_THEME_KEYS, getThemeConfig } from "@/resources/admin-quest/admin-quest.constants";
import { Eye } from "lucide-react";
import { useQuestForm } from "./QuestForm.hooks";
import { useStepManager } from "@/hooks/useStepManager";
import type { QuestFormProps } from "./QuestForm.types";
import { cn } from "@/lib/utils";

const STEP_LABELS = ["Basic Details", "Welcome", "Introduction", "Completion"];

export function QuestForm(props: QuestFormProps) {
  const { form, onSubmit, isEditMode, isMutationLoading, isOpen, handleOpenChange } = useQuestForm(props);
  const stepManager = useStepManager(4);
  const { step, isFirst, isLast } = stepManager;
  const selectedTheme = useWatch({ control: form.control, name: "theme" });
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const themeConfig = selectedTheme ? getThemeConfig(selectedTheme) : null;

  const handleNext = async () => {
    const success = await onSubmit(step, isLast);
    if (success && !isLast) {
      stepManager.next();
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent
          showCloseButton={false}
          side="right"
          className="w-full sm:max-w-2xl overflow-y-auto p-0 flex flex-col"
        >
          <FormProvider {...form}>
            <div className="flex flex-col h-full font-plus-jakarta-sans text-black">
              <div className="px-6 pt-6 pb-4 border-b border-[#F1F5F9]">
                <SheetHeader className="px-0 space-y-1 text-left">
                  <SheetTitle className="text-xl font-bold text-black">
                    {isEditMode ? "Edit Quest" : "Create New Quest"}
                  </SheetTitle>
                  <SheetDescription className="text-sm font-semibold text-[#656A73]">
                    {isEditMode
                      ? "Update the quest details and settings."
                      : "Fill in the details to set up your quest."}
                  </SheetDescription>
                </SheetHeader>

                {/* Step indicator */}
                <div className="flex gap-2 mt-4">
                  {STEP_LABELS.map((label, i) => (
                    <div
                      key={i}
                      className={cn(
                        "flex-1 h-1.5 rounded-full transition-colors",
                        i <= step ? "bg-primary" : "bg-[#E2E8F0]"
                      )}
                      title={label}
                    />
                  ))}
                </div>
                <p className="text-xs font-bold text-[#656A73] mt-1">{STEP_LABELS[step]}</p>
              </div>

              <ScrollArea className="flex-1">
                <div className="p-6 space-y-6">
                  {step === 0 && (
                    <>
                      <InputController
                        variant="adminPrimary"
                        control={form.control}
                        name="title"
                        label="Quest Title"
                        placeholder="Enter quest title"
                        required
                      />
                      <TextareaController
                        variant="adminPrimary"
                        control={form.control}
                        name="description"
                        label="Description"
                        placeholder="Enter quest description"
                        required
                        rows={3}
                      />
                      <div className="space-y-3">
                        <SelectInlineController
                          variant="adminPrimary"
                          control={form.control}
                          name="theme"
                          label="Theme"
                          placeholder="Select theme (optional)"
                          options={QUEST_THEME_KEYS.map((t) => ({
                            label: (t || "").charAt(0).toUpperCase() + (t || "").slice(1),
                            value: t,
                          }))}
                        />
                        {selectedTheme && (
                          <Button
                            type="button"
                            variant="actionEdit"
                            onClick={() => setIsPreviewVisible(true)}
                            className="self-start"
                          >
                            <Eye className="size-4" />
                            Preview Theme
                          </Button>
                        )}
                      </div>
                      <TagSelectorController
                        control={form.control}
                        name="tags"
                        label="Tags"
                        placeholder="Select tags"
                      />
                    </>
                  )}

                  {step === 1 && (
                    <>
                      <InputController
                        variant="adminPrimary"
                        control={form.control}
                        name="welcome.title"
                        label="Welcome Title"
                        placeholder="Enter welcome title"
                        required
                      />
                      <TextareaController
                        variant="adminPrimary"
                        control={form.control}
                        name="welcome.description"
                        label="Welcome Description"
                        placeholder="Enter welcome description"
                        required
                        rows={3}
                      />
                      <InputController
                        variant="adminPrimary"
                        control={form.control}
                        name="welcome.startQuestButtonText"
                        label="Start Button Text"
                        placeholder="e.g. Start Quest"
                        required
                      />
                      <MediaSelectorController
                        control={form.control}
                        name="welcome.backgroundImageId"
                        label="Background Image"
                        placeholder="Select background image (optional)"
                        filters={{ status: "Published", type: "IMAGE" }}
                      />
                    </>
                  )}

                  {step === 2 && (
                    <>
                      <InputController
                        variant="adminPrimary"
                        control={form.control}
                        name="introduction.title"
                        label="Introduction Title"
                        placeholder="Enter introduction title"
                        required
                      />
                      <TextareaController
                        variant="adminPrimary"
                        control={form.control}
                        name="introduction.dialogue"
                        label="Dialogue"
                        placeholder="Enter introduction dialogue"
                        required
                        rows={4}
                      />
                      <MediaSelectorController
                        control={form.control}
                        name="introduction.backgroundImageId"
                        label="Background Image"
                        placeholder="Select background image (optional)"
                        filters={{ status: "Published", type: "IMAGE" }}
                      />
                      <MediaSelectorController
                        control={form.control}
                        name="introduction.backgroundMusicId"
                        label="Background Music"
                        placeholder="Select background music (optional)"
                        filters={{ status: "Published", type: "AUDIO" }}
                      />
                      <InputController
                        variant="adminPrimary"
                        control={form.control}
                        name="introduction.startStageButtonText"
                        label="Start Stage Button Text"
                        placeholder="e.g. Let's Begin!"
                        required
                      />
                    </>
                  )}

                  {step === 3 && (
                    <>
                      <TextareaController
                        variant="adminPrimary"
                        control={form.control}
                        name="completion.mascotMessage"
                        label="Mascot Message"
                        placeholder="Enter mascot completion message"
                        required
                        rows={4}
                      />
                      <BadgeSelectorController
                        control={form.control}
                        name="completion.completionBadgeId"
                        label="Completion Badge"
                        placeholder="Select completion badge (optional)"
                        filters={{ status: "Published" }}
                      />
                    </>
                  )}
                </div>
              </ScrollArea>

              <SheetFooter className="px-6 py-6 gap-3 shrink-0 border-t border-[#E2E8F0] mt-auto">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleOpenChange(false)}
                  className="flex-1 h-12 text-sm font-bold"
                  disabled={isMutationLoading}
                >
                  Cancel
                </Button>
                {!isFirst && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={stepManager.prev}
                    className="flex-1 h-12 text-sm font-bold"
                    disabled={isMutationLoading}
                  >
                    Back
                  </Button>
                )}
                <Button
                  type="button"
                  variant="actionSubmit"
                  onClick={handleNext}
                  className="flex-1 h-12 text-sm font-bold"
                  disabled={isMutationLoading}
                >
                  {isMutationLoading ? "Saving..." : isLast ? (isEditMode ? "Update Quest" : "Create Quest") : "Next"}
                </Button>
              </SheetFooter>
            </div>
          </FormProvider>
        </SheetContent>
      </Sheet>

      {/* Theme Preview Dialog */}
      {themeConfig && (
        <Dialog open={isPreviewVisible} onOpenChange={setIsPreviewVisible}>
          <DialogContent className="w-screen max-w-none md:w-full md:max-w-auto  h-full md:h-[90vh] md:max-h-[90vh] p-0 overflow-hidden flex flex-col rounded-none md:rounded-xl ">
            <DialogHeader className="px-6 pt-6 pb-2 shrink-0">
              <DialogTitle>
                Theme Preview: {selectedTheme?.charAt(0).toUpperCase()}
                {selectedTheme?.slice(1)}
              </DialogTitle>
            </DialogHeader>
            <ScrollArea className="flex-1 px-3 pb-3">
              <QuestStagesPreview themeConfig={themeConfig} themeName={selectedTheme || ""} />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
