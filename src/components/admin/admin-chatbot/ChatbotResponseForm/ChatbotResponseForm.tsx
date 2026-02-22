"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { X } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { SelectController, SwitchController, TextareaController } from "@/components/form-controllers";
import { useChatbotResponseForm } from "./ChatbotResponseForm.hooks";
import type { ChatbotResponseFormProps } from "./ChatbotResponseForm.types";

export function ChatbotResponseForm(props: ChatbotResponseFormProps) {
  const {
    form,
    control,
    isEditMode,
    isLoading,
    categoryOptions,
    handleSave,
    handleCancel,
    keywords,
    keywordInput,
    setKeywordInput,
    handleAddKeyword,
    handleRemoveKeyword,
    keywordHelpText,
  } = useChatbotResponseForm(props);

  const [open, setOpen] = React.useState(true);

  const {
    formState: { errors, isSubmitted, touchedFields, submitCount },
  } = form;

  const showKeywordsError =
    Boolean(errors.keywords?.message) && (isSubmitted || submitCount > 0 || touchedFields.keywords);

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
                {isEditMode ? "Edit Response" : "Create New Response"}
              </SheetTitle>
              <SheetDescription className="text-sm font-semibold text-[#656A73]">
                {isEditMode ? "Update the response details." : "Fill in the details to create a new canned response."}
              </SheetDescription>
            </SheetHeader>

            <ScrollArea className="flex-1">
              <div className="space-y-5 pt-2.5 pb-4 px-1">
                <SelectController
                  variant="adminPrimary"
                  control={control}
                  name="category"
                  label="Category"
                  placeholder="Select category"
                  options={categoryOptions}
                  error={errors.category?.message as string | undefined}
                />

                <TextareaController
                  variant="adminPrimary"
                  control={control}
                  name="question"
                  label="Question"
                  placeholder="Enter question or trigger phrase"
                  rows={3}
                  error={errors.question?.message as string | undefined}
                />

                <TextareaController
                  variant="adminPrimary"
                  control={control}
                  name="answer"
                  label="Answer"
                  placeholder="Enter answer text"
                  rows={5}
                  error={errors.answer?.message as string | undefined}
                />

                <div className="space-y-2">
                  <label className="text-sm font-medium">Keywords</label>
                  <div className="flex items-center gap-2">
                    <Input
                      variant="adminPrimary"
                      value={keywordInput}
                      onChange={(e) => setKeywordInput(e.target.value)}
                      placeholder="Type a keyword and press enter"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddKeyword();
                        }
                      }}
                    />
                    <Button type="button" variant="actionSubmit" className="h-[44px] px-4" onClick={handleAddKeyword}>
                      Add
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {keywords.map((kw) => (
                      <Badge
                        key={kw}
                        variant="tag"
                        className="gap-1 px-2.5 py-1 h-7 rounded-[999px] font-bold border border-[#DADADA] bg-white text-black"
                      >
                        <span className="truncate max-w-[220px]">{kw}</span>
                        <button type="button" className="p-0.5" onClick={() => handleRemoveKeyword(kw)}>
                          <X className="h-3 w-3 opacity-70" />
                        </button>
                      </Badge>
                    ))}
                  </div>

                  {showKeywordsError ? (
                    <p className="text-xs font-semibold text-destructive">{errors.keywords?.message as string}</p>
                  ) : (
                    <p className="text-xs font-semibold text-[#656A73]">{keywordHelpText}</p>
                  )}
                </div>

                <SwitchController
                  control={control}
                  name="enabled"
                  label="Enable"
                  className="data-[state=checked]:bg-[#7EF435] data-[state=checked]:border-[#7EF435]"
                />
              </div>
            </ScrollArea>

            <SheetFooter className="px-0 pt-4 pb-0 gap-2 shrink-0">
              <Button
                variant="actionCancel"
                type="button"
                onClick={handleCancel}
                disabled={isLoading}
                className="w-full"
              >
                Cancel
              </Button>
              <Button
                variant="actionSubmit"
                type="button"
                onClick={handleSave}
                disabled={isLoading || !form.formState.isValid}
                className="w-full"
              >
                {isLoading ? "Saving..." : isEditMode ? "Update Response" : "Create Response"}
              </Button>
            </SheetFooter>
          </div>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
