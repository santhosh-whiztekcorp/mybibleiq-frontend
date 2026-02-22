import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-lg border w-fit whitespace-nowrap shrink-0 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow]",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        ghost: "[a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [a&]:hover:underline",
        statusDraft: "bg-gray-200 border-gray-400 text-gray-900",
        statusPublished: "bg-[#D1FAE5] border-[#9AD1AB] text-[#125440]",
        statusScheduled: "bg-[#FFF9C1] border-[#FCDEA4] text-[#935C34]",
        statusArchived: "bg-[#FEBEBE] border-[#C78080] text-black",
        statusInReview: "bg-[#DBE9FF] border-[#C4D3F8] text-[#1447E6]",
        statusInProgress: "bg-[#DCE0FF] border-[#BFC5FF] text-[#7649AD]",
        statusDelivered: "bg-[#BEF7D3] border-[#9AD1AB] text-[#125440]",
        statusPendingDelete: "bg-[#FFE1E1] border-[#EAB8B8] text-[#A3131B]",
        statusDeleted: "bg-[#FEBEBE] border-[#C78080] text-black",
        statusToday: "bg-[#FFF9C1] border-[#FCDEA4] text-black",
        statusOpen: "bg-[#DCE0FF] border-[#BFC5FF] text-[#7649AD]",
        statusResolved: "bg-[#D1FAE5] border-[#9AD1AB] text-[#125440]",
        statusClosed: "bg-[#FEBEBE] border-[#C78080] text-black",
        statusActive: "bg-[#D1FAE5] border-[#9AD1AB] text-[#125440]",
        statusSuspended: "bg-[#FEBEBE] border-[#C78080] text-black",
        triggerTimeBased: "bg-[#FEF3C7] border-[#F59E0B] text-[#92400E]",
        triggerStreakBased: "bg-[#FFE4E6] border-[#F43F5E] text-[#9F1239]",
        triggerCountBased: "bg-[#DCFCE7] border-[#22C55E] text-[#14532D]",
        triggerMilestoneBased: "bg-[#EDE9FE] border-[#8B5CF6] text-[#4C1D95]",
        triggerEngagementBased: "bg-[#DBEAFE] border-[#3B82F6] text-[#1E3A8A]",
        difficultyEASY: "bg-[#A7E8A1] border-[#83C97D] text-black",
        difficultyMEDIUM: "bg-[#FEDD8F] border-[#F3C695] text-black",
        difficultyHARD: "bg-[#F6A3A3] border-[#DC7E7E] text-black",
        tag: "bg-[#FCFCFC] border-[#D9D9D9] text-black",
        point: "bg-[#FAF5FF] border-[#DABBF1] text-[#901FDF]",
        question: "bg-[#E5EFFF] border-[#9EC6F8] text-[#3862EA]",
        swordDrill: "bg-[#D5D9FF] border-[#9AA2ED] text-black",
        typeQuestion: "bg-[#F3E7FF] border-[#F3E7FF] text-[#913DC9]",
        typeMedia: "bg-[#FF96C7] border-[#FF96C7] text-black text-sm",
        typeMCQ: "bg-[#E5EFFF] border-[#5B8DEF] text-[#5B8DEF]",
        typeTRUE_FALSE: "bg-[#FAF5FF] border-[#901FDF] text-[#901FDF]",
        typeONE_WORD: "bg-[#E4FBE8] border-[#67C4A7] text-[#67C4A7]",
        typeFILL_BLANK: "bg-[#FFF5EB] border-[#FF9066] text-[#FF9066]",
        typeMATCH: "bg-[#FFF1F7] border-[#EC4899] text-[#EC4899]",
        typeORDER: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
        typeIMAGE: "bg-[#EFF6FF] border-[#5BB2F0] text-[#5BB2F0]",
        typeAUDIO: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
        typeVIDEO: "bg-[#FAF5FF] border-[#901FDF] text-[#901FDF]",
        typeFlashcard: "bg-[#FFF1F7] border-[#FF96C6] text-[#FF96C6]",
        typeFlashcardGroup: "bg-[#EEF5FE] border-[#BFC5FF] text-[#BFC5FF]",
        userGroupChurch: "bg-[#EFF6FF] border-[#5BB2F0] text-[#5BB2F0]",
        userGroupYouthGroup: "bg-[#FAF5FF] border-[#DABBF1] text-[#901FDF]",
        userGroupBibleStudy: "bg-[#E4FBE8] border-[#67C4A7] text-[#67C4A7]",
        userGroupFamily: "bg-[#FFF1F7] border-[#FF96C6] text-[#EC4899]",
        userGroupPrayerGroup: "bg-[#FEF3C7] border-[#F59E0B] text-[#F59E0B]",
        rarityCommon: "bg-[#E0F4E7] border-[#67C4A7] text-[#10B981]",
        rarityRare: "bg-[#EFF6FF] border-[#BFDBFE] text-[#2563EB]",
        rarityEpic: "bg-[#FAF5FF] border-[#D8B4FE] text-[#7C3AED]",
        rarityLegendary: "bg-[#FEF3C7] border-[#FFD600] text-[#F59E0B]",
        raritySpecial: "bg-[#FFF1F7] border-[#F9A8D4] text-[#EC4899]",
        categoryBugReport: "bg-[#FAE9E9] border-[#E8B7B7] text-[#EC4242]",
        categoryFeatureRequest: "bg-[#FFF1F7] border-[#FF96C6] text-[#EC4899]",
        categoryGeneralFeedback: "bg-[#F5F3FF] border-[#D8B4FE] text-[#8B5CF6]",
        categoryOther: "bg-[#FEFCE7] border-[#FCDEA4] text-[#935C34]",
        categoryConsistency: "bg-[#FEFCE7] border-[#FDE68A] text-[#92400E]",
        categoryLearningAction: "bg-[#EEF7FE] border-[#CFEBF8] text-[#008EE5]",
        categoryMilestone: "bg-[#F5F3FF] border-[#D8B4FE] text-[#7C3AED]",
        categorySpecialEngagement: "bg-[#FFF1F7] border-[#FF96C6] text-[#EC4899]",
        assignmentManual: "bg-[#F3F4F6] border-[#E5E7EB] text-[#374151]",
        assignmentAutomatic: "bg-[#E0F4E7] border-[#9AD1AB] text-[#15803D]",
        conditionOperator: "bg-[#F0FDF4] border-[#86EFAC] text-[#166534]",
      },
      size: {
        xs: "px-1.5 py-0.5 text-[10px] font-semibold gap-1 [&>svg]:size-2.5",
        sm: "px-2 py-0.5 text-xs font-semibold gap-1 [&>svg]:size-3",
        default: "px-3 py-1 text-xs font-semibold gap-1.5 [&>svg]:size-3",
        lg: "px-4 py-1.5 text-sm font-semibold gap-2 [&>svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

function Badge({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      data-size={size}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
