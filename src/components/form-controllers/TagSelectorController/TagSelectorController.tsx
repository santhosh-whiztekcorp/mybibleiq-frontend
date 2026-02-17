"use client";

import { Controller, FieldValues } from "react-hook-form";
import { AdminTagSelector } from "@/components/admin/admin-shared/AdminTagSelector";
import { TagSelectorControllerProps } from "./TagSelectorController.types";

export function TagSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  disabled,
}: TagSelectorControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <AdminTagSelector
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
