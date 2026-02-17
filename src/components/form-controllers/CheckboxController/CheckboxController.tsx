"use client";

import React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import type { CheckboxControllerProps } from "./CheckboxController.types";

export function CheckboxController<T extends FieldValues>({
  control,
  name,
  label,
  description,
  error,
  disabled,
  className,
}: CheckboxControllerProps<T>) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <div className="flex items-start space-x-2">
        <Controller
          control={control}
          name={name}
          render={({ field }) => (
            <Checkbox
              id={name}
              checked={field.value}
              onCheckedChange={field.onChange}
              disabled={disabled}
              className="mt-0.5"
            />
          )}
        />
        <div className="grid gap-1.5 leading-none">
          {label && (
            <label
              htmlFor={name}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              {label}
            </label>
          )}
          {description && <p className="text-[11px] text-[#656A73] font-medium leading-normal">{description}</p>}
        </div>
      </div>
      {error && <p className="text-[11px] text-destructive font-medium ml-6">{error}</p>}
    </div>
  );
}
