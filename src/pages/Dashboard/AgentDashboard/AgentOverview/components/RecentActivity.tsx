/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import { useGetMyTransactionsQuery } from '../../../../../redux/api/transactionApi';
import { format } from 'timeago.js';
import type { Transaction } from '../interface';

const RecentActivity: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'cash_in' | 'cash_out'>('all');
  const { data } = useGetMyTransactionsQuery(
    {
      limit: 6,
      page: 1,
      type: filter,
      search: '',
      status: 'all',
      sort: '-createdAt',
    },
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30';
      case 'pending':
        return 'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30';
      case 'failed':
        return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30';
      default:
        return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700';
    }
  };
  function formatLabel(key: string) {
    return key
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // ['Receive', 'Money']
      .join(' ');
  }
  return (
    <div className='bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700'>
      <div className='p-6 border-b border-gray-100 dark:border-gray-600'>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
          <h2 className='text-xl font-semibold text-gray-900 dark:text-white'>
            Recent Activity
          </h2>
          <div className='flex items-center gap-3'>
            <div className='flex items-center gap-2'>
              <FunnelIcon className='h-4 w-4 text-gray-500 dark:text-gray-400' />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as any)}
                className='text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white'
              >
                <option value='all'>All Transactions</option>
                <option value='cash_in'>Cash In</option>
                <option value='cash_out'>Cash Out</option>
                <option value='commission'>Commission</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className='divide-y divide-gray-100 dark:divide-gray-600'>
        {data?.data?.map((transaction: Transaction) => (
          <div
            key={transaction._id}
            className='p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-4'>
                <div
                  className={`p-2 rounded-lg ${
                    transaction.type === 'cash_in' ||
                    transaction.type === 'commission'
                      ? 'bg-green-100 dark:bg-green-900/30'
                      : 'bg-red-100 dark:bg-red-900/30'
                  }`}
                >
                  {transaction.type === 'cash_in' ||
                  transaction.type === 'commission' ? (
                    <ArrowDownIcon className='h-5 w-5 text-green-600 dark:text-green-400' />
                  ) : (
                    <ArrowUpIcon className='h-5 w-5 text-red-600 dark:text-red-400' />
                  )}
                </div>
                <div>
                  <div className='flex items-center gap-2 mb-1'>
                    <p className='font-semibold text-gray-900 dark:text-white'>
                      {formatLabel(transaction.type)}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        transaction.status
                      )}`}
                    >
                      {transaction.status}
                    </span>
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    {' '}
                    {(() => {
                      switch (transaction.type) {
                        case 'cash_in':
                          return `+88${transaction.from?.phone}`;
                        case 'cash_out':
                          return `+88${transaction.to?.phone}`;
                        case 'fee':
                          return `Apps`; // or some other info
                        case 'commission':
                          return `Apps`; // or some field
                        case 'withdraw':
                          return `+88${transaction.from?.phone}`; // example
                        default:
                          return '-';
                      }
                    })()}
                  </p>
                  <div className='flex items-center gap-1 mt-1'>
                    <ClockIcon className='h-3 w-3 text-gray-400 dark:text-gray-500' />
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      {format(transaction.createdAt)}
                    </p>
                  </div>
                </div>
              </div>
              <div className='text-right'>
                <p
                  className={`font-semibold ${
                    transaction.type === 'cash_in' ||
                    transaction.type === 'commission'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {transaction.type === 'cash_in' ||
                  transaction.type === 'commission'
                    ? '+'
                    : '-'}
                  ৳{transaction.amount.toLocaleString()}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-300 mt-1'>
                  TrxID: {transaction.transactionId}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='p-6 border-t border-gray-100 dark:border-gray-600'>
        <button className='w-full text-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium text-sm py-2 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors'>
          View All Transactions
        </button>
      </div>
    </div>
  );
};

export default RecentActivity;
