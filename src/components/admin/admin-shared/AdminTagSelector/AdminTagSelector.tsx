"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useAdminTagSelector } from "./AdminTagSelector.hooks";
import type { AdminTagSelectorProps } from "./AdminTagSelector.types";

export function AdminTagSelector({
  value,
  onChange,
  placeholder = "Search tags...",
  error,
  label,
  disabled,
}: AdminTagSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const {
    searchValue,
    setSearchValue,
    allTags,
    selectedTags,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleToggleTag,
    handleRemoveTag,
  } = useAdminTagSelector(value, onChange);

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
            <div className="flex flex-wrap items-center gap-1.5 flex-1 min-w-0">
              {selectedTags.length > 0 ? (
                selectedTags.map((tag) => (
                  <Badge
                    key={tag.name}
                    variant="secondary"
                    className="gap-1 px-2.5 py-1 h-7 rounded-[8px] font-bold border border-[#DADADA] bg-white text-black animate-in fade-in zoom-in-95 duration-200 shadow-sm shrink-0"
                  >
                    <span className="truncate max-w-[150px]">{tag.name}</span>
                    <div
                      className="flex items-center justify-center hover:bg-black/10 rounded-full p-0.5 transition-colors shrink-0"
                      onClick={(e) => handleRemoveTag(tag.name, e)}
                    >
                      <X className="h-3 w-3 cursor-pointer opacity-70 hover:opacity-100" />
                    </div>
                  </Badge>
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
          className="p-0 border-[#DADADA] rounded-[10px] z-50 bg-white shadow-2xl overflow-hidden"
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
                  placeholder="Search tags..."
                  className="h-10 w-full pl-9 border-none shadow-none bg-[#F3F3F5] rounded-[8px] text-xs font-semibold focus-visible:ring-0"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="h-[280px] bg-white w-full">
              <div className="p-1.5 w-full">
                {allTags.map((tag) => {
                  const isSelected = value.includes(tag.name);
                  return (
                    <div
                      key={tag.id}
                      className={cn(
                        "flex items-center gap-2.5 px-3 py-2.5 rounded-[8px] cursor-pointer text-xs font-bold transition-all hover:bg-[#F3F3F5] w-full",
                        isSelected && "text-primary translate-x-0.5"
                      )}
                      onClick={() => handleToggleTag(tag.name)}
                    >
                      <div
                        className={cn(
                          "flex h-4.5 w-4.5 items-center justify-center rounded-[4px] border border-[#DADADA] transition-all duration-200 shrink-0",
                          isSelected
                            ? "bg-primary border-primary text-primary-foreground scale-110 shadow-sm"
                            : "bg-white"
                        )}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 stroke-3" />}
                      </div>
                      <span className="flex-1 truncate">{tag.name}</span>
                      {tag.categoryName && (
                        <span
                          className="text-[11px] px-2 py-0.5 rounded-full font-bold text-black border border-black/10 shrink-0 whitespace-nowrap ml-2"
                          style={{ backgroundColor: tag.categoryColor || "#F0F0F0" }}
                        >
                          {tag.categoryName}
                        </span>
                      )}
                    </div>
                  );
                })}

                <div ref={loadMoreRef} className="h-2 w-full" />

                {allTags.length === 0 && !isLoading && (
                  <div className="py-12 text-center flex flex-col items-center gap-2 animate-in fade-in duration-300">
                    <Search className="h-8 w-8 text-[#83827E] opacity-10" />
                    <span className="text-xs text-[#83827E] font-bold tracking-tight">No tags found</span>
                  </div>
                )}

                {(isLoading || isFetchingNextPage) && (
                  <div className="flex items-center justify-center p-6">
                    <Loader2 className="h-5 w-5 animate-spin text-primary/60" />
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
