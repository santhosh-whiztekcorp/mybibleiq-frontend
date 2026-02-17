"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { AdminBadgeSelector } from "@/components/admin/admin-shared/AdminBadgeSelector";
import type { BadgeSelectorControllerProps } from "./BadgeSelectorController.types";

export function BadgeSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  filters = { status: "Published" },
}: BadgeSelectorControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AdminBadgeSelector
          value={field.value ?? undefined}
          onChange={(v) => field.onChange(v ?? undefined)}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          filters={filters}
        />
      )}
    />
  );
}
