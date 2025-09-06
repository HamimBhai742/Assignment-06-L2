/* eslint-disable @typescript-eslint/no-explicit-any */
export interface User {
  id: string;
  name: string;
  phone: string;
  balance: number;
  verified: boolean;
  myBalance: number;
}


export interface SelectUser {
  user: {
    _id: string;
    name: string;
    phone: string;
    isActive: boolean;
  };
  wallet: {
    balance: number;
  };
}

export interface CashOutUserSearchProps {
  onUserSelect: (user: SelectUser) => void;
}

export interface CashOutTransactionFormProps {
  user: User;
  onSubmit: (data: any) => void;
  onBack: () => void;
}

export interface TransactionData {
  amount: number;
  charge: number;
  totalDeduction: number;
  customerPin: string;
  agentPin: string;
  reference: string;
  timestamp: string;
}

export interface CashOutConfirmationProps {
  user: User;
  transactionData: TransactionData;
  onReset: () => void;
}
