"use client";

import * as React from "react";
import { FileText, XCircle, Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/shared/FileUploader";

import { DataTable } from "@/components/shared/DataTable";
import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { useSpiritFoodBulkUploadModal } from "./SpiritFoodBulkUploadModal.hooks";
import type { SpiritFoodBulkUploadModalProps } from "./SpiritFoodBulkUploadModal.types";
import type { ImportReportRow } from "@/resources/admin-spirit-food";

export function SpiritFoodBulkUploadModal({ open, onOpenChange, onSuccess }: SpiritFoodBulkUploadModalProps) {
  const {
    uploadId,
    previewData,
    selectedFile,
    reportData,
    handleFileSelect,
    handleUploadPreview,
    handleCommit,
    handleReset,
    handleDownloadSample,
    isUploading,
    isCommitting,
  } = useSpiritFoodBulkUploadModal(onSuccess);

  const handleClose = React.useCallback(
    (newOpen: boolean) => {
      if (!newOpen) {
        handleReset();
      }
      onOpenChange(newOpen);
    },
    [handleReset, onOpenChange]
  );

  const columns = React.useMemo<ColumnDef<ImportReportRow>[]>(
    () => [
      {
        accessorKey: "rowNumber",
        header: "Row",
        cell: ({ row }) => <span className="font-medium">#{row.original.rowNumber}</span>,
      },
      {
        accessorKey: "valid",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.valid ? "statusPublished" : "statusPendingDelete"} size="sm">
            {row.original.valid ? "Valid" : "Invalid"}
          </Badge>
        ),
      },
      {
        accessorKey: "data.scheduledDate",
        header: "Date",
        cell: ({ row }) => <div className="min-w-[100px]">{row.original.data.scheduledDate || "-"}</div>,
      },
      {
        accessorKey: "data.verseReference",
        header: "Reference",
        cell: ({ row }) => (
          <div className="font-medium whitespace-nowrap">{row.original.data.verseReference || "-"}</div>
        ),
      },
      {
        accessorKey: "data.verseText",
        header: "Verse Text",
        cell: ({ row }) => (
          <div className="min-w-[200px] max-w-[300px] truncate text-xs" title={row.original.data.verseText}>
            {row.original.data.verseText || "-"}
          </div>
        ),
      },
      {
        accessorKey: "errors",
        header: "Errors",
        cell: ({ row }) => (
          <div className="text-red-600 text-[10px] max-w-[150px] leading-tight">
            {row.original.errors && row.original.errors.length > 0 ? (
              <ul className="list-disc pl-3">
                {row.original.errors.map((error, i) => (
                  <li key={i}>{error}</li>
                ))}
              </ul>
            ) : (
              "-"
            )}
          </div>
        ),
      },
    ],
    []
  );

  const hasPreview = Boolean(previewData && uploadId);
  const isValidFile = selectedFile?.name.toLowerCase().endsWith(".csv");

  return (
    <Sheet open={open} onOpenChange={handleClose}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-4xl p-0 transition-all duration-300 flex flex-col overflow-hidden"
      >
        <div className="flex flex-col h-full w-full overflow-hidden">
          <SheetHeader className="px-6 pt-6 pb-2 shrink-0">
            <SheetTitle className="text-xl font-bold text-black">Bulk Upload CSV</SheetTitle>
            <SheetDescription className="text-sm font-semibold text-[#656A73]">
              Upload a CSV file to import multiple spirit food entries at once.
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-6 overflow-x-hidden">
            <div className="space-y-5 py-4 w-full max-w-full">
              {/* File Upload Section */}
              {!hasPreview && (
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-black mb-2 block">Select CSV File</label>
                    <FileUploader
                      accept="csv"
                      multiple={false}
                      onFileSelect={handleFileSelect}
                      onError={() => {
                        // Error handling is done in the hook via Toast
                      }}
                      disabled={isUploading}
                      enableDragDrop={true}
                      showDownloadSample={true}
                      sampleFileName="spirit_food_bulk_upload_template.csv"
                      onDownloadSample={handleDownloadSample}
                    />
                  </div>

                  {selectedFile && (
                    <div className="space-y-3">
                      <div className="p-3 bg-[#F3F3F5] rounded-[10px] border border-[#DADADA]">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-[#656A73]" />
                          <span className="text-sm font-semibold text-black">{selectedFile.name}</span>
                        </div>
                      </div>

                      {selectedFile && !isValidFile && (
                        <div className="p-3 bg-[#FFE1E1] border border-[#EAB8B8] rounded-[10px]">
                          <div className="flex items-center gap-2">
                            <XCircle className="h-4 w-4 text-[#A3131B]" />
                            <span className="text-sm font-semibold text-[#A3131B]">Please select a valid CSV file</span>
                          </div>
                        </div>
                      )}

                      {isValidFile && !hasPreview && (
                        <Button
                          type="button"
                          variant="actionSubmit"
                          onClick={handleUploadPreview}
                          disabled={isUploading}
                          className="w-full font-semibold"
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin" />
                              Validating...
                            </>
                          ) : (
                            "Validate File"
                          )}
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Preview Section */}
              {hasPreview && previewData && (
                <div className="space-y-4">
                  <div className="p-4 bg-[#F3F3F5] rounded-[10px] border border-[#DADADA] space-y-3">
                    <h3 className="text-sm font-bold text-black">Upload Preview</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <div className="text-xs text-[#656A73] mb-1">Total Rows</div>
                        <div className="text-base font-semibold text-black">{previewData.total}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#656A73] mb-1">Valid Rows</div>
                        <div className="text-base font-semibold text-green-600">{previewData.valid}</div>
                      </div>
                      <div>
                        <div className="text-xs text-[#656A73] mb-1">Invalid Rows</div>
                        <div className="text-base font-semibold text-red-600">{previewData.invalid}</div>
                      </div>
                    </div>
                  </div>

                  {reportData && reportData.rows && reportData.rows.length > 0 && (
                    <div className="space-y-3 pt-2">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-bold text-black">Validation Report</h3>
                        <span className="text-xs text-[#656A73]">Showing {reportData.rows.length} entries</span>
                      </div>
                      <DataTable
                        columns={columns}
                        data={reportData.rows}
                        showSearch={true}
                        showPagination={true}
                        searchPlaceholder="Filter by reference or error..."
                        minWidth="600px"
                        className="border rounded-[10px] bg-white overflow-hidden shadow-sm"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {hasPreview && (
            <SheetFooter className="px-6 py-4 border-t bg-white shrink-0">
              <Button
                variant="actionSubmit"
                onClick={handleCommit}
                disabled={isCommitting}
                className="w-full h-12 text-base font-bold"
              >
                {isCommitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Importing...
                  </>
                ) : (
                  "Import Entries"
                )}
              </Button>
            </SheetFooter>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
