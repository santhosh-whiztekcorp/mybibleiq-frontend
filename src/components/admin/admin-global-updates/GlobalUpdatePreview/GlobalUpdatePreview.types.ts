export type GlobalUpdatePreviewProps = {
  title: string;
  message: string;
  deliveredAt: string | Date;
  isRead?: boolean;
  onDismiss?: () => void;
  className?: string;
};
