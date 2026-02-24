/* ---- Query String Helpers ---- */
export const parseQueryString = (queryString: string): Record<string, string> => {
  const params: Record<string, string> = {};

  switch (!!queryString) {
    case false:
      return params;
    default: {
      const pairs = queryString.replace(/^\?/, "").split("&");
      pairs.forEach((pair) => {
        const [key, value] = pair.split("=");
        switch (!!key) {
          case true:
            switch (!!value) {
              case true:
                params[decodeURIComponent(key)] = decodeURIComponent(value);
                break;
              default:
                params[decodeURIComponent(key)] = "";
                break;
            }
            break;
        }
      });
      return params;
    }
  }
};

/* ---- API Helpers ---- */
export const unwrapApiResponse = <TData>(payload: unknown): TData => {
  if (
    payload &&
    typeof payload === "object" &&
    "data" in (payload as Record<string, unknown>) &&
    "success" in (payload as Record<string, unknown>)
  ) {
    return (payload as { data: TData }).data;
  }
  return payload as TData;
};
