export type ConfirmationAction =
  | "clone"
  | "publish"
  | "archive"
  | "delete"
  | "schedule"
  | "activate"
  | "dismiss"
  | "approve"
  | "reject"
  | "deliver";

export type ConfirmationConfig = {
  title: (entity: string) => string;
  message: (entity: string) => string;
  label: string;
  variant: "actionPublish" | "actionDelete" | "actionArchive" | "actionClone" | "actionSchedule";
};

export type AdminConfirmationModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: ConfirmationAction;
  entityName: string;
  cancelLabel?: string;
  onConfirm: () => void;
  isLoading?: boolean;
};
