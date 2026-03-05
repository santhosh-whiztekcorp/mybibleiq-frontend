import { images } from "@/assets";
import type { StaticImageData } from "next/image";

export const QUEST_THEME_KEYS = ["forest", "desert"] as const;

/* ---- Theme config for preview (matches mobile logic) ---- */
const STAGES_BACKGROUND_IMAGE_SCALED_WIDTH = 2849;
const STAGES_BACKGROUND_IMAGE_SCALED_HEIGHT = 18200;

export type QuestThemeConfig = {
  stagesBackgroundImage: StaticImageData;
  finalHeight: (containerWidth: number) => number;
};

const getFinalHeight = (containerWidth: number) =>
  STAGES_BACKGROUND_IMAGE_SCALED_HEIGHT * (containerWidth / STAGES_BACKGROUND_IMAGE_SCALED_WIDTH);

export const QUEST_THEME_CONFIG = {
  forest: {
    stagesBackgroundImage: images.questStagesForest,
    finalHeight: getFinalHeight,
  },
  desert: {
    stagesBackgroundImage: images.questStagesDesert,
    finalHeight: getFinalHeight,
  },
} as const;

export function getThemeConfig(themeKey?: string | null): (typeof QUEST_THEME_CONFIG)["forest"] | null {
  if (!themeKey) return null;
  const key = themeKey.toLowerCase() as keyof typeof QUEST_THEME_CONFIG;
  return QUEST_THEME_CONFIG[key] ?? null;
}
