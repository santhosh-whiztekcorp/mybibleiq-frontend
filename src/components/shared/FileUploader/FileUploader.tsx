"use client";

import * as React from "react";
import { Upload, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFileUploader } from "./FileUploader.hooks";
import type { FileUploaderProps } from "./FileUploader.types";
import { cn } from "@/lib/utils";

export function FileUploader({
  accept = "all",
  multiple = false,
  maxSize,
  onFileSelect,
  onError,
  disabled = false,
  className,
  children,
  enableDragDrop = true,
  dragDropClassName,
  showDownloadSample = false,
  onDownloadSample,
  sampleFileName = "sample.csv",
  sampleData,
}: FileUploaderProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const {
    fileInputRef,
    isDragging,
    acceptString,
    getFileTypeLabel,
    getDragText,
    downloadSampleFile,
    handleClick,
    handleChange,
    handleDragEnter,
    handleDragLeave,
    handleDragOver,
    handleDrop,
  } = useFileUploader(accept, multiple, maxSize, onFileSelect, onError, disabled);

  const handleDownloadSample = React.useCallback(() => {
    if (onDownloadSample) {
      onDownloadSample();
    } else if (sampleData) {
      downloadSampleFile(sampleData, sampleFileName);
    }
  }, [onDownloadSample, sampleData, sampleFileName, downloadSampleFile]);

  // Default drag drop area styling
  const defaultDragDropClasses =
    enableDragDrop && !children
      ? cn(
          "border-2 border-dashed rounded-[10px] p-8 text-center cursor-pointer transition-all duration-200",
          isDragging && !disabled
            ? "border-primary bg-primary/10 scale-[1.01]"
            : "border-[#DADADA] bg-[#F9F9F9] hover:border-[#B3B3B3] hover:bg-[#F3F3F5]",
          disabled && "opacity-50 cursor-not-allowed"
        )
      : "";

  const dragDropClasses = cn(
    "transition-all duration-200",
    isDragging && !disabled && enableDragDrop && "border-primary bg-primary/10 scale-[1.01]",
    dragDropClassName
  );

  return (
    <div
      ref={containerRef}
      className={cn("relative", enableDragDrop && (children ? dragDropClasses : defaultDragDropClasses), className)}
      onDragEnter={enableDragDrop ? handleDragEnter : undefined}
      onDragOver={enableDragDrop ? handleDragOver : undefined}
      onDragLeave={enableDragDrop ? handleDragLeave : undefined}
      onDrop={enableDragDrop ? handleDrop : undefined}
      onClick={!children && !disabled ? handleClick : undefined}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept={acceptString}
        multiple={multiple}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
        aria-label="File upload input"
      />
      {children ? (
        <div onClick={handleClick} className={disabled ? "pointer-events-none opacity-50" : "cursor-pointer"}>
          {children}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-3">
          <div
            className={cn(
              "rounded-full p-4 transition-colors",
              isDragging && !disabled ? "bg-primary/20" : "bg-[#E9EAEC]"
            )}
          >
            <Upload
              className={cn("h-6 w-6 transition-colors", isDragging && !disabled ? "text-primary" : "text-[#656A73]")}
            />
          </div>
          <div className="space-y-1">
            <div className="text-sm font-semibold text-black">{getDragText()}</div>
            <div className="text-xs text-[#656A73]">
              {getFileTypeLabel()}
              {maxSize && ` (Max ${Math.round(maxSize / 1024 / 1024)}MB)`}
            </div>
          </div>
          {showDownloadSample && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleDownloadSample();
              }}
              disabled={disabled}
              className="mt-2 font-semibold"
            >
              <Download className="h-4 w-4" />
              Download Sample
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
