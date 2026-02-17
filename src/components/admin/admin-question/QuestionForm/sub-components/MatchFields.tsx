"use client";

import React from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { InputController } from "@/components/form-controllers";
import type { MatchingFormErrors } from "../QuestionForm.types";

export function MatchFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "matching.pairs",
  });

  const matchingErrors = errors.matching as MatchingFormErrors | undefined;

  // Initialize pairs if empty
  React.useEffect(() => {
    if (fields.length === 0) {
      append({ left: "", right: "" });
      append({ left: "", right: "" });
    }
  }, [fields.length, append]);

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <label className="text-[11px] font-bold text-[#656A73] uppercase tracking-wider flex items-center">
          Matching Pairs <span className="text-red-500 mx-1">*</span>
          <span className="normal-case font-normal text-muted-foreground">(Minimum 2 pairs)</span>
        </label>

        <div className="space-y-3">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="p-3 bg-white rounded-xl border border-[#E2E8F0] shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300 hover:border-[#CBD5E1] transition-colors"
            >
              <div className="flex items-start gap-3">
                <div className="flex-1">
                  <InputController
                    control={control}
                    name={`matching.pairs.${index}.left`}
                    placeholder={`Enter left text for pair ${index + 1}`}
                    variant="adminPrimary"
                    error={matchingErrors?.pairs?.[index]?.left?.message}
                  />
                </div>

                <div className="flex-1">
                  <InputController
                    control={control}
                    name={`matching.pairs.${index}.right`}
                    placeholder={`Enter right text for pair ${index + 1}`}
                    variant="adminPrimary"
                    error={matchingErrors?.pairs?.[index]?.right?.message}
                  />
                </div>

                {fields.length > 2 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-10 w-10 text-red-500 hover:text-red-600 hover:bg-red-50 shrink-0 border border-transparent hover:border-red-100"
                    onClick={() => remove(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-12 border-dashed border-[#E2E8F0] text-[#656A73] hover:bg-[#F9FAFB] font-bold uppercase text-[11px] tracking-wider"
        onClick={() => append({ left: "", right: "" })}
      >
        <Plus className="h-4 w-4 mr-2" />
        Add Pair
      </Button>
    </div>
  );
}
