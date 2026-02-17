"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { QUESTION_DIFFICULTY_LABELS, QUESTION_KIND_LABELS } from "@/resources/admin-quiz/admin-quiz.constants";
import { SliderController } from "@/components/form-controllers/SliderController";
import { useQuizQuestionConfigDialog } from "./QuizQuestionConfigDialog.hooks";
import type { QuizQuestionConfigDialogProps } from "./QuizQuestionConfigDialog.types";
import type { QuestionDifficulty } from "@/resources/admin-quiz";

export function QuizQuestionConfigDialog(props: QuizQuestionConfigDialogProps) {
  const { open, onOpenChange } = props;
  const { quiz, isLoading, form, onSubmit } = useQuizQuestionConfigDialog(props);
  const { control, watch, setValue } = form;

  const questions = quiz?.questions ?? [];
  const questionOverridesArray = watch("questionOverrides") ?? [];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] flex flex-col p-0">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-[#F1F5F9] shrink-0">
          <div className="flex items-start justify-between">
            <div className="space-y-2">
              <DialogTitle className="text-xl font-bold text-black">Configure Quiz Questions</DialogTitle>
              {quiz && (
                <>
                  <p className="text-sm font-semibold text-[#656A73]">{quiz.title}</p>
                  {quiz.tags && quiz.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {quiz.tags.map((tag, index) => (
                        <Badge key={index} variant="tag" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)} className="shrink-0">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-[#656A73]">Loading questions...</p>
          </div>
        ) : (
          <ScrollArea className="flex-1 px-6 py-4">
            <div className="space-y-4">
              {questions.map((question, index) => {
                const override = questionOverridesArray[index];
                const defaultPoints = override?.defaultPoints ?? question.points;
                const defaultDifficulty = override?.defaultDifficulty ?? question.difficulty;
                const currentDifficulty = (override?.difficultyOverride ?? defaultDifficulty) as QuestionDifficulty;
                const hasPointsOverride =
                  override?.pointsOverride !== undefined && override.pointsOverride !== defaultPoints;
                const hasDifficultyOverride =
                  override?.difficultyOverride !== undefined && override.difficultyOverride !== defaultDifficulty;

                return (
                  <div key={question.questionId} className="p-4 rounded-lg border border-[#E2E8F0] bg-white space-y-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold text-[#393737] flex-1">{question.questionText}</p>
                      <Badge
                        variant={
                          `type${question.type}` as
                            | "typeMCQ"
                            | "typeTRUE_FALSE"
                            | "typeMATCH"
                            | "typeFILL_BLANK"
                            | "typeONE_WORD"
                            | "typeORDER"
                        }
                        size="sm"
                      >
                        {QUESTION_KIND_LABELS[question.type]}
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      {/* Difficulty Buttons */}
                      <div className="space-y-2">
                        <label className="text-xs font-bold text-[#656A73]">
                          Difficulty
                          {hasDifficultyOverride
                            ? " (Override)"
                            : ` (Default: ${QUESTION_DIFFICULTY_LABELS[defaultDifficulty]})`}
                        </label>
                        <div className="flex gap-2">
                          <Button
                            type="button"
                            variant={currentDifficulty === "EASY" ? "difficultyEasyActive" : "difficultyEasy"}
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setValue(`questionOverrides.${index}.difficultyOverride`, "EASY");
                            }}
                          >
                            {QUESTION_DIFFICULTY_LABELS.EASY}
                          </Button>
                          <Button
                            type="button"
                            variant={currentDifficulty === "MEDIUM" ? "difficultyMediumActive" : "difficultyMedium"}
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setValue(`questionOverrides.${index}.difficultyOverride`, "MEDIUM");
                            }}
                          >
                            {QUESTION_DIFFICULTY_LABELS.MEDIUM}
                          </Button>
                          <Button
                            type="button"
                            variant={currentDifficulty === "HARD" ? "difficultyHardActive" : "difficultyHard"}
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setValue(`questionOverrides.${index}.difficultyOverride`, "HARD");
                            }}
                          >
                            {QUESTION_DIFFICULTY_LABELS.HARD}
                          </Button>
                        </div>
                      </div>

                      {/* Points Slider */}
                      <div className="space-y-2">
                        <SliderController
                          control={control}
                          name={`questionOverrides.${index}.pointsOverride`}
                          label={`Points${hasPointsOverride ? " (Override)" : ` (Default: ${defaultPoints})`}`}
                          variant="adminPrimary"
                          min={0}
                          max={20}
                          step={1}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        )}

        <DialogFooter className="px-6 py-4 border-t border-[#E2E8F0] shrink-0">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="actionSubmit" onClick={onSubmit}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
