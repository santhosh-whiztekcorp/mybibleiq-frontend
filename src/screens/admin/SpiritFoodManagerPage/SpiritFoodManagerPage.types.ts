export type ReviewAction = "submit" | "approve" | "cancel" | "request-delete" | "approve-delete" | "cancel-delete";

export type FilterOption = {
  value: undefined | "Scheduled" | "InProgress" | "InReview" | "PendingDelete" | "Delivered";
  label: string;
  variant:
    | "filterAll"
    | "filterScheduled"
    | "filterInProgress"
    | "filterInReview"
    | "filterPendingDelete"
    | "filterDelivered";
  activeVariant:
    | "filterAllActive"
    | "filterScheduledActive"
    | "filterInProgressActive"
    | "filterInReviewActive"
    | "filterPendingDeleteActive"
    | "filterDeliveredActive";
};

export const FILTER_OPTIONS: FilterOption[] = [
  { value: undefined, label: "All", variant: "filterAll", activeVariant: "filterAllActive" },
  {
    value: "Scheduled",
    label: "Schedule only",
    variant: "filterScheduled",
    activeVariant: "filterScheduledActive",
  },
  {
    value: "InProgress",
    label: "In Progress",
    variant: "filterInProgress",
    activeVariant: "filterInProgressActive",
  },
  {
    value: "InReview",
    label: "In Review",
    variant: "filterInReview",
    activeVariant: "filterInReviewActive",
  },
  {
    value: "PendingDelete",
    label: "Pending Delete",
    variant: "filterPendingDelete",
    activeVariant: "filterPendingDeleteActive",
  },
  {
    value: "Delivered",
    label: "Archive",
    variant: "filterDelivered",
    activeVariant: "filterDeliveredActive",
  },
];
