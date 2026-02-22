"use client";

import * as React from "react";
import { DataTable } from "@/components/shared/DataTable";
import { useChatbotConversationDataTableColumns } from "./ChatbotConversationDataTable.hooks";
import type { ChatbotConversationDataTableProps } from "./ChatbotConversationDataTable.types";

export function ChatbotConversationDataTable({
  items,
  isLoading = false,
  total = 0,
  pagination,
  onPaginationChange,
  onView,
}: ChatbotConversationDataTableProps) {
  const columns = useChatbotConversationDataTableColumns(onView);

  return (
    <DataTable
      columns={columns}
      data={items}
      isLoading={isLoading}
      pagination={{
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: pagination?.pageSize ?? 20,
        total,
      }}
      onPaginationChange={onPaginationChange}
      showSearch={false}
      showPagination={true}
      entriesCount={items.length}
      entriesCountLabel="Conversations"
    />
  );
}
