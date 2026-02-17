export const formatQuestionText = (text: string, type: string) => {
  if (type === "FILL_BLANK") {
    return text.replace(/\{[^}]+\}|_{3,}/gi, "_____");
  }
  return text;
};
