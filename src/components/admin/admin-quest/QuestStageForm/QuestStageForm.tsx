"use client";

import React from "react";
import { FormProvider, useFormContext } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  InputController,
  TagSelectorController,
  TextareaController,
  MediaSelectorController,
} from "@/components/form-controllers";
import { ContentStep } from "./ContentStep";
import { SuccessCompletionStep } from "./SuccessCompletionStep";
import { useQuestStageForm } from "./QuestStageForm.hooks";
import { useStepManager } from "@/hooks/useStepManager";
import type { QuestStageFormContentProps, QuestStageFormProps } from "./QuestStageForm.types";
import type { CreateAdminQuestStageInput } from "@/resources/admin-quest";
import { cn } from "@/lib/utils";

const STEP_LABELS = ["Basic Details", "Verse", "Content", "Success Completion", "Failure Completion"];

function QuestStageFormContent({
  step,
  isFirst,
  isLast,
  isEditMode,
  isMutationLoading,
  onNext,
  onPrev,
  onCancel,
}: QuestStageFormContentProps) {
  const { control } = useFormContext<CreateAdminQuestStageInput>();

  return (
    <>
      <ScrollArea className="flex-1">
        <div className="p-6 space-y-6">
          {step === 0 && (
            <>
              <InputController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="title"
                label="Stage Title"
                placeholder="Enter stage title"
                required
              />
              <TextareaController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="description"
                label="Description"
                placeholder="Enter stage description"
                required
                rows={3}
              />
              <TagSelectorController<CreateAdminQuestStageInput>
                control={control}
                name="tags"
                label="Tags"
                placeholder="Select tags"
              />
            </>
          )}

          {step === 1 && (
            <>
              <InputController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="verse.verseReference"
                label="Verse Reference"
                placeholder="e.g. John 3:16"
                required
              />
              <TextareaController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="verse.verseText"
                label="Verse Text"
                placeholder="Enter the verse text"
                required
                rows={4}
              />
              <TextareaController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="verse.commentary"
                label="Commentary"
                placeholder="Enter commentary"
                required
                rows={3}
              />
              <MediaSelectorController<CreateAdminQuestStageInput>
                control={control}
                name="verse.backgroundImageId"
                label="Background Image"
                placeholder="Select background image (optional)"
                filters={{ status: "Published", type: "IMAGE" }}
              />
              <MediaSelectorController<CreateAdminQuestStageInput>
                control={control}
                name="verse.backgroundMusicId"
                label="Background Music"
                placeholder="Select background music (optional)"
                filters={{ status: "Published", type: "AUDIO" }}
              />
              <InputController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="verse.startButtonText"
                label="Start Button Text"
                placeholder="e.g. Start Stage"
                required
              />
            </>
          )}

          {step === 2 && <ContentStep />}

          {step === 3 && <SuccessCompletionStep />}

          {step === 4 && (
            <>
              <TextareaController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="failureCompletion.failureMessage"
                label="Failure Message"
                placeholder="Enter failure message"
                required
                rows={3}
              />
              <TextareaController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="failureCompletion.mascotEncouragement"
                label="Mascot Encouragement"
                placeholder="Enter encouragement message"
                required
                rows={3}
              />
              <InputController<CreateAdminQuestStageInput>
                variant="adminPrimary"
                control={control}
                name="failureCompletion.retryButtonText"
                label="Retry Button Text"
                placeholder="e.g. Retry"
                required
              />
            </>
          )}
        </div>
      </ScrollArea>

      <SheetFooter className="px-6 py-6 gap-3 shrink-0 border-t border-[#E2E8F0] mt-auto">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1 h-12 text-sm font-bold"
          disabled={isMutationLoading}
        >
          Cancel
        </Button>
        {!isFirst && (
          <Button
            type="button"
            variant="outline"
            onClick={onPrev}
            className="flex-1 h-12 text-sm font-bold"
            disabled={isMutationLoading}
          >
            Back
          </Button>
        )}
        <Button
          type="button"
          variant="actionSubmit"
          onClick={onNext}
          className="flex-1 h-12 text-sm font-bold"
          disabled={isMutationLoading}
        >
          {isMutationLoading ? "Saving..." : isLast ? (isEditMode ? "Update Stage" : "Create Stage") : "Next"}
        </Button>
      </SheetFooter>
    </>
  );
}

export function QuestStageForm(props: QuestStageFormProps) {
  const { form, onSubmit, isEditMode, isMutationLoading, isStageLoading, isOpen, handleOpenChange } =
    useQuestStageForm(props);
  const stepManager = useStepManager(5);
  const { step, isFirst, isLast } = stepManager;

  const handleNext = async () => {
    const success = await onSubmit(step, isLast);
    if (success && !isLast) {
      stepManager.next();
    }
  };

  if (isStageLoading) {
    return (
      <Sheet open={isOpen} onOpenChange={handleOpenChange}>
        <SheetContent showCloseButton={false} side="right" className="w-full sm:max-w-2xl">
          <div className="flex items-center justify-center py-12">Loading stage...</div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
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
                  {isEditMode ? "Edit Stage" : "Create New Stage"}
                </SheetTitle>
                <SheetDescription className="text-sm font-semibold text-[#656A73]">
                  {isEditMode ? "Update the stage details and settings." : "Fill in the details to set up your stage."}
                </SheetDescription>
              </SheetHeader>
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

            <QuestStageFormContent
              step={step}
              isFirst={isFirst}
              isLast={isLast}
              isEditMode={isEditMode}
              isMutationLoading={isMutationLoading}
              onNext={handleNext}
              onPrev={stepManager.prev}
              onCancel={() => handleOpenChange(false)}
            />
          </div>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
