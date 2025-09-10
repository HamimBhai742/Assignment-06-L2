import React, { useEffect, useState } from 'react';
import {
  MagnifyingGlassIcon,
  UserIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useFindUserQuery } from '../../../../../redux/api/userApi';
import type { CashOutUserSearchProps } from '../interface';

const CashOutUserSearch: React.FC<CashOutUserSearchProps> = ({
  onUserSelect,
}) => {
  const [searchPhone, setSearchPhone] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { data, refetch, error } = useFindUserQuery(searchPhone, {
    skip: searchPhone.length < 11,
  });

  useEffect(() => {
    if (data?.data) {
      setIsOpen(true);
    }
    if (error) {
      setIsOpen(false);
    }
  }, [data, error]);

  const handleSearch = () => {
    if (searchPhone.length < 11) return;
    refetch();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const getBalanceStatus = (balance: number) => {
    if (balance < 50)
      return { color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-900/30', status: 'Very Low' };
    if (balance < 500)
      return { color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-50 dark:bg-yellow-900/30', status: 'Low' };
    return { color: 'text-green-600 dark:text-green-400', bg: 'bg-green-50 dark:bg-green-900/30', status: 'Good' };
  };
  const balanceStatus = getBalanceStatus(data?.data?.wallet.balance);
  const canWithdraw =
    data?.data?.wallet.balance >= 50 && data?.data.user.isActive;
  return (
    <div className='p-6'>
      <div className='mb-6'>
        <h2 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
          Find Customer
        </h2>
        <p className='text-gray-600 dark:text-gray-300 text-sm'>
          Enter customer's phone number to check balance
        </p>
      </div>

      {/* Search Input */}
      <div className='mb-6'>
        <div className='relative'>
          <input
            type='tel'
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='Enter phone number (e.g., 01712345678)'
            className='w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400'
            maxLength={11}
          />
          <MagnifyingGlassIcon className='absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500' />
        </div>
        <button
          onClick={handleSearch}
          disabled={searchPhone.length < 11 || isSearching}
          className='w-full mt-3 bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700 disabled:bg-gray-300 dark:disabled:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors'
        >
          {isSearching ? 'Searching...' : 'Search Customer'}
        </button>
      </div>

      {/* Search Results */}
      {isOpen && (
        <div className='space-y-3'>
          <h3 className='font-medium text-gray-900 dark:text-white'>Search Results</h3>
          <div
            onClick={() => canWithdraw && onUserSelect(data?.data)}
            className={`p-4 border rounded-lg transition-colors ${
              canWithdraw
                ? 'border-gray-200 dark:border-gray-600 hover:border-red-300 dark:hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 cursor-pointer'
                : 'border-red-200 dark:border-red-700 bg-red-50 dark:bg-red-900/20 cursor-not-allowed opacity-75'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center space-x-3'>
                <div className='w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center'>
                  <UserIcon className='h-6 w-6 text-gray-600 dark:text-gray-300' />
                </div>
                <div>
                  <div className='flex items-center space-x-2'>
                    <h4 className='font-medium text-gray-900 dark:text-white'>
                      {data?.data?.user.name}
                    </h4>
                    {data?.data?.user.isActive ? (
                      <CheckCircleIcon className='h-4 w-4 text-green-500 dark:text-green-400' />
                    ) : (
                      <ExclamationTriangleIcon className='h-4 w-4 text-yellow-500 dark:text-yellow-400' />
                    )}
                  </div>
                  <p className='text-sm text-gray-600 dark:text-gray-300'>
                    {data?.data?.user.phone}
                  </p>
                  <div className='flex items-center space-x-2 mt-1'>
                    <p className='text-sm font-medium text-gray-900 dark:text-white'>
                      Balance: ৳{data?.data?.wallet.balance.toLocaleString()}
                    </p>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${balanceStatus.color} ${balanceStatus.bg}`}
                    >
                      {balanceStatus.status}
                    </span>
                  </div>
                  {!data?.data?.user.isActive && (
                    <p className='text-xs text-red-600 dark:text-red-400 mt-1'>
                      Account not verified
                    </p>
                  )}
                  {data?.data?.wallet.balance < 50 && (
                    <p className='text-xs text-red-600 dark:text-red-400 mt-1'>
                      Insufficient balance for withdrawal
                    </p>
                  )}
                </div>
              </div>
              <div
                className={`font-medium ${
                  canWithdraw ? 'text-red-500 dark:text-red-400' : 'text-gray-400 dark:text-gray-500'
                }`}
              >
                {canWithdraw ? 'Select' : 'Cannot Withdraw'}
              </div>
            </div>
          </div>
        </div>
      )}

      {!isOpen && (
        <div className='text-center py-8'>
          <UserIcon className='h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3' />
          <p className='text-gray-500 dark:text-gray-400'>
            No customer found with this phone number
          </p>
        </div>
      )}
    </div>
  );
};

export default CashOutUserSearch;
