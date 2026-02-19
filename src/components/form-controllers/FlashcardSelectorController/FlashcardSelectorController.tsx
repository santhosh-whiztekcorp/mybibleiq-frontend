"use client";

import { Controller, FieldValues } from "react-hook-form";
import { AdminFlashcardSelector } from "@/components/admin/admin-shared/AdminFlashcardSelector";
import { FlashcardSelectorControllerProps } from "./FlashcardSelectorController.types";

export function FlashcardSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  disabled,
  filters = { status: "Published" },
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
          filters={filters}
        />
      )}
    />
  );
}
