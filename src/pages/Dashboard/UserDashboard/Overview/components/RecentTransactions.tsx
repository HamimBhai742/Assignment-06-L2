import { Link } from 'react-router';
import { useGetMyTransactionsQuery } from '../../../../../redux/api/transactionApi';
import type { Transaction } from '../interfaces';
import { format } from 'timeago.js';
import { ClockIcon } from '@heroicons/react/24/outline';

const RecentTransactions = () => {
  const { data } = useGetMyTransactionsQuery(
    {
      limit: 8,
      page: 1,
      type: 'all',
      search: '',
      status: 'all',
      sort: '-createdAt',
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );
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
        return 'text-red-500';
      case 'recharge':
        return 'text-pink-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'pending':
        return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'failed':
        return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
    }
  };

  function formatLabel(key: string) {
    return key
      .split('_') // 'receive_money' -> ['receive', 'money']
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ['Receive', 'Money']
      .join(' '); // 'Receive Money'
  }
  return (
    <div className='bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-lg font-semibold text-gray-900 dark:text-white'>
          Recent Transactions
        </h2>
        <Link
          to='/dashboard/transactions'
          className='text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium'
        >
          View All
        </Link>
      </div>

      <div className='space-y-4'>
        {data?.data?.map((transaction: Transaction) => (
          <div
            key={transaction._id}
            className='flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
          >
            {/* Icon */}
            <div className='md:w-10 md:h-10 w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0'>
              <span className='text-lg'>
                {getTransactionIcon(transaction.type)}
              </span>
            </div>

            {/* Transaction Details */}
            <div className='flex-1 min-w-0'>
              <div className='flex items-center justify-between'>
                <h3 className='text-sm font-semibold text-gray-900 dark:text-white truncate'>
                  {formatLabel(transaction.type)}
                </h3>
                <span
                  className={`text-sm font-semibold ${getTransactionColor(
                    transaction.type
                  )}`}
                >
                  {transaction.type === 'receive_money' ||
                  transaction.type === 'deposit' ||
                  transaction.type === 'add_money'
                    ? '+'
                    : '-'}
                  ৳{transaction.amount.toLocaleString()}
                </span>
              </div>

              <div className='flex items-center justify-between mt-1'>
                <p className='text-xs text-gray-500 dark:text-gray-400 truncate'>
                  {(() => {
                    switch (transaction.type) {
                      case 'add_money':
                        return `+88${transaction.from?.phone}`;
                      case 'receive_money':
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
                      default:
                        return '-';
                    }
                  })()}
                </p>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    transaction.status
                  )}`}
                >
                  {transaction.status}
                </span>
              </div>

              <p className='text-xs text-gray-400 dark:text-gray-500 mt-1 md:flex items-center gap-3'>
                <span>TrxID:{transaction.transactionId}</span>
                <span className='flex items-center gap-1'>
                  <ClockIcon className='h-3 w-3 text-gray-400 dark:text-gray-500' />
                  {format(transaction.createdAt)}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className='mt-6 pt-4 border-t border-gray-100 dark:border-gray-600'>
        <Link
          to='/dashboard/transactions'
          className='w-full py-2 text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors flex items-center justify-center'
        >
          View All Transactions →
        </Link>
      </div>
    </div>
  );
};

export default RecentTransactions;
