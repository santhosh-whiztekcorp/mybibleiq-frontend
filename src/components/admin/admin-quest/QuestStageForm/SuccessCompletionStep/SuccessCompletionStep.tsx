"use client";

import * as React from "react";
import { InputController, TextareaController, BadgeSelectorController } from "@/components/form-controllers";
import { SliderController } from "@/components/form-controllers/SliderController";
import { useSuccessCompletionStep } from "./SuccessCompletionStep.hooks";

export function SuccessCompletionStep() {
  const { control, totalPoints, passingPoints, passingPercentage, sliderMax } = useSuccessCompletionStep();

  return (
    <div className="space-y-6">
      {/* Passing Points with Slider */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-[#393737]">Total Available: {totalPoints} points</p>
        <SliderController
          control={control}
          name="successCompletion.passingPoints"
          label="Passing Points"
          variant="adminPrimary"
          min={0}
          max={sliderMax}
          step={1}
        />
        {totalPoints > 0 && (
          <p className="text-xs font-semibold text-[#656A73]">
            Required to Pass: {passingPoints ?? 0} points ({passingPercentage}%)
          </p>
        )}
      </div>

      <TextareaController
        variant="adminPrimary"
        control={control}
        name="successCompletion.mascotMessage"
        label="Mascot Message"
        placeholder="Enter success message"
        required
        rows={3}
      />

      <BadgeSelectorController
        control={control}
        name="successCompletion.stageBadgeId"
        label="Stage Badge"
        placeholder="Select stage badge (optional)"
        filters={{ status: "Published" }}
      />

      <TextareaController
        variant="adminPrimary"
        control={control}
        name="successCompletion.reflectionPrompt"
        label="Reflection Prompt"
        placeholder="Enter reflection prompt"
        required
        rows={3}
      />

      <InputController
        variant="adminPrimary"
        control={control}
        name="successCompletion.nextButtonText"
        label="Next Button Text"
        placeholder="e.g. Next"
        required
      />
    </div>
  );
}
