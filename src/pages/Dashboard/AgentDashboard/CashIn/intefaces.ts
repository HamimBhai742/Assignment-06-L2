export interface SelectedUser {
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

export interface UserSearchProps {
  onUserSelect: (user: SelectUser) => void;
}

export interface User {
  id: string;
  name: string;
  phone: string;
  balance: number;
  verified: boolean;
  myBalance: number;
}

export interface TransactionFormProps {
  user: User;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onSubmit: (data: any) => void;
  onBack: () => void;
}

interface TransactionData {
  amount: number;
  charge: number;
  totalAmount: number;
  pin: string;
  reference: string;
  timestamp: string;
}

export interface ResponseData {
  message: string;
  data: {
    availableBlance: number;
    phone: string;
    recipient: string;
    amount: number;
    commission: number;
    trnxId: string;
    walletStatus: string;
  };
}

 export interface TransactionConfirmationProps {
  user: User;
  transactionData: TransactionData;
  onReset: () => void;
}