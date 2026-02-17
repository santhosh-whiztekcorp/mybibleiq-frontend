/* ---- String Conversions ---- */
export const convertToString = (val: unknown): string => {
  switch (typeof val) {
    case "number":
      return val.toString();
    case "undefined":
      return "";
    default:
      switch (val === null) {
        case true:
          return "";
        default:
          return String(val);
      }
  }
};

/* ---- Number Conversions ---- */
export const convertToNumber = (val: string): number | string => {
  const num = parseFloat(val);
  switch (isNaN(num)) {
    case true:
      return val;
    default:
      return num;
  }
};

export const convertNumberToString = (value?: number | string): string | undefined => {
  if (value === undefined || value === null) {
    return undefined;
  }
  if (typeof value === "number") {
    return value.toString();
  }
  return value;
};

export const convertStringToNumber = (text: string): number | undefined => {
  if (!text || text.trim() === "") {
    return undefined;
  }
  const parsed = parseFloat(text);
  return isNaN(parsed) ? undefined : parsed;
};

export const convertToInteger = (val: unknown, fallback: number = 0): number => {
  const num = parseInt(String(val), 10);
  switch (isNaN(num)) {
    case true:
      return fallback;
    default:
      return num;
  }
};

export const convertToFloat = (val: unknown, fallback: number = 0): number => {
  const num = parseFloat(String(val));
  switch (isNaN(num)) {
    case true:
      return fallback;
    default:
      return num;
  }
};

/* ---- Boolean Conversions ---- */
export const convertToBoolean = (val: unknown): boolean => {
  switch (typeof val) {
    case "boolean":
      return val;
    case "string": {
      const lower = val.toLowerCase().trim();
      return lower === "true" || lower === "1" || lower === "yes";
    }
    case "number":
      return val !== 0;
    default:
      return Boolean(val);
  }
};
