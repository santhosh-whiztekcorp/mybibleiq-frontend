import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva("flex flex-col gap-6 rounded-xl border py-6", {
  variants: {
    variant: {
      default: "bg-card text-card-foreground",
      statusDraft: "bg-white border-[#D9D9D9]",
      statusInProgress: "bg-[#F3F2FF] border-[#D7D8F5]",
      statusPublished: "bg-[#EEFAFF] border-[#BBE4F7]",
      statusScheduled: "bg-[#FAF4E9] border-[#E8D7B7]",
      statusArchived: "bg-[#EFEFEF] border-[#E8B7B7]",
      statusInReview: "bg-[#EFF6FF] border-[#BBE4F7]",
      statusDelivered: "bg-[#F3FDF5] border-[#CBF6D2]",
      statusPendingDelete: "bg-[#FFF0F0] border-[#FFD4C9]",
      statusDeleted: "bg-[#EFEFEF] border-[#D9D9D9]",
      statusToday: "bg-[#FEFCE7] border-[#F7D79B]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

function Card({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof cardVariants>) {
  return (
    <div data-slot="card" data-variant={variant} className={cn(cardVariants({ variant }), className)} {...props} />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-title" className={cn("leading-none font-semibold", className)} {...props} />;
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-description" className={cn("text-muted-foreground text-sm", className)} {...props} />;
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="card-content" className={cn("px-6", className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-footer" className={cn("flex items-center px-6 [.border-t]:pt-6", className)} {...props} />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent, cardVariants };
