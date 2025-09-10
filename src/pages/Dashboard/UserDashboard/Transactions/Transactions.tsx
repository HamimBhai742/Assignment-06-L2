import { useState } from 'react';
import FilterBar from './components/FilterBar';
import TransactionList from './components/TransactionList';
import Pagination from './components/Pagination';
import { useGetMyTransactionsQuery } from '../../../../redux/api/transactionApi';
import type { FilterState } from './intrefaces';


const Transactions = () => {
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
  const transactions = data?.data;
  const totalPages = data?.metadata?.totalPage;
  const total = data?.metadata?.total;
  return (
    <div className='space-y-6 dark:bg-gray-900 min-h-screen'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            Transaction History
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>{total} transactions found</p>
        </div>

        <div className='mt-4 sm:mt-0 flex items-center space-x-3'>
          <button className='px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors text-sm font-medium'>
            📊 Export
          </button>
          <button className='px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-sm font-medium'>
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
