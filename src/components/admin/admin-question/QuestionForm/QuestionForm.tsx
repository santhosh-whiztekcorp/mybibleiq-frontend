"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  InputController,
  TagSelectorController,
  SelectController,
  CheckboxController,
} from "@/components/form-controllers";
import { useQuestionForm } from "./QuestionForm.hooks";
import type { QuestionFormProps } from "./QuestionForm.types";
import { QUESTION_TYPE_OPTIONS, QUESTION_TYPE_LABELS } from "@/resources/admin-question/admin-question.constants";
import { MCQFields } from "./sub-components/MCQFields";
import { TrueFalseFields } from "./sub-components/TrueFalseFields";
import { MatchFields } from "./sub-components/MatchFields";
import { FillBlankFields } from "./sub-components/FillBlankFields";
import { OneWordFields } from "./sub-components/OneWordFields";
import { OrderFields } from "./sub-components/OrderFields";

export function QuestionForm(props: QuestionFormProps) {
  const { form, onSubmit, isMutationLoading, isEditMode, questionType } = useQuestionForm(props);
  const [open, setOpen] = React.useState(true);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      props.onClose?.();
    }
  };

  const renderTypeSpecificForm = () => {
    switch (questionType) {
      case "MCQ":
        return <MCQFields />;
      case "TRUE_FALSE":
        return <TrueFalseFields />;
      case "MATCH":
        return <MatchFields />;
      case "FILL_BLANK":
        return <FillBlankFields />;
      case "ONE_WORD":
        return <OneWordFields />;
      case "ORDER":
        return <OrderFields />;
      default:
        return null;
    }
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-xl overflow-y-auto p-0">
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="flex flex-col h-full">
            <div className="px-4 pt-4 pb-0">
              <SheetHeader className="px-0 pb-2 border-b border-[#F1F5F9]">
                <SheetTitle className="text-xl font-bold text-black">
                  {isEditMode ? "Edit Question" : "Create New Question"}
                </SheetTitle>
                <SheetDescription className="text-sm font-semibold text-[#656A73]">
                  {isEditMode ? "Update the question details." : "Fill in the details to create a new question."}
                </SheetDescription>
              </SheetHeader>
            </div>

            <ScrollArea className="flex-1 px-4 mt-2">
              <div className="space-y-6 pt-4 pb-8 px-1">
                {/* Basic Info Section */}
                <div className="space-y-4">
                  <SelectController
                    variant="adminPrimary"
                    control={form.control}
                    name="type"
                    label="Question Type"
                    options={QUESTION_TYPE_OPTIONS.map((type) => ({
                      label: QUESTION_TYPE_LABELS[type],
                      value: type,
                    }))}
                    error={form.formState.errors.type?.message}
                  />

                  <InputController
                    variant="adminPrimary"
                    control={form.control}
                    name="questionText"
                    label="Question Text"
                    placeholder="Enter the question text here..."
                    error={form.formState.errors.questionText?.message}
                    required
                  />

                  <TagSelectorController
                    control={form.control}
                    name="tags"
                    label="Tags"
                    placeholder="Select or search tags..."
                    error={form.formState.errors.tags?.message}
                  />

                  <CheckboxController
                    control={form.control}
                    name="shuffle"
                    label="Shuffle Options"
                    description="If enabled, options will be presented in a random order to users."
                  />
                </div>

                {/* Type Specific Config Section */}
                <div className="pt-6 border-t border-[#F1F5F9]">
                  {questionType && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold text-black flex items-center gap-2">
                        {QUESTION_TYPE_LABELS[questionType]} Configuration
                      </h3>
                      {renderTypeSpecificForm()}
                    </div>
                  )}
                </div>
              </div>
            </ScrollArea>

            <SheetFooter className="px-4 pt-4 pb-8 gap-2 shrink-0 border-t border-[#E2E8F0] mt-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="w-full h-11"
                disabled={isMutationLoading}
              >
                Cancel
              </Button>
              <Button type="submit" variant="actionSubmit" className="w-full h-11" disabled={isMutationLoading}>
                {isMutationLoading ? "Saving..." : isEditMode ? "Update Question" : "Create Question"}
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
