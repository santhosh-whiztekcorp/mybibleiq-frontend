import type { ActionConfig, UserAction } from "./AdminUserActionModal.types";

export const getActionConfig = (action: UserAction): ActionConfig => {
  switch (action) {
    case "suspend":
      return {
        title: "Suspend User",
        message: (userName: string) => `Are you sure you want to suspend ${userName}?`,
        label: "Suspend",
        variant: "actionReject",
      };
    case "delete":
      return {
        title: "Delete User",
        message: (userName: string) => `Are you sure you want to delete ${userName}? This action cannot be undone.`,
        label: "Delete",
        variant: "actionDelete",
      };
    case "warn":
      return {
        title: "Warn Leader",
        message: (userName: string) => `Are you sure you want to warn ${userName}?`,
        label: "Warn",
        variant: "actionReject",
      };
  }
};
