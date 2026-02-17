"use client";

import { Controller, FieldValues, Path, Control } from "react-hook-form";
import { AdminQuestionSelector } from "@/components/admin/admin-shared/AdminQuestionSelector";

export type QuestionSelectorControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

export function QuestionSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  disabled,
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
        />
      )}
    />
  );
}
