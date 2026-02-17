"use client";

import * as React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Input } from "@/components/ui/input";
import type { InputControllerProps } from "./InputController.types";

export function InputController<T extends FieldValues>({
  control,
  name,
  label,
  error,
  variant = "default",
  ...props
}: InputControllerProps<T>) {
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
        render={({ field: { value, onChange, ...field } }) => (
          <Input
            {...field}
            {...props}
            value={value ?? ""}
            onChange={(e) => {
              const val = e.target.value;
              if (props.type === "number") {
                onChange(val === "" ? undefined : Number(val));
              } else {
                onChange(val);
              }
            }}
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
