import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AdminViewState } from "./useAdminViewStore.types";

export const useAdminViewStore = create<AdminViewState>()(
  persist(
    (set) => ({
      viewMode: "table",
      setViewMode: (mode) => set({ viewMode: mode }),
    }),
    {
      name: "admin-view-storage",
    }
  )
);
