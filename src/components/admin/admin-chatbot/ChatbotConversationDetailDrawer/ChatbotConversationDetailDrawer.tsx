"use client";

import React from "react";
import Image from "next/image";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useChatbotConversationDetailDrawer } from "./ChatbotConversationDetailDrawer.hooks";
import { ChatbotConversationDetailDrawerProps } from "./ChatbotConversationDetailDrawer.types";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTimeAgo } from "@/utils/formatting/formatting";
import { Badge } from "@/components/ui/badge";
import { CHATBOT_CONVERSATION_STATUS_LABELS } from "@/resources/admin-chatbot/admin-chatbot.constants";

export function ChatbotConversationDetailDrawer({
  conversation,
  open,
  onOpenChange,
}: ChatbotConversationDetailDrawerProps) {
  const { messages, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } = useChatbotConversationDetailDrawer(
    conversation?.id
  );

  const userName = conversation?.name || conversation?.userName || "Guest";
  const status = conversation?.status;
  const statusVariant = status === "RESOLVED" ? "statusActive" : "statusArchived";

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md p-0 flex flex-col h-full bg-[#f8fafc]">
        <SheetHeader className="p-4 border-b bg-white shrink-0">
          <SheetTitle className="flex items-center gap-3">
            {conversation?.avatarUrl ? (
              <Image
                src={conversation.avatarUrl}
                alt={userName}
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#FF96C7] flex items-center justify-center">
                <span className="text-xs font-bold text-white">
                  {(conversation?.username || userName).charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold">{userName}</span>
              <div className="flex items-center gap-2">
                {status && (
                  <Badge variant={statusVariant} size="sm" className="h-5 px-2 text-[10px]">
                    {CHATBOT_CONVERSATION_STATUS_LABELS[status]}
                  </Badge>
                )}
                <span className="text-[10px] text-muted-foreground font-normal">{messages.length} messages</span>
              </div>
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
          {isLoading && messages.length === 0 ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : (
            <>
              {hasNextPage && (
                <div className="flex w-full justify-center pb-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isFetchingNextPage}
                    onClick={() => fetchNextPage()}
                    className="text-[11px] text-[#656A73] font-bold uppercase transition-colors hover:bg-white border-transparent"
                  >
                    {isFetchingNextPage ? <Loader2 className="h-3 w-3 animate-spin mr-2" /> : null}
                    Load previous messages
                  </Button>
                </div>
              )}
              {messages.map((msg) => {
                const isAssistant = msg.role === "ASSISTANT";
                return (
                  <div
                    key={msg.id}
                    className={cn(
                      "flex flex-col max-w-[85%]",
                      isAssistant ? "self-start items-start" : "self-end items-end"
                    )}
                  >
                    <div
                      className={cn(
                        "p-3 rounded-2xl text-sm leading-relaxed",
                        isAssistant
                          ? "bg-[#F3F4F6] text-[#202020] rounded-bl-none"
                          : "bg-[#FDEEB2] text-[#202020] rounded-br-none"
                      )}
                    >
                      {msg.content}
                    </div>
                    <span className="text-[10px] text-[#64748b] mt-1 px-1">{formatTimeAgo(msg.createdAt)}</span>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
