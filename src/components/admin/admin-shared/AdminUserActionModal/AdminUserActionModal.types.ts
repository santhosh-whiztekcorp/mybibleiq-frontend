export type UserAction = "suspend" | "delete" | "warn";

export type ActionConfig = {
  title: string;
  message: (userName: string) => string;
  label: string;
  variant: "actionReject" | "actionDelete";
};

export type AdminUserActionModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  action: UserAction;
  userName: string;
  onConfirm: (reason: string, deleteData?: boolean, suspendUntil?: string) => void;
  isLoading?: boolean;
};
