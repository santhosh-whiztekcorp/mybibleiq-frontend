"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { InputController, CheckboxController } from "@/components/form-controllers";
import type { OneWordFormErrors } from "../QuestionForm.types";

export function OneWordFields() {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const oneWordErrors = errors.oneWord as OneWordFormErrors | undefined;

  return (
    <div className="space-y-6">
      <InputController
        control={control}
        name="oneWord.answer"
        label="Correct Answer"
        placeholder="Enter the correct word or phrase"
        variant="adminPrimary"
        error={oneWordErrors?.answer?.message}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <CheckboxController
          control={control}
          name="oneWord.caseSensitive"
          label="Case Sensitive"
          description="If enabled, 'Bible' and 'bible' will be different."
        />

        <CheckboxController
          control={control}
          name="oneWord.allowTrim"
          label="Auto Trim"
          description="Remove leading/trailing spaces from user input."
        />
      </div>
    </div>
  );
}
