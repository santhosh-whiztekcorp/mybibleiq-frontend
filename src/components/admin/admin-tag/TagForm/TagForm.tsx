"use client";

import * as React from "react";
import { FormProvider } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { InputController } from "@/components/form-controllers/InputController";
import { SelectController } from "@/components/form-controllers/SelectController";
import { TextareaController } from "@/components/form-controllers/TextareaController";
import { TagCategoryFormModal } from "../TagCategoryFormModal/TagCategoryFormModal";
import { useTagForm } from "./TagForm.hooks";
import { TagFormProps } from "./TagForm.types";

export function TagForm(props: TagFormProps) {
  const {
    form,
    onSubmit,
    categoryOptions,
    isMutationLoading,
    isEditMode,
    isCategoryModalOpen,
    setIsCategoryModalOpen,
    handleCategoryCreated,
    selectedCategory,
  } = useTagForm(props);
  const [open, setOpen] = React.useState(true);

  const errors = form.formState.errors;

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      props.onClose?.();
    }
  };

  return (
    <>
      <Sheet open={open} onOpenChange={handleOpenChange}>
        <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
          <FormProvider {...form}>
            <div className="flex flex-col h-full px-4 pt-4 pb-8">
              <SheetHeader className="px-0 pb-2">
                <SheetTitle className="text-xl font-bold text-black">
                  {isEditMode ? "Edit Tag" : "Create New Tag"}
                </SheetTitle>
                <SheetDescription className="text-sm font-semibold text-[#656A73]">
                  {isEditMode ? "Update the tag details." : "Fill in the details to create new tag."}
                </SheetDescription>
              </SheetHeader>

              <ScrollArea className="flex-1">
                <div className="space-y-5 pt-2.5 pb-4 px-1">
                  <InputController
                    variant="adminPrimary"
                    control={form.control}
                    name="name"
                    label="Tag Name"
                    placeholder="e.g., Jesus"
                    error={errors.name?.message}
                  />

                  <div className="space-y-2">
                    <div className="relative">
                      <SelectController
                        variant="adminPrimary"
                        control={form.control}
                        name="categoryId"
                        label="Category"
                        placeholder="Select a category"
                        options={categoryOptions}
                        error={errors.categoryId?.message}
                      />
                      {selectedCategory && (
                        <div
                          className="absolute top-9 right-10 w-4 h-4 rounded-full border border-gray-200 pointer-events-none"
                          style={{ backgroundColor: selectedCategory.color }}
                        />
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="text-xs font-bold text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider"
                      >
                        + Add New Category
                      </button>
                    </div>
                  </div>

                  <TextareaController
                    variant="adminPrimary"
                    control={form.control}
                    name="description"
                    label="Description (Optional)"
                    placeholder="Add a brief description for this tag..."
                    error={errors.description?.message}
                    rows={4}
                  />
                </div>
              </ScrollArea>

              <SheetFooter className="px-0 pt-4 pb-0 gap-2 shrink-0">
                <Button variant="actionSubmit" onClick={onSubmit} disabled={isMutationLoading} className="w-full">
                  {isMutationLoading ? "Saving..." : isEditMode ? "Update Tag" : "Create Tag"}
                </Button>
              </SheetFooter>
            </div>
          </FormProvider>
        </SheetContent>
      </Sheet>
      <TagCategoryFormModal
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        onSuccess={handleCategoryCreated}
      />
    </>
  );
}
