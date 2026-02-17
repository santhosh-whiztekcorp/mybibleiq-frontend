"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format, startOfToday } from "date-fns";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { inputVariants } from "./input";

const datePickerVariants = inputVariants;

function DatePicker({
  className,
  variant = "default",
  value,
  onChange,
  placeholder = "Pick a date",
  disablePast = true,
  minDate,
  ...props
}: Omit<React.ComponentProps<"div">, "ref"> &
  VariantProps<typeof datePickerVariants> & {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disablePast?: boolean;
    minDate?: Date;
  }) {
  const [open, setOpen] = React.useState(false);

  const disabledDays = React.useMemo(() => {
    if (minDate) return { before: minDate };
    if (disablePast) return { before: startOfToday() };
    return undefined;
  }, [disablePast, minDate]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            variant={variant}
            readOnly
            value={value ? format(value, "PPP") : ""}
            placeholder={placeholder}
            className={cn("cursor-pointer pr-10", className)}
            onClick={() => setOpen(true)}
            {...props}
          />
          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-50 pointer-events-none" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            onChange?.(date);
            setOpen(false);
          }}
          disabled={disabledDays}
          startMonth={disabledDays?.before instanceof Date ? disabledDays.before : undefined}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, datePickerVariants };
