"use client";

import * as React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Slider } from "@/components/ui/slider";
import type { SliderControllerProps } from "./SliderController.types";

export function SliderController<T extends FieldValues>({
  control,
  name,
  label,
  error,
  variant = "default",
  ...props
}: SliderControllerProps<T>) {
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
          <Slider
            {...props}
            variant={variant}
            value={Array.isArray(field.value) ? field.value : [field.value ?? 0]}
            onValueChange={(values) => {
              field.onChange(values.length === 1 ? values[0] : values);
              field.onBlur();
            }}
            id={name}
            aria-invalid={!!error}
            aria-describedby={error ? `${name}-error` : undefined}
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
