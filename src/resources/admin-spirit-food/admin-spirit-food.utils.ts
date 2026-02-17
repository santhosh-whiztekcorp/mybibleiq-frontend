import type { ImportReportAdminSpiritFoodResponse, ImportReportRow } from "./admin-spirit-food.types";

/* ---- Validation Types ---- */
export type ValidationRow = {
  rowNumber: number;
  status: "valid" | "invalid";
  data?: Record<string, unknown>;
  errors: string[];
};

export type BulkUploadValidationResult = {
  rows: ValidationRow[];
};

/* ---- Report Row Type (from API response) ---- */
type ReportRowApi = {
  rowNumber?: number;
  row?: number;
  valid?: boolean;
  ok?: boolean;
  errors?: string[];
  error?: string;
  data?: unknown;
};

/* ---- Report Data Type (from API response) ---- */
type ReportDataApi = {
  mime?: string;
  body?: string | unknown;
  rows?: ReportRowApi[];
  results?: ReportRowApi[];
  data?: {
    rows?: ReportRowApi[];
    results?: ReportRowApi[];
  };
  value?: {
    rows?: ReportRowApi[];
    results?: ReportRowApi[];
  };
};

/* ---- Parse Report Data Utility ---- */
export const parseImportReportData = (
  reportData: ImportReportAdminSpiritFoodResponse | string | ReportDataApi | ReportRowApi[]
): BulkUploadValidationResult["rows"] => {
  let rows: ValidationRow[] = [];

  // Handle string response (JSON string)
  if (typeof reportData === "string") {
    try {
      const parsed = JSON.parse(reportData) as ReportDataApi | ReportRowApi[];
      return parseImportReportData(parsed);
    } catch {
      return rows;
    }
  }

  // Handle array of rows directly
  if (Array.isArray(reportData)) {
    rows = reportData.map((row, index) => {
      const rowNumber = row.rowNumber ?? row.row ?? index + 1;
      const isValid = row.valid ?? row.ok ?? false;
      const errors = Array.isArray(row.errors) ? row.errors : row.error ? [row.error] : [];

      return {
        rowNumber,
        status: (isValid ? "valid" : "invalid") as "valid" | "invalid",
        data: row.data && typeof row.data === "object" ? (row.data as Record<string, unknown>) : undefined,
        errors,
      };
    });
    return rows;
  }

  // Handle wrapped response: { mime, body: "json string" }
  if ("mime" in reportData && "body" in reportData && typeof reportData.body === "string") {
    try {
      const parsedBody = JSON.parse(reportData.body) as ReportDataApi | ReportRowApi[];
      return parseImportReportData(parsedBody);
    } catch {
      // If parsing fails, try as direct object
      if (typeof reportData.body === "object") {
        return parseImportReportData(reportData.body);
      }
      return rows;
    }
  }

  // Handle typed ImportReportAdminSpiritFoodResponse
  if ("rows" in reportData && Array.isArray((reportData as ImportReportAdminSpiritFoodResponse).rows)) {
    const typedData = reportData as ImportReportAdminSpiritFoodResponse;
    rows = typedData.rows.map((row: ImportReportRow) => ({
      rowNumber: row.rowNumber,
      status: (row.valid ? "valid" : "invalid") as "valid" | "invalid",
      data: row.data && typeof row.data === "object" ? (row.data as Record<string, unknown>) : undefined,
      errors: row.errors || [],
    }));
    return rows;
  }

  // Handle generic ReportDataApi structure
  const apiData = reportData as ReportDataApi;
  let reportRows: ReportRowApi[] | undefined;

  if (Array.isArray(apiData)) {
    reportRows = apiData as ReportRowApi[];
  } else if (apiData) {
    reportRows =
      apiData.rows ||
      apiData.results ||
      (apiData.data && (apiData.data.rows || apiData.data.results)) ||
      (apiData.value && (apiData.value.rows || apiData.value.results));
  }

  if (Array.isArray(reportRows) && reportRows.length > 0) {
    rows = reportRows.map((row, index) => {
      const rowNumber = row.rowNumber ?? row.row ?? index + 1;
      const isValid = row.valid ?? row.ok ?? false;
      const errors = Array.isArray(row.errors) ? row.errors : row.error ? [row.error] : [];

      return {
        rowNumber,
        status: (isValid ? "valid" : "invalid") as "valid" | "invalid",
        data: row.data && typeof row.data === "object" ? (row.data as Record<string, unknown>) : undefined,
        errors,
      };
    });
  }

  return rows;
};
