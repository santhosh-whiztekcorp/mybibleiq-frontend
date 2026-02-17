import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border cursor-pointer",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        actionAdd: "bg-[#B3E4FD] border-[#B3E4FD] text-black hover:bg-[#B3E4FD]/90",
        actionUpload: "bg-[#B3E4FD] border-[#B3E4FD] text-black hover:bg-[#B3E4FD]/90",
        actionEdit: "bg-[#BEC5FF] border-[#BEC5FF] text-black hover:bg-[#BEC5FF]/90",
        actionDelete: "bg-[#FCFCFC] border-[#D9D9D9] text-[#E71010] hover:bg-[#FCFCFC]/90",
        actionSchedule: "bg-[#FFF0BB] border-[#E9C8A4] text-black hover:bg-[#FFF0BB]/90",
        actionPublish: "bg-[#BEF7D3] border-[#69DC67] text-black hover:bg-[#BEF7D3]/90",
        actionView: "bg-[#FF96C6] border-[#FF96C6] text-black hover:bg-[#FF96C6]/90",
        actionClone: "bg-[#FCFCFC] border-[#D9D9D9] text-black hover:bg-[#FCFCFC]/90",
        actionApprove: "bg-[#8FED91] border-[#8FED91] text-black hover:bg-[#8FED91]/90",
        actionReject: "bg-[#D4183D] border-[#D4183D] text-white hover:bg-[#D4183D]/90",
        actionCancel: "bg-[#FCFCFC] border-[#D9D9D9] text-[#4B4B4B] hover:bg-[#FCFCFC]/90",
        actionDraft: "bg-[#FDF3D0] border-[#E9DDB5] text-[#4B4B4B] hover:bg-[#FDF3D0]/90",
        actionSubmit: "bg-[#B3E5FC] border-[#7EBFDC] text-[#4B4B4B] hover:bg-[#B3E5FC]/90",
        actionArchive: "bg-[#FEBEBE] border-[#C78080] text-black hover:bg-[#FEBEBE]/90",
        actionUnarchive: "bg-[#B3E4FD] border-[#4ECDC4] text-black hover:bg-[#B3E4FD]/90",
        actionConfigure: "bg-[#F1F2FF] border-[#D9DAFF] text-[#615FFF] hover:bg-[#F1F2FF]/90",
        authSubmit: "bg-[#A9E2FC] border-[#A9E2FC] text-[#202020] hover:bg-[#A9E2FC]/90 rounded-2xl font-semibold",
        filterInProgress: "bg-white border-[#D9E9FF] text-[#1447E6] hover:bg-[#D9E9FF]/20",
        filterInReview: "bg-white border-[#FCE0D5] text-[#ED722B] hover:bg-[#FCE0D5]/20",
        filterScheduled: "bg-white border-[#A9EBD4] text-[#278C6C] hover:bg-[#A9EBD4]/20",
        filterDelivered: "bg-white border-[#FFD9EB] text-[#E7378F] hover:bg-[#FFD9EB]/20",
        filterPendingDelete: "bg-white border-[#FBDFDF] text-[#E51F1C] hover:bg-[#FBDFDF]/20",
        filterAll: "bg-white border-[#E1E1E1] text-[#202020] hover:bg-[#E1E1E1]/20",
        filterInProgressActive: "bg-[#1447E6] border-[#1447E6] text-white hover:bg-[#1447E6]/90",
        filterInReviewActive: "bg-[#ED722B] border-[#ED722B] text-white hover:bg-[#ED722B]/90",
        filterScheduledActive: "bg-[#278C6C] border-[#278C6C] text-white hover:bg-[#278C6C]/90",
        filterDeliveredActive: "bg-[#E7378F] border-[#E7378F] text-white hover:bg-[#E7378F]/90",
        filterPendingDeleteActive: "bg-[#E51F1C] border-[#E51F1C] text-white hover:bg-[#E51F1C]/90",
        filterAllActive: "bg-[#202020] border-[#202020] text-white hover:bg-[#202020]/90",
        difficultyEasy: "bg-white border-[#CECDCB] text-black hover:bg-[#CECDCB]/20",
        difficultyMedium: "bg-white border-[#CECDCB] text-black hover:bg-[#CECDCB]/20",
        difficultyHard: "bg-white border-[#CECDCB] text-black hover:bg-[#CECDCB]/20",
        difficultyEasyActive: "bg-[#A7E8A1] border-[#83C97D] text-black hover:bg-[#A7E8A1]/90",
        difficultyMediumActive: "bg-[#FEDD8F] border-[#F3C695] text-black hover:bg-[#FEDD8F]/90",
        difficultyHardActive: "bg-[#F6A3A3] border-[#DC7E7E] text-black hover:bg-[#F6A3A3]/90",
        brandPink:
          "bg-[#FF96C7] border-black text-black hover:bg-[#FF96C7]/90 border border-r-[4px] border-r-black border-b-[4px] border-b-black py-10 px-16 flex-1",
        brandWhite:
          "bg-white border-black text-black hover:bg-white/90 border border-r-[4px] border-r-black border-b-[4px] border-b-black py-10 px-16 flex-1",
        brandCyan:
          "bg-[#B3E5FC] border-black text-black hover:bg-[#B3E5FC]/90 border border-r-[4px] border-r-black border-b-[4px] border-b-black py-10 px-16 flex-1",
        brandGreen:
          "bg-[#8FED91] border-black text-black hover:bg-[#8FED91]/90 border border-r-[4px] border-r-black border-b-[4px] border-b-black py-10 px-16 flex-1",
        brandPurple:
          "bg-[#BEC4FF] border-black text-black hover:bg-[#BEC4FF]/90 border border-r-[4px] border-r-black border-b-[4px] border-b-black py-10 px-16 flex-1",
        brandCloud:
          "bg-[#ECF5FF] border-black text-black hover:bg-[#ECF5FF]/90 border border-r-[4px] border-r-black border-b-[4px] border-b-black py-10 px-16 flex-1",
        brandRed:
          "bg-[#F68486] border-[#222222] text-white hover:bg-[#F68486]/90 border border-r-[4px] border-r-[#222222] border-b-[4px] border-b-[#222222] py-10 px-16 flex-1",
        brandRedOutline:
          "bg-white border-[#D52929] text-[#D52929] hover:bg-white/90 border border-r-[4px] border-r-[#D52929] border-b-[4px] border-b-[#D52929] py-6 px-12",
        brandBlackOutline:
          "bg-white border-black text-black hover:bg-white/90 border border-r-[4px] border-r-black border-b-[4px] border-b-black py-6 px-12",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        xs: "h-6 gap-1 rounded-md px-2 text-xs has-[>svg]:px-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  }) {
  const Comp = asChild ? Slot : "button";

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
