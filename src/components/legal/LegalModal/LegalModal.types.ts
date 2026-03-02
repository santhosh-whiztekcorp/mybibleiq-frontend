export type LegalModalType = "privacy" | "terms";

export type LegalModalProps = {
  isOpen: boolean;
  onClose: () => void;
  type: LegalModalType;
};

export type UseLegalModalProps = {
  type: LegalModalType;
};
