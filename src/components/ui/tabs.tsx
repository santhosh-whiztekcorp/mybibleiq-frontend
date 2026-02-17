"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

function Tabs({ className, orientation = "horizontal", ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      orientation={orientation}
      className={cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  );
}

const tabsListVariants = cva(
  "p-0.5 group-data-[orientation=horizontal]/tabs:h-auto data-[variant=line]:rounded-none group/tabs-list text-muted-foreground inline-flex w-fit items-center justify-center group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col relative border gap-1.5",
  {
    variants: {
      variant: {
        default: "bg-muted rounded-lg",
        line: "gap-1 bg-transparent rounded-none",
        adminPrimary: "bg-[#EBEBF0] border-[#EBEBF0] rounded-full",
        adminSecondary: "bg-[#EBEBF0] border-[#E4E5EC] rounded-full",
        adminTertiary: "bg-[#E4E5EC] border-[#E4E5EC] rounded-lg",
        adminQuaternary: "bg-[#EBEBF0] border-[#EBEBF0] rounded-full",
        userGroup: "bg-[#EBEBF0] border-[#EBEBF0] rounded-full",
        userQuiz: "bg-[#EBEBF0] border-[#EBEBF0] rounded-full",
        userFriends: "bg-white border-white rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsList({
  className,
  variant = "default",
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  );
}

const tabsTriggerVariants = cva(
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-ring text-foreground/60 hover:text-foreground dark:text-muted-foreground dark:hover:text-foreground relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 border border-transparent text-sm font-medium whitespace-nowrap transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start focus-visible:ring-[3px] focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 z-10 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "rounded-md px-2 py-1 group-data-[variant=default]/tabs-list:data-[state=active]:shadow-sm data-[state=active]:bg-background dark:data-[state=active]:text-foreground dark:data-[state=active]:border-input dark:data-[state=active]:bg-input/30 data-[state=active]:text-foreground",
        line: "rounded-none px-2 py-1 group-data-[variant=line]/tabs-list:data-[state=active]:shadow-none group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:border-transparent dark:group-data-[variant=line]/tabs-list:data-[state=active]:bg-transparent after:bg-foreground after:absolute after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:bottom-[-5px] group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-[state=active]:after:opacity-100",
        adminPrimary:
          "rounded-full px-3 py-1.5 text-xs font-semibold text-black data-[state=active]:px-2 data-[state=active]:bg-white data-[state=active]:border-[#C7C7C7]",
        adminSecondary:
          "rounded-full px-2.5 py-1 text-xs font-semibold text-black data-[state=active]:px-2 data-[state=active]:bg-[#FFF1F7] data-[state=active]:border-[#FF96C7]",
        adminTertiary:
          "rounded-lg px-3 py-2 text-xs font-semibold text-black data-[state=active]:bg-[#CEEEFF] data-[state=active]:border-[#98CDE6]",
        adminQuaternary:
          "rounded-full px-2.5 py-1 text-xs font-semibold text-black data-[state=active]:px-2 data-[state=active]:bg-[#202020] data-[state=active]:border-[#C7C7C7] data-[state=active]:text-white",
        userGroup:
          "rounded-full px-3 py-1.5 text-sm font-medium text-black data-[state=active]:px-2 data-[state=active]:bg-white data-[state=active]:border-white",
        userQuiz:
          "rounded-full px-3 py-1.5 text-sm font-medium text-black data-[state=active]:px-2 data-[state=active]:bg-[#00C851] data-[state=active]:text-white",
        userFriends: "rounded-full px-3 py-1.5 text-sm font-medium text-black data-[state=active]:bg-[#C6EDFF]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function TabsTrigger({
  className,
  variant,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger> & VariantProps<typeof tabsTriggerVariants>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      data-variant={variant}
      className={cn(tabsTriggerVariants({ variant }), className)}
      {...props}
    />
  );
}

function TabsContent({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return <TabsPrimitive.Content data-slot="tabs-content" className={cn("flex-1 outline-none", className)} {...props} />;
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, tabsTriggerVariants };
