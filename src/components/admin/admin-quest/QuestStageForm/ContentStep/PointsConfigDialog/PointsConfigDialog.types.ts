export type PointsConfigDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  initialPoints: number;
  onSave: (points: number) => void;
};
