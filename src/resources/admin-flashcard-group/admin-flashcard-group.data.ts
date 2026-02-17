import type {
  CreateAdminFlashcardGroupInput,
  AdminFlashcardGroupFilterStore,
  AdminFlashcardGroupListInput,
} from "./admin-flashcard-group.types";

/* ---- Default Form Values ---- */
export const defaultCreateFlashcardGroupFormValues: CreateAdminFlashcardGroupInput = {
  name: "",
  description: undefined,
  tags: [],
};

/* ---- Default Filter Values ---- */
export const defaultAdminFlashcardGroupFilters: Pick<AdminFlashcardGroupFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminFlashcardGroupListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  tag: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
