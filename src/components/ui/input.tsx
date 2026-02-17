import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const inputVariants = cva(
  "file:text-foreground selection:bg-primary selection:text-primary-foreground w-full min-w-0 border shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-ring/50 focus-visible:ring-[1.5px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          "placeholder:text-muted-foreground dark:bg-input/30 border-input h-9 rounded-md bg-transparent px-3 py-1 text-base md:text-sm",
        authPrimary:
          "placeholder:text-[#656A73] bg-white border-[#E9EAEC] h-auto rounded-2xl px-3.5 py-4 text-sm font-medium",
        adminPrimary:
          "placeholder:text-[#83827E] bg-[#F3F3F5] border-[#F3F3F5] h-auto rounded-[10px] px-3 py-3 text-xs font-semibold",
        adminSecondary:
          "placeholder:text-[#656A73] bg-[#F3F3F5] border-[#DADADA] h-auto rounded-[10px] px-3 py-2.5 text-[13px] font-semibold",
        adminSearchBar:
          "placeholder:text-[#83827E] bg-[#F0F0F0] border-[#F0F0F0] h-auto rounded-[10px] px-3 py-3 text-xs font-semibold",
        userGroup:
          "placeholder:text-[#83827E] bg-white border-white h-auto rounded-[10px] px-3 py-3 text-xs font-normal",
        userGroupForm:
          "placeholder:text-[#83827E] bg-white border-[#D9D9D9] h-auto rounded-[10px] px-3 py-3 text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Input({
  className,
  type,
  variant = "default",
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <input
      type={type}
      data-slot="input"
      data-variant={variant}
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Input, inputVariants };
