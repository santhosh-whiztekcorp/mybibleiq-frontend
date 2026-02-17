import type { Control, FieldPath, FieldValues } from "react-hook-form";
import type { Slider, sliderTrackVariants } from "@/components/ui/slider";
import type { VariantProps } from "class-variance-authority";

export type SliderControllerProps<T extends FieldValues> = Omit<
  React.ComponentProps<typeof Slider>,
  "value" | "onValueChange" | "name"
> &
  VariantProps<typeof sliderTrackVariants> & {
    control: Control<T>;
    name: FieldPath<T>;
    label?: string;
    error?: string;
  };
