import type {
  CreateAdminFlashcardInput,
  AdminFlashcardFilterStore,
  AdminFlashcardListInput,
} from "./admin-flashcard.types";

/* ---- Default Form Values ---- */
export const defaultCreateFlashcardFormValues: CreateAdminFlashcardInput = {
  word: "",
  definition: "",
  reference: "",
  tags: [],
};

/* ---- Default Filter Values ---- */
export const defaultAdminFlashcardFilters: Pick<AdminFlashcardFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminFlashcardListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  tag: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
