"use client";

import { Controller, FieldValues } from "react-hook-form";
import { AdminUserSelector } from "@/components/admin/admin-shared";
import { UserSelectorControllerProps } from "./UserSelectorController.types";

export function UserSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  error,
  disabled,
}: UserSelectorControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <AdminUserSelector
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
