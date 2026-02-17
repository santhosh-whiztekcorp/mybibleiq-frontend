import { z } from "zod";
import {
  AdminQuestionStatusEnum,
  QuestionTypeEnum,
  QuestionStatusActionEnum,
  CreateAdminQuestionRequestSchema,
  UpdateAdminQuestionRequestSchema,
  UpdateAdminQuestionStatusSchema,
} from "./admin-question.schemas";

/* ---- Enum Types ---- */
export type AdminQuestionStatus = z.infer<typeof AdminQuestionStatusEnum>;
export type QuestionType = z.infer<typeof QuestionTypeEnum>;
export type QuestionStatusAction = z.infer<typeof QuestionStatusActionEnum>;

/* ---- Question Type Types ---- */
export type QuestionOption = {
  text: string;
  isCorrect: boolean;
};

export type QuestionMcq = {
  multiSelect?: boolean;
  options: QuestionOption[];
};

export type QuestionTrueFalse = {
  isCorrect: boolean;
};

export type QuestionMatching = {
  pairs: {
    left: string;
    right: string;
  }[];
};

export type QuestionFillBlank = {
  blanks: {
    name: string;
    options: QuestionOption[];
  }[];
};

export type QuestionOneWord = {
  answer: string;
  caseSensitive?: boolean;
  allowTrim?: boolean;
};

export type QuestionOrder = {
  items: {
    text: string;
    order: number;
  }[];
};

/* ---- Question Types ---- */
export type AdminQuestionSummary = {
  id: string;
  status: AdminQuestionStatus;
  questionText: string;
  type: QuestionType;
  tags: string[];
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
};

export type AdminQuestionDetail = {
  id: string;
  status: AdminQuestionStatus;
  questionText: string;
  type: QuestionType;
  tags: string[];
  shuffle: boolean;
  mcq: QuestionMcq | null;
  trueFalse: QuestionTrueFalse | null;
  matching: QuestionMatching | null;
  fillBlank: QuestionFillBlank | null;
  oneWord: QuestionOneWord | null;
  order: QuestionOrder | null;
  publishedAt?: string;
  archivedAt?: string;
  createdAt: string;
  updatedAt: string;
};

/* ---- Response Types ---- */
export type AdminQuestionTypeStatsResponse = {
  type: QuestionType;
  count: number;
}[];

export type AdminQuestionStatusStatsResponse = {
  status: AdminQuestionStatus;
  count: number;
}[];

export type AdminQuestionListResponse = {
  items: AdminQuestionSummary[];
  total: number;
  page: number;
  pageSize: number;
};

export type AdminQuestionResponse = AdminQuestionDetail;
export type CreateAdminQuestionResponse = AdminQuestionDetail;
export type UpdateAdminQuestionResponse = AdminQuestionDetail;

export type UpdateAdminQuestionStatusResponse = {
  id: string;
  status: AdminQuestionStatus;
};

/* ---- Import Response Types ---- */
export type ImportPreviewAdminQuestionResponse = {
  uploadId: string;
  total: number;
  valid: number;
  invalid: number;
};

export type ImportCommitAdminQuestionResponse = {
  uploadId: string;
  total: number;
  success: number;
  failed: number;
};

export type ImportReportRow = {
  rowNumber: number;
  valid: boolean;
  errors: string[];
  data: {
    type: QuestionType;
    questionText?: string; // camelCase (if backend converts it)
    questiontext?: string; // lowercase (actual CSV column name from backend)
    [key: string]: unknown;
  };
};

export type ImportReportAdminQuestionResponse = {
  uploadId: string;
  total: number;
  valid: number;
  invalid: number;
  rows: ImportReportRow[];
};

/* ---- Input Types ---- */
export type AdminQuestionListInput = {
  status?: AdminQuestionStatus;
  type?: QuestionType;
  tags?: string[];
  q?: string;
  page?: number;
  pageSize?: number;
  sort?: string;
};

export type CreateAdminQuestionInput = z.infer<typeof CreateAdminQuestionRequestSchema>;
export type UpdateAdminQuestionInput = z.infer<typeof UpdateAdminQuestionRequestSchema>;
export type UpdateAdminQuestionStatusInput = z.infer<typeof UpdateAdminQuestionStatusSchema>;

export type ImportPreviewAdminQuestionInput = {
  file: File;
  submitAfterUpload?: boolean;
};

export type ImportCommitAdminQuestionInput = {
  uploadId: string;
  submitAfterUpload: boolean;
};

export type ImportReportAdminQuestionInput = {
  uploadId: string;
  format?: "json" | "csv";
};

/* ---- Filter Store Types ---- */
export type AdminQuestionFilterActions = {
  setFilters: (filters: Partial<AdminQuestionListInput>) => void;
  resetFilters: () => void;
};

export type AdminQuestionFilterStore = Omit<AdminQuestionListInput, "page" | "pageSize" | "sort"> &
  Required<Pick<AdminQuestionListInput, "page" | "pageSize" | "sort">> &
  AdminQuestionFilterActions;
