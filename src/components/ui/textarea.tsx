import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "selection:bg-primary selection:text-primary-foreground w-full min-w-0 border shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 focus-visible:ring-ring/50 focus-visible:ring-[1px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex field-sizing-content",
  {
    variants: {
      variant: {
        default:
          "placeholder:text-muted-foreground dark:bg-input/30 border-input min-h-16 rounded-md bg-transparent px-3 py-2 text-base md:text-sm",
        authPrimary:
          "placeholder:text-[#656A73] bg-white border-[#E9EAEC] min-h-20 rounded-2xl px-3.5 py-4 text-sm font-medium",
        adminPrimary:
          "placeholder:text-[#83827E] bg-[#F3F3F5] border-[#F3F3F5] min-h-20 rounded-[10px] px-3 py-3 text-xs font-semibold",
        adminSecondary:
          "placeholder:text-[#656A73] bg-[#F3F3F5] border-[#DADADA] min-h-20 rounded-[10px] px-3 py-2.5 text-[13px] font-semibold",
        adminSearchBar:
          "placeholder:text-[#83827E] bg-[#F0F0F0] border-[#F0F0F0] min-h-20 rounded-[10px] px-3 py-3 text-xs font-semibold",
        userGroup:
          "placeholder:text-[#83827E] bg-white border-white min-h-20 rounded-[10px] px-3 py-3 text-xs font-normal",
        userGroupForm:
          "placeholder:text-[#83827E] bg-white border-[#D9D9D9] min-h-20 rounded-[10px] px-3 py-3 text-sm font-medium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Textarea({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"textarea"> & VariantProps<typeof textareaVariants>) {
  return (
    <textarea
      data-slot="textarea"
      data-variant={variant}
      className={cn(textareaVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Textarea, textareaVariants };
