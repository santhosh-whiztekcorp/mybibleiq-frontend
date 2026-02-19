"use client";

import * as React from "react";
import { FormProvider } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  InputController,
  TextareaController,
  TagSelectorController,
  FlashcardSelectorController,
} from "@/components/form-controllers";
import { useFlashcardGroupForm } from "./FlashcardGroupForm.hooks";
import type { FlashcardGroupFormProps } from "./FlashcardGroupForm.types";

export function FlashcardGroupForm(props: FlashcardGroupFormProps) {
  const { form, onSubmit, isMutationLoading, isEditMode } = useFlashcardGroupForm(props);
  const [open, setOpen] = React.useState(true);

  const errors = form.formState.errors;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      props.onClose?.();
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
        <FormProvider {...form}>
          <div className="flex flex-col h-full px-4 pt-4 pb-8">
            <SheetHeader className="px-0 pb-2">
              <SheetTitle className="text-xl font-bold text-black">
                {isEditMode ? "Edit Flashcard Group" : "Create New Flashcard Group"}
              </SheetTitle>
              <SheetDescription className="text-sm font-semibold text-[#656A73]">
                {isEditMode
                  ? "Update the flashcard group details."
                  : "Fill in the details to create new flashcard group."}
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <div className="space-y-5 pt-2.5 pb-4 px-1">
                <InputController
                  variant="adminPrimary"
                  control={form.control}
                  name="name"
                  label="Name"
                  placeholder="e.g., Theology Basics"
                  error={errors.name?.message}
                />

                <TextareaController
                  variant="adminPrimary"
                  control={form.control}
                  name="description"
                  label="Description (Optional)"
                  placeholder="Enter description..."
                  error={errors.description?.message}
                  rows={4}
                />

                <TagSelectorController
                  control={form.control}
                  name="tags"
                  label="Tags"
                  placeholder="Select tags..."
                  error={errors.tags?.message}
                />

                <FlashcardSelectorController
                  control={form.control}
                  name="selectedFlashcardIds"
                  label="Flashcards"
                  placeholder="Select flashcards..."
                  error={errors.selectedFlashcardIds?.message}
                  filters={{
                    status: "Published",
                  }}
                />
              </div>
            </ScrollArea>

            <SheetFooter className="px-0 pt-4 pb-0 gap-2 shrink-0">
              <Button variant="actionSubmit" onClick={onSubmit} disabled={isMutationLoading} className="w-full">
                {isMutationLoading ? "Saving..." : isEditMode ? "Update Group" : "Create Group"}
              </Button>
            </SheetFooter>
          </div>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
