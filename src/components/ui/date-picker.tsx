"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";
import { format, startOfToday } from "date-fns";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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
  showTime = false,
  ...props
}: Omit<React.ComponentProps<"div">, "ref" | "onChange"> &
  VariantProps<typeof datePickerVariants> & {
    value?: Date;
    onChange?: (date: Date | undefined) => void;
    placeholder?: string;
    disablePast?: boolean;
    minDate?: Date;
    showTime?: boolean;
  }) {
  const [open, setOpen] = React.useState(false);

  const disabledDays = React.useMemo(() => {
    if (minDate) return { before: minDate };
    if (disablePast) return { before: startOfToday() };
    return undefined;
  }, [disablePast, minDate]);

  const handleTimeChange = (type: "hours" | "minutes" | "period", val: string) => {
    if (!onChange) return;
    const date = value ? new Date(value) : new Date();
    const currentHours = date.getHours();

    if (type === "hours") {
      const numVal = parseInt(val, 10);
      const isPM = currentHours >= 12;
      let newHours = numVal;
      if (isPM && numVal < 12) newHours += 12;
      if (!isPM && numVal === 12) newHours = 0;
      date.setHours(newHours);
    } else if (type === "minutes") {
      date.setMinutes(parseInt(val, 10) || 0);
    } else if (type === "period") {
      let newHours = currentHours % 12;
      if (val === "PM") newHours += 12;
      date.setHours(newHours);
    }
    onChange?.(date);
  };

  const displayHours = value ? (value.getHours() % 12 || 12).toString() : "12";
  const displayMinutes = value ? value.getMinutes().toString() : "0";
  const displayPeriod = value && value.getHours() >= 12 ? "PM" : "AM";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative w-full">
          <Input
            variant={variant}
            readOnly
            value={value ? format(value, showTime ? "PPP p" : "PPP") : ""}
            placeholder={placeholder}
            className={cn(
              "cursor-pointer pr-10 caret-transparent selection:bg-transparent selection:text-inherit",
              className
            )}
            onClick={() => setOpen(true)}
            onFocus={(e) => {
              if (e.target.setSelectionRange) {
                e.target.setSelectionRange(e.target.value.length, e.target.value.length);
              }
              if (props.onFocus) {
                props.onFocus(e as unknown as React.FocusEvent<HTMLDivElement>);
              }
            }}
            {...props}
          />
          <CalendarIcon className="absolute right-3 top-1/2 -translate-y-1/2 size-4 opacity-50 pointer-events-none" />
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 flex flex-col" align="start">
        <Calendar
          mode="single"
          selected={value}
          onSelect={(date) => {
            if (!date) {
              onChange?.(undefined);
              return;
            }
            if (showTime && value) {
              date.setHours(value.getHours());
              date.setMinutes(value.getMinutes());
            }
            onChange?.(date);
            if (!showTime) setOpen(false);
          }}
          disabled={disabledDays}
          startMonth={disabledDays?.before instanceof Date ? disabledDays.before : undefined}
          initialFocus
        />
        {showTime && (
          <div className="p-3 border-t border-border bg-slate-50/50">
            <div className="flex items-center gap-2 w-full">
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[10px] font-bold text-slate-500">Hours</span>
                <Select value={displayHours} onValueChange={(v) => handleTimeChange("hours", v)}>
                  <SelectTrigger className="h-8 w-full text-xs font-bold">
                    <SelectValue placeholder="HH" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }).map((_, i) => (
                      <SelectItem key={i + 1} value={(i + 1).toString()} className="text-xs font-semibold">
                        {(i + 1).toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <span className="mt-5 font-bold">:</span>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[10px] font-bold text-slate-500">Min</span>
                <Select value={displayMinutes} onValueChange={(v) => handleTimeChange("minutes", v)}>
                  <SelectTrigger className="h-8 w-full text-xs font-bold">
                    <SelectValue placeholder="MM" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 60 }).map((_, i) => (
                      <SelectItem key={i} value={i.toString()} className="text-xs font-semibold">
                        {i.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-col gap-1 flex-1">
                <span className="text-[10px] font-bold text-slate-500">Period</span>
                <Select value={displayPeriod} onValueChange={(v) => handleTimeChange("period", v)}>
                  <SelectTrigger className="h-8 w-full text-xs font-bold">
                    <SelectValue placeholder="AM/PM" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AM" className="text-xs font-semibold">
                      AM
                    </SelectItem>
                    <SelectItem value="PM" className="text-xs font-semibold">
                      PM
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
}

export { DatePicker, datePickerVariants };
