import { z } from "zod";

/* ---- Global Update Enums ---- */
export const GlobalUpdateTypeEnum = z.enum(["Announcement", "NewFeature", "Maintenance", "Event", "AppUpdate"]);

export const GlobalUpdateStatusEnum = z.enum(["Draft", "Scheduled", "Delivered"]);

export const GlobalUpdateTargetTypeEnum = z.enum(["AllUsers", "SpecificUsers", "UserGroup"]);

/* ---- Schemas ---- */
/* ---- Schemas ---- */
const BaseGlobalUpdateSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  type: GlobalUpdateTypeEnum,
  targetType: GlobalUpdateTargetTypeEnum,
  targetGroupIds: z.array(z.string()).optional().nullable(),
  targetUserIds: z.array(z.string()).optional().nullable(),
  scheduledAt: z.union([z.string(), z.date()]).optional().nullable(),
});

export const CreateGlobalUpdateRequestSchema = BaseGlobalUpdateSchema.superRefine((data, ctx) => {
  if (data.targetType === "UserGroup" && (!data.targetGroupIds || data.targetGroupIds.length === 0)) {
    ctx.addIssue({
      code: "custom",
      message: "Target group IDs are required for UserGroup target type",
      path: ["targetGroupIds"],
    });
  }
  if (data.targetType === "SpecificUsers" && (!data.targetUserIds || data.targetUserIds.length === 0)) {
    ctx.addIssue({
      code: "custom",
      message: "Target user IDs are required for SpecificUsers target type",
      path: ["targetUserIds"],
    });
  }
});

export const UpdateGlobalUpdateRequestSchema = BaseGlobalUpdateSchema.partial();
