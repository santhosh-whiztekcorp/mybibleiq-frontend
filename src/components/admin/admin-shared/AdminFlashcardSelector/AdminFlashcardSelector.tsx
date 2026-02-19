"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Loader2, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useAdminFlashcardSelector } from "./AdminFlashcardSelector.hooks";
import type { AdminFlashcardSelectorProps } from "./AdminFlashcardSelector.types";

export function AdminFlashcardSelector({
  value,
  onChange,
  placeholder = "Search flashcards...",
  error,
  label,
  disabled,
  filters,
}: AdminFlashcardSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const {
    searchValue,
    setSearchValue,
    allFlashcards,
    selectedFlashcards,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleToggleFlashcard,
    handleRemoveFlashcard,
  } = useAdminFlashcardSelector(value, onChange, filters);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-2 w-full flex flex-col items-start justify-start">
      {label && <label className="text-xs font-semibold uppercase tracking-wider text-[#83827E]">{label}</label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className={cn(
              "flex min-h-[42px] w-full flex-wrap items-center gap-1.5 rounded-[10px] border bg-[#F3F3F5] px-3 py-2 text-xs font-semibold cursor-pointer transition-all hover:border-[#DADADA] box-border",
              error ? "border-red-500" : "border-[#F3F3F5]",
              disabled && "opacity-50 cursor-not-allowed text-muted-foreground"
            )}
            onClick={() => !disabled && setOpen(true)}
          >
            <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
              {selectedFlashcards.length > 0 ? (
                selectedFlashcards.map((card) => (
                  <div
                    key={card.id}
                    className="group relative flex flex-col items-center justify-center w-24 h-16 rounded-lg border border-[#DADADA] bg-white shadow-sm animate-in fade-in zoom-in-95 duration-200"
                  >
                    <div className="absolute inset-0 bg-linear-to-br from-[#F7EFD0] to-[#FF96C7] opacity-90 rounded-lg" />
                    <span className="relative z-10 text-[10px] font-bold text-[#393737] text-center px-1.5 line-clamp-2">
                      {card.word}
                    </span>
                    <button
                      className="absolute -top-1.5 -right-1.5 z-20 bg-white border border-[#DADADA] rounded-full p-1 shadow-md text-red-500 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:scale-110"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveFlashcard(card.id, e);
                      }}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-[#83827E] font-medium">{placeholder}</span>
              )}
            </div>
            {!disabled && (
              <div className="ml-auto pl-2 shrink-0">
                <Search className="h-4 w-4 text-[#83827E] opacity-50" />
              </div>
            )}
          </div>
        </PopoverTrigger>

        <PopoverContent
          className="p-0 border-[#DADADA] rounded-[10px] z-50 bg-[#F8F9FA] shadow-2xl overflow-hidden"
          align="start"
          sideOffset={6}
          style={{ width: "var(--radix-popover-trigger-width)", maxWidth: "none" }}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          <div className="flex flex-col w-full">
            <div className="p-2.5 border-b bg-white">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#83827E] opacity-50" />
                <Input
                  autoFocus
                  placeholder="Search flashcards..."
                  className="h-10 w-full pl-9 border-none shadow-none bg-[#F3F3F5] rounded-[8px] text-xs font-semibold focus-visible:ring-0"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="h-[320px] w-full">
              <div className="p-3">
                <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-3 gap-3">
                  {allFlashcards.map((card) => {
                    const isSelected = value.includes(card.id);
                    return (
                      <div
                        key={card.id}
                        className={cn(
                          "group relative flex flex-col rounded-xl cursor-pointer transition-all duration-300 border-2 overflow-hidden aspect-video shadow-sm hover:shadow-md hover:-translate-y-0.5",
                          isSelected
                            ? "border-primary bg-white ring-2 ring-primary/20"
                            : "border-white bg-white hover:border-[#DADADA]"
                        )}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleFlashcard(card.id);
                        }}
                      >
                        {/* Gradient Header */}
                        <div className="flex-1 bg-linear-to-br from-[#F7EFD0] to-[#FF96C7] m-1.5 rounded-[8px] flex items-center justify-center p-2 relative overflow-hidden">
                          {/* Decorative pattern or subtle overlay if needed */}
                          <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span className="relative z-10 text-[11px] font-bold text-[#393737] text-center line-clamp-3">
                            {card.word}
                          </span>
                        </div>

                        {/* Selection Overlay/Indicator */}
                        {isSelected && (
                          <div className="absolute top-1 right-1 z-20 animate-in zoom-in duration-300">
                            <div className="bg-primary text-primary-foreground rounded-full p-1 shadow-lg border-2 border-white">
                              <Check className="h-2.5 w-2.5 stroke-2" />
                            </div>
                          </div>
                        )}

                        {/* Hover hint */}
                        {!isSelected && (
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                        )}
                      </div>
                    );
                  })}
                </div>

                <div ref={loadMoreRef} className="h-4 w-full" />

                {allFlashcards.length === 0 && !isLoading && (
                  <div className="py-12 text-center flex flex-col items-center gap-2 animate-in fade-in duration-300">
                    <Search className="h-8 w-8 text-[#83827E] opacity-10" />
                    <span className="text-xs text-[#83827E] font-bold tracking-tight">No flashcards found</span>
                  </div>
                )}

                {(isLoading || isFetchingNextPage) && (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-6 w-6 animate-spin text-primary/40" />
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>
        </PopoverContent>
      </Popover>

      {error && (
        <p className="text-[10px] font-bold text-red-500 pl-1 mt-1 flex items-center gap-1 animate-in slide-in-from-top-1">
          <span className="w-1 h-1 rounded-full bg-red-500" />
          {error}
        </p>
      )}
    </div>
  );
}
