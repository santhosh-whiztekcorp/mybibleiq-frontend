"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const sliderTrackVariants = cva(
  "relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
  {
    variants: {
      variant: {
        default: "bg-muted",
        adminPrimary: "bg-[#EBEBF0]",
        adminSecondary: "bg-[#E4E5EC]",
        userGroup: "bg-[#EBEBF0]",
        userQuiz: "bg-[#EBEBF0]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const sliderRangeVariants = cva("absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full", {
  variants: {
    variant: {
      default: "bg-primary",
      adminPrimary: "bg-[#202020]",
      adminSecondary: "bg-[#2563EB]",
      userGroup: "bg-[#00C851]",
      userQuiz: "bg-[#00C851]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const sliderThumbVariants = cva(
  "block shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "size-4 border-primary ring-ring/50 bg-white",
        adminPrimary: "size-4 border-[#C7C7C7] ring-[#C7C7C7]/50 bg-white",
        adminSecondary: "size-4 border-[#2563EB] ring-[#2563EB]/50 bg-white",
        userGroup: "size-4 border-[#00C851] ring-[#00C851]/50 bg-white",
        userQuiz: "size-5 border-[#00C851] ring-[#00C851]/50 bg-[#00C851]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  variant = "default",
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & VariantProps<typeof sliderTrackVariants>) {
  const _values = React.useMemo(
    () => (Array.isArray(value) ? value : Array.isArray(defaultValue) ? defaultValue : [min, max]),
    [value, defaultValue, min, max]
  );

  return (
    <SliderPrimitive.Root
      data-slot="slider"
      data-variant={variant}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    >
      <SliderPrimitive.Track data-slot="slider-track" className={cn(sliderTrackVariants({ variant }))}>
        <SliderPrimitive.Range data-slot="slider-range" className={cn(sliderRangeVariants({ variant }))} />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb data-slot="slider-thumb" key={index} className={cn(sliderThumbVariants({ variant }))} />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider, sliderTrackVariants, sliderRangeVariants, sliderThumbVariants };
