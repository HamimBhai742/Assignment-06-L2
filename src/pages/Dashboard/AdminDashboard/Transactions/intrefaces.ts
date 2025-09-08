interface ISenderReceiver {
  _id: string;
  name: string;
  phone: string;
  role: string;
}

export interface Transaction {
  _id?: string;
  type:
    | 'send_money'
    | 'receive_money'
    | 'deposit'
    | 'withdraw'
    | 'fee'
    | 'commission'
    | 'add_money'
    | 'cash_in'
    | 'cash_out'
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

export interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: FilterState) => void;
}
