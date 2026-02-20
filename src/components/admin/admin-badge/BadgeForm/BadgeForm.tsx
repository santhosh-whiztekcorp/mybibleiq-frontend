"use client";

import { FormProvider } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  InputController,
  TextareaController,
  TagSelectorController,
  SelectController,
  MediaSelectorController,
} from "@/components/form-controllers";
import { useBadgeForm } from "./BadgeForm.hooks";
import { BadgeFormProps } from "./BadgeForm.types";
import {
  BADGE_RARITY_OPTIONS,
  BADGE_RARITY_LABELS,
  BADGE_RARITY_DESCRIPTIONS,
  BADGE_CATEGORY_OPTIONS,
  BADGE_CATEGORY_LABELS,
  BADGE_CATEGORY_DESCRIPTIONS,
  BADGE_ASSIGNMENT_TYPE_OPTIONS,
  BADGE_ASSIGNMENT_TYPE_LABELS,
  BADGE_ASSIGNMENT_TYPE_DESCRIPTIONS,
  BADGE_TRIGGER_TYPE_OPTIONS,
  BADGE_TRIGGER_TYPE_LABELS,
  BADGE_CONDITION_OPERATOR_OPTIONS,
  BADGE_CONDITION_OPERATOR_LABELS,
  BADGE_METRIC_OPTIONS_BY_TRIGGER,
} from "@/resources/admin-badge/admin-badge.constants";
import { BadgeTriggerType } from "@/resources/admin-badge/admin-badge.types";
import { Loader2 } from "lucide-react";
import { useEffect, useMemo } from "react";

export function BadgeForm(props: BadgeFormProps) {
  const { form, onSubmit, isMutationLoading, isEditMode } = useBadgeForm(props);
  const { onClose } = props;

  const assignmentType = form.watch("assignmentType");
  const triggerType = form.watch("triggerConfig.triggerType") as BadgeTriggerType;

  const metricOptions = useMemo(() => {
    if (!triggerType) return [];
    return BADGE_METRIC_OPTIONS_BY_TRIGGER[triggerType] || [];
  }, [triggerType]);

  // Reset metric type if it's not valid for the selected trigger type
  useEffect(() => {
    if (triggerType && metricOptions.length > 0) {
      const currentMetric = form.getValues("triggerConfig.metric.type");
      const isValid = metricOptions.some((opt) => opt.value === currentMetric);
      if (!isValid) {
        form.setValue("triggerConfig.metric.type", metricOptions[0].value);
      }
    }
  }, [triggerType, metricOptions, form]);

  return (
    <Sheet open={true} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-xl p-0 flex flex-col gap-0 ">
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="flex-1 flex flex-col h-full overflow-hidden">
            <SheetHeader className="px-5 py-4 border-[#E2E8F0] bg-white sticky top-0 z-10">
              <SheetTitle className="text-xl font-bold text-gray-900">
                {isEditMode ? "Edit Badge" : "Create New Badge"}
              </SheetTitle>
              <SheetDescription className="text-sm text-gray-500">
                {isEditMode ? "Update the badge details below." : "Fill in the details to create a new badge."}
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <div className="space-y-6 mx-auto px-5 py-2 pb-4">
                {/* Basic Info */}
                <div className="space-y-4">
                  <InputController
                    variant="adminPrimary"
                    control={form.control}
                    name="name"
                    label="Badge Name"
                    placeholder="e.g. Early Adopter"
                  />

                  <TextareaController
                    variant="adminPrimary"
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Describe what the badge is for..."
                  />

                  <TagSelectorController
                    control={form.control}
                    name="tags"
                    label="Tags"
                    placeholder="Type and press enter to add tags..."
                  />

                  <MediaSelectorController
                    control={form.control}
                    name="iconMediaId"
                    label="Badge Icon"
                    placeholder="Select badge icon"
                    filters={{ status: "Published", type: "IMAGE" }}
                    gridCols={3}
                  />
                </div>

                {/* Classification */}
                <div>
                  <div className="grid grid-cols-1 gap-4">
                    <SelectController
                      variant="adminPrimary"
                      control={form.control}
                      name="rarity"
                      label="Rarity"
                      options={BADGE_RARITY_OPTIONS.map((opt) => ({
                        label: BADGE_RARITY_LABELS[opt as keyof typeof BADGE_RARITY_LABELS],
                        value: opt,
                        description: BADGE_RARITY_DESCRIPTIONS[opt as keyof typeof BADGE_RARITY_DESCRIPTIONS],
                      }))}
                      className="h-auto"
                    />

                    <SelectController
                      variant="adminPrimary"
                      control={form.control}
                      name="category"
                      label="Category"
                      options={BADGE_CATEGORY_OPTIONS.map((opt) => ({
                        label: BADGE_CATEGORY_LABELS[opt as keyof typeof BADGE_CATEGORY_LABELS],
                        value: opt,
                        description: BADGE_CATEGORY_DESCRIPTIONS[opt as keyof typeof BADGE_CATEGORY_DESCRIPTIONS],
                      }))}
                      className="h-auto"
                    />
                  </div>
                </div>

                {/* Assignment & Conditions */}
                <div>
                  <SelectController
                    variant="adminPrimary"
                    control={form.control}
                    name="assignmentType"
                    label="Assignment Type"
                    options={BADGE_ASSIGNMENT_TYPE_OPTIONS.map((opt) => ({
                      label: BADGE_ASSIGNMENT_TYPE_LABELS[opt as keyof typeof BADGE_ASSIGNMENT_TYPE_LABELS],
                      value: opt,
                      description:
                        BADGE_ASSIGNMENT_TYPE_DESCRIPTIONS[opt as keyof typeof BADGE_ASSIGNMENT_TYPE_DESCRIPTIONS],
                    }))}
                    className="h-auto"
                  />

                  {assignmentType === "Automatic" && (
                    <div className="p-4 bg-white rounded-lg border border-gray-200  flex flex-col gap-4 mt-6">
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Trigger Condition</p>

                      <SelectController
                        variant="adminPrimary"
                        control={form.control}
                        name="triggerConfig.triggerType"
                        label="Trigger Type"
                        options={BADGE_TRIGGER_TYPE_OPTIONS.map((opt) => ({
                          label: BADGE_TRIGGER_TYPE_LABELS[opt as keyof typeof BADGE_TRIGGER_TYPE_LABELS],
                          value: opt,
                        }))}
                      />

                      <SelectController
                        variant="adminPrimary"
                        control={form.control}
                        name="triggerConfig.metric.type"
                        label="Metric Key"
                        options={metricOptions}
                        placeholder="Select metric key"
                      />

                      <div className="grid grid-cols-2 gap-4">
                        <SelectController
                          variant="adminPrimary"
                          control={form.control}
                          name="triggerConfig.operator"
                          label="Operator"
                          options={BADGE_CONDITION_OPERATOR_OPTIONS.map((opt) => ({
                            label: BADGE_CONDITION_OPERATOR_LABELS[opt as keyof typeof BADGE_CONDITION_OPERATOR_LABELS],
                            value: opt,
                          }))}
                        />
                        <InputController
                          variant="adminPrimary"
                          control={form.control}
                          name="triggerConfig.threshold"
                          label="Threshold"
                          type="number"
                          placeholder="e.g. 5"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-4 border-t border-[#E2E8F0] bg-white mt-auto">
              <Button type="button" variant="outline" onClick={onClose} disabled={isMutationLoading}>
                Cancel
              </Button>
              <Button type="submit" variant="actionSubmit" disabled={isMutationLoading}>
                {isMutationLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isEditMode ? "Save Changes" : "Create Badge"}
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
