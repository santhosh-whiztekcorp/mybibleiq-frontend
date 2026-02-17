import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { Input, inputVariants } from "@/components/ui/input";
import type { VariantProps } from "class-variance-authority";

export type InputControllerProps<T extends FieldValues> = Omit<
  React.ComponentProps<typeof Input>,
  "value" | "onChange" | "onBlur" | "name"
> &
  VariantProps<typeof inputVariants> & {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    error?: string;
  };
