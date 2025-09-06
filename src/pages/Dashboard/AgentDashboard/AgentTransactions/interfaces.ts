
interface ISenderReceiver {
  _id: string;
  name: string;
  phone: string;
  role: string;
}

export interface Transaction {
  _id?: string;
  type:
    | 'cash_in'
    | 'cash_out'
    | 'deposit'
    | 'withdraw'
    | 'fee'
    | 'commission'
    ;
  transactionId: string;
  amount: number;
  to?: ISenderReceiver;
  from?: ISenderReceiver;
  status: 'completed' | 'pending' | 'failed';
  updatedAt: string;
  createdAt: string;
  fee: number;
  commission: number;
}

export interface FilterState {
  sort: string;
  type:
    | 'all'
    | 'send'
    | 'receive'
    | 'deposit'
    | 'withdraw'
    | 'fee'
    | 'commission';
  status: 'all' | 'completed' | 'pending' | 'failed';
  search: string;
}

export interface TransactionListProps {
  transactions: Transaction[];
  isLoading: boolean;
  isEmpty: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  itemsPerPage: number;
  setItemsPerPage: (itemsPerPage: number) => void;
}