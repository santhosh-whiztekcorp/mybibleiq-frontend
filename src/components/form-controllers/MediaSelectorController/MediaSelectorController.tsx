"use client";

import { Controller, type FieldValues } from "react-hook-form";
import { AdminMediaSelector } from "@/components/admin/admin-shared/AdminMediaSelector";
import type { MediaSelectorControllerProps } from "./MediaSelectorController.types";

export function MediaSelectorController<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  disabled,
  filters = { status: "Published" },
  gridCols,
}: MediaSelectorControllerProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <AdminMediaSelector
          value={field.value ?? undefined}
          onChange={(v) => field.onChange(v ?? undefined)}
          label={label}
          placeholder={placeholder}
          disabled={disabled}
          filters={filters}
          gridCols={gridCols}
        />
      )}
    />
  );
}
