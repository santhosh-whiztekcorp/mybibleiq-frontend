"use client";

import * as React from "react";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useAdminBadgeSelector } from "./AdminBadgeSelector.hooks";
import type { AdminBadgeSelectorProps } from "./AdminBadgeSelector.types";

export function AdminBadgeSelector({
  value,
  onChange,
  placeholder = "Select badge...",
  label,
  disabled,
  filters = { status: "Published" },
}: AdminBadgeSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const {
    searchValue,
    setSearchValue,
    allBadges,
    selectedBadge,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleSelect,
    handleClear,
  } = useAdminBadgeSelector(value, onChange, filters);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const handleItemSelect = (id: string) => {
    handleSelect(allBadges.find((b) => b.id === id)!);
    setOpen(false);
  };

  return (
    <div className="space-y-2 w-full flex flex-col items-start justify-start font-plus-jakarta-sans">
      {label && <label className="text-[10px] font-bold uppercase tracking-wider text-[#656A73]">{label}</label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex min-h-[42px] w-full flex-wrap items-center gap-2 rounded-[10px] border border-[#F3F3F5] bg-[#F3F3F5] px-3 py-3 text-xs font-semibold cursor-pointer transition-all hover:bg-[#EAEAEA] box-border",
              disabled && "opacity-50 cursor-not-allowed text-muted-foreground"
            )}
            onClick={() => !disabled && setOpen(true)}
          >
            {selectedBadge ? (
              <div className="flex items-center gap-2 flex-1 min-w-0">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden shrink-0 bg-white border border-[#E2E8F0]">
                  <Image
                    src={selectedBadge.iconUrl}
                    alt={selectedBadge.name}
                    fill
                    className="object-contain"
                    sizes="40px"
                  />
                </div>
                <span className="truncate font-semibold text-black">{selectedBadge.name}</span>
                {!disabled && (
                  <button
                    type="button"
                    className="ml-auto p-1 rounded hover:bg-[#E2E8F0] shrink-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClear();
                    }}
                  >
                    <X className="h-3 w-3 text-[#656A73]" />
                  </button>
                )}
              </div>
            ) : (
              <>
                <span className="text-[#83827E] font-semibold flex-1">{placeholder}</span>
                {!disabled && <Search className="h-4 w-4 text-[#83827E] opacity-50 shrink-0" />}
              </>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 border-[#E2E8F0] rounded-xl z-50 bg-white shadow-xl overflow-hidden"
          align="start"
          sideOffset={6}
          onOpenAutoFocus={(e) => e.preventDefault()}
          style={{ width: "var(--radix-popover-trigger-width)" }}
        >
          <div className="flex flex-col w-full">
            <div className="p-2.5 border-b border-[#F1F5F9]">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#656A73] opacity-50" />
                <Input
                  autoFocus
                  placeholder="Search badges..."
                  className="h-10 w-full pl-9 border-[#E2E8F0] bg-[#F8FAFC] rounded-lg text-xs font-bold"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="h-[280px] w-full">
              <div className="p-3">
                <div className="grid grid-cols-3 gap-3">
                  {allBadges.map((item) => {
                    const isSelected = value === item.id;
                    return (
                      <div
                        key={item.id}
                        className={cn(
                          "group relative flex flex-col items-center rounded-xl cursor-pointer transition-all border-2 overflow-hidden p-2",
                          isSelected
                            ? "border-primary ring-2 ring-primary/20"
                            : "border-[#E2E8F0] hover:border-[#CBD5E1]"
                        )}
                        onClick={() => handleItemSelect(item.id)}
                      >
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                          <Image src={item.iconUrl} alt={item.name} fill className="object-contain" sizes="48px" />
                        </div>
                        <span className="text-[10px] font-bold text-black text-center line-clamp-2 mt-1">
                          {item.name}
                        </span>
                        {isSelected && (
                          <div className="absolute top-1 right-1 z-10 bg-primary text-white rounded-full p-0.5">
                            <Check className="h-2 w-2" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div ref={loadMoreRef} className="h-4 w-full" />

                {allBadges.length === 0 && !isLoading && (
                  <div className="py-12 text-center">
                    <span className="text-xs text-[#656A73] font-bold">No badges found</span>
                  </div>
                )}

                {(isLoading || isFetchingNextPage) && (
                  <div className="flex justify-center py-6">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
