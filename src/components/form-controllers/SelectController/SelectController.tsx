"use client";

import * as React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { SelectControllerProps, SelectOption } from "./SelectController.types";

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
              <SelectValue placeholder={placeholder}>
                {(() => {
                  const selectedOption = options.find((opt: SelectOption) => opt.value === field.value);
                  if (selectedOption?.icon) {
                    const Icon = selectedOption.icon;
                    return (
                      <div className="flex items-center gap-2">
                        <Icon className="h-4 w-4 shrink-0" style={{ color: selectedOption.iconColor }} />
                        <span>{selectedOption.label}</span>
                      </div>
                    );
                  }
                  return selectedOption?.label || placeholder;
                })()}
              </SelectValue>
            </SelectTrigger>
            <SelectContent container={portalContainer}>
              {options.map((option: SelectOption) => {
                const Icon = option.icon;
                return (
                  <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                    <div className="flex items-center gap-2 max-w-lg">
                      {Icon && <Icon className="h-4 w-4 shrink-0" style={{ color: option.iconColor }} />}
                      <div className="flex flex-col items-start gap-1">
                        <span className="font-medium">{option.label}</span>
                        {option.description && (
                          <span className="text-xs text-muted-foreground text-wrap text-left">
                            {option.description}
                          </span>
                        )}
                      </div>
                    </div>
                  </SelectItem>
                );
              })}
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
