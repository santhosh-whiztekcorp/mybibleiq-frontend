"use client";

import * as React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SelectControllerProps } from "./SelectController.types";

export function SelectController<T extends FieldValues>({
  control,
  name,
  label,
  error,
  variant = "default",
  options,
  placeholder = "Select an option",
  portalContainer,
  ...props
}: SelectControllerProps<T>) {
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
          <Select
            value={field.value ?? ""}
            onValueChange={field.onChange}
            onOpenChange={(open) => {
              if (!open) {
                field.onBlur();
              }
            }}
          >
            <SelectTrigger
              {...props}
              variant={variant}
              id={name}
              aria-invalid={!!error}
              aria-describedby={error ? `${name}-error` : undefined}
            >
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent container={portalContainer}>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex flex-col items-start gap-1 max-w-lg">
                    <span className="font-medium">{option.label}</span>
                    {option.description && (
                      <span className="text-xs text-muted-foreground text-wrap text-left">{option.description}</span>
                    )}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
