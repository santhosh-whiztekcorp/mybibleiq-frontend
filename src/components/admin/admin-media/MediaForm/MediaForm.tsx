"use client";

import * as React from "react";
import { FormProvider } from "react-hook-form";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  InputController,
  TextareaController,
  TagSelectorController,
  SelectController,
} from "@/components/form-controllers";
import { useMediaForm } from "./MediaForm.hooks";
import type { MediaFormProps } from "./MediaForm.types";
import { MEDIA_TYPE_OPTIONS, MEDIA_TYPE_LABELS } from "@/resources/admin-media/admin-media.constants";
import { Upload, X, ImageIcon, Music, Video, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function MediaForm(props: MediaFormProps) {
  const { form, onSubmit, isMutationLoading, isEditMode } = useMediaForm(props);
  const [open, setOpen] = React.useState(true);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const errors = form.formState.errors;
  const selectedType = form.watch("type");
  const selectedFile = form.watch("file");

  const [isDragging, setIsDragging] = React.useState(false);

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) {
      props.onClose?.();
    }
  };

  const validateAndSetFile = React.useCallback(
    (file: File) => {
      const isImage = file.type.startsWith("image/");
      const isAudio = file.type.startsWith("audio/");
      const isVideo = file.type.startsWith("video/");

      let isValid = false;
      if (selectedType === "IMAGE" && isImage) isValid = true;
      else if (selectedType === "AUDIO" && isAudio) isValid = true;
      else if (selectedType === "VIDEO" && isVideo) isValid = true;
      else if (!selectedType) isValid = true;

      if (!isValid) {
        form.setError("file", {
          type: "manual",
          message: `Invalid file type. Please upload an ${MEDIA_TYPE_LABELS[selectedType].toLowerCase()}.`,
        });
        form.setValue("file", undefined, { shouldValidate: true });
        return;
      }

      form.clearErrors("file");
      form.setValue("title", form.getValues("title") || file.name.split(".")[0], { shouldValidate: true });
      form.setValue("sizeBytes", file.size, { shouldValidate: true });
      form.setValue(
        "file",
        {
          uri: URL.createObjectURL(file),
          name: file.name,
          type: file.type,
          file: file,
        },
        { shouldValidate: true }
      );
    },
    [form, selectedType]
  );

  // Re-validate existing file when type changes
  React.useEffect(() => {
    if (selectedFile) {
      const type = selectedFile.type;
      const isImage = type.startsWith("image/");
      const isAudio = type.startsWith("audio/");
      const isVideo = type.startsWith("video/");

      let isValid = false;
      if (selectedType === "IMAGE" && isImage) isValid = true;
      else if (selectedType === "AUDIO" && isAudio) isValid = true;
      else if (selectedType === "VIDEO" && isVideo) isValid = true;

      if (!isValid) {
        form.setError("file", {
          type: "manual",
          message: `File type mismatch. Selected type is ${MEDIA_TYPE_LABELS[selectedType].toLowerCase()} but file is ${
            type.split("/")[0]
          }.`,
        });
      } else {
        form.clearErrors("file");
      }
    }
  }, [selectedType, selectedFile, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleDragOver = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = React.useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = React.useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files?.[0];
      if (file) {
        validateAndSetFile(file);
      }
    },
    [validateAndSetFile]
  );

  const removeFile = () => {
    form.setValue("file", undefined);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto p-0">
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="flex flex-col h-full">
            <div className="px-4 pt-4 pb-0">
              <SheetHeader className="px-0 pb-2">
                <SheetTitle className="text-xl font-bold text-black">
                  {isEditMode ? "Edit Media" : "Upload New Media"}
                </SheetTitle>
                <SheetDescription className="text-sm font-semibold text-[#656A73]">
                  {isEditMode ? "Update the media details." : "Choose a file and fill in the details."}
                </SheetDescription>
              </SheetHeader>
            </div>

            <ScrollArea className="flex-1 px-4">
              <div className="space-y-5 pt-2.5 pb-4 px-1">
                <SelectController
                  variant="adminPrimary"
                  control={form.control}
                  name="type"
                  label="Media Type"
                  options={MEDIA_TYPE_OPTIONS.map((type) => ({
                    label: MEDIA_TYPE_LABELS[type],
                    value: type,
                  }))}
                  error={errors.type?.message}
                />

                {/* File Upload Section */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-[#656A73] uppercase">
                    {isEditMode ? "Replace Media File" : "Media File"}
                  </label>
                  {selectedFile ? (
                    <div className="relative border-2 border-primary/20 rounded-xl p-4 bg-primary/5 flex items-center gap-4">
                      <div className="relative h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 overflow-hidden border border-primary/10 group">
                        {selectedType === "IMAGE" && selectedFile?.uri ? (
                          <div className="relative w-full h-full">
                            <Image src={selectedFile.uri} alt="Preview" fill className="object-contain" unoptimized />
                          </div>
                        ) : selectedType === "IMAGE" ? (
                          <ImageIcon className="h-6 w-6 text-primary" />
                        ) : selectedType === "AUDIO" ? (
                          <Music className="h-6 w-6 text-primary" />
                        ) : (
                          <Video className="h-6 w-6 text-primary" />
                        )}
                        <div
                          className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <Pencil className="h-4 w-4 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-black truncate">{selectedFile?.name}</p>
                        <p className="text-[11px] text-[#656A73] uppercase font-bold">
                          {form.getValues("sizeBytes") > 0
                            ? `${(form.getValues("sizeBytes") / (1024 * 1024)).toFixed(2)} MB • `
                            : ""}
                          {selectedFile?.type || "Unknown file type"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-9 w-9 bg-white text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors border border-red-100 rounded-lg"
                          onClick={removeFile}
                          title="Remove file"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                      className={cn(
                        "border-2 border-dashed border-[#E2E8F0] rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-colors hover:bg-[#F9FAFB] hover:border-primary/50",
                        isDragging && "border-primary bg-primary/5",
                        errors.file && "border-red-500 bg-red-50"
                      )}
                    >
                      <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Upload className="h-6 w-6 text-primary" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-black">Click to upload or drag and drop</p>
                        <p className="text-[11px] text-[#656A73] mt-1 font-semibold uppercase">
                          {MEDIA_TYPE_LABELS[selectedType] || "File"}
                        </p>
                      </div>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        onChange={handleFileChange}
                        accept={
                          selectedType === "IMAGE"
                            ? "image/*"
                            : selectedType === "AUDIO"
                              ? "audio/*"
                              : selectedType === "VIDEO"
                                ? "video/*"
                                : "image/*,audio/*,video/*"
                        }
                      />
                    </div>
                  )}
                  {errors.file && (
                    <p className="text-xs text-red-500 font-medium">
                      {errors.file.message?.toString() || "File is required"}
                    </p>
                  )}
                </div>

                <InputController
                  variant="adminPrimary"
                  control={form.control}
                  name="title"
                  label="Title"
                  placeholder="e.g., Opening Prayer"
                  error={errors.title?.message}
                />

                <TextareaController
                  variant="adminPrimary"
                  control={form.control}
                  name="caption"
                  label="Caption (Optional)"
                  placeholder="Enter caption..."
                  error={errors.caption?.message}
                  rows={3}
                />

                <TagSelectorController
                  control={form.control}
                  name="tags"
                  label="Tags"
                  placeholder="Select tags..."
                  error={errors.tags?.message}
                />

                {(selectedType === "AUDIO" || selectedType === "VIDEO") && (
                  <InputController
                    variant="adminPrimary"
                    control={form.control}
                    name="duration"
                    label="Duration (in seconds)"
                    placeholder="e.g., 180"
                    type="number"
                    error={errors.duration?.message}
                  />
                )}
              </div>
            </ScrollArea>

            <SheetFooter className="px-4 pt-4 pb-8 gap-2 shrink-0 border-t border-[#E2E8F0] mt-auto">
              <Button type="submit" variant="actionSubmit" disabled={isMutationLoading} className="w-full h-11">
                {isMutationLoading ? "Saving..." : isEditMode ? "Update Media" : "Upload & Save"}
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
