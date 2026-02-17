import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { PasswordInput, passwordInputVariants } from "@/components/ui/password-input";
import type { VariantProps } from "class-variance-authority";

export type PasswordInputControllerProps<T extends FieldValues> = Omit<
  React.ComponentProps<typeof PasswordInput>,
  "value" | "onChange" | "onBlur" | "name"
> &
  VariantProps<typeof passwordInputVariants> & {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    error?: string;
  };
