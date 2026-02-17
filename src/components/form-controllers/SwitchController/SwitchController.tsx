"use client";

import React from "react";
import { Controller, type FieldValues } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import type { SwitchControllerProps } from "./SwitchController.types";

export function SwitchController<T extends FieldValues>({
  control,
  name,
  label,
  error,
  size,
  ...props
}: SwitchControllerProps<T>) {
  return (
    <div className="flex items-center justify-between gap-4">
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          {label}
        </label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <Switch {...props} checked={!!field.value} onCheckedChange={field.onChange} id={name} size={size} />
        )}
      />
      {error && (
        <p id={`${name}-error`} className="text-sm text-destructive mt-1">
          {error}
        </p>
      )}
    </div>
  );
}
