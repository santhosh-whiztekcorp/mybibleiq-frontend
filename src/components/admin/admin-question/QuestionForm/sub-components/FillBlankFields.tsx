"use client";

import React, { useEffect, useMemo } from "react";
import { useFormContext, useFieldArray, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { InputController } from "@/components/form-controllers";
import type { FillBlankFormErrors } from "../QuestionForm.types";

const parseBlanksFromText = (text: string): string[] => {
  const patterns = [/\{[^}]+\}/g, /_{3,}/g];

  const matches = patterns.flatMap((pattern) => text.match(pattern) || []);

  return matches.map((_, index) => `Blank${index + 1}`);
};

// Nested Options Component for each blank
function BlankOptions({ blankIndex }: { blankIndex: number }) {
  const {
    control,
    setValue,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `fillBlank.blanks.${blankIndex}.options`,
  });

  const blanks = useWatch({
    control,
    name: `fillBlank.blanks.${blankIndex}.options`,
  });

  const fillBlankErrors = errors.fillBlank as FillBlankFormErrors | undefined;
  const optionsErrors = fillBlankErrors?.blanks?.[blankIndex]?.options;

  const toggleCorrect = (optionIndex: number) => {
    fields.forEach((_, i) => {
      setValue(`fillBlank.blanks.${blankIndex}.options.${i}.isCorrect`, i === optionIndex);
    });
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-bold text-[#656A73] uppercase tracking-widest">
          Answer Options <span className="text-red-500">*</span>{" "}
          <span className="normal-case font-normal text-muted-foreground ml-1">(Minimum 1 option)</span>
        </label>
      </div>

      <div className="space-y-3">
        {fields.map((field, index) => (
          <div key={field.id} className="group animate-in fade-in slide-in-from-left-1 duration-200">
            <div className="flex items-start gap-2">
              <div className="flex-1">
                <InputController
                  control={control}
                  name={`fillBlank.blanks.${blankIndex}.options.${index}.text`}
                  placeholder={`Option ${index + 1}`}
                  variant="adminPrimary"
                  error={optionsErrors?.[index]?.text?.message}
                />
              </div>

              <div className="shrink-0 pt-0.5">
                <Button
                  type="button"
                  variant={blanks?.[index]?.isCorrect ? "actionPublish" : "outline"}
                  size="sm"
                  className="h-10 px-3 font-bold text-[11px]"
                  onClick={() => toggleCorrect(index)}
                >
                  Correct
                </Button>
              </div>

              {fields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 border border-[#E2E8F0] shrink-0"
                  onClick={() => remove(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="h-9 text-[11px] font-bold text-primary hover:bg-primary/5 border border-dashed border-primary/20 w-fit px-4"
        onClick={() => append({ text: "", isCorrect: false })}
      >
        <Plus className="h-3 w-3 mr-1" />
        Add Option
      </Button>
    </div>
  );
}

export function FillBlankFields() {
  const { control, getValues, setValue } = useFormContext();

  const questionText = useWatch({ control, name: "questionText" }) || "";

  // Parse blanks from question text
  const parsedBlanks = useMemo(() => parseBlanksFromText(questionText), [questionText]);

  const { fields, replace } = useFieldArray({
    control,
    name: "fillBlank.blanks",
  });

  // Watch blanks to get latest names for rendering
  const blanksValues = useWatch({
    control,
    name: "fillBlank.blanks",
  });

  // Auto-generate blanks when question text changes (Mobile Logic)
  useEffect(() => {
    if (parsedBlanks.length > 0) {
      const currentBlanks: { name: string }[] = getValues("fillBlank.blanks") || [];
      const currentBlankNames = currentBlanks.map((b) => b.name);

      // Check if we need to update blanks
      const needsUpdate =
        parsedBlanks.length !== currentBlanks.length || parsedBlanks.some((name) => !currentBlankNames.includes(name));

      if (needsUpdate) {
        const newBlanks = parsedBlanks.map((blankName) => {
          // Try to find existing blank with same name to preserve options
          const existingBlank = currentBlanks.find((b) => b.name === blankName);
          if (existingBlank) {
            return existingBlank;
          }
          // Create new blank with at least one empty option
          return {
            name: blankName,
            options: [{ text: "", isCorrect: false }],
          };
        });
        replace(newBlanks);
      }
    } else {
      // Clear blanks if no placeholders found
      if (fields.length > 0) {
        replace([]);
      }
    }
  }, [parsedBlanks, replace, fields.length, getValues]);

  // Initial setup if null
  useEffect(() => {
    const currentFillBlank = getValues("fillBlank");
    if (!currentFillBlank) {
      setValue("fillBlank", { blanks: [] }, { shouldValidate: false });
    }
  }, [getValues, setValue]);

  if (fields.length === 0) {
    return (
      <div className="p-6 bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] border-dashed flex flex-col items-center justify-center text-center gap-2">
        <p className="text-sm font-semibold text-[#656A73]">No blanks detected.</p>
        <p className="text-xs text-muted-foreground">
          Add placeholders like{" "}
          <code className="bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0] font-mono text-primary font-bold">
            {"{Blank1}"}
          </code>
          ,{" "}
          <code className="bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0] font-mono text-primary font-bold">
            {"{Blank2}"}
          </code>{" "}
          in your Question Text above to generate blanks automatically.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {fields.map((field, index) => {
          // Use watched value for name
          const blankName = blanksValues?.[index]?.name || "";
          return (
            <div
              key={field.id}
              className="p-5 bg-white rounded-xl border border-[#E2E8F0] shadow-sm space-y-4 animate-in fade-in zoom-in-95 duration-300"
            >
              <div className="flex items-center gap-2 border-b border-[#F1F5F9] pb-3 mb-2">
                <span className="text-sm font-bold text-[#0F172A] bg-[#F1F5F9] px-2 py-0.5 rounded-md">
                  {blankName}
                </span>
                <span className="text-[10px] uppercase font-bold text-red-500 tracking-wider">Required</span>
              </div>

              <BlankOptions blankIndex={index} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
