"use client";

import * as React from "react";
import { FormProvider } from "react-hook-form";
import { startOfToday } from "date-fns";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { InputController } from "@/components/form-controllers/InputController";
import { SelectController } from "@/components/form-controllers/SelectController";
import { DatePickerController } from "@/components/form-controllers/DatePickerController";
import { TextareaController } from "@/components/form-controllers/TextareaController";
import { useSpiritFoodForm, useBibleVersions } from "./SpiritFoodForm.hooks";
import type { SpiritFoodFormProps } from "./SpiritFoodForm.types";

export function SpiritFoodForm(props: SpiritFoodFormProps) {
  const { form, onSubmit, isEditMode, isMutationLoading, onClose } = useSpiritFoodForm(props);
  const { bibleVersionOptions } = useBibleVersions();
  const minDate = React.useMemo(() => startOfToday(), []);
  const [open, setOpen] = React.useState(true);

  const errors = form.formState.errors;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      onClose?.();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
        <FormProvider {...form}>
          <div className="flex flex-col h-full px-4 pt-4 pb-8">
            <SheetHeader className="px-0 pb-2">
              <SheetTitle className="text-xl font-bold text-black">
                {isEditMode ? "Edit Spirit Food" : "Create New Spirit Food"}
              </SheetTitle>
              <SheetDescription className="text-sm font-semibold text-[#656A73]">
                {isEditMode ? "Update the spirit food details." : "Fill in the details to create new spirit food."}
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <div className="space-y-5 pt-2.5 pb-4 pr-4">
                <div className="flex flex-col sm:flex-row gap-5">
                  <div className="flex-1">
                    <DatePickerController
                      variant="adminPrimary"
                      control={form.control}
                      name="scheduledDate"
                      label="Scheduled Date"
                      placeholder="Select scheduled date"
                      minDate={minDate}
                      error={errors.scheduledDate?.message}
                    />
                  </div>
                  <div className="flex-1">
                    <InputController
                      variant="adminPrimary"
                      control={form.control}
                      name="verseReference"
                      label="Verse Reference"
                      placeholder="e.g., John 3:16"
                      error={errors.verseReference?.message}
                    />
                  </div>
                </div>

                <SelectController
                  variant="adminPrimary"
                  control={form.control}
                  name="bibleVersion"
                  label="Bible Version"
                  placeholder="Select bible version"
                  options={bibleVersionOptions}
                  error={errors.bibleVersion?.message}
                />

                <TextareaController
                  variant="adminPrimary"
                  control={form.control}
                  name="verseText"
                  label="Verse Text"
                  placeholder="Enter verse text"
                  error={errors.verseText?.message}
                  rows={4}
                />

                <TextareaController
                  variant="adminPrimary"
                  control={form.control}
                  name="reflectionText"
                  label="Reflection Text"
                  placeholder="Enter reflection text"
                  error={errors.reflectionText?.message}
                  rows={4}
                />
              </div>
            </ScrollArea>

            <SheetFooter className="px-0 pt-4 pb-0 gap-2 shrink-0">
              <Button variant="actionSubmit" onClick={onSubmit} disabled={isMutationLoading} className="w-full">
                {isMutationLoading ? "Saving..." : isEditMode ? "Update Spirit Food" : "Create Spirit Food"}
              </Button>
            </SheetFooter>
          </div>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
