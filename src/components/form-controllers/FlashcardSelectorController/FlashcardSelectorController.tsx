"use client";

import { Controller, FieldValues, Path, Control } from "react-hook-form";
import { AdminFlashcardSelector } from "@/components/admin/admin-shared/AdminFlashcardSelector";

export type FlashcardSelectorControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
};

export function FlashcardSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  disabled,
}: FlashcardSelectorControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <AdminFlashcardSelector
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
