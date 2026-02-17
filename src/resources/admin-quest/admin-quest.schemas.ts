import { z } from "zod";
import { QUEST_THEME_KEYS } from "./admin-quest.constants.base";

/* ---- Enums ---- */
export const AdminQuestStatusEnum = z.enum(["Draft", "Published", "Archived", "Scheduled"], {
  message: "Quest status must be one of: Draft, Published, Archived, or Scheduled",
});

export const AdminQuestSortEnum = z.enum(["createdAt", "-createdAt", "title", "-title"], {
  message: "Sort must be one of: createdAt, -createdAt, title, -title",
});

export const QuestStatusActionEnum = z.enum(["Publish", "Archive", "Schedule", "Clone"], {
  message: "Quest status action must be one of: Publish, Archive, Schedule, or Clone",
});

// QuestThemeEnum derived from single source of truth in store constants
export const QuestThemeEnum = z.enum(QUEST_THEME_KEYS, {
  message: `Quest theme must be one of: ${QUEST_THEME_KEYS.join(", ")}`,
});

/* ---- Query Schemas ---- */
export const AdminQuestListQuerySchema = z.object({
  status: AdminQuestStatusEnum.optional(),
  tag: z.union([z.string(), z.array(z.string()).min(1).max(20)]).optional(),
  q: z
    .string()
    .min(1, { message: "Search query must be at least 1 character" })
    .max(200, { message: "Search query must be 200 characters or less" })
    .optional(),
  page: z.number().int().min(1).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
  sort: AdminQuestSortEnum.optional(),
});

/* ---- Request Schemas ---- */
const CreateWelcomeSchema = z.object({
  title: z
    .string({ message: "Welcome title is required" })
    .min(1, { message: "Welcome title cannot be empty" })
    .max(500, { message: "Welcome title must be 500 characters or less" }),
  description: z
    .string({ message: "Welcome description is required" })
    .min(1, { message: "Welcome description cannot be empty" })
    .max(2000, { message: "Welcome description must be 2000 characters or less" }),
  backgroundImageId: z.uuid({ message: "Please provide a valid background image ID" }).optional(),
  startQuestButtonText: z
    .string({ message: "Start quest button text is required" })
    .min(1, { message: "Start quest button text cannot be empty" })
    .max(100, { message: "Start quest button text must be 100 characters or less" }),
});

const CreateIntroductionSchema = z.object({
  title: z
    .string({ message: "Introduction title is required" })
    .min(1, { message: "Introduction title cannot be empty" })
    .max(500, { message: "Introduction title must be 500 characters or less" }),
  dialogue: z
    .string({ message: "Introduction dialogue is required" })
    .min(1, { message: "Introduction dialogue cannot be empty" })
    .max(2000, { message: "Introduction dialogue must be 2000 characters or less" }),
  backgroundImageId: z.uuid({ message: "Please provide a valid background image ID" }).optional(),
  backgroundMusicId: z.uuid({ message: "Please provide a valid background music ID" }).optional(),
  startStageButtonText: z
    .string({ message: "Start stage button text is required" })
    .min(1, { message: "Start stage button text cannot be empty" })
    .max(100, { message: "Start stage button text must be 100 characters or less" }),
});

const CreateCompletionSchema = z.object({
  mascotMessage: z
    .string({ message: "Mascot message is required" })
    .min(1, { message: "Mascot message cannot be empty" })
    .max(2000, { message: "Mascot message must be 2000 characters or less" }),
  completionBadgeId: z.uuid({ message: "Please provide a valid completion badge ID" }).optional(),
});

export const CreateAdminQuestRequestSchema = z.object({
  // Title Tab
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title cannot be empty" })
    .max(500, { message: "Title must be 500 characters or less" }),
  description: z
    .string({ message: "Description is required" })
    .min(1, { message: "Description cannot be empty" })
    .max(2000, { message: "Description must be 2000 characters or less" }),
  tags: z
    .array(z.string({ message: "Tag is required" }).min(1, { message: "Tag cannot be empty" }), {
      message: "Please provide valid tags",
    })
    .optional(),
  theme: QuestThemeEnum.optional(),

  // Welcome Tab
  welcome: CreateWelcomeSchema,

  // Introduction Tab
  introduction: CreateIntroductionSchema,

  // Completion Tab
  completion: CreateCompletionSchema,
});

export const UpdateAdminQuestRequestSchema = CreateAdminQuestRequestSchema;

export const UpdateAdminQuestStatusSchema = z.object({
  action: QuestStatusActionEnum,
  publishAt: z.string().datetime().optional(),
});

/* ---- Stage Schemas ---- */
export const QuizDifficultyOverrideEnum = z.enum(["EASY", "MEDIUM", "HARD"], {
  message: "Difficulty override must be one of: EASY, MEDIUM, or HARD",
});

export const AdminQuestStageSortEnum = z.enum(["createdAt", "-createdAt", "order", "-order"], {
  message: "Sort must be one of: createdAt, -createdAt, order, -order",
});

export const AdminQuestStageListQuerySchema = z.object({
  tags: z.array(z.string()).min(1).max(20).optional(),
  page: z.number().int().min(1).optional(),
  pageSize: z.number().int().min(1).max(100).optional(),
  sort: AdminQuestStageSortEnum.optional(),
});

const StageVerseSchema = z.object({
  verseText: z
    .string({ message: "Verse text is required" })
    .min(1, { message: "Verse text cannot be empty" })
    .max(5000, { message: "Verse text must be 5000 characters or less" }),
  verseReference: z
    .string({ message: "Verse reference is required" })
    .min(1, { message: "Verse reference cannot be empty" })
    .max(100, { message: "Verse reference must be 100 characters or less" }),
  commentary: z
    .string({ message: "Commentary is required" })
    .min(1, { message: "Commentary cannot be empty" })
    .max(2000, { message: "Commentary must be 2000 characters or less" }),
  backgroundImageId: z.uuid({ message: "Please provide a valid background image ID" }).optional(),
  backgroundMusicId: z.uuid({ message: "Please provide a valid background music ID" }).optional(),
  startButtonText: z
    .string({ message: "Start button text is required" })
    .min(1, { message: "Start button text cannot be empty" })
    .max(100, { message: "Start button text must be 100 characters or less" }),
});

const StageSuccessCompletionSchema = z.object({
  passingPoints: z
    .number({ message: "Passing points is required" })
    .int({ message: "Passing points must be a whole number" })
    .min(0, { message: "Passing points must be 0 or greater" }),
  mascotMessage: z
    .string({ message: "Mascot message is required" })
    .min(1, { message: "Mascot message cannot be empty" })
    .max(2000, { message: "Mascot message must be 2000 characters or less" }),
  stageBadgeId: z.uuid({ message: "Please provide a valid stage badge ID" }).optional(),
  reflectionPrompt: z
    .string({ message: "Reflection prompt is required" })
    .min(1, { message: "Reflection prompt cannot be empty" })
    .max(2000, { message: "Reflection prompt must be 2000 characters or less" }),
  nextButtonText: z
    .string({ message: "Next button text is required" })
    .min(1, { message: "Next button text cannot be empty" })
    .max(100, { message: "Next button text must be 100 characters or less" }),
});

const StageFailureCompletionSchema = z.object({
  failureMessage: z
    .string({ message: "Failure message is required" })
    .min(1, { message: "Failure message cannot be empty" })
    .max(2000, { message: "Failure message must be 2000 characters or less" }),
  mascotEncouragement: z
    .string({ message: "Mascot encouragement is required" })
    .min(1, { message: "Mascot encouragement cannot be empty" })
    .max(2000, { message: "Mascot encouragement must be 2000 characters or less" }),
  retryButtonText: z
    .string({ message: "Retry button text is required" })
    .min(1, { message: "Retry button text cannot be empty" })
    .max(100, { message: "Retry button text must be 100 characters or less" }),
});

const QuestionOverrideSchema = z.object({
  questionId: z.uuid({ message: "Please provide a valid question ID" }),
  difficultyOverride: QuizDifficultyOverrideEnum,
  pointsOverride: z
    .number({ message: "Points override is required" })
    .int({ message: "Points override must be a whole number" })
    .min(0, { message: "Points override must be 0 or greater" }),
});

const QuizContentItemSchema = z.object({
  quizId: z.uuid({ message: "Please provide a valid quiz ID" }),
  difficultyOverride: QuizDifficultyOverrideEnum,
  questionOverrides: z.array(QuestionOverrideSchema, { message: "Please provide valid question overrides" }).optional(),
  order: z
    .number({ message: "Order is required" })
    .int({ message: "Order must be a whole number" })
    .min(0, { message: "Order must be 0 or greater" }),
});

const MediaContentItemSchema = z.object({
  mediaId: z.uuid({ message: "Please provide a valid media ID" }),
  order: z
    .number({ message: "Order is required" })
    .int({ message: "Order must be a whole number" })
    .min(0, { message: "Order must be 0 or greater" }),
  points: z
    .number({ message: "Points is required" })
    .int({ message: "Points must be a whole number" })
    .min(0, { message: "Points must be 0 or greater" }),
});

const FlashcardContentItemSchema = z.object({
  flashcardId: z.uuid({ message: "Please provide a valid flashcard ID" }),
  order: z
    .number({ message: "Order is required" })
    .int({ message: "Order must be a whole number" })
    .min(0, { message: "Order must be 0 or greater" }),
  points: z
    .number({ message: "Points is required" })
    .int({ message: "Points must be a whole number" })
    .min(0, { message: "Points must be 0 or greater" }),
});

const FlashcardGroupContentItemSchema = z.object({
  flashcardGroupId: z.uuid({ message: "Please provide a valid flashcard group ID" }),
  order: z
    .number({ message: "Order is required" })
    .int({ message: "Order must be a whole number" })
    .min(0, { message: "Order must be 0 or greater" }),
  points: z
    .number({ message: "Points is required" })
    .int({ message: "Points must be a whole number" })
    .min(0, { message: "Points must be 0 or greater" }),
});

const StageContentSchema = z.object({
  quiz: z.array(QuizContentItemSchema).optional(),
  media: z.array(MediaContentItemSchema).optional(),
  flashcards: z.array(FlashcardContentItemSchema).optional(),
  flashcardGroups: z.array(FlashcardGroupContentItemSchema).optional(),
});

export const CreateAdminQuestStageRequestSchema = z.object({
  // Title Tab
  title: z
    .string({ message: "Title is required" })
    .min(1, { message: "Title cannot be empty" })
    .max(500, { message: "Title must be 500 characters or less" }),
  description: z
    .string({ message: "Description is required" })
    .min(1, { message: "Description cannot be empty" })
    .max(2000, { message: "Description must be 2000 characters or less" }),
  tags: z
    .array(z.string({ message: "Tag is required" }).min(1, { message: "Tag cannot be empty" }), {
      message: "Please provide valid tags",
    })
    .optional(),
  order: z
    .number({ message: "Order is required" })
    .int({ message: "Order must be a whole number" })
    .min(0, { message: "Order must be 0 or greater" }),

  // Verse Tab
  verse: StageVerseSchema,

  // Content Tab
  content: StageContentSchema,

  // Success Completion
  successCompletion: StageSuccessCompletionSchema,

  // Failure Completion
  failureCompletion: StageFailureCompletionSchema,
});

export const UpdateAdminQuestStageRequestSchema = CreateAdminQuestStageRequestSchema;
