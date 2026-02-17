import type { ConfirmationAction, ConfirmationConfig } from "./AdminConfirmationModal.types";

export const CONFIRMATION_CONFIG: Record<ConfirmationAction, ConfirmationConfig> = {
  delete: {
    title: (entity: string) => `Delete ${entity}`,
    message: (entity: string) =>
      `Are you sure you want to delete this ${entity.toLowerCase()}? This action cannot be undone.`,
    label: "Delete",
    variant: "actionDelete",
  },
  publish: {
    title: (entity: string) => `Publish ${entity}`,
    message: (entity: string) => `Are you sure you want to publish this ${entity.toLowerCase()}?`,
    label: "Publish",
    variant: "actionPublish",
  },
  archive: {
    title: (entity: string) => `Archive ${entity}`,
    message: (entity: string) => `Are you sure you want to archive this ${entity.toLowerCase()}?`,
    label: "Archive",
    variant: "actionArchive",
  },
  clone: {
    title: (entity: string) => `Clone ${entity}`,
    message: (entity: string) => `Are you sure you want to clone this ${entity.toLowerCase()}?`,
    label: "Clone",
    variant: "actionClone",
  },
  schedule: {
    title: (entity: string) => `Schedule ${entity}`,
    message: (entity: string) => `Are you sure you want to schedule this ${entity.toLowerCase()}?`,
    label: "Schedule",
    variant: "actionSchedule",
  },
  activate: {
    title: (entity: string) => `Activate ${entity}`,
    message: (entity: string) => `Are you sure you want to activate this ${entity.toLowerCase()}?`,
    label: "Activate",
    variant: "actionPublish",
  },
  dismiss: {
    title: (entity: string) => `Dismiss ${entity}`,
    message: (entity: string) => `Are you sure you want to dismiss this ${entity.toLowerCase()}?`,
    label: "Dismiss",
    variant: "actionArchive",
  },
  approve: {
    title: (entity: string) => `Approve ${entity}`,
    message: (entity: string) => `Are you sure you want to approve this ${entity.toLowerCase()}?`,
    label: "Approve",
    variant: "actionPublish",
  },
  reject: {
    title: (entity: string) => `Reject ${entity}`,
    message: (entity: string) =>
      `Are you sure you want to reject this ${entity.toLowerCase()}? This action cannot be undone.`,
    label: "Reject",
    variant: "actionDelete",
  },
};

export const getConfirmationConfig = (action: ConfirmationAction | null) => {
  if (!action) return null;
  return CONFIRMATION_CONFIG[action];
};
