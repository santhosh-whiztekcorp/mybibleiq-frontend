import { useState, useCallback } from "react";
import {
  useUploadAdminQuestionImportPreview,
  useCommitAdminQuestionImport,
  useImportReportAdminQuestion,
} from "@/resources/admin-question";
import type { FileUploaderFile } from "@/components/shared/FileUploader";
import type { ImportPreviewAdminQuestionResponse } from "@/resources/admin-question";
import { SAMPLE_QUESTION_CSV } from "./QuestionImportModal.constants";

export const useQuestionImportModal = (onSuccess?: () => void) => {
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [previewData, setPreviewData] = useState<ImportPreviewAdminQuestionResponse | null>(null);
  const [selectedFile, setSelectedFile] = useState<FileUploaderFile | null>(null);

  const uploadPreviewMutation = useUploadAdminQuestionImportPreview();
  const commitImportMutation = useCommitAdminQuestionImport();

  // Conditionally fetch report only when uploadId is available
  const { data: reportData } = useImportReportAdminQuestion(
    uploadId ? { uploadId, format: "json" } : { uploadId: "", format: "json" }
  );

  const handleReset = useCallback(() => {
    setUploadId(null);
    setPreviewData(null);
    setSelectedFile(null);
  }, []);

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
      // Handle both Web File and potentially wrapped file objects
      const fileInput = selectedFile.file || selectedFile;

      const result = await uploadPreviewMutation.mutateAsync({
        file: fileInput as File,
        submitAfterUpload: false,
      });

      setUploadId(result.uploadId);
      setPreviewData(result);
    } catch {}
  }, [selectedFile, uploadPreviewMutation]);

  const handleCommit = useCallback(async () => {
    if (!uploadId) return;

    try {
      await commitImportMutation.mutateAsync({
        uploadId,
        submitAfterUpload: false,
      });

      onSuccess?.();
      handleReset();
    } catch {}
  }, [uploadId, commitImportMutation, onSuccess, handleReset]);

  const handleDownloadSample = useCallback(() => {
    const blob = new Blob([SAMPLE_QUESTION_CSV], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "question_bulk_upload_template.csv");
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
