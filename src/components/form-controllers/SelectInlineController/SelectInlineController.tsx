"use client";

import * as React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { SelectInline } from "@/components/ui/select-inline";
import type { SelectInlineControllerProps } from "./SelectInlineController.types";

export function SelectInlineController<T extends FieldValues>({
  control,
  name,
  label,
  error,
  variant = "default",
  options,
  placeholder = "Select an option",
  ...props
}: SelectInlineControllerProps<T>) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={name} className="text-sm font-medium">
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <SelectInline
            {...props}
            variant={variant}
            id={name}
            aria-describedby={error ? `${name}-error` : undefined}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
              field.onBlur();
            }}
            options={options}
            placeholder={placeholder}
          />
        )}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
