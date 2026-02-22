import type { Control, FieldPath, FieldValues } from "react-hook-form";

export type SwitchControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  error?: string;
  size?: "sm" | "default";
  disabled?: boolean;
  className?: string;
};
