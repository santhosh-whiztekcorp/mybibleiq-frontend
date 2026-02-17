"use client";

import * as React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { DatePicker } from "@/components/ui/date-picker";
import type { DatePickerControllerProps } from "./DatePickerController.types";

export function DatePickerController<T extends FieldValues>({
  control,
  name,
  label,
  error,
  variant = "default",
  ...props
}: DatePickerControllerProps<T>) {
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
        render={({ field }) => {
          let dateValue: Date | undefined = undefined;
          if (field.value) {
            const value = field.value as unknown;
            if (value instanceof Date) {
              dateValue = value;
            } else if (typeof value === "string" || typeof value === "number") {
              dateValue = new Date(value);
            }
          }
          return (
            <DatePicker
              {...props}
              variant={variant}
              value={dateValue}
              onChange={(date) => {
                field.onChange(date);
                field.onBlur();
              }}
              id={name}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            />
          );
        }}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
