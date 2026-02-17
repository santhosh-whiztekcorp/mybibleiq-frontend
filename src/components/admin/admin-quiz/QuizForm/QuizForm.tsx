"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import { Trash2, FileText, Plus, Shuffle, Timer, User, Users, Medal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  InputController,
  TagSelectorController,
  SelectController,
  TextareaController,
  SwitchController,
  SliderController,
} from "@/components/form-controllers";
import { AdminQuestionSelector } from "@/components/admin/admin-shared/AdminQuestionSelector";
import { QUIZ_DIFFICULTY_OPTIONS, QUIZ_DIFFICULTY_LABELS } from "@/resources/admin-quiz/admin-quiz.constants";
import { useQuizForm } from "./QuizForm.hooks";
import type { QuizFormProps, RadioOptionProps, GameModeCardProps } from "./QuizForm.types";
import type { QuizRandomization, TimeLimitType, QuestionDifficulty } from "@/resources/admin-quiz/admin-quiz.types";

const RadioOption = ({ id, value, label, description, selected }: Omit<RadioOptionProps, "onSelect">) => (
  <Label
    htmlFor={id}
    className={cn(
      "flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer",
      selected
        ? "bg-primary/5 border-primary ring-1 ring-primary/20"
        : "bg-white border-[#E2E8F0] hover:border-[#CBD5E1]"
    )}
  >
    <RadioGroupItem value={value} id={id} className="mt-1" />
    <div className="flex flex-col gap-0.5">
      <span className={cn("text-xs font-bold", selected ? "text-primary" : "text-black")}>{label}</span>
      {description && <span className="text-[10px] font-medium text-[#656A73]">{description}</span>}
    </div>
  </Label>
);

const GameModeCard = ({
  label,
  description,
  icon,
  bgColor,
  borderColor,
  onToggle,
  control,
  name,
}: GameModeCardProps) => (
  <div
    className={cn("flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer", bgColor, borderColor)}
    onClick={onToggle}
  >
    <div className="flex items-center justify-center w-9 h-9 bg-white rounded-lg shrink-0 shadow-sm">{icon}</div>
    <div className="flex-1 flex flex-col gap-0.5">
      <span className="text-xs font-bold text-black">{label}</span>
      <span className="text-[10px] font-medium text-[#656A73]">{description}</span>
    </div>
    <div onClick={(e) => e.stopPropagation()}>
      <SwitchController control={control} name={name} size="sm" />
    </div>
  </div>
);

export function QuizForm(props: QuizFormProps) {
  const {
    form,
    onSubmit,
    isMutationLoading,
    isEditMode,
    isSwordDrillEnabled,
    timeLimitType,
    randomization,
    fields,
    remove,
    isOpen,
    handleOpenChange,
    handleAddQuestions,
    allowMultiplayer,
    allowQuick,
    swordDrillTimeLimitType,
    swordDrillRandomization,
  } = useQuizForm(props);

  return (
    <Sheet open={isOpen} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-2xl overflow-y-auto p-0 flex flex-col">
        <FormProvider {...form}>
          <form onSubmit={onSubmit} className="flex flex-col h-full font-plus-jakarta-sans text-black">
            <div className="px-6 pt-6 pb-4 border-b border-[#F1F5F9]">
              <SheetHeader className="px-0 space-y-1 text-left">
                <SheetTitle className="text-xl font-bold text-black">
                  {isEditMode ? "Edit Quiz" : "Create New Quiz"}
                </SheetTitle>
                <SheetDescription className="text-sm font-semibold text-[#656A73]">
                  {isEditMode ? "Update the quiz details." : "Fill in the details to create a new quiz."}
                </SheetDescription>
              </SheetHeader>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-8">
                {/* Basic Fields */}
                <div className="space-y-5">
                  <InputController
                    variant="adminPrimary"
                    control={form.control}
                    name="title"
                    label="Title"
                    placeholder="Enter quiz title"
                    required
                  />

                  <TextareaController
                    variant="adminPrimary"
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Enter quiz description"
                    required
                    rows={3}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <SelectController
                      variant="adminPrimary"
                      control={form.control}
                      name="difficulty"
                      label="Difficulty"
                      placeholder="Select difficulty"
                      options={QUIZ_DIFFICULTY_OPTIONS.map((opt) => ({
                        label: QUIZ_DIFFICULTY_LABELS[opt],
                        value: opt,
                      }))}
                    />

                    <TagSelectorController control={form.control} name="tags" label="Tags" placeholder="Select tags" />
                  </div>
                </div>

                {/* Randomization Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shuffle className="h-5 w-5 text-[#656A73] opacity-80" />
                    <h3 className="text-sm font-bold text-black uppercase tracking-wider">Randomization</h3>
                  </div>
                  <RadioGroup
                    value={randomization ?? "None"}
                    onValueChange={(val) => form.setValue("randomization", val as QuizRandomization)}
                    className="grid grid-cols-1 gap-3"
                  >
                    <RadioOption
                      id="quiz-rand-none"
                      value="None"
                      label="None"
                      description="Questions appear in the order you arrange them"
                      selected={randomization === "None"}
                    />
                    <RadioOption
                      id="quiz-rand-shuffle"
                      value="ShuffleAll"
                      label="Shuffle All"
                      description="Use all questions, but randomize their order each time"
                      selected={randomization === "ShuffleAll"}
                    />
                    <RadioOption
                      id="quiz-rand-subset"
                      value="RandomSubset"
                      label="Random Subset"
                      description="Select random subset from pool each time"
                      selected={randomization === "RandomSubset"}
                    />
                  </RadioGroup>
                  {randomization === "RandomSubset" && (
                    <div className="mt-2 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                      <InputController
                        variant="adminPrimary"
                        type="number"
                        control={form.control}
                        name="subsetCount"
                        label="Subset Count"
                        placeholder="Enter subset count"
                        required
                      />
                    </div>
                  )}
                </div>

                {/* Timing Section */}
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Timer className="h-5 w-5 text-[#656A73] opacity-80" />
                    <h3 className="text-sm font-bold text-black uppercase tracking-wider">Timing</h3>
                  </div>
                  <RadioGroup
                    value={timeLimitType ?? "None"}
                    onValueChange={(val) => {
                      form.setValue("timeLimitType", val as TimeLimitType);
                      if (val === "None") form.setValue("timeLimitValue", undefined);
                    }}
                    className="grid grid-cols-1 gap-3"
                  >
                    <RadioOption
                      id="quiz-time-none"
                      value="None"
                      label="Untimed"
                      description="User can take as long as they need (default)"
                      selected={timeLimitType === "None"}
                    />
                    <RadioOption
                      id="quiz-time-total"
                      value="TotalQuizTime"
                      label="Total Time Limit"
                      description="Set time limit for entire quiz"
                      selected={timeLimitType === "TotalQuizTime"}
                    />
                    <RadioOption
                      id="quiz-time-per-q"
                      value="PerQuestion"
                      label="Per-Question Time Limit"
                      description="Set time limit for each question"
                      selected={timeLimitType === "PerQuestion"}
                    />
                  </RadioGroup>
                  {timeLimitType !== "None" && (
                    <div className="space-y-2 mt-2 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                      <InputController
                        variant="adminPrimary"
                        type="number"
                        control={form.control}
                        name="timeLimitValue"
                        label={timeLimitType === "PerQuestion" ? "Seconds Per Question" : "Time Limit Value (seconds)"}
                        placeholder={
                          timeLimitType === "PerQuestion" ? "Enter seconds per question" : "Enter time limit value"
                        }
                        required
                      />
                      {timeLimitType === "PerQuestion" && (
                        <p className="text-[10px] font-medium text-[#656A73] italic">
                          Recommended: 10-15s for quick questions, 25-30s for complex matching
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {/* Question Selection Section */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="h-5 w-5 text-[#656A73] opacity-80" />
                      <h3 className="text-sm font-bold text-black uppercase tracking-wider">Questions</h3>
                    </div>
                    <span className="text-[10px] font-bold text-[#656A73] uppercase tracking-wider">
                      {fields.length} {fields.length === 1 ? "Question" : "Questions"}
                    </span>
                  </div>

                  {fields.length > 0 && (
                    <div className="space-y-3">
                      {fields.map((field, index) => (
                        <div
                          key={field.id}
                          className="flex flex-col gap-4 p-4 bg-white rounded-xl border border-[#E2E8F0] shadow-sm relative group hover:border-primary/20 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[9px] font-bold text-primary uppercase bg-primary/5 px-2 py-0.5 rounded-full">
                              Question {index + 1}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="xs"
                              className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7 w-7 p-0"
                              onClick={() => remove(index)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div className="w-full space-y-2.5">
                              <Label className="text-[10px] font-bold text-[#656A73] uppercase">Difficulty</Label>
                              <div className="flex gap-2">
                                {["EASY", "MEDIUM", "HARD"].map((diff) => {
                                  const isSelected = form.watch(`questions.${index}.difficulty`) === diff;
                                  const variant = (
                                    isSelected
                                      ? `difficulty${diff === "EASY" ? "Easy" : diff === "MEDIUM" ? "Medium" : "Hard"}Active`
                                      : `difficulty${diff === "EASY" ? "Easy" : diff === "MEDIUM" ? "Medium" : "Hard"}`
                                  ) as
                                    | "difficultyEasy"
                                    | "difficultyMedium"
                                    | "difficultyHard"
                                    | "difficultyEasyActive"
                                    | "difficultyMediumActive"
                                    | "difficultyHardActive";

                                  return (
                                    <Button
                                      key={diff}
                                      type="button"
                                      size="xs"
                                      variant={variant}
                                      className="flex-1 h-8 text-[10px] font-bold transition-all"
                                      onClick={() =>
                                        form.setValue(`questions.${index}.difficulty`, diff as QuestionDifficulty)
                                      }
                                    >
                                      {diff}
                                    </Button>
                                  );
                                })}
                              </div>
                            </div>

                            <div className="w-full space-y-2.5">
                              <SliderController
                                control={form.control}
                                name={`questions.${index}.points`}
                                label={`Points: ${form.watch(`questions.${index}.points`) || 10}`}
                                min={5}
                                max={20}
                                step={1}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <AdminQuestionSelector
                    value={fields.map((f) => f.questionId)}
                    onChange={handleAddQuestions}
                    label=""
                    placeholder="Add Question"
                    trigger={
                      <Button
                        variant="outline"
                        className="w-full border-dashed border-2 h-14 bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#656A73] font-bold"
                      >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Question
                      </Button>
                    }
                  />
                </div>

                {/* Enable for Sword Drill Section */}
                <div className="p-4 bg-[#EFF6FF] rounded-xl border border-[#BFDBFE]">
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 flex flex-col gap-0.5">
                      <span className="text-sm font-bold text-black uppercase tracking-wider">
                        Enable for Sword Drill
                      </span>
                      <span className="text-[11px] font-medium text-[#656A73]">
                        Make this quiz available in Sword Drill mode
                      </span>
                    </div>
                    <SwitchController control={form.control} name="isSwordDrillEnabled" />
                  </div>
                </div>

                {isSwordDrillEnabled && (
                  <div
                    key="sword-drill-config"
                    className="space-y-8 p-6 rounded-xl border border-[#E4E4E4] bg-white shadow-sm"
                  >
                    {/* Time Settings Sub-section */}
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Timer className="h-5 w-5 text-[#656A73] opacity-80" />
                        <h3 className="text-sm font-bold text-black uppercase tracking-wider">Time Settings</h3>
                      </div>
                      <div className="grid grid-cols-1 gap-5">
                        <SelectController
                          variant="adminPrimary"
                          control={form.control}
                          name="swordDrillConfig.timeLimitType"
                          label="Time Limit Type"
                          options={[
                            { value: "TotalQuizTime", label: "Total Quiz Time" },
                            { value: "PerQuestion", label: "Per Question" },
                          ]}
                        />
                        <InputController
                          variant="adminPrimary"
                          type="number"
                          control={form.control}
                          name="swordDrillConfig.timeLimitValue"
                          label={
                            swordDrillTimeLimitType === "PerQuestion"
                              ? "Seconds Per Question"
                              : "Time Limit Value (seconds)"
                          }
                          required
                        />
                      </div>
                    </div>

                    {/* Game Modes Sub-section */}
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5 text-black" />
                          <h3 className="text-sm font-bold text-black uppercase tracking-wider">Game Modes</h3>
                        </div>
                        <p className="text-[10px] font-medium text-[#656A73] pl-7">
                          Select which modes this quiz can be played in
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-3">
                        <GameModeCard
                          id="solo"
                          label="Solo Mode"
                          description="Individual practice and personal growth"
                          icon={<User className="h-5 w-5 text-[#3862EA]" />}
                          bgColor="bg-[#EFF6FF]"
                          borderColor="border-[#BFDBFE]"
                          control={form.control}
                          name="swordDrillConfig.allowSolo"
                          onToggle={() =>
                            form.setValue("swordDrillConfig.allowSolo", !form.getValues("swordDrillConfig.allowSolo"))
                          }
                        />

                        <GameModeCard
                          id="quick"
                          label="Quick Mode"
                          description="Fast-paced head-to-head challenges"
                          icon={<Users className="h-5 w-5 text-[#FF6B35]" />}
                          bgColor="bg-[#FFF4ED]"
                          borderColor="border-[#FDBA74]"
                          control={form.control}
                          name="swordDrillConfig.allowQuick"
                          onToggle={() =>
                            form.setValue("swordDrillConfig.allowQuick", !form.getValues("swordDrillConfig.allowQuick"))
                          }
                        />

                        <GameModeCard
                          id="multi"
                          label="Multiplayer Mode"
                          description="Competitive play with rankings and bonuses"
                          icon={<Users className="h-5 w-5 text-[#8200DA]" />}
                          bgColor="bg-[#F3E8FF]"
                          borderColor="border-[#D8B4FE]"
                          control={form.control}
                          name="swordDrillConfig.allowMultiplayer"
                          onToggle={() =>
                            form.setValue(
                              "swordDrillConfig.allowMultiplayer",
                              !form.getValues("swordDrillConfig.allowMultiplayer")
                            )
                          }
                        />
                      </div>
                    </div>

                    {/* Multiplayer Bonus Points Sub-section */}
                    {allowMultiplayer && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Medal className="h-5 w-5 text-[#D97706]" />
                          <h3 className="text-sm font-bold text-black uppercase tracking-wider">
                            Multiplayer Bonus Points
                          </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-3 pl-7">
                          <InputController
                            variant="adminPrimary"
                            type="number"
                            control={form.control}
                            name="swordDrillConfig.firstRankPoints"
                            label="1st Place"
                            placeholder="50"
                          />
                          <InputController
                            variant="adminPrimary"
                            type="number"
                            control={form.control}
                            name="swordDrillConfig.secondRankPoints"
                            label="2nd Place"
                            placeholder="30"
                          />
                          <InputController
                            variant="adminPrimary"
                            type="number"
                            control={form.control}
                            name="swordDrillConfig.thirdRankPoints"
                            label="3rd Place"
                            placeholder="10"
                          />
                        </div>
                      </div>
                    )}

                    {/* Quick Mode Points Sub-section */}
                    {allowQuick && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2">
                          <Medal className="h-5 w-5 text-[#D97706]" />
                          <h3 className="text-sm font-bold text-black uppercase tracking-wider">Quick Mode Points</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-3 pl-7">
                          <InputController
                            variant="adminPrimary"
                            type="number"
                            control={form.control}
                            name="swordDrillConfig.pointsForWinner"
                            label="Winner"
                            placeholder="20"
                          />
                          <InputController
                            variant="adminPrimary"
                            type="number"
                            control={form.control}
                            name="swordDrillConfig.pointsForLoser"
                            label="Loser"
                            placeholder="5"
                          />
                        </div>
                      </div>
                    )}

                    {/* Randomization Sub-section */}
                    <div className="space-y-4 pt-4 border-t border-[#F1F5F9]">
                      <div className="flex items-center gap-2">
                        <Shuffle className="h-5 w-5 text-[#656A73] opacity-80" />
                        <h3 className="text-sm font-bold text-black uppercase tracking-wider">Randomization</h3>
                      </div>
                      <RadioGroup
                        value={swordDrillRandomization ?? "ShuffleAll"}
                        onValueChange={(val) =>
                          form.setValue("swordDrillConfig.randomization", val as "ShuffleAll" | "RandomSubset")
                        }
                        className="grid grid-cols-1 gap-3"
                      >
                        <RadioOption
                          id="sd-rand-shuffle"
                          value="ShuffleAll"
                          label="Shuffle All"
                          description="Shuffle questions each time"
                          selected={swordDrillRandomization === "ShuffleAll"}
                        />
                        <RadioOption
                          id="sd-rand-subset"
                          value="RandomSubset"
                          label="Random Subset"
                          description="Select random subset from pool each time"
                          selected={swordDrillRandomization === "RandomSubset"}
                        />
                      </RadioGroup>
                      {swordDrillRandomization === "RandomSubset" && (
                        <div className="mt-2 bg-[#F8FAFC] p-4 rounded-xl border border-[#E2E8F0]">
                          <InputController
                            variant="adminPrimary"
                            type="number"
                            control={form.control}
                            name="swordDrillConfig.subsetCount"
                            label="Subset Count"
                            placeholder="Enter subset count"
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            <SheetFooter className="px-6 py-6 gap-3 shrink-0 border-t border-[#E2E8F0] mt-auto">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleOpenChange(false)}
                className="flex-1 h-12 text-sm font-bold"
                disabled={isMutationLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="actionSubmit"
                className="flex-1 h-12 text-sm font-bold"
                disabled={isMutationLoading}
              >
                {isMutationLoading ? "Saving..." : isEditMode ? "Update Quiz" : "Create Quiz"}
              </Button>
            </SheetFooter>
          </form>
        </FormProvider>
      </SheetContent>
    </Sheet>
  );
}
