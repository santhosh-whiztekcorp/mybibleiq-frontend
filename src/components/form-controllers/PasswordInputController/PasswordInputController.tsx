"use client";

import * as React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { PasswordInput } from "@/components/ui/password-input";
import type { PasswordInputControllerProps } from "./PasswordInputController.types";

export function PasswordInputController<T extends FieldValues>({
  control,
  name,
  label,
  error,
  variant = "default",
  ...props
}: PasswordInputControllerProps<T>) {
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
          <PasswordInput
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
