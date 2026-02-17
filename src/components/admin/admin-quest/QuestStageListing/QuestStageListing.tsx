"use client";

import React from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useQuestStageListing } from "./QuestStageListing.hooks";
import type { QuestStageListingProps } from "./QuestStageListing.types";

export function QuestStageListing(props: QuestStageListingProps) {
  const { stages, onAddStage, onEditStage, onDeleteStage } = props;
  const { isDraft, isOpen, handleOpenChange } = useQuestStageListing(props);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0 flex flex-col">
        <div className="flex flex-col h-full">
          <div className="px-6 pt-6 pb-4 border-b border-[#F1F5F9]">
            <SheetHeader className="p-0 text-left">
              <SheetTitle className="text-xl font-bold text-black">Quest Stages</SheetTitle>
              <SheetDescription className="text-sm font-semibold text-[#656A73] mt-1">
                Manage the stages for this quest.
              </SheetDescription>
            </SheetHeader>
            <Button variant="actionAdd" onClick={onAddStage} className="mt-4 w-full font-semibold">
              <Plus className="h-4 w-4 mr-2" />
              Add Stage
            </Button>
          </div>

          <ScrollArea className="flex-1">
            <div className="p-6 space-y-3">
              {stages.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <p className="text-[#656A73] font-medium">No stages yet.</p>
                  <p className="text-sm text-[#94A3B8] mt-1">Click &quot;Add Stage&quot; to create one.</p>
                </div>
              ) : (
                stages.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-start justify-between gap-4 p-4 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                          Stage {index + 1}
                        </span>
                        <span className="text-sm font-bold text-black truncate">{item.title}</span>
                      </div>
                      {item.description && (
                        <p className="text-xs text-[#656A73] mt-1 line-clamp-2">{item.description}</p>
                      )}
                    </div>
                    {isDraft && (
                      <div className="flex items-center gap-1 shrink-0">
                        <Button variant="actionEdit" size="xs" onClick={() => onEditStage(item.id)}>
                          <Pencil className="h-3 w-3" />
                        </Button>
                        <Button variant="actionDelete" size="xs" onClick={() => onDeleteStage(item.id)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
