import { useState, useCallback, useRef } from "react";
import type { FileUploaderAcceptType, FileUploaderFile, FileUploaderProps } from "./FileUploader.types";

const ACCEPT_MAP: Record<string, string[]> = {
  csv: [".csv", "text/csv", "application/vnd.ms-excel"],
  image: ["image/*"],
  audio: ["audio/*"],
  video: ["video/*"],
  all: [],
};

export const useFileUploader = (
  accept: FileUploaderAcceptType = "all",
  multiple = false,
  maxSize?: number,
  onFileSelect?: FileUploaderProps["onFileSelect"],
  onError?: FileUploaderProps["onError"],
  disabled = false
) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [, setDragCounter] = useState(0); // Used to track nested drag events

  const getAcceptTypes = useCallback((): string[] => {
    if (Array.isArray(accept)) {
      return accept;
    }
    if (accept === "all") {
      return [];
    }
    return ACCEPT_MAP[accept] || [];
  }, [accept]);

  const acceptTypes = getAcceptTypes();
  const acceptString = acceptTypes.length > 0 ? acceptTypes.join(",") : undefined;

  // Check if file type matches accept criteria
  const isFileTypeAccepted = useCallback(
    (file: File): boolean => {
      if (accept === "all" || acceptTypes.length === 0) {
        return true;
      }

      // Check file extension
      const fileName = file.name.toLowerCase();

      // Check MIME type
      const fileType = file.type.toLowerCase();

      return acceptTypes.some((acceptType) => {
        const lowerAccept = acceptType.toLowerCase();
        // Check extension match (e.g., ".csv")
        if (lowerAccept.startsWith(".") && fileName.endsWith(lowerAccept)) {
          return true;
        }
        // Check MIME type match (e.g., "text/csv", "image/*")
        if (lowerAccept.includes("*")) {
          const baseType = lowerAccept.split("/")[0];
          return fileType.startsWith(baseType + "/");
        }
        return fileType === lowerAccept;
      });
    },
    [accept, acceptTypes]
  );

  const convertFileToFileUploaderFile = useCallback(
    (file: File): Promise<FileUploaderFile> => {
      return new Promise((resolve, reject) => {
        // Check file size
        if (maxSize && file.size > maxSize) {
          reject(new Error(`File size exceeds maximum allowed size of ${maxSize} bytes`));
          return;
        }

        // For web, create a blob URL for display purposes
        // Store the original File object for API calls
        const blobUrl = URL.createObjectURL(file);
        resolve({
          uri: blobUrl,
          name: file.name,
          type: file.type || "application/octet-stream",
          size: file.size,
          file, // Store the original File for web FormData compatibility
        });
      });
    },
    [maxSize]
  );

  const handleFileSelect = useCallback(
    async (files: FileList | null) => {
      if (!files || files.length === 0) {
        return;
      }

      try {
        const fileArray = Array.from(files);
        const convertedFiles = await Promise.all(fileArray.map(convertFileToFileUploaderFile));
        onFileSelect?.(convertedFiles);
        // Reset input so same file can be selected again
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to process files";
        onError?.(errorMessage);
      }
    },
    [convertFileToFileUploaderFile, onFileSelect, onError]
  );

  const handleFileList = useCallback(
    async (fileList: File[]) => {
      if (fileList.length === 0) {
        return;
      }

      try {
        const convertedFiles = await Promise.all(fileList.map(convertFileToFileUploaderFile));
        onFileSelect?.(convertedFiles);
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Failed to process files";
        onError?.(errorMessage);
      }
    },
    [convertFileToFileUploaderFile, onFileSelect, onError]
  );

  // Handle drag events
  const handleDragEnter = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      setDragCounter((prev) => prev + 1);

      if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
        setIsDragging(true);
      }
    },
    [disabled]
  );

  const handleDragLeave = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      setDragCounter((prev) => {
        const newCounter = prev - 1;
        if (newCounter === 0) {
          setIsDragging(false);
        }
        return newCounter;
      });
    },
    [disabled]
  );

  const handleDragOver = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      if (e.dataTransfer.types.includes("Files")) {
        e.dataTransfer.dropEffect = "copy";
      }
    },
    [disabled]
  );

  const handleDrop = useCallback(
    async (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();

      if (disabled) return;

      setIsDragging(false);
      setDragCounter(0);

      const files = Array.from(e.dataTransfer.files);

      if (files.length === 0) {
        return;
      }

      // Filter files based on accept criteria
      const acceptedFiles = files.filter((file) => {
        if (!isFileTypeAccepted(file)) {
          onError?.(`File "${file.name}" is not an accepted file type`);
          return false;
        }
        return true;
      });

      if (acceptedFiles.length === 0) {
        return;
      }

      // If multiple is false, only take the first file
      const filesToProcess = multiple ? acceptedFiles : [acceptedFiles[0]];

      await handleFileList(filesToProcess);
    },
    [disabled, multiple, isFileTypeAccepted, handleFileList, onError]
  );

  const handleClick = useCallback(() => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  }, [disabled]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFileSelect(e.target.files);
    },
    [handleFileSelect]
  );

  const getFileTypeLabel = useCallback((): string => {
    if (accept === "csv") {
      return "CSV files only";
    }
    if (accept === "image") {
      return "Images only";
    }
    if (accept === "audio") {
      return "Audio files only";
    }
    if (accept === "video") {
      return "Video files only";
    }
    if (accept === "all") {
      return "Any file type";
    }
    if (Array.isArray(accept)) {
      return accept.join(", ");
    }
    return "Supported files";
  }, [accept]);

  const getDragText = useCallback((): string => {
    return isDragging && !disabled ? "Drop files here" : "Click to upload or drag and drop";
  }, [isDragging, disabled]);

  const downloadSampleFile = useCallback((sampleData: string[][], fileName: string = "sample.csv") => {
    // Create CSV content
    const csvContent = sampleData.map((row) => row.map((cell) => `"${cell}"`).join(",")).join("\n");

    // Create blob and download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);

    link.setAttribute("href", url);
    link.setAttribute("download", fileName);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return {
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
  };
};
