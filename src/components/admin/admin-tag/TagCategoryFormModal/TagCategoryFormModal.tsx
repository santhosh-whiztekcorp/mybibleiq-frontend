"use client";

import * as React from "react";
import { FormProvider } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { InputController } from "@/components/form-controllers/InputController";
import { Loader2 } from "lucide-react";
import { TagCategoryFormModalProps } from "./TagCategoryFormModal.types";
import { useTagCategoryFormModal } from "./TagCategoryFormModal.hooks";

export function TagCategoryFormModal(props: TagCategoryFormModalProps) {
  const { open, onOpenChange } = props;
  const { form, onSubmit, isPending } = useTagCategoryFormModal(props);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <FormProvider {...form}>
          <DialogHeader className="p-6 pb-2">
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>Add a new category to group your tags.</DialogDescription>
          </DialogHeader>

          <div className="px-6 py-4 space-y-4">
            <InputController
              variant="adminPrimary"
              control={form.control}
              name="name"
              label="Category Name"
              placeholder="e.g., Biblical Characters"
              error={form.formState.errors.name?.message}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium">Category Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  {...form.register("color")}
                  className="h-10 w-20 rounded border border-[#E2E8F0] p-1 cursor-pointer bg-white"
                />
                <span className="text-sm font-mono text-[#656A73] uppercase">{form.watch("color")}</span>
              </div>
            </div>
          </div>

          <DialogFooter className="p-6 pt-2 flex sm:justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="button" variant="actionSubmit" onClick={onSubmit} disabled={isPending}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Category
            </Button>
          </DialogFooter>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}
