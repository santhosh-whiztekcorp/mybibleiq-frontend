"use client";

import * as React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import type { TextareaControllerProps } from "./TextareaController.types";

export function TextareaController<T extends FieldValues>({
  control,
  name,
  label,
  error,
  variant = "default",
  ...props
}: TextareaControllerProps<T>) {
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
          <Textarea
            {...field}
            {...props}
            variant={variant}
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
