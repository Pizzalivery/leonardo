export type PaymentMethod = {
  id: number;
  type: string;
  name: string;
  available: boolean;
};

export type PixParams = {
  amount: number;
};

export type PixData = {
  copyPaste: string;
  qrCode: string;
  amount: number;
  transactionId: string;
};
