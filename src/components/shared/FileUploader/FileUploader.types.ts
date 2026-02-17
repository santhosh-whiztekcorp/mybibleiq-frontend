export type FileUploaderAcceptType = "csv" | "image" | "audio" | "video" | "all" | string[];

export type FileUploaderFile = {
  uri: string;
  name: string;
  type: string;
  size?: number;
  // For web compatibility, store the original File object
  file?: File;
};

export type FileUploaderProps = {
  accept?: FileUploaderAcceptType;
  multiple?: boolean;
  maxSize?: number; // in bytes
  onFileSelect?: (files: FileUploaderFile[]) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  enableDragDrop?: boolean; // Enable drag and drop functionality
  dragDropClassName?: string; // Custom className for drag drop area
  showDownloadSample?: boolean; // Show download sample button
  onDownloadSample?: () => void; // Callback for download sample button
  sampleFileName?: string; // Name for the sample file
  sampleData?: string[][]; // Sample data to download
};
