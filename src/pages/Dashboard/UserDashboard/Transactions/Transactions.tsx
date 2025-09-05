import { useState, useEffect } from 'react';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';
import Pagination from './components/Pagination';
import { useGetMyTransactionsQuery } from '../../../../redux/api/transactionApi';

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
    | 'commission';
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

const Transactions = () => {
  // const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<
    Transaction[]
  >([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [filters, setFilters] = useState<FilterState>({
    sort: '-createdAt',
    type: 'all',
    status: 'all',
    search: '',
  });
  const { data, isLoading } = useGetMyTransactionsQuery({
    limit: itemsPerPage,
    page: currentPage,
    type: filters?.type,
    search: filters?.search,
    status: filters?.status,
    sort: filters?.sort,
  });
  console.log(data);
  const transactions = data?.data;
  console.log(filters);
  console.log(itemsPerPage, currentPage);

  // // Mock transaction data
  // // const mockTransactions: Transaction[] = [
  // //   {
  // //     id: 'TXN001',
  // //     type: 'send',
  // //     amount: 1500,
  // //     recipient: 'Rahim Ahmed (+880 1712345678)',
  // //     description: 'Money sent',
  // //     status: 'completed',
  // //     date: new Date().toISOString(),
  // //     reference: 'Lunch money',
  // //     fee: 0,
  // //   },
  // //   {
  // //     id: 'TXN002',
  // //     type: 'receive',
  // //     amount: 2500,
  // //     sender: 'Fatima Khan (+880 1812345679)',
  // //     description: 'Money received',
  // //     status: 'completed',
  // //     date: new Date(Date.now() - 86400000).toISOString(),
  // //     reference: 'Payment for services',
  // //   },
  // //   {
  // //     id: 'TXN003',
  // //     type: 'deposit',
  // //     amount: 5000,
  // //     description: 'Bank deposit',
  // //     status: 'completed',
  // //     date: new Date(Date.now() - 172800000).toISOString(),
  // //     fee: 0,
  // //   },
  // //   {
  // //     id: 'TXN004',
  // //     type: 'withdraw',
  // //     amount: 3000,
  // //     description: 'Agent withdrawal',
  // //     status: 'pending',
  // //     date: new Date(Date.now() - 259200000).toISOString(),
  // //     fee: 15,
  // //   },
  // //   {
  // //     id: 'TXN005',
  // //     type: 'bill',
  // //     amount: 850,
  // //     recipient: 'DESCO',
  // //     description: 'Electricity bill payment',
  // //     status: 'completed',
  // //     date: new Date(Date.now() - 345600000).toISOString(),
  // //   },
  // //   {
  // //     id: 'TXN006',
  // //     type: 'recharge',
  // //     amount: 200,
  // //     recipient: 'Grameenphone',
  // //     description: 'Mobile recharge',
  // //     status: 'failed',
  // //     date: new Date(Date.now() - 432000000).toISOString(),
  // //   },
  // // ];

  // // useEffect(() => {
  // //   // Simulate API call
  // //   const loadTransactions = async () => {
  // //     setIsLoading(true);
  // //     await new Promise((resolve) => setTimeout(resolve, 1000));

  // //     // Generate more mock data
  // //     const allTransactions = [...mockTransactions];
  // //     for (let i = 7; i <= 50; i++) {
  // //       allTransactions.push({
  // //         id: `TXN${i.toString().padStart(3, '0')}`,
  // //         type: ['send', 'receive', 'deposit', 'withdraw', 'bill', 'recharge'][
  // //           Math.floor(Math.random() * 6)
  // //         ] as any,
  // //         amount: Math.floor(Math.random() * 10000) + 100,
  // //         recipient: Math.random() > 0.5 ? 'Random User' : undefined,
  // //         sender: Math.random() > 0.5 ? 'Random Sender' : undefined,
  // //         description: 'Transaction description',
  // //         status: ['completed', 'pending', 'failed'][
  // //           Math.floor(Math.random() * 3)
  // //         ] as any,
  // //         date: new Date(
  // //           Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000
  // //         ).toISOString(),
  // //         fee: Math.random() > 0.7 ? Math.floor(Math.random() * 20) : 0,
  // //       });
  // //     }

  // //     setTransactions(allTransactions);
  // //     setFilteredTransactions(allTransactions);
  // //     setIsLoading(false);
  // //   };

  // //   loadTransactions();
  // // }, []);

  // // useEffect(() => {
  // //   applyFilters();
  // // }, [filters, transactions]);

  // // const applyFilters = () => {
  // //   let filtered = [...transactions];

  //   // Date filter
  //   if (filters.dateRange !== 'all') {
  //     const now = new Date();
  //     let startDate: Date;

  //     switch (filters.dateRange) {
  //       case 'today':
  //         startDate = new Date(
  //           now.getFullYear(),
  //           now.getMonth(),
  //           now.getDate()
  //         );
  //         break;
  //       case 'week':
  //         startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  //         break;
  //       case 'month':
  //         startDate = new Date(now.getFullYear(), now.getMonth(), 1);
  //         break;
  //       case 'custom':
  //         if (filters.customStartDate) {
  //           startDate = new Date(filters.customStartDate);
  //           const endDate = filters.customEndDate
  //             ? new Date(filters.customEndDate)
  //             : now;
  //           filtered = filtered.filter((t) => {
  //             const txDate = new Date(t.date);
  //             return txDate >= startDate && txDate <= endDate;
  //           });
  //         }
  //         break;
  //       default:
  //         startDate = new Date(0);
  //     }

  //     if (filters.dateRange !== 'custom') {
  //       filtered = filtered.filter((t) => new Date(t.date) >= startDate);
  //     }
  //   }

  //   // Type filter
  //   if (filters.type !== 'all') {
  //     filtered = filtered.filter((t) => t.type === filters.type);
  //   }

  //   // Status filter
  //   if (filters.status !== 'all') {
  //     filtered = filtered.filter((t) => t.status === filters.status);
  //   }

  //   // Search filter
  //   if (filters.search) {
  //     const searchLower = filters.search.toLowerCase();
  //     filtered = filtered.filter(
  //       (t) =>
  //         t.description.toLowerCase().includes(searchLower) ||
  //         t.recipient?.toLowerCase().includes(searchLower) ||
  //         t.sender?.toLowerCase().includes(searchLower) ||
  //         t.reference?.toLowerCase().includes(searchLower) ||
  //         t.id.toLowerCase().includes(searchLower)
  //     );
  //   }

  //   // Amount filter
  //   if (filters.minAmount) {
  //     filtered = filtered.filter(
  //       (t) => t.amount >= parseFloat(filters.minAmount)
  //     );
  //   }
  //   if (filters.maxAmount) {
  //     filtered = filtered.filter(
  //       (t) => t.amount <= parseFloat(filters.maxAmount)
  //     );
  //   }

  //   setFilteredTransactions(filtered);
  //   setCurrentPage(1);
  // };

  const totalPages = data?.metadata?.totalPage;
  const total = data?.metadata?.total;
  console.log(transactions);
  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900'>
            Transaction History
          </h1>
          <p className='text-gray-600 mt-1'>{total} transactions found</p>
        </div>

        <div className='mt-4 sm:mt-0 flex items-center space-x-3'>
          <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium'>
            📊 Export
          </button>
          <button className='px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium'>
            📄 Statement
          </button>
        </div>
      </div>

      {/* Filters */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {/* Transaction List */}
      <TransactionList
        transactions={transactions}
        isLoading={isLoading}
        isEmpty={total === 0}
      />

      {/* Pagination */}
      {!isLoading && total > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={total}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
        />
      )}
    </div>
  );
};

export default Transactions;
