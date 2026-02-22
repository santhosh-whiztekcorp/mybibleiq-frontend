"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { Settings, Check, Info } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { InputController, TextareaController, SwitchController } from "@/components/form-controllers";
import { FileUploader } from "@/components/shared/FileUploader";
import { useChatbotConfigurationTab } from "./ChatbotConfigurationTab.hooks";
import type { ChatbotConfigurationTabProps } from "./ChatbotConfigurationTab.types";
import { CHATBOT_POSITION_LABELS } from "@/resources/admin-chatbot";
import type { ChatbotPosition } from "@/resources/admin-chatbot";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/components/ui/sidebar";

export function ChatbotConfigurationTab({ active }: ChatbotConfigurationTabProps) {
  const {
    form,
    control,
    isLoading,
    isSaving,
    hasChanges,
    leftAvatarPreview,
    rightAvatarPreview,
    isLeftAvatarChangeMode,
    isRightAvatarChangeMode,
    setIsLeftAvatarChangeMode,
    setIsRightAvatarChangeMode,
    pageOptions,
    position,
    showOnPages,
    handleToggleShowOnPage,
    handleSelectPosition,
    handleSave,
    handleReset,
    setValue,
  } = useChatbotConfigurationTab();

  const { open } = useSidebar();

  if (!active) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Common styles for inputs to match mobile exactly
  const mobileInputClasses =
    "bg-white border-[#E5E7EB] font-semibold rounded-[12px] h-[44px] px-3 text-[14px] shadow-none focus-visible:ring-0 focus-visible:border-[#FF96C7]";
  const mobileTextareaClasses =
    "bg-white border-[#E5E7EB] font-semibold rounded-[12px] p-3 text-[14px] shadow-none focus-visible:ring-0 focus-visible:border-[#FF96C7] min-h-[100px]";

  return (
    <FormProvider {...form}>
      <div className="pb-24 space-y-8">
        <div className={cn("grid grid-cols-1 gap-6", open ? "lg:grid-cols-2" : "md:grid-cols-2")}>
          {/* Basic Settings Section */}
          <section className="p-4 space-y-4 rounded-[16px] border border-[#BBE4F7] bg-[#EEF7FE] flex flex-col h-full">
            <header className="flex items-center gap-[10px] mb-2">
              <div className="size-8 rounded-[10px] bg-[#FF96C7] flex items-center justify-center">
                <Settings className="size-[18px] text-white" />
              </div>
              <h2 className="text-[14px] font-bold text-[#1F2937]">Basic Settings</h2>
            </header>

            <div className="space-y-[14px]">
              <div className="space-y-1">
                <label className="text-[14px] font-bold text-[#111827]">Chatbot Name</label>
                <InputController
                  control={control}
                  name="name"
                  placeholder="Enter chatbot name"
                  required
                  className={mobileInputClasses}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[14px] font-bold text-[#111827]">Tagline</label>
                <InputController
                  control={control}
                  name="tagline"
                  placeholder="Enter tagline"
                  required
                  className={mobileInputClasses}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[14px] font-bold text-[#111827]">Welcome Message</label>
                <TextareaController
                  control={control}
                  name="welcomeMessage"
                  placeholder="Welcome message"
                  rows={3}
                  required
                  className={mobileTextareaClasses}
                />
              </div>

              {/* Avatars Stacked Vertically */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Left Avatar */}
                <div className="space-y-1">
                  <label className="text-[14px] font-bold text-[#111827]">Left Avatar</label>
                  {leftAvatarPreview && !isLeftAvatarChangeMode ? (
                    <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
                      <div className="px-3 py-2 border-b border-[#E5E7EB] bg-[#FCFCFD]">
                        <span className="text-[14px] font-semibold text-[#111827]">Left Avatar Preview</span>
                      </div>
                      <div className="relative h-[120px] w-full flex items-center justify-center p-4">
                        <Image src={leftAvatarPreview} fill className="object-contain p-4" alt="Left Avatar" />
                      </div>
                      <div className="p-3 bg-[#FCFCFD] flex justify-end">
                        <Button
                          type="button"
                          variant="actionAdd"
                          size="sm"
                          onClick={() => setIsLeftAvatarChangeMode(true)}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FileUploader
                        accept="image"
                        onFileSelect={(files) => {
                          if (files?.[0]?.file) {
                            setValue("leftAvatar", files[0].file, { shouldDirty: true });
                            setIsLeftAvatarChangeMode(false);
                          }
                        }}
                        className="h-[180px] p-6 bg-white border-[#E5E7EB] rounded-[12px]"
                        dragDropClassName="p-2 gap-1"
                      />
                      {leftAvatarPreview && (
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="actionCancel"
                            size="sm"
                            onClick={() => setIsLeftAvatarChangeMode(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Right Avatar */}
                <div className="space-y-1">
                  <label className="text-[14px] font-bold text-[#111827]">Right Avatar</label>
                  {rightAvatarPreview && !isRightAvatarChangeMode ? (
                    <div className="bg-white border border-[#E5E7EB] rounded-[12px] overflow-hidden">
                      <div className="px-3 py-2 border-b border-[#E5E7EB] bg-[#FCFCFD]">
                        <span className="text-[14px] font-semibold text-[#111827]">Right Avatar Preview</span>
                      </div>
                      <div className="relative h-[120px] w-full flex items-center justify-center p-4">
                        <Image src={rightAvatarPreview} fill className="object-contain p-4" alt="Right Avatar" />
                      </div>
                      <div className="p-3 bg-[#FCFCFD] flex justify-end">
                        <Button
                          type="button"
                          variant="actionAdd"
                          size="sm"
                          onClick={() => setIsRightAvatarChangeMode(true)}
                        >
                          Change
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <FileUploader
                        accept="image"
                        onFileSelect={(files) => {
                          if (files?.[0]?.file) {
                            setValue("rightAvatar", files[0].file, { shouldDirty: true });
                            setIsRightAvatarChangeMode(false);
                          }
                        }}
                        className="h-[180px] p-6 bg-white border-[#E5E7EB] rounded-[12px]"
                        dragDropClassName="p-2 gap-1"
                      />
                      {rightAvatarPreview && (
                        <div className="flex justify-end">
                          <Button
                            type="button"
                            variant="actionCancel"
                            size="sm"
                            onClick={() => setIsRightAvatarChangeMode(false)}
                          >
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Position Selector */}
              <div className="space-y-1">
                <label className="text-[14px] font-bold text-[#111827]">Chatbot Initial Position</label>
                <div className="flex gap-3">
                  {(["BOTTOM_LEFT", "BOTTOM_RIGHT"] as ChatbotPosition[]).map((opt) => {
                    const isSelected = position === opt;
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelectPosition(opt)}
                        className={cn(
                          "flex-1 py-[10px] rounded-[12px] border font-bold text-[12px] transition-all h-[44px]",
                          isSelected
                            ? "bg-[#FFF1F7] border-[#F9A8D4] text-[#E7378F]"
                            : "bg-white border-[#E5E7EB] text-[#374151]"
                        )}
                      >
                        {CHATBOT_POSITION_LABELS[opt]}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          <div className="">
            {/* Behaviour Settings Section */}
            <section className="p-4 space-y-4 rounded-[16px] border border-[#BBE4F7] bg-[#EEF7FE]">
              <header className="flex items-center gap-[10px] mb-2">
                <div className="size-8 rounded-[10px] bg-[#989FE2] flex items-center justify-center">
                  <Info className="size-[18px] text-white" />
                </div>
                <h2 className="text-[14px] font-bold text-[#1F2937]">Behaviour Settings</h2>
              </header>

              <div className="space-y-[14px]">
                {/* Toggle Row */}
                <div className="flex items-center justify-between py-[12px] px-4 bg-white border border-[#BBE4F7] rounded-[12px]">
                  <div className="flex-1 pr-3">
                    <h3 className="text-[14px] font-semibold text-[#1F2937]">Enable Chatbot</h3>
                    <p className="text-[12px] text-[#6B7280] mt-px">Show chatbot to users</p>
                  </div>
                  <SwitchController
                    control={control}
                    name="enabled"
                    className="data-[state=checked]:bg-[#7EF435] data-[state=checked]:border-[#7EF435]"
                  />
                </div>

                {/* Page Grid */}
                <div className="space-y-1">
                  <label className="text-[14px] font-bold text-[#111827]">Show Chatbot On</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pageOptions.map((page) => {
                      const isChecked = (showOnPages || []).includes(page.value);
                      return (
                        <button
                          key={page.value}
                          type="button"
                          onClick={() => handleToggleShowOnPage(page.value)}
                          className={cn(
                            "flex flex-row items-center gap-2 py-[10px] px-3 rounded-[12px] border transition-all w-full",
                            isChecked ? "bg-[#FFF1F7] border-[#F9A8D4]" : "bg-white border-[#E5E7EB]"
                          )}
                        >
                          <div
                            className={cn(
                              "size-[18px] rounded-[6px] border flex items-center justify-center transition-all",
                              isChecked ? "bg-[#FF96C7] border-[#E7378F]" : "bg-white border-[#D1D5DB]"
                            )}
                          >
                            {isChecked && <Check className="size-3 text-white" />}
                          </div>
                          <span className="text-[12px] font-normal text-[#374151]">{page.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </section>

            {/* Sticky Footer Actions */}
            {hasChanges && (
              <div className="sticky bottom-0 -mx-4 pb-4 px-4 bg-white/80 backdrop-blur-md flex justify-end gap-3 z-20 mt-8">
                <div className="w-full flex justify-end gap-3 py-4">
                  <Button
                    variant="actionCancel"
                    onClick={handleReset}
                    disabled={isSaving}
                    className="px-8 h-[44px] rounded-[12px]"
                  >
                    Reset
                  </Button>
                  <Button
                    variant="actionSubmit"
                    onClick={handleSave}
                    disabled={isSaving}
                    className="px-8 h-[44px] rounded-[12px]"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </FormProvider>
  );
}
