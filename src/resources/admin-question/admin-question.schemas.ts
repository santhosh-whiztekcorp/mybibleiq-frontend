import { z } from "zod";

/* ---- Enums ---- */
export const AdminQuestionStatusEnum = z.enum(["Draft", "Published", "Archived"], {
  message: "Question status must be one of: Draft, Published, or Archived",
});

export const QuestionTypeEnum = z.enum(["MCQ", "TRUE_FALSE", "MATCH", "FILL_BLANK", "ONE_WORD", "ORDER"], {
  message: "Question type must be one of: Multiple Choice, True/False, Matching, Fill in the Blank, One Word, or Order",
});

export const QuestionStatusActionEnum = z.enum(["Publish", "Clone", "Archive"], {
  message: "Question status action must be one of: Publish, Clone, or Archive",
});

/* ---- Question Type Schemas ---- */
const OptionSchema = z.object({
  text: z.string({ message: "Option text is required" }).min(1, { message: "Option text cannot be empty" }),
  isCorrect: z.boolean({ message: "Please specify if this option is correct" }),
});

const McqSchema = z.object({
  multiSelect: z.boolean({ message: "Please specify if multiple selections are allowed" }).optional(),
  options: z
    .array(OptionSchema, { message: "Please provide options for this question" })
    .min(2, { message: "Multiple choice questions must have at least 2 options" }),
});

const TrueFalseSchema = z.object({
  isCorrect: z.boolean({ message: "Please specify if the answer is true or false" }),
});

const MatchingSchema = z.object({
  pairs: z
    .array(
      z.object({
        left: z.string({ message: "Left text is required" }).min(1, { message: "Left text cannot be empty" }),
        right: z.string({ message: "Right text is required" }).min(1, { message: "Right text cannot be empty" }),
      }),
      { message: "Please provide matching pairs" }
    )
    .min(2, { message: "Matching questions must have at least 2 pairs" }),
});

const FillBlankSchema = z.object({
  blanks: z
    .array(
      z.object({
        name: z.string({ message: "Blank name is required" }).min(1, { message: "Blank name cannot be empty" }),
        options: z
          .array(OptionSchema, { message: "Please provide options for this blank" })
          .min(1, { message: "Each blank must have at least 1 option" }),
      }),
      { message: "Please provide fill blank items" }
    )
    .min(1, { message: "Fill in the blank questions must have at least 1 blank" }),
});

const OneWordSchema = z.object({
  answer: z.string({ message: "Answer is required" }).min(1, { message: "Answer cannot be empty" }),
  caseSensitive: z.boolean({ message: "Please specify if the answer is case sensitive" }).optional(),
  allowTrim: z.boolean({ message: "Please specify if whitespace should be trimmed from the answer" }).optional(),
});

const OrderSchema = z.object({
  items: z
    .array(
      z.object({
        text: z.string({ message: "Item text is required" }).min(1, { message: "Item text cannot be empty" }),
        order: z
          .number({ message: "Order position is required" })
          .int({ message: "Order position must be a whole number" })
          .min(0, { message: "Order position must be 0 or greater" }),
      }),
      { message: "Please provide order items" }
    )
    .min(2, { message: "Order questions must have at least 2 items" }),
});

/* ---- Request Schemas ---- */
export const stripInactiveTypeConfigs = (data: unknown): unknown => {
  if (!data || typeof data !== "object" || !("type" in data)) return data;
  const d = data as Record<string, unknown>;
  const type = d.type as string | undefined;
  return {
    ...d,
    mcq: type === "MCQ" ? d.mcq : undefined,
    trueFalse: type === "TRUE_FALSE" ? d.trueFalse : undefined,
    matching: type === "MATCH" ? d.matching : undefined,
    fillBlank: type === "FILL_BLANK" ? d.fillBlank : undefined,
    oneWord: type === "ONE_WORD" ? d.oneWord : undefined,
    order: type === "ORDER" ? d.order : undefined,
  };
};

export const CreateAdminQuestionRequestSchema = z
  .object({
    questionText: z
      .string({ message: "Question text is required" })
      .min(1, { message: "Question text cannot be empty" })
      .max(2000, { message: "Question text must be 2000 characters or less" }),
    type: QuestionTypeEnum,
    tags: z
      .array(z.string({ message: "Tag is required" }).min(1, { message: "Tag cannot be empty" }), {
        message: "Please provide valid tags",
      })
      .optional(),
    shuffle: z.boolean({ message: "Please specify if options should be shuffled" }).optional(),
    mcq: McqSchema.optional(),
    trueFalse: TrueFalseSchema.optional(),
    matching: MatchingSchema.optional(),
    fillBlank: FillBlankSchema.optional(),
    oneWord: OneWordSchema.optional(),
    order: OrderSchema.optional(),
  })
  .superRefine((data, ctx) => {
    switch (data.type) {
      case "MCQ": {
        const result = McqSchema.safeParse(data.mcq);
        if (!result.success) {
          result.error.issues.forEach((issue) => ctx.addIssue({ ...issue, path: ["mcq", ...issue.path] }));
        }
        break;
      }
      case "TRUE_FALSE": {
        const result = TrueFalseSchema.safeParse(data.trueFalse);
        if (!result.success) {
          result.error.issues.forEach((issue) => ctx.addIssue({ ...issue, path: ["trueFalse", ...issue.path] }));
        }
        break;
      }
      case "MATCH": {
        const result = MatchingSchema.safeParse(data.matching);
        if (!result.success) {
          result.error.issues.forEach((issue) => ctx.addIssue({ ...issue, path: ["matching", ...issue.path] }));
        }
        break;
      }
      case "FILL_BLANK": {
        const result = FillBlankSchema.safeParse(data.fillBlank);
        if (!result.success) {
          result.error.issues.forEach((issue) => ctx.addIssue({ ...issue, path: ["fillBlank", ...issue.path] }));
        }
        break;
      }
      case "ONE_WORD": {
        const result = OneWordSchema.safeParse(data.oneWord);
        if (!result.success) {
          result.error.issues.forEach((issue) => ctx.addIssue({ ...issue, path: ["oneWord", ...issue.path] }));
        }
        break;
      }
      case "ORDER": {
        const result = OrderSchema.safeParse(data.order);
        if (!result.success) {
          result.error.issues.forEach((issue) => ctx.addIssue({ ...issue, path: ["order", ...issue.path] }));
        }
        break;
      }
    }
  });

export const UpdateAdminQuestionRequestSchema = CreateAdminQuestionRequestSchema;

export const UpdateAdminQuestionStatusSchema = z.object({
  action: QuestionStatusActionEnum,
});
