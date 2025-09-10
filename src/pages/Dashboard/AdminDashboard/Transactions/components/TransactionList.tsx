import { format } from 'date-fns';
import type { TransactionListProps } from '../intrefaces';
import { ClockIcon } from '@heroicons/react/24/outline';

const TransactionList = ({
  transactions,
  isLoading,
  isEmpty,
}: TransactionListProps) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'send_money':
        return '💸';
      case 'receive_money':
        return '📥';
      case 'deposit':
        return '💰';
      case 'withdraw':
        return '🏧';
      case 'fee':
        return '🧾';
      case 'commission':
        return '📱';
      case 'add_money':
        return '⬇️';
      case 'cash_in':
        return '⬆️';
      case 'cash_out':
        return '⬇️';
      default:
        return '💳';
    }
  };

  const getTransactionColor = (type: string) => {
    switch (type) {
      case 'send_money':
        return 'text-red-600';
      case 'receive_money':
        return 'text-green-600';
      case 'add_money':
        return 'text-green-600';
      case 'deposit':
        return 'text-blue-600';
      case 'withdraw':
        return 'text-orange-600';
      case 'fee':
        return 'text-purple-600';
      case 'commission':
        return 'text-purple-600';
      case 'cash_in':
        return 'text-green-600';
      case 'cash_out':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-300';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  if (isLoading) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
        <div className='space-y-4'>
          {[...Array(5)].map((_, index) => (
            <div key={index} className='animate-pulse'>
              <div className='flex items-center space-x-4'>
                <div className='w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-xl'></div>
                <div className='flex-1 space-y-2'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-1/4'></div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2'></div>
                </div>
                <div className='text-right space-y-2'>
                  <div className='h-4 bg-gray-200 dark:bg-gray-600 rounded w-16'></div>
                  <div className='h-3 bg-gray-200 dark:bg-gray-600 rounded w-12'></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-12 text-center'>
        <div className='w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4'>
          <span className='text-3xl'>📋</span>
        </div>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
          No Transactions Found
        </h3>
        <p className='text-gray-600 dark:text-gray-300 mb-6'>
          No transactions match your current filters. Try adjusting your search
          criteria.
        </p>
        <button className='px-6 py-3 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors font-medium'>
          Clear Filters
        </button>
      </div>
    );
  }
  function formatLabel(key: string) {
    return key
      .split('_') // 'receive_money' -> ['receive', 'money']
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ['Receive', 'Money']
      .join(' '); // 'Receive Money'
  }

  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden'>
      <div className='divide-y divide-gray-100 dark:divide-gray-600'>
        {transactions?.map((transaction) => (
          <div
            key={transaction._id}
            className='p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
          >
            <div className='flex items-center space-x-4'>
              {/* Transaction Icon */}
              <div className='w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center flex-shrink-0'>
                <span className='text-2xl'>
                  {getTransactionIcon(transaction.type)}
                </span>
              </div>

              {/* Transaction Details */}
              <div className='flex-1 min-w-0'>
                <div className='flex items-start justify-between'>
                  <div className='flex-1'>
                    <h3 className='font-semibold text-gray-900 dark:text-white mb-1'>
                      {formatLabel(transaction.type)}
                    </h3>
                    <div className='space-y-1'>
                      <p>
                        {(() => {
                          switch (transaction.type) {
                            case 'receive_money':
                              return `+88${transaction.from?.phone}`;
                            case 'add_money':
                              return `+88${transaction.from?.phone}`;
                            case 'send_money':
                              return `+88${transaction.to?.phone}`;
                            case 'fee':
                              return `Apps`;
                            case 'commission':
                              return `Apps`;
                            case 'withdraw':
                              return `+88${transaction.from?.phone}`;
                            case 'deposit':
                              return `+88${transaction.to?.phone}`;
                            case 'cash_in':
                              return `+88${transaction.from?.phone}`;
                            case 'cash_out':
                              return `+88${transaction.to?.phone}`;
                            default:
                              return '-';
                          }
                        })()}
                      </p>
                    </div>
                    <div className='flex items-center space-x-4 mt-2'>
                      <span className='text-xs text-gray-500 dark:text-gray-400'>
                        TrxID: {transaction.transactionId}
                      </span>
                      <span className='text-xs text-gray-500 dark:text-gray-400 flex items-center gap-1'>
                        <ClockIcon className='h-3 w-3 text-gray-400 dark:text-gray-500' />

                        {format(
                          transaction.createdAt,
                          'hh:mm:ss a, dd/MM/yyyy'
                        )}
                      </span>

                      {transaction.fee > 0 && (
                        <span className='text-xs text-orange-600'>
                          🧾 Fee: ৳{transaction.fee.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Amount and Status */}
                  <div className='text-right ml-4'>
                    <div
                      className={`text-lg font-bold ${getTransactionColor(
                        transaction.type
                      )}`}
                    >
                      {transaction.type === 'receive_money' ||
                      transaction.type === 'deposit' ||
                      transaction.type === 'add_money'
                        ? '+'
                        : '-'}
                      ৳{transaction.amount.toLocaleString()}
                    </div>

                    <div className='mt-2'>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          transaction.status
                        )}`}
                      >
                        {transaction.status === 'completed' && '✅ Completed'}
                        {transaction.status === 'pending' && '⏳ Pending'}
                        {transaction.status === 'failed' && '❌ Failed'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile View - Stacked Layout */}
            <div className='md:hidden mt-4 pt-4 border-t border-gray-100 dark:border-gray-600'>
              <div className='flex justify-between items-center'>
                <div className='flex items-center space-x-2'>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      transaction.status
                    )}`}
                  >
                    {transaction.status}
                  </span>
                  <span className='text-xs text-gray-500 dark:text-gray-400'>
                    {format(transaction.createdAt, 'hh:mm:ss a, dd/MM/yyyy')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
