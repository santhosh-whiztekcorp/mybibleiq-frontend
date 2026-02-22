import type { ElementType } from "react";
import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { SelectTrigger, selectTriggerVariants } from "@/components/ui/select";
import type { VariantProps } from "class-variance-authority";

export type SelectOption = {
  label: string;
  value: string;
  description?: string;
  icon?: ElementType<Record<string, unknown>>;
  iconColor?: string;
  disabled?: boolean;
};

export type SelectControllerProps<T extends FieldValues> = Omit<
  React.ComponentProps<typeof SelectTrigger>,
  "value" | "onChange" | "onBlur" | "name"
> &
  VariantProps<typeof selectTriggerVariants> & {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    error?: string;
    options: SelectOption[];
    placeholder?: string;
    /** When inside a Sheet/Modal, pass the form container element to avoid portal conflicts */
    portalContainer?: HTMLElement | null;
  };
