import { z } from "zod";

/* ---- Enums ---- */
export const AdminQuizStatusEnum = z.enum(["Draft", "Scheduled", "Published", "Archived"], {
  message: "Quiz status must be one of: Draft, Scheduled, Published, or Archived",
});

export const QuizDifficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"], {
  message: "Quiz difficulty must be one of: Easy, Medium, or Hard",
});

export const QuizRandomizationEnum = z.enum(["None", "ShuffleAll", "RandomSubset"], {
  message: "Quiz randomization must be one of: None, Shuffle All, or Random Subset",
});

export const TimeLimitTypeEnum = z.enum(["None", "TotalQuizTime", "PerQuestion"], {
  message: "Time limit type must be one of: None, Total Quiz Time, or Per Question",
});

export const QuestionKindEnum = z.enum(["MCQ", "TRUE_FALSE", "MATCH", "FILL_BLANK", "ONE_WORD", "ORDER"], {
  message: "Question type must be one of: Multiple Choice, True/False, Matching, Fill in the Blank, One Word, or Order",
});

export const QuestionDifficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"], {
  message: "Question difficulty must be one of: Easy, Medium, or Hard",
});

export const QuizStatusActionEnum = z.enum(["Schedule", "Unschedule", "Publish", "Clone", "Archive"], {
  message: "Quiz status action must be one of: Schedule, Unschedule, Publish, Clone, or Archive",
});

/* ---- Question Item Schema ---- */
const QuizQuestionItemSchema = z.object({
  questionId: z.uuid({ message: "Question ID must be a valid UUID" }),
  order: z
    .number({ message: "Order is required" })
    .int({ message: "Order must be a whole number" })
    .min(0, { message: "Order must be 0 or greater" }),
  points: z
    .number({ message: "Points is required" })
    .int({ message: "Points must be a whole number" })
    .min(0, { message: "Points must be 0 or greater" }),
  difficulty: QuestionDifficultyEnum,
});

/* ---- Sword Drill Config Schema ---- */
const SwordDrillConfigSchema = z
  .object({
    timeLimitType: z.enum(["TotalQuizTime", "PerQuestion"], {
      message: "Sword drill time limit type must be either Total Quiz Time or Per Question",
    }),
    timeLimitValue: z
      .number({ message: "Time limit value must be a number" })
      .int({ message: "Time limit value must be a whole number" })
      .min(1, { message: "Time limit value must be 1 or greater" })
      .optional(),
    randomization: z.enum(["ShuffleAll", "RandomSubset"], {
      message: "Sword drill randomization must be either Shuffle All or Random Subset",
    }),
    subsetCount: z
      .number({ message: "Subset count must be a number" })
      .int({ message: "Subset count must be a whole number" })
      .min(1, { message: "Subset count must be 1 or greater" })
      .optional(),
    allowSolo: z.boolean({ message: "Please specify if solo mode is allowed" }),
    allowMultiplayer: z.boolean({ message: "Please specify if multiplayer mode is allowed" }),
    allowQuick: z.boolean({ message: "Please specify if quick mode is allowed" }),
    firstRankPoints: z
      .number({ message: "First rank points must be a number" })
      .int({ message: "First rank points must be a whole number" })
      .optional(),
    secondRankPoints: z
      .number({ message: "Second rank points must be a number" })
      .int({ message: "Second rank points must be a whole number" })
      .optional(),
    thirdRankPoints: z
      .number({ message: "Third rank points must be a number" })
      .int({ message: "Third rank points must be a whole number" })
      .optional(),
    otherRankPoints: z
      .number({ message: "Other rank points must be a number" })
      .int({ message: "Other rank points must be a whole number" })
      .optional(),
    pointsForWinner: z
      .number({ message: "Points for winner must be a number" })
      .int({ message: "Points for winner must be a whole number" })
      .optional(),
    pointsForLoser: z
      .number({ message: "Points for loser must be a number" })
      .int({ message: "Points for loser must be a whole number" })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.randomization === "RandomSubset" && !data.subsetCount) {
      ctx.addIssue({
        code: "custom",
        message: "Subset count is required when randomization is Random Subset",
        path: ["subsetCount"],
      });
    }
  });

/* ---- Request Schemas ---- */
export const CreateAdminQuizRequestSchema = z
  .object({
    title: z
      .string({ message: "Quiz title is required" })
      .min(1, { message: "Quiz title cannot be empty" })
      .max(500, { message: "Quiz title must be 500 characters or less" }),
    description: z
      .string({ message: "Quiz description is required" })
      .min(1, { message: "Quiz description cannot be empty" })
      .max(2000, { message: "Quiz description must be 2000 characters or less" }),
    difficulty: QuizDifficultyEnum,
    tags: z
      .array(z.string({ message: "Tag is required" }).min(1, { message: "Tag cannot be empty" }), {
        message: "Please provide valid tags",
      })
      .optional(),
    timeLimitType: TimeLimitTypeEnum,
    timeLimitValue: z
      .number({ message: "Time limit value must be a number" })
      .int({ message: "Time limit value must be a whole number" })
      .min(1, { message: "Time limit value must be 1 or greater" })
      .optional(),
    randomization: QuizRandomizationEnum,
    subsetCount: z
      .number({ message: "Subset count must be a number" })
      .int({ message: "Subset count must be a whole number" })
      .min(1, { message: "Subset count must be 1 or greater" })
      .optional(),
    questions: z
      .array(QuizQuestionItemSchema, { message: "Please provide quiz questions" })
      .min(1, { message: "Quiz must have at least 1 question" }),
    isSwordDrillEnabled: z.boolean({ message: "Please specify if sword drill is enabled" }),
    swordDrillConfig: SwordDrillConfigSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.timeLimitType !== "None" && !data.timeLimitValue) {
      ctx.addIssue({
        code: "custom",
        message: "Time limit value is required when time limit type is not None",
        path: ["timeLimitValue"],
      });
    }

    if (data.randomization === "RandomSubset" && !data.subsetCount) {
      ctx.addIssue({
        code: "custom",
        message: "Subset count is required when randomization is Random Subset",
        path: ["subsetCount"],
      });
    }

    if (data.isSwordDrillEnabled && !data.swordDrillConfig) {
      ctx.addIssue({
        code: "custom",
        message: "Sword drill configuration is required when sword drill is enabled",
        path: ["swordDrillConfig"],
      });
    }
  });

export const UpdateAdminQuizRequestSchema = CreateAdminQuizRequestSchema;

export const UpdateAdminQuizStatusSchema = z
  .object({
    action: QuizStatusActionEnum,
    publishAt: z
      .string({ message: "Publish date must be a string" })
      .datetime({ message: "Publish date must be a valid date and time" })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (data.action === "Schedule" && !data.publishAt) {
      ctx.addIssue({
        code: "custom",
        message: "Publish date is required when action is Schedule",
        path: ["publishAt"],
      });
    }
  });
