import { useState, useCallback } from "react";
import {
  useUploadAdminSpiritFoodImportPreview,
  useCommitAdminSpiritFoodImport,
  useImportReportAdminSpiritFood,
  SAMPLE_SPIRIT_FOOD_CSV,
} from "@/resources/admin-spirit-food";
import type { FileUploaderFile } from "@/components/shared/FileUploader";
import type { ImportPreviewAdminSpiritFoodResponse } from "@/resources/admin-spirit-food";

export const useSpiritFoodBulkUploadModal = (onSuccess?: () => void) => {
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<ImportPreviewAdminSpiritFoodResponse | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileUploaderFile | null>(null);

  const uploadPreviewMutation = useUploadAdminSpiritFoodImportPreview();
  const commitImportMutation = useCommitAdminSpiritFoodImport();
  const { data: reportData } = useImportReportAdminSpiritFood(
    uploadId ? { uploadId, format: "json" } : { uploadId: "", format: "json" }
  );

  const handleFileSelect = useCallback((files: FileUploaderFile[]) => {
    if (files.length === 0) return;

    const file = files[0];
    setSelectedFile(file);
    setUploadId(null);
    setPreviewData(null);
  }, []);

  const handleUploadPreview = useCallback(async () => {
    if (!selectedFile) return;

    try {
      const fileInput = selectedFile.file || {
        uri: selectedFile.uri,
        name: selectedFile.name,
        type: selectedFile.type,
      };

      const result = await uploadPreviewMutation.mutateAsync({
        file: fileInput as File | { uri: string; name: string; type: string },
        submitAfterUpload: false,
      });

      setUploadId(result.uploadId);
      setPreviewData(result);
    } catch {
      setSelectedFile(null);
    }
  }, [selectedFile, uploadPreviewMutation]);

  const handleCommit = useCallback(async () => {
    if (!uploadId) return;

    try {
      await commitImportMutation.mutateAsync({
        uploadId,
        submitAfterUpload: false,
      });

      onSuccess?.();
      setUploadId(null);
      setPreviewData(null);
      setSelectedFile(null);
    } catch {}
  }, [uploadId, commitImportMutation, onSuccess]);

  const handleReset = useCallback(() => {
    setUploadId(null);
    setPreviewData(null);
    setSelectedFile(null);
  }, []);

  const handleDownloadSample = useCallback(() => {
    const blob = new Blob([SAMPLE_SPIRIT_FOOD_CSV], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "spirit_food_bulk_upload_template.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, []);

  return {
    uploadId,
    previewData,
    selectedFile,
    reportData,
    handleFileSelect,
    handleUploadPreview,
    handleCommit,
    handleReset,
    handleDownloadSample,
    isUploading: uploadPreviewMutation.isPending,
    isCommitting: commitImportMutation.isPending,
  };
};
