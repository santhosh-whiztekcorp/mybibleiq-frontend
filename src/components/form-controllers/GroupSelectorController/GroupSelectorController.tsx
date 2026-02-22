"use client";

import { Controller, FieldValues } from "react-hook-form";
import { AdminGroupSelector } from "@/components/admin/admin-shared";
import { GroupSelectorControllerProps } from "./GroupSelectorController.types";

export function GroupSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  disabled,
}: GroupSelectorControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <AdminGroupSelector
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
