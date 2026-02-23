"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { InputController, CheckboxController } from "@/components/form-controllers";
import type { MCQFormErrors } from "../QuestionForm.types";

export function MCQFields() {
  const {
    control,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "mcq.options",
  });

  const multiSelect = watch("mcq.multiSelect");
  const mcqErrors = errors.mcq as MCQFormErrors | undefined;

  // Initialize options if empty
  React.useEffect(() => {
    if (fields.length === 0) {
      append({ text: "", isCorrect: false });
      append({ text: "", isCorrect: false });
    }
  }, [fields.length, append]);

  // When multiSelect is disabled, clear all correct answers
  React.useEffect(() => {
    if (!multiSelect) {
      fields.forEach((_, i) => {
        setValue(`mcq.options.${i}.isCorrect`, false, { shouldValidate: false });
      });
    }
  }, [multiSelect]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleCorrect = (index: number) => {
    if (multiSelect) {
      const current = watch(`mcq.options.${index}.isCorrect`);
      setValue(`mcq.options.${index}.isCorrect`, !current);
    } else {
      // For single select, only one can be correct
      fields.forEach((_, i) => {
        setValue(`mcq.options.${i}.isCorrect`, i === index);
      });
    }
  };

  return (
    <div className="space-y-4">
      <CheckboxController
        control={control}
        name="mcq.multiSelect"
        label="Allow Multiple Correct Answers"
        description="If checked, users can select more than one option as correct."
      />

      <div className="space-y-3 pt-2">
        <label className="text-[11px] font-bold text-[#656A73] uppercase tracking-wider">Options</label>
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex items-start gap-2 group animate-in fade-in slide-in-from-left-2 duration-300"
          >
            <div className="flex-1">
              <div className="flex items-start gap-2">
                <div className="flex-1">
                  <InputController
                    control={control}
                    name={`mcq.options.${index}.text`}
                    variant="adminPrimary"
                    placeholder={`Option ${index + 1}`}
                    error={mcqErrors?.options?.[index]?.text?.message}
                  />
                </div>

                <Button
                  type="button"
                  variant={watch(`mcq.options.${index}.isCorrect`) ? "actionPublish" : "outline"}
                  size="sm"
                  className="h-11 px-4 mt-0 shrink-0 font-bold"
                  onClick={() => toggleCorrect(index)}
                >
                  Correct
                </Button>

                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-11 w-11 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0 border border-[#E2E8F0] rounded-lg"
                  onClick={() => remove(index)}
                  disabled={fields.length <= 2}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}

        {mcqErrors?.options?.root && (
          <p className="text-xs text-red-500 font-medium">{mcqErrors.options.root.message}</p>
        )}
      </div>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-full h-11 border-dashed border-[#E2E8F0] text-[#656A73] hover:bg-[#F9FAFB] font-bold uppercase text-[11px] tracking-wider"
        onClick={() => append({ text: "", isCorrect: false })}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add New Option
      </Button>
    </div>
  );
}
