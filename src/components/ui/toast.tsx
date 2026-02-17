import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const toastVariants = cva(
  "relative flex w-full items-center gap-3 rounded-lg border px-4 py-3 shadow-lg transition-all",
  {
    variants: {
      variant: {
        success: "bg-[#D1FAE5] border-[#9AD1AB] text-[#125440]",
        error: "bg-[#FFE1E1] border-[#EAB8B8] text-[#A3131B]",
        info: "bg-[#DBE9FF] border-[#C4D3F8] text-[#1447E6]",
        warning: "bg-[#FFF9C1] border-[#FCDEA4] text-[#935C34]",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

export type ToastProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof toastVariants> & {
    title?: string;
    description?: string;
    icon?: React.ReactNode;
  };

function Toast({ className, variant, title, description, icon, children, ...props }: ToastProps) {
  return (
    <div className={cn(toastVariants({ variant }), className)} {...props}>
      {icon && <div className="shrink-0">{icon}</div>}
      <div className="flex-1 min-w-0">
        {title && <div className="font-semibold text-sm leading-tight">{title}</div>}
        {description && <div className="text-sm leading-tight mt-1 opacity-90">{description}</div>}
        {children}
      </div>
    </div>
  );
}

export { Toast, toastVariants };
