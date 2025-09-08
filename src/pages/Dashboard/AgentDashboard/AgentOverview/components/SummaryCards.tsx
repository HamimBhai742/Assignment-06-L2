import React from 'react';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  WalletIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import { useMyWalletQuery } from '../../../../../redux/api/walletApi';
import { useTodayTotalTransactionsQuery } from '../../../../../redux/api/transactionApi';
import Loding from '../../../../../components/Loding/Loding';

const SummaryCards: React.FC = () => {
  const { data, isLoading } = useMyWalletQuery(undefined);
  const { data: today, isLoading: lo } =
    useTodayTotalTransactionsQuery(undefined,{
      refetchOnMountOrArgChange: true
    });
  console.log(today);
  if (isLoading || lo) {
    return <Loding />;
  }
  const summaryData = [
    {
      title: 'Total Balance',
      amount: `৳ ${data?.data?.balance?.toLocaleString()||0}`,
      icon: WalletIcon,
      color: 'bg-blue-500',
      change: today?.data?.totalChange,
      changeType: 'positive',
    },
    {
      title: 'Cash In Today',
      amount: `৳ ${today?.data?.cashIn?.totalAmount?.toLocaleString()||0}`,
      icon: ArrowDownIcon,
      color: 'bg-green-500',
      change: today?.data?.cashInChange,
      changeType: 'positive',
    },
    {
      title: 'Cash Out Today',
      amount: `৳ ${today?.data?.cashOut?.totalAmount?.toLocaleString()||0}`,
      icon: ArrowUpIcon,
      color: 'bg-red-500',
      change: today?.data?.cashOutChange,
      changeType: 'negative',
    },
    {
      title: 'Total Commission',
      amount: `৳ ${today?.data?.commission?.totalAmount?.toLocaleString()||0}`,
      icon: UsersIcon,
      color: 'bg-purple-500',
      change: today?.data?.comissionChange,
      changeType: 'positive',
    },
  ];

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8'>
      {summaryData.map((item, index) => (
        <div
          key={index}
          className='bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow'
        >
          <div className='flex items-center justify-between mb-4'>
            <div className={`${item.color} p-3 rounded-lg`}>
              <item.icon className='h-6 w-6 text-white' />
            </div>
            <span
              className={`text-sm font-medium ${
                item.change > 0 ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {item.change > 0 && '+'}
              {item?.change?.toLocaleString()}%
            </span>
          </div>
          <div>
            <p className='text-gray-600 text-sm mb-1'>{item.title}</p>
            <p className='text-2xl font-bold text-gray-900'>{item.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
