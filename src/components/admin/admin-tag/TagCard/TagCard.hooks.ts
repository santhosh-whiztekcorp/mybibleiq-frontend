import { useState } from "react";

export const useTagCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return {
    isExpanded,
    toggleExpanded,
  };
};
