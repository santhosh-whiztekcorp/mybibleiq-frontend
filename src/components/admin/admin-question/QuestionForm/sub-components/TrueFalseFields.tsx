"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function TrueFalseFields() {
  const { setValue, watch } = useFormContext();
  const isCorrect = watch("trueFalse.isCorrect");

  // Initialize if undefined
  React.useEffect(() => {
    if (isCorrect === undefined) {
      setValue("trueFalse.isCorrect", true);
    }
  }, [isCorrect, setValue]);

  return (
    <div className="space-y-4 pt-2">
      <label className="text-[11px] font-bold text-[#656A73] uppercase tracking-wider">Select Correct Answer</label>
      <div className="grid grid-cols-2 gap-4">
        <Button
          type="button"
          variant={isCorrect === true ? "actionPublish" : "outline"}
          className={cn(
            "h-10 text-base font-bold transition-all duration-300 rounded-xl border-2",
            isCorrect === true
              ? "border-green-500 bg-green-50 text-green-700 shadow-sm"
              : "border-[#E2E8F0] grayscale hover:grayscale-0"
          )}
          onClick={() => setValue("trueFalse.isCorrect", true)}
        >
          True
        </Button>
        <Button
          type="button"
          variant={isCorrect === false ? "actionDelete" : "outline"}
          className={cn(
            "h-10 text-base font-bold transition-all duration-300 rounded-xl border-2",
            isCorrect === false
              ? "border-red-500 bg-red-50 text-red-700 shadow-sm"
              : "border-[#E2E8F0] grayscale hover:grayscale-0"
          )}
          onClick={() => setValue("trueFalse.isCorrect", false)}
        >
          False
        </Button>
      </div>
    </div>
  );
}
