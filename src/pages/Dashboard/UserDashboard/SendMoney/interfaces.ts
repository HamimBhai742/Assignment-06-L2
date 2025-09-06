import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface SendMoneyData {
  recipientPhone: string;
  recipientName: string;
  recipientVerified: boolean;
  amount: number;
  purpose: string;
  reference: string;
  pin: string;
}


export interface RecipientStepProps {
  data: SendMoneyData;
  updateData: (data: Partial<SendMoneyData>) => void;
  onNext: () => void;
}

export interface ConfirmationStepProps {
  data: SendMoneyData;
  userBalance: number;
  onPrev: () => void;
}

export interface ResponseData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  error?: FetchBaseQueryError | SerializedError;
}

export interface AmountStepProps {
  data: SendMoneyData;
  updateData: (data: Partial<SendMoneyData>) => void;
  userBalance: number;
  onNext: () => void;
  onPrev: () => void;
}