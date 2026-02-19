"use client";

import { Controller, FieldValues } from "react-hook-form";
import { AdminQuestionSelector } from "@/components/admin/admin-shared/AdminQuestionSelector";
import { QuestionSelectorControllerProps } from "./QuestionSelectorController.types";

export function QuestionSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  disabled,
  filters = { status: "Published" },
}: QuestionSelectorControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <AdminQuestionSelector
          value={field.value || []}
          onChange={field.onChange}
          label={label}
          placeholder={placeholder}
          error={error || fieldState.error?.message}
          disabled={disabled}
          filters={filters}
        />
      )}
    />
  );
}
