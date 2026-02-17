"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const selectTriggerVariants = cva(
  "data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive flex items-center justify-between gap-2 border whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "border-input dark:bg-input/30 dark:hover:bg-input/50 bg-transparent rounded-md px-3 py-2 text-sm w-fit data-[size=default]:h-9 data-[size=sm]:h-8",
        adminPrimary:
          "bg-[#F3F3F5] border-[#F3F3F5] text-black rounded-lg px-3 py-3 text-xs font-semibold min-h-[44px] w-full",
        adminSecondary:
          "bg-white border-[#E2E2E2] text-black rounded-lg px-3 py-2.5 text-xs font-semibold min-h-[44px] w-full",
        adminFilter:
          "bg-[#F3F3F5] border-[#F3F3F5] text-black rounded-lg px-3 py-3 text-xs font-semibold min-h-[44px] w-full flex-1",
        userPrimary:
          "bg-white border-[#D1D5DB] text-black rounded-lg px-3 py-3 text-xs font-semibold min-h-[44px] w-full",
        userGroup: "bg-white border-white text-black rounded-lg px-3 py-3 text-xs font-normal min-h-[42px] w-full",
        userGroupForm:
          "bg-white border-[#D9D9D9] text-black rounded-lg px-3 py-3 text-sm font-medium min-h-[42px] w-full",
      },
      size: {
        default: "h-9",
        sm: "h-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export type SelectInlineOption = {
  label: string;
  value: string;
  description?: string;
};

export interface SelectInlineProps extends VariantProps<typeof selectTriggerVariants> {
  value?: string;
  onValueChange?: (value: string) => void;
  options: SelectInlineOption[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  id?: string;

  "aria-describedby"?: string;
  size?: "sm" | "default";
}

export function SelectInline({
  value,
  onValueChange,
  options,
  placeholder = "Select an option",
  variant = "default",
  size = "default",
  disabled = false,
  className,
  id,
  "aria-describedby": ariaDescribedBy,
}: SelectInlineProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const contentRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        contentRef.current &&
        !triggerRef.current.contains(event.target as Node) &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    // Use setTimeout to avoid immediate close when opening
    const timeoutId = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Close on escape key
  React.useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleSelect = (optionValue: string) => {
    onValueChange?.(optionValue);
    setIsOpen(false);
    triggerRef.current?.focus();
  };

  return (
    <div className="relative">
      <button
        ref={triggerRef}
        type="button"
        id={id}
        aria-describedby={ariaDescribedBy}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(selectTriggerVariants({ variant, size }), className)}
      >
        <span className="line-clamp-1 flex items-center gap-2">
          {selectedOption ? (
            <span className="font-medium">{selectedOption.label}</span>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </span>
        <ChevronDownIcon className="size-4 opacity-50 shrink-0" />
      </button>

      {isOpen && (
        <div
          ref={contentRef}
          role="listbox"
          className="absolute z-50 mt-1 w-full min-w-[8rem] max-h-[300px] overflow-y-auto rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95"
          style={{
            top: "100%",
            left: 0,
          }}
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelect(option.value)}
                className={cn(
                  "relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                  isSelected && "bg-accent text-accent-foreground"
                )}
              >
                <div className="flex flex-col items-start gap-1 max-w-lg flex-1">
                  <span className="font-medium">{option.label}</span>
                  {option.description && (
                    <span className="text-xs text-muted-foreground text-wrap text-left">{option.description}</span>
                  )}
                </div>
                {isSelected && (
                  <span className="absolute right-2 flex size-3.5 items-center justify-center">
                    <CheckIcon className="size-4" />
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
