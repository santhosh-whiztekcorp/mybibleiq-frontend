"use client";

import * as React from "react";
import { flexRender } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronLeftIcon, ChevronRightIcon, ChevronsLeftIcon, ChevronsRightIcon } from "lucide-react";
import { SearchIcon } from "@/assets";
import { cn } from "@/lib/utils";
import type { DataTableProps } from "./DataTable.types";
import { useDataTable } from "./DataTable.hooks";

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    columns,
    data,
    isLoading = false,
    pagination,
    onPaginationChange,
    sorting = [],
    onSortingChange,
    searchValue = "",
    onSearchChange,
    searchPlaceholder = "Search...",
    showSearch = true,
    showPagination = true,
    className,
    entriesCount,
    entriesCountLabel = "Entries",
    minWidth = "800px",
    getRowClassName,
  } = props;

  const { table, currentPagination, pageCount, canPreviousPage, canNextPage, handlePaginationChange } = useDataTable({
    columns,
    data,
    pagination,
    onPaginationChange,
    sorting,
    onSortingChange,
  });

  return (
    <div className={cn("space-y-4", className)}>
      {/* Search Bar */}
      {showSearch && onSearchChange && (
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            {/* Desktop Search */}
            <div className="hidden md:block relative w-full max-w-sm">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
              <Input
                variant="adminSearchBar"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
            {/* Mobile Search */}
            <div className="md:hidden relative w-full">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none" />
              <Input
                variant="adminSearchBar"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10"
              />
            </div>
            {/* Desktop: Count next to search */}
            {entriesCount !== undefined && (
              <div className="hidden md:block text-sm text-muted-foreground whitespace-nowrap">
                {entriesCountLabel} ({entriesCount})
              </div>
            )}
          </div>
          {/* Mobile: Count below search */}
          {entriesCount !== undefined && (
            <div className="md:hidden text-sm text-muted-foreground">
              {entriesCountLabel} ({entriesCount})
            </div>
          )}
        </div>
      )}

      {/* Table */}
      <div className="rounded-md border overflow-x-auto w-full">
        <Table className="min-w-full" style={{ minWidth }}>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="whitespace-nowrap">
                    {header.isPlaceholder ? null : (
                      <div
                        className={cn(
                          "flex items-center gap-2",
                          header.column.getCanSort() && "cursor-pointer select-none"
                        )}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {{
                          asc: " ↓",
                          desc: " ↑",
                        }[header.column.getIsSorted() as string] ?? null}
                      </div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={getRowClassName ? getRowClassName(row) : ""}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {showPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2 pb-2">
          <div className="text-sm text-muted-foreground text-center sm:text-left">
            {pagination ? (
              <>
                Showing {currentPagination.pageIndex * currentPagination.pageSize + 1} to{" "}
                {Math.min((currentPagination.pageIndex + 1) * currentPagination.pageSize, pagination.total)} of{" "}
                {pagination.total} entries
              </>
            ) : (
              <>
                Showing {table.getRowModel().rows.length} of {data.length} entries
              </>
            )}
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePaginationChange({ ...currentPagination, pageIndex: 0 })}
              disabled={!canPreviousPage}
              className="h-8 w-8 p-0"
            >
              <ChevronsLeftIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handlePaginationChange({ ...currentPagination, pageIndex: currentPagination.pageIndex - 1 })
              }
              disabled={!canPreviousPage}
              className="h-8 w-8 p-0"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1 text-xs sm:text-sm px-1 italic">
              <span>Page</span>
              <strong className="whitespace-nowrap">
                {currentPagination.pageIndex + 1} of {pageCount || 1}
              </strong>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                handlePaginationChange({ ...currentPagination, pageIndex: currentPagination.pageIndex + 1 })
              }
              disabled={!canNextPage}
              className="h-8 w-8 p-0"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePaginationChange({ ...currentPagination, pageIndex: pageCount - 1 })}
              disabled={!canNextPage}
              className="h-8 w-8 p-0"
            >
              <ChevronsRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
