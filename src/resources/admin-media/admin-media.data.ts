import type { CreateAdminMediaFormInput, AdminMediaFilterStore, AdminMediaListInput } from "./admin-media.types";

/* ---- Default Form Values ---- */
export const defaultCreateMediaFormValues: CreateAdminMediaFormInput = {
  title: "",
  type: "IMAGE",
  caption: undefined,
  tags: [],
  sizeBytes: 0,
  duration: undefined,
  file: undefined,
};

/* ---- Default Filter Values ---- */
export const defaultAdminMediaFilters: Pick<AdminMediaFilterStore, "page" | "pageSize" | "sort"> &
  Omit<AdminMediaListInput, "page" | "pageSize" | "sort"> = {
  status: undefined,
  type: undefined,
  tags: undefined,
  q: undefined,
  page: 1,
  pageSize: 20,
  sort: "-createdAt",
};
