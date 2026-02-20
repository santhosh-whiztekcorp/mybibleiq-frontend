export type ViewMode = "table" | "card";

export type AdminViewState = {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
};
