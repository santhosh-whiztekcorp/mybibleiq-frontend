"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check, Loader2, Search, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "react-intersection-observer";
import { useAdminQuestionSelector } from "./AdminQuestionSelector.hooks";
import type { AdminQuestionSelectorProps } from "./AdminQuestionSelector.types";
import { QUESTION_TYPE_LABELS } from "@/resources/admin-question";
import { formatQuestionText } from "@/resources/admin-question/admin-question.utils";
import { Badge } from "@/components/ui/badge";

export function AdminQuestionSelector({
  value,
  onChange,
  placeholder = "Search questions...",
  error,
  label,
  disabled,
  trigger,
}: AdminQuestionSelectorProps) {
  const [open, setOpen] = React.useState(false);
  const {
    searchValue,
    setSearchValue,
    allQuestions,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    handleToggleQuestion,
  } = useAdminQuestionSelector(value, onChange);

  const { ref: loadMoreRef, inView } = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return (
    <div className="space-y-2 w-full flex flex-col items-start justify-start font-plus-jakarta-sans">
      {label && <label className="text-xs font-bold uppercase tracking-wider text-[#83827E]">{label}</label>}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {trigger || (
            <div
              className={cn(
                "flex min-h-[42px] w-full flex-wrap items-center gap-1.5 rounded-[10px] border bg-[#F3F3F5] px-3 py-2 text-xs font-bold cursor-pointer transition-all hover:border-[#DADADA] box-border",
                error ? "border-red-500" : "border-[#F3F3F5]",
                disabled && "opacity-50 cursor-not-allowed text-muted-foreground"
              )}
              onClick={() => !disabled && setOpen(true)}
            >
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-0">
                {value.length > 0 ? (
                  <span className="text-black font-bold">{value.length} Questions Selected</span>
                ) : (
                  <span className="text-[#83827E] font-bold">{placeholder}</span>
                )}
              </div>
              {!disabled && (
                <div className="ml-auto pl-2 shrink-0">
                  <Search className="h-4 w-4 text-[#83827E] opacity-50" />
                </div>
              )}
            </div>
          )}
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
                  placeholder="Search questions by text..."
                  className="h-10 w-full pl-9 border-none shadow-none bg-[#F3F3F5] rounded-[8px] text-xs font-semibold focus-visible:ring-0"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </div>
            </div>

            <ScrollArea className="h-[400px] w-full">
              <div className="p-2 space-y-1">
                {allQuestions.map((q) => {
                  const isSelected = value.includes(q.id);
                  return (
                    <div
                      key={q.id}
                      className={cn(
                        "flex flex-col p-3 rounded-lg cursor-pointer transition-all border",
                        isSelected
                          ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                          : "border-transparent hover:bg-white hover:border-[#DADADA]"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleToggleQuestion(q.id);
                      }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 space-y-1">
                          <p className="text-xs font-bold text-[#1a1a1a] line-clamp-2">
                            {formatQuestionText(q.questionText, q.type)}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant={`type${q.type}`} size="xs" className="text-[9px] px-1 h-4">
                              {QUESTION_TYPE_LABELS[q.type]}
                            </Badge>
                          </div>
                        </div>
                        {isSelected && (
                          <div className="bg-primary text-primary-foreground rounded-full p-1 shrink-0">
                            <Check className="h-3 w-3 stroke-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}

                <div ref={loadMoreRef} className="h-4 w-full" />

                {allQuestions.length === 0 && !isLoading && (
                  <div className="py-12 text-center flex flex-col items-center gap-2">
                    <FileText className="h-8 w-8 text-[#83827E] opacity-10" />
                    <span className="text-xs text-[#83827E] font-bold">No questions found</span>
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

      {error && <p className="text-[10px] font-bold text-red-500 pl-1 mt-1">{error}</p>}
    </div>
  );
}
