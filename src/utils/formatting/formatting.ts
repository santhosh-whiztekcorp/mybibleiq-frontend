/* ---- String Formatting ---- */
export const capitalize = (str: string): string => {
  switch (!!str) {
    case false:
      return "";
    default:
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
};

export const capitalizeWords = (str: string): string =>
  str
    .split(" ")
    .map((word) => capitalize(word))
    .join(" ");

export const toUpperCase = (str: string): string => str.toUpperCase();

export const toLowerCase = (str: string): string => str.toLowerCase();

export const truncate = (str: string, maxLength: number, suffix: string = "..."): string => {
  switch (true) {
    case str.length <= maxLength:
      return str;
    default:
      return str.substring(0, maxLength - suffix.length) + suffix;
  }
};

/* ---- Number Formatting ---- */
export const formatNumber = (num: number, decimals: number = 2): string => num.toFixed(decimals);

export const formatNumberWithLocale = (num: number, locale: string = "en-US"): string => num.toLocaleString(locale);

export const formatCurrency = (amount: number, currency: string = "USD", locale: string = "en-US"): string =>
  new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
  }).format(amount);

export const formatPercentage = (value: number, decimals: number = 0): string => `${(value * 100).toFixed(decimals)}%`;

export const formatWithCommas = (num: number): string => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

/* ---- Phone Formatting ---- */
export const formatPhoneNumber = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, "");

  switch (cleaned.length) {
    case 10:
      return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
    case 11:
      switch (cleaned.startsWith("1")) {
        case true:
          return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
        default:
          return phone;
      }
    default:
      return phone;
  }
};

/* ---- Date Formatting ---- */
export const formatDate = (date: Date, format: string = "MM/DD/YYYY"): string => {
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return format
    .replace("DD", day)
    .replace("MM", month)
    .replace("YYYY", year.toString())
    .replace("YY", year.toString().slice(-2));
};

/* ---- Format Date String ---- */
export const formatDateString = (dateString?: string | null, locale: string = "en-US"): string => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString(locale, {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
};

/* ---- Date Utilities ---- */
export const isToday = (dateString: string): boolean => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const isFutureDate = (dateString: string | null | undefined): boolean => {
  if (!dateString) return false;
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date > today;
};

export const formatTime = (date: Date, use24Hour: boolean = false): string => {
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");

  switch (use24Hour) {
    case true:
      return `${hours.toString().padStart(2, "0")}:${minutes}`;
    default: {
      const ampm = (() => {
        switch (true) {
          case hours >= 12:
            return "PM";
          default:
            return "AM";
        }
      })();
      hours = hours % 12 || 12;
      return `${hours}:${minutes} ${ampm}`;
    }
  }
};

/* ---- Format Time String (HH:mm to 12-hour format) ---- */
export const formatTimeString = (timeString: string): string => {
  try {
    const [hours, minutes] = timeString.split(":");
    const hour = parseInt(hours, 10);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    return `${hour12}:${minutes} ${ampm}`;
  } catch {
    return timeString;
  }
};

/* ---- Duration Formatting ---- */
export const formatDuration = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

/* ---- File Size Formatting ---- */
export const formatFileSize = (bytes: number, decimals: number = 2): string => {
  switch (bytes) {
    case 0:
      return "0 Bytes";
    default: {
      const k = 1024;
      const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return `${parseFloat((bytes / Math.pow(k, i)).toFixed(decimals))} ${sizes[i]}`;
    }
  }
};

/* ---- Text Case Formatting ---- */
export const toCamelCase = (str: string): string =>
  str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (letter, index) => (index === 0 ? letter.toLowerCase() : letter.toUpperCase()))
    .replace(/\s+/g, "");

export const toSnakeCase = (str: string): string =>
  str
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("_");

export const toKebabCase = (str: string): string =>
  str
    .replace(/\W+/g, " ")
    .split(/ |\B(?=[A-Z])/)
    .map((word) => word.toLowerCase())
    .join("-");

export const toPascalCase = (str: string): string =>
  str.replace(/(?:^\w|[A-Z]|\b\w)/g, (letter) => letter.toUpperCase()).replace(/\s+/g, "");

export const formatTimeAgo = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffSeconds = Math.floor(diffTime / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSeconds < 60) {
      return "just now";
    } else if (diffMinutes < 60) {
      return `${diffMinutes} ${diffMinutes === 1 ? "minute" : "minutes"} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} ${diffHours === 1 ? "hour" : "hours"} ago`;
    } else if (diffDays < 7) {
      return `${diffDays} ${diffDays === 1 ? "day" : "days"} ago`;
    } else {
      const diffWeeks = Math.floor(diffDays / 7);
      if (diffWeeks < 4) {
        return `${diffWeeks} ${diffWeeks === 1 ? "week" : "weeks"} ago`;
      } else {
        const diffMonths = Math.floor(diffDays / 30);
        if (diffMonths < 12) {
          return `${diffMonths} ${diffMonths === 1 ? "month" : "months"} ago`;
        } else {
          const diffYears = Math.floor(diffDays / 365);
          return `${diffYears} ${diffYears === 1 ? "year" : "years"} ago`;
        }
      }
    }
  } catch {
    return "";
  }
};

/* ---- Format Announcement Date Time ---- */
export const formatAnnouncementDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = formatTime(date, false);
    return `${month} ${day}, ${year} | ${time}`;
  } catch {
    return "";
  }
};

/* ---- Format Notification Date Time ---- */
export const formatNotificationDateTime = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    const month = date.toLocaleDateString("en-US", { month: "short" });
    const day = date.getDate();
    const year = date.getFullYear();
    const time = formatTime(date, false);
    return `${month} ${day}, ${year} • ${time}`;
  } catch {
    return "";
  }
};

/* ---- Format Date of Birth ---- */
export const formatDateOfBirth = (dateString?: string | null, locale: string = "en-US"): string | null => {
  if (!dateString) return null;
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return null;
  }
};
