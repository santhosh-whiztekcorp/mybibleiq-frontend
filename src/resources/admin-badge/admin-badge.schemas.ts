import { z } from "zod";

/* ---- Enums ---- */
export const AdminBadgeStausEnum = z.enum(["Draft", "Published", "Archived"], {
  message: "Badge status must be one of: Draft, Published, or Archived",
});

export const BadgeRarityEnum = z.enum(["Common", "Rare", "Epic", "Legendary", "Special"], {
  message: "Badge rarity must be one of: Common, Rare, Epic, Legendary, or Special",
});

export const BadgeCategoryEnum = z.enum(["Consistency", "LearningAction", "Milestone", "SpecialEngagement"], {
  message: "Badge category must be one of: Consistency, Learning Action, Milestone, or Special Engagement",
});

export const BadgeAssignmentTypeEnum = z.enum(["Manual", "Automatic"], {
  message: "Badge assignment type must be either Manual or Automatic",
});

export const BadgeTriggerTypeEnum = z.enum(
  ["TimeBased", "StreakBased", "CountBased", "MilestoneBased", "EngagementBased"],
  {
    message:
      "Badge trigger type must be one of: Time Based, Streak Based, Count Based, Milestone Based, or Engagement Based",
  }
);

export const BadgeConditionOperatorEnum = z.enum(["GreaterThanOrEqual", "Equals", "LessThanOrEqual"], {
  message: "Badge condition operator must be one of: Greater Than Or Equal, Equals, or Less Than Or Equal",
});

export const BadgeStatusActionEnum = z.enum(["Publish", "Clone", "Archive"], {
  message: "Badge status action must be one of: Publish, Clone, or Archive",
});

/* ---- Trigger Config Schemas ---- */
const TriggerMetricSchema = z.object({
  type: z.string({ message: "Metric type is required" }).min(1, {
    message: "Metric type cannot be empty",
  }),
});

const TriggerConfigSchema = z.object({
  triggerType: BadgeTriggerTypeEnum,
  metric: TriggerMetricSchema,
  operator: BadgeConditionOperatorEnum,
  threshold: z
    .number({ message: "Threshold is required" })
    .int({ message: "Threshold must be a whole number" })
    .min(1, { message: "Threshold must be at least 1" }),
});

/* ---- Request Schemas ---- */
export const CreateAdminBadgeRequestSchema = z.object({
  name: z
    .string({ message: "Badge name is required" })
    .min(1, { message: "Badge name cannot be empty" })
    .max(255, { message: "Badge name must be 255 characters or less" }),
  description: z
    .string({ message: "Badge description is required" })
    .min(1, { message: "Badge description cannot be empty" })
    .max(1000, { message: "Badge description must be 1000 characters or less" }),
  iconMediaId: z.uuid({
    message: "Please select a valid icon",
  }),
  rarity: BadgeRarityEnum,
  category: BadgeCategoryEnum,
  assignmentType: BadgeAssignmentTypeEnum,
  tags: z
    .array(z.string({ message: "Tag is required" }).min(1, { message: "Tag cannot be empty" }), {
      message: "Please provide valid tags",
    })
    .optional(),
  triggerConfig: TriggerConfigSchema.optional(),
});

export const UpdateAdminBadgeRequestSchema = CreateAdminBadgeRequestSchema;

export const UpdateAdminBadgeStatusResetScheam = z.object({
  action: BadgeStatusActionEnum,
});
