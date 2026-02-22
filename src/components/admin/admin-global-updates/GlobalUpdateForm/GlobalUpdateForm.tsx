"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  DatePickerController,
  InputController,
  SelectController,
  TextareaController,
  UserSelectorController,
  GroupSelectorController,
} from "@/components/form-controllers";
import {
  GLOBAL_UPDATE_TYPE_SELECT_OPTIONS,
  GLOBAL_UPDATE_TARGET_TYPE_SELECT_OPTIONS,
} from "@/resources/admin-global-updates/admin-global-updates.constants";
import { useGlobalUpdateForm } from "./GlobalUpdateForm.hooks";
import { GlobalUpdateFormProps } from "./GlobalUpdateForm.types";
import { GlobalUpdatePreview } from "../GlobalUpdatePreview/GlobalUpdatePreview";

export function GlobalUpdateForm(props: GlobalUpdateFormProps) {
  const { form, onSubmit, isMutationLoading, isEditMode, isOpen, handleOpenChange } = useGlobalUpdateForm(props);

  const watchTitle = form.watch("title");
  const watchMessage = form.watch("message");
  const watchScheduledAt = form.watch("scheduledAt");

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[450px] p-0 flex flex-col">
        <FormProvider {...form}>
          <SheetHeader className="px-6 bg-white sticky top-0 z-10 space-y-1">
            <SheetTitle className="text-xl font-bold text-black">
              {isEditMode ? "Edit Global Update" : "New Global Update"}
            </SheetTitle>
            <SheetDescription className="text-sm font-semibold text-[#656A73]">
              {isEditMode
                ? "Update the details for this global update notification."
                : "Fill in the information below to create a new global notification."}
            </SheetDescription>
          </SheetHeader>

          <ScrollArea className="flex-1">
            <form onSubmit={onSubmit} className="px-4 space-y-4">
              {/* ---- Basic Info Section ---- */}
              <div className="bg-white p-4 rounded-[12px] border border-[#E5E7EB] space-y-4">
                <h3 className="text-[16px] font-bold text-[#111827]">Basic Information</h3>

                <div className="space-y-4">
                  <InputController
                    variant="adminPrimary"
                    control={form.control}
                    name="title"
                    label="Update Title"
                    placeholder="e.g., Version 2.0 Released!"
                    required
                  />

                  <TextareaController
                    variant="adminPrimary"
                    control={form.control}
                    name="message"
                    label="Message"
                    placeholder="Details of the update..."
                    rows={4}
                    required
                  />

                  <SelectController
                    variant="adminPrimary"
                    control={form.control}
                    name="type"
                    label="Update Type"
                    placeholder="Select type"
                    options={GLOBAL_UPDATE_TYPE_SELECT_OPTIONS.filter((o) => o.value !== "")}
                  />
                </div>
              </div>

              {/* ---- Targeting Section ---- */}
              <div className="bg-white p-4 rounded-[12px] border border-[#E5E7EB] space-y-4">
                <h3 className="text-[16px] font-bold text-[#111827]">Targeting</h3>

                <div className="space-y-4">
                  <SelectController
                    variant="adminPrimary"
                    control={form.control}
                    name="targetType"
                    label="Target Audience"
                    placeholder="Select target audience"
                    options={GLOBAL_UPDATE_TARGET_TYPE_SELECT_OPTIONS}
                  />

                  {form.watch("targetType") === "SpecificUsers" && (
                    <UserSelectorController
                      control={form.control}
                      name="targetUserIds"
                      label="Select Users"
                      placeholder="Select users to target"
                    />
                  )}

                  {form.watch("targetType") === "UserGroup" && (
                    <GroupSelectorController
                      control={form.control}
                      name="targetGroupIds"
                      label="Select Groups"
                      placeholder="Select groups to target"
                    />
                  )}
                </div>
              </div>

              {/* ---- Scheduling Section ---- */}
              <div className="bg-white p-4 rounded-[12px] border border-[#E5E7EB] space-y-4">
                <h3 className="text-[16px] font-bold text-[#111827]">Scheduling</h3>

                <div className="space-y-4">
                  <DatePickerController
                    variant="adminPrimary"
                    control={form.control}
                    name="scheduledAt"
                    label="Scheduled At (Optional)"
                    placeholder="Select date and time"
                    showTime={true}
                  />
                </div>
              </div>

              {/* ---- Preview Section ---- */}
              <div className="bg-white p-4 rounded-[12px] border border-[#E5E7EB] space-y-4">
                <h3 className="text-[16px] font-bold text-[#111827]">Preview</h3>

                <GlobalUpdatePreview
                  title={watchTitle || "Update Title"}
                  message={watchMessage || "Details of the update..."}
                  deliveredAt={watchScheduledAt || new Date()}
                  isRead={false}
                  className="border border-slate-100"
                />
              </div>
            </form>
          </ScrollArea>

          <SheetFooter className="p-4 bg-white border-t mt-auto flex flex-row justify-end gap-3 sticky bottom-0">
            <SheetClose asChild>
              <Button type="button" variant="actionCancel" className="flex-1" disabled={isMutationLoading}>
                Cancel
              </Button>
            </SheetClose>
            <Button
              type="submit"
              onClick={onSubmit}
              variant="actionSubmit"
              disabled={!form.formState.isDirty || isMutationLoading}
              className="flex-1"
            >
              {isMutationLoading ? "Saving..." : isEditMode ? "Update Notification" : "Create Notification"}
            </Button>
          </SheetFooter>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
