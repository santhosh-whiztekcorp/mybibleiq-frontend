import type { StaticImageData } from "next/image";

export type QuestStagesPreviewConfig = {
  stagesBackgroundImage: StaticImageData;
  finalHeight: (containerWidth: number) => number;
};

export type QuestStagesPreviewProps = {
  themeConfig: QuestStagesPreviewConfig;
  themeName: string;
};
