import type { SerializedError } from "@reduxjs/toolkit";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export interface WithdrawData {
  amount: number;
  method: 'agent' | 'atm' | 'bank' | '';
  agentId?: string;
  agentName?: string;
  agentLocation?: string;
  atmId?: string;
  bankAccount?: string;
  pin: string;
}

export interface ConfirmationStepProps {
  data: WithdrawData;
  userBalance: number;
  onPrev: () => void;
}
export interface ResponseData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
  error?: FetchBaseQueryError | SerializedError;
}

export interface AmountStepProps {
  data: WithdrawData;
  updateData: (data: Partial<WithdrawData>) => void;
  userBalance: number;
  onNext: () => void;
}