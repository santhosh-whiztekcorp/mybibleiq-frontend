"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/shared/DataTable";
import { useChatbotResponseDataTableColumns } from "./ChatbotResponseDataTable.hooks";
import type { ChatbotResponseDataTableProps } from "./ChatbotResponseDataTable.types";

export function ChatbotResponseDataTable({
  items,
  isLoading = false,
  total = 0,
  onEdit,
  onDelete,
  onLoadMore,
  hasNextPage,
  isFetchingNextPage,
}: ChatbotResponseDataTableProps) {
  const columns = useChatbotResponseDataTableColumns(onEdit, onDelete);

  return (
    <div className="space-y-3">
      <DataTable
        columns={columns}
        data={items}
        isLoading={isLoading}
        showSearch={false}
        showPagination={false}
        entriesCount={items.length}
        entriesCountLabel={`Responses${typeof total === "number" ? ` (${total} total)` : ""}`}
        minWidth="900px"
      />

      {hasNextPage && (
        <div className="flex justify-center">
          <Button variant="actionSubmit" onClick={onLoadMore} disabled={isFetchingNextPage} className="h-10 px-6">
            {isFetchingNextPage && <Loader2 className="h-4 w-4 animate-spin" />}
            {isFetchingNextPage ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </div>
  );
}
