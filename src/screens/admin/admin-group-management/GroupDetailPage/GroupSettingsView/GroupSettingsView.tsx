"use client";

import Image from "next/image";
import { useGroupSettingsView } from "./GroupSettingsView.hooks";
import {
  ADMIN_GROUP_ICON_SET,
  ADMIN_GROUP_TYPE_SELECT_OPTIONS,
  ADMIN_GROUP_PRIVACY_SELECT_OPTIONS,
} from "@/resources/admin-group-management/admin-group-management.constants";
import { Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { InputController } from "@/components/form-controllers/InputController/InputController";
import { TextareaController } from "@/components/form-controllers/TextareaController/TextareaController";
import { SelectController } from "@/components/form-controllers/SelectController/SelectController";
import { FormProvider } from "react-hook-form";

export function GroupSettingsView() {
  const { group, isLoading, isSaving, form, iconPath, onSave, onCancel, setValue } = useGroupSettingsView();

  if (isLoading && !group) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!group && !isLoading) {
    return (
      <div className="p-12 text-center flex flex-col items-center">
        <AlertCircle className="h-10 w-10 text-slate-400 mb-4" />
        <p className="text-slate-500">Could not load group settings.</p>
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <div className="max-w-xl space-y-6">
        <div className="flex flex-col gap-8">
          {/* Form */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Group Name */}
              <div className="md:col-span-2">
                <InputController
                  control={form.control}
                  name="name"
                  label="Group Name"
                  placeholder="Enter group name"
                  variant="adminPrimary"
                  error={form.formState.errors.name?.message}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <TextareaController
                  control={form.control}
                  name="description"
                  label="Description"
                  placeholder="Describe what this group is about"
                  variant="adminPrimary"
                  error={form.formState.errors.description?.message}
                  className="min-h-[120px]"
                />
              </div>

              {/* Type */}
              <SelectController
                control={form.control}
                name="type"
                label="Group Type"
                placeholder="Select type"
                variant="adminPrimary"
                options={ADMIN_GROUP_TYPE_SELECT_OPTIONS.filter((o) => o.value !== "")}
                error={form.formState.errors.type?.message}
              />

              {/* Privacy */}
              <SelectController
                control={form.control}
                name="privacy"
                label="Privacy Setting"
                placeholder="Select privacy"
                variant="adminPrimary"
                options={ADMIN_GROUP_PRIVACY_SELECT_OPTIONS.filter((o) => o.value !== "")}
                error={form.formState.errors.privacy?.message}
              />
            </div>

            {/* Icon Picker */}
            <div className="space-y-3">
              <Label className="text-sm font-semibold text-slate-700">Group Icon</Label>
              <div className="grid grid-cols-6 sm:grid-cols-6 md:grid-cols-8 gap-3 mt-2">
                {Object.entries(ADMIN_GROUP_ICON_SET).map(([key, icon]) => {
                  const isSelected = iconPath === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setValue("iconPath", key, { shouldValidate: true, shouldDirty: true })}
                      className={cn(
                        "aspect-square rounded-xl flex items-center justify-center transition-all duration-200 border-2",
                        isSelected
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-transparent bg-slate-50 hover:bg-slate-100"
                      )}
                    >
                      <Image src={icon} alt={key} width={32} height={32} className="object-contain" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-t border-gray-50 pt-6">
              <Button
                variant="outline"
                type="button"
                onClick={onCancel}
                className="flex-1 h-12 rounded-xl text-sm font-bold border-gray-200 text-slate-600 hover:bg-slate-50"
                disabled={isSaving}
              >
                Cancel
              </Button>
              <Button
                onClick={onSave}
                className="flex-1 h-12 rounded-xl text-sm font-bold bg-pink-400 hover:bg-pink-500 text-white shadow-sky-100"
                disabled={isSaving || !form.formState.isDirty || !form.formState.isValid}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
